// src/app/api/product/getproduct/[page]/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import clientPromise from "@/lib/mongodb"; // ✅ sửa đường dẫn
export async function GET(_req: Request, ctx: { params: Promise<{ page: string }> }) {
  const ctxData = await ctx;
  const paramsData = await ctxData.params;
  const raw = parseInt(paramsData.page, 10);
  const page = Number.isFinite(raw) && raw > 0 ? raw : 1;

  const client = await clientPromise;
  const db = client.db("kaizanshop");
  const products = db.collection("products");

  const productData = await products
    .find({ current_page: page })
    .toArray();
  return NextResponse.json(productData);
}
