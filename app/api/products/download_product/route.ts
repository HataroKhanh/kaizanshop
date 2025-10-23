import { NextResponse } from "next/server";
import drive from "@/lib/newAuth";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get("id");

  const client = await clientPromise;
  const db = client.db("kaizanshop");
  const products = db.collection("products");

  if (!fileId)
    return NextResponse.json({ error: "Missing fileId" }, { status: 400 });

  try {
    const file = await drive.files.get({
      fileId,
      fields: "webContentLink",
    });

    const link = file.data.webContentLink;
    if (!link)
      return NextResponse.json(
        { error: "File not downloadable" },
        { status: 403 }
      );

    await products.updateOne(
      { "file.fileId": fileId },
      { $inc: { sold: 1 } } 
    );
    return NextResponse.redirect(link);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
