import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const {searchParams} = new URL(req.url)

  const filter = searchParams.get("filter") || "up"
  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit")) || 10;
  

  if (page < 1 || limit < 1 || limit > 25) {
    return NextResponse.json({ error: "Invalid page or limit" }, { status: 400 });
  }

  const client = (await clientPromise);
  const db = client.db("kaizanshop")
  const products = db.collection("products");

  const res = await products
    .find({}, { projection: { _id: 0 } })
    .sort({ createdAt: filter === "up" ? -1 : 1 })
    .skip((page - 1) * limit)
    .toArray();

  return NextResponse.json(res);
}
