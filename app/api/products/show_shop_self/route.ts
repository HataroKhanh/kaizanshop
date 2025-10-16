import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { ok: false, error: "Chưa đăng nhập" },
      { status: 401 }
    );
  }

  const data = await req.json();
  const filter = data.filter || "";
  const page = data.page || 1;
  const limit = data.limit || 10;
  const selfId = data.shopId || "";

  if (page < 1 || limit < 1 || limit > 25) {
    return NextResponse.json(
      { error: "Invalid page or limit" },
      { status: 400 }
    );
  }

  if (!shopId) {
    return NextResponse.json({ error: "shopId is required" }, { status: 400 });
  }

  const db = (await clientPromise).db("products");
  const products = db.collection("products_shop");

  const res = await products
    .find({ shopId: shopId }, { projection: { _id: 0 } })
    .sort({ createdAt: filter === "up" ? -1 : 1 })
    .skip((page - 1) * limit)
    .toArray();

  return NextResponse.json(res);
}
