// /app/api/upload/route.ts
import { NextResponse } from "next/server";
import drive from "@/lib/newAuth";
import { Readable } from "stream";
import clientPromise from "@/lib/mongodb";
import HashSHA256 from "@/utils/hashSha256";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth.config";

async function handlePush(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileStream = Readable.from(buffer);

  const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (!FOLDER_ID) {
    throw new Error("Thiếu FOLDER_ID");
  }
  if (!file) {
    throw new Error("Thiếu File");
  }

  const response = await drive.files.create({
    requestBody: {
      name: file.name,
      parents: [FOLDER_ID],
      mimeType: file.type,
    },
    media: {
      mimeType: file.type,
      body: fileStream,
    },
    fields: "id,name",
  });

  return response.data;
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session)
      return NextResponse.json({ error: "Login bro???" }, { status: 405 });

    const data = await request.formData();
    const owner = "khanh";

    const file: File | null = data.get("file-product") as unknown as File;

    const buffer = Buffer.from(await file.arrayBuffer());

    const sha256 = HashSHA256(buffer);

    const nameProduct = data.get("name-product");
    const descriptionProduct = data.get("description-product");
    const price = data.get("price");

    const fileImages: File[] = data.getAll("file-image") as File[];

    const client = await clientPromise;
    const db = client.db("kaizanshop");
    const products = db.collection("products");

    //Check sha256 from db
    const sha256Check = await products.findOne({
      "file.hashSha256": sha256,
    });

    if (sha256Check)
      return NextResponse.json(
        { error: "Existed file product!" },
        { status: 409 }
      );

    const fileRes = await handlePush(file);

    if (!fileRes) {
      return NextResponse.json({ error: "Fail to upload product" });
    }

    const dataImagePromise = Array.from(fileImages).map(async (item) => {
      const imageId = await handlePush(item); // 'ok' là id của file chính
      if (!imageId) {
        console.log("False to upload file: ", item.name);
        return null;
      }
      return {
        name: item.name,
        id: imageId.id,
      };
    });

    const resultsImage = (await Promise.all(dataImagePromise)).filter(
      (item) => item !== null
    );

    const checkInsert = await products.insertOne({
      nameProduct: nameProduct,
      description: descriptionProduct,
      owner: session?.user,
      price: Number(price),
      images: resultsImage,
      file: {
        fileName: fileRes.name,
        fileId: fileRes.id,
        hashSha256: sha256,
      },
      idProduct: new ObjectId().toString(),
      sold: 0,
      rate: 0,
      tags: [],
    });
    if (!checkInsert) return NextResponse.json({ error: "False to insert" });

    return NextResponse.json("ok");

    // return NextResponse.json( fileImagesBuffer );
    //Upload images
  } catch (error: any) {
    console.error("Lỗi khi upload lên Google Drive:", error);
    return NextResponse.json(
      { success: false, message: "Upload thất bại", error: error.message },
      { status: 500 }
    );
  }
}
