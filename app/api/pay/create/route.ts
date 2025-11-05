import { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const { code, price } = await req.json();
  if (!code || !price) return Response.json({ error: "Invalid" }, { status: 400 });

  const client = await clientPromise;
  const db = client.db("sepay");
  const payment = await db.collection("payments").findOne({ code });

  if (!payment || payment.status !== "pending") {
    return Response.json({ error: "Invalid order" }, { status: 400 });
  }

  const qrUrl = `https://qr.sepay.vn/img?acc=0981144736&bank=MB&amount=${price}&des=${code}`;
  return Response.json({ qrUrl });
}