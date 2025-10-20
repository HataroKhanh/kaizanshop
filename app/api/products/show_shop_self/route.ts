import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { ok: false, error: "Chưa đăng nhập" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit")) || 10, 25); 
  const filter = searchParams.get("filter") as "up" | "down" | null;

  const client = await clientPromise;
  const db = client.db("kaizanshop");
  const products = db.collection("products");

  const sortOrder = filter === "up" ? -1 : 1; 

  const res = await products
    .find({ "owner.id": session.user.id }, { projection: { _id: 0 } })
    .sort({ createdAt: sortOrder })
    .limit(limit)
    .toArray();

  return NextResponse.json(res);
}
