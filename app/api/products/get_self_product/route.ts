import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/auth.config";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");

  const client = await clientPromise;
  const db = client.db("kaizanshop");
  const products = db.collection("products");

  const product = await products.findOne(
    { idProduct: id },
    {
      projection: {
        _id: 0,
        idProduct: 0,
        "owner.email": 0,
      },
    }
  );

  //Check if id belongs to the owner
  // const productParse = JSON.parse(product ? product : "")
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const check: Boolean = product.owner.id === session?.user.id;

  return NextResponse.json(product);
}
