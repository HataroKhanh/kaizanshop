import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/lib/mongodb";
import drive from "@/lib/newAuth";
import { authOptions } from "@/auth.config";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json("You are not login", { status: 401 });

  const { id, listId } = (await req.json()) as { id: string; listId: string[] };

  const client = await clientPromise;
  const db = client.db("kaizanshop");
  const products = db.collection("products");

  //check own
  const dataProduct = await products.findOne({ idProduct: id });

  if (!dataProduct)
    return NextResponse.json("Not found product!", { status: 404 });

  const ok = session.user.id === dataProduct.owner.id;

  if (!ok) return NextResponse.json("You are not owner", { status: 401 });

  const fileImages = Array.from(dataProduct.images).map((item: any) => {
    return item.id;
  });

  const fileProduct = dataProduct.file.fileId;

  try {
    const removeFileProduct = await drive.files.delete({
      fileId: fileProduct,
    });

    const removeFileImages = fileImages.map(async (item) => {
      const res = await drive.files.delete({
        fileId: item,
      });
    });

    Promise.all(removeFileImages);
  } catch (error) {}

  const b_remove_product = await products.deleteOne({ idProduct: id });
  if (!b_remove_product)
    return NextResponse.json("Fail to delete product", { status: 400 });

  return NextResponse.json({ success: true }, { status: 200 });
}
