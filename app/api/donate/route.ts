import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page")!;

  const client = await clientPromise;
  const db = client.db("sepay");
  const donate = await db
    .collection("history")
    .find({},{projection : {
        _id : 0,
        gateway : 0,
        transactionDate : 0,
        accountNumber : 0,
        code  : 0,
        subAccount : 0,
        transferType : 0,
        referenceCode : 0,
        accumulated : 0,
        id : 0,
    }})
    .limit(10)
    .skip(10 * Number(page))
    .toArray();

  return NextResponse.json(donate);
}
