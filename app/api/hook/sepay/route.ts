import { NextResponse, NextRequest } from "next/server";
import { SePayWebhookPayload } from "@/types/sepay";
import clientPromise from "@/lib/mongodb";

const SEPAY_API_KEY = process.env.SEPAY_API;

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const sepay = client.db("sepay");

    const history = sepay.collection("history");
    const payments = sepay.collection("payments");

    const authHeader = request.headers.get("Authorization");
    const expectedAuth = `Apikey ${SEPAY_API_KEY}`;

    if (authHeader !== expectedAuth) {
      console.warn("Webhook: Sai API Key!", { got: authHeader });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: SePayWebhookPayload = await request.json();

    if (!(body.transferType === "in" && body.transferAmount > 0)) {
      return NextResponse.json({ error: "error type" }, { status: 400 });
    }

    await history.insertOne(body);
    const check = await payments.updateOne(
      { code: body.code },
      { $set: { status: "paid" } }
    );

    console.log(check);

    return NextResponse.json(
      {
        success: true,
        message: "Webhook received successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi xử lý webhook:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
