import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const filter = data.filter || "";
  const page = (data.page || 1);
  const limit = data.limit || 10;

  if (page < 1 || limit < 1 || limit > 25) {
    return NextResponse.json({ error: "Invalid page or limit" }, { status: 400 });
  }

  const db = (await clientPromise).db("kaizanshop");
  const products = db.collection("products_shop");

  const res = await products
    .find({}, { projection: { _id: 0 } })
    .sort({ createdAt: filter === "up" ? -1 : 1 })
    .skip((page - 1) * limit)
    .toArray();

  return NextResponse.json(res);
}
