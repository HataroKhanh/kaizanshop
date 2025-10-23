import { NextResponse } from "next/server";
import drive from "@/lib/newAuth";
import { Readable } from "stream";
import clientPromise from "@/lib/mongodb";
import HashSHA256 from "@/utils/hashSha256";
import { Product } from "@/utils/definitions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth.config"; // Đảm bảo đường dẫn này đúng

// (Hàm handlePush và handleDelete giữ nguyên, không cần sửa)
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
  return response.data; // Trả về { id, name }
}

async function handleDelete(fileId: string) {
  if (!fileId) return;
  try {
    await drive.files.delete({ fileId: fileId }); // Đảm bảo đúng cú pháp
  } catch (err) {
    console.error("Không xóa được file Drive:", err);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    // SỬA LỖI 1: Dùng 401 Unauthorized
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

    // Lấy data DB trước
    const dataDb = await products.findOne({ idProduct: idProduct });

    if (!dataDb)
      return NextResponse.json(
        { error: "Sản phẩm không tồn tại" },
        { status: 404 }
      );

    switch (options) {
      case "edit":
        // SỬA LỖI 2: KIỂM TRA QUYỀN SỞ HỮU (RẤT QUAN TRỌNG)
        if (dataDb.owner.id.toString() !== session.user.id) {
          return NextResponse.json(
            { error: "Bạn không phải chủ sở hữu sản phẩm này" },
            { status: 403 } // 403 Forbidden
          );
        }

        const file: File | null = data.get("file-product") as File | null;
        const fileImages: File[] = data.getAll("image-file") as File[];
        
        // SỬA LỖI LOGIC 3: Client phải gửi ID ảnh cần xóa
        // Client nên gửi một chuỗi JSON array, ví dụ: '["id1", "id2"]'
        const imagesToDelete: string[] = JSON.parse(
          (data.get("images-to-delete") as string) || "[]"
        );

        let newFileData = dataDb.file;

        // Xử lý file chính (logic của bạn đã ổn)
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

        // SỬA LỖI LOGIC 3: Xử lý hình ảnh (Cách mới)
        
        // 1. Bắt đầu với mảng ảnh hiện tại
        let currentImages = [...dataDb.images];

        // 2. Xóa các ảnh mà client yêu cầu xóa
        if (imagesToDelete.length > 0) {
          for (const idToDelete of imagesToDelete) {
            const imageToDelete = currentImages.find(img => img.id === idToDelete);
            if (imageToDelete) {
              await handleDelete(imageToDelete.id);
            }
          }
          // Lọc mảng
          currentImages = currentImages.filter(img => !imagesToDelete.includes(img.id));
        }

        // 3. Thêm các ảnh mới upload
        if (fileImages.length > 0) {
           for (const item of fileImages) {
              const imgRes = await handlePush(item);
              currentImages.push({ name: imgRes.name as string, id: imgRes.id as string });
           }
        }
        
        // Lấy các trường dữ liệu text
        const nameProduct = data.get("name-product") as string;
        const description = data.get("description-product") as string;
        const price = data.get("price") as string;

        // SỬA LỖI LOGIC 4: Dùng || thay vì ?? để xử lý chuỗi rỗng
        await products.updateOne(
          { idProduct: idProduct },
          {
            $set: {
              nameProduct: nameProduct || dataDb.nameProduct,
              description: description || dataDb.description,
              price: Number(price) || dataDb.price,
              file: newFileData, // Đã có logic default ở trên
              images: currentImages, // Mảng ảnh mới đã được xử lý
            },
          }
        );

        break;

      case "comment":
        // SỬA LỖI 5: DÙNG SESSION, KHÔNG TIN CLIENT
        const user = {
          id: session.user.id,
          name: session.user.name,
          image: session.user.image,
        };
        
        const text = (data.get("text") as string) || "";
        const rateGet = Number(data.get("rate")) || 0;
        
        // SỬA LỖI LOGIC 6: Tính toán rate trung bình
        const currentRate = dataDb.rate || 0;
        const reviewCount = dataDb.comment?.length || 0; // Lấy số lượng review cũ
        let newRate = currentRate; // Mặc định giữ nguyên

        // Chỉ tính rate nếu rate gửi lên hợp lệ (0-5)
        if (rateGet >= 0 && rateGet <= 5) {
           // ( (Tổng cũ) + rate mới ) / (Số lượng mới)
          newRate = (currentRate * reviewCount + rateGet) / (reviewCount + 1);
        }

        await products.updateOne(
          { idProduct: dataDb.idProduct },
          {
            $push: {
              comment: {
                user: user, // Dùng user an toàn từ session
                text,
                rate: rateGet,
                createdAt: new Date(),
              },
            },
            $set: {
              rate: newRate, // Cập nhật rate trung bình mới
            },
          }
        );

        break;

      default:
        return NextResponse.json({ error: "Option không hợp lệ" }, { status: 400 });
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