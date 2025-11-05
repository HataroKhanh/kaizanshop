import { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  if (!code) return Response.json({ error: "Missing code" }, { status: 400 });

  const client = await clientPromise;
  const db = client.db("sepay");
  const payment = await db.collection("payments").findOne({ code });

  if (!payment) return Response.json({ status: "not_found" });

  const age = Date.now() - new Date(payment.createdAt).getTime();
  if (age > 5 * 60 * 1000 && payment.status === "pending") {
    await db.collection("payments").updateOne({ code }, { $set: { status: "expired" } });
    return Response.json({ status: "expired" });
  }

  return Response.json({ status: payment.status });
}