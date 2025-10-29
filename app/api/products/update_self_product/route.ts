import { NextResponse } from "next/server";
import drive from "@/lib/newAuth";
import { Readable } from "stream";
import clientPromise from "@/lib/mongodb";
import HashSHA256 from "@/utils/hashSha256";
import { Product } from "@/utils/definitions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth.config";
import { ObjectId } from "mongodb";

function calculateNewRate(
  oldRate: number,
  oldCount: number,
  newRateValue?: number, // Rate của comment mới (nếu thêm)
  removedRateValue?: number // Rate của comment bị xóa (nếu xóa)
): number {
  let totalRate = oldRate * oldCount;
  let newCount = oldCount;

  if (newRateValue !== undefined && newRateValue >= 0 && newRateValue <= 5) {
    totalRate += newRateValue;
    newCount += 1;
  } else if (removedRateValue !== undefined && oldCount > 0) {
    totalRate -= removedRateValue;
    newCount -= 1;
  }

  if (newCount <= 0) {
    return 0; // Tránh chia cho 0
  }
  return totalRate / newCount;
}

async function handlePush(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileStream = Readable.from(buffer);
  const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!FOLDER_ID) throw new Error("Thiếu FOLDER_ID");
  if (!file) throw new Error("Thiếu File");

  const response = await drive.files.create({
    requestBody: { name: file.name, parents: [FOLDER_ID], mimeType: file.type },
    media: { mimeType: file.type, body: fileStream },
    fields: "id,name",
  });
  return response.data;
}

async function handleDelete(fileId: string) {
  if (!fileId) return;
  try {
    await drive.files.delete({ fileId: fileId });
  } catch (err) {
    console.error("Không xóa được file Drive:", err);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user)
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });

    const data = await request.formData();
    const idProduct = data.get("idProduct") as string;
    const options = data.get("options") as string;

    if (!idProduct)
      return NextResponse.json({ error: "Thiếu idProduct" }, { status: 400 });
    if (!options)
      return NextResponse.json({ error: "Thiếu options" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("kaizanshop");
    const products = db.collection<Product>("products");

    const dataDb = await products.findOne({ idProduct: idProduct });

    let shouldUpdateTimestamp = false;

    if (!dataDb)
      return NextResponse.json(
        { error: "Sản phẩm không tồn tại" },
        { status: 404 }
      );

    let date = Date.now();
    let updateAt = new Date(dataDb.updatedAt).getTime();

    if (date - updateAt <= 30000) {
      return NextResponse.json(
        { error: "Vui lòng đợi 30 giây trước khi chỉnh sửa tiếp." },
        { status: 429 }
      );
    }

    switch (options) {
      case "edit":
        if (dataDb.owner.id.toString() !== session.user.id) {
          return NextResponse.json(
            { error: "Bạn không phải chủ sở hữu sản phẩm này" },
            { status: 403 }
          );
        }

        const file: File | null = data.get("file-product") as File | null;
        const fileImages: File[] = data.getAll("image-file") as File[];

        const imagesToDelete: string[] = JSON.parse(
          (data.get("images-to-delete") as string) || "[]"
        );

        let newFileData = dataDb.file;

        if (file) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const sha256 = HashSHA256(buffer);
          if (sha256 !== dataDb.file.hashSha256) {
            await handleDelete(dataDb.file.fileId);
            const fileRes = await handlePush(file);
            newFileData = {
              fileName: fileRes.name as string,
              fileId: fileRes.id as string,
              hashSha256: sha256,
            };
          }
        }

        let currentImages = [...dataDb.images];

        if (imagesToDelete.length > 0) {
          for (const idToDelete of imagesToDelete) {
            const imageToDelete = currentImages.find(
              (img) => img.id === idToDelete
            );
            if (imageToDelete) {
              await handleDelete(imageToDelete.id);
            }
          }
          currentImages = currentImages.filter(
            (img) => !imagesToDelete.includes(img.id)
          );
        }

        if (fileImages.length > 0) {
          for (const item of fileImages) {
            const imgRes = await handlePush(item);
            currentImages.push({
              name: imgRes.name as string,
              id: imgRes.id as string,
            });
          }
        }

        const nameProduct = data.get("name-product") as string;
        const description = data.get("description-product") as string;
        const price = data.get("price") as string;

        await products.updateOne(
          { idProduct: idProduct },
          {
            $set: {
              nameProduct: nameProduct || dataDb.nameProduct,
              description: description || dataDb.description,
              price: Number(price) || dataDb.price,
              file: newFileData,
              images: currentImages,
              updatedAt: new Date(),
            },
          }
        );

        shouldUpdateTimestamp = true;

        break;

      case "add_comment":
        const user = {
          id: session.user.id,
          name: session.user.name,
          image: session.user.image,
        };

        const text = (data.get("text") as string) || "";
        const rateGet = Number(data.get("rate")) || 0;

        const currentRate = dataDb.rate || 0;
        const reviewCount = dataDb.comment?.length || 0;
        let newRate = currentRate;

        if (rateGet >= 0 && rateGet <= 5) {
          newRate = (currentRate * reviewCount + rateGet) / (reviewCount + 1);
        }

        const newRateAdd = calculateNewRate(
          dataDb.rate,
          dataDb.comment?.length || 0,
          rateGet
        );

        await products.updateOne(
          { idProduct: dataDb.idProduct },
          {
            $push: {
              comment: {
                user: user,
                text,
                rate: rateGet,
                idComment: new ObjectId().toString(),
                createdAt: new Date(),
              },
            },
            $set: {
              rate: newRate,
            },
          }
        );

        shouldUpdateTimestamp = true;

        break;
      case "remove_comment":
        const idComment = data.get("id_comment") as string;
        if (!idComment)
          return NextResponse.json(
            { error: "Thiếu id_comment" },
            { status: 400 }
          );

        const commentToRemove = dataDb.comment?.find(
          (c) => c.idComment === idComment
        );

        if (!commentToRemove) {
          return NextResponse.json(
            { error: "Comment không tồn tại" },
            { status: 404 }
          );
        }

        if (commentToRemove.user.id !== session.user.id) {
          return NextResponse.json(
            { error: "Bạn không có quyền xoá comment này" },
            { status: 403 }
          );
        }

        const newRateRemove = calculateNewRate(
          dataDb.rate,
          dataDb.comment?.length || 0,
          undefined,
          commentToRemove.rate
        );

        const updateResult = await products.updateOne(
          { idProduct: idProduct },
          {
            $pull: { comment: { idComment: idComment } },
            $set: { rate: newRateRemove },
          }
        );

        if (updateResult.modifiedCount === 0) {
          return NextResponse.json(
            { error: "Xóa comment thất bại" },
            { status: 500 }
          );
        }

        shouldUpdateTimestamp = true;

        break;

      default:
        return NextResponse.json(
          { error: "Option không hợp lệ" },
          { status: 400 }
        );
    }

    if (shouldUpdateTimestamp) {
      await products.updateOne(
        { idProduct: idProduct },
        { $set: { updatedAt: new Date() } }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Lỗi khi update sản phẩm:", error);
    return NextResponse.json(
      { success: false, message: "Update thất bại", error: error.message },
      { status: 500 }
    );
  }
}
