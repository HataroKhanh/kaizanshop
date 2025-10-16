import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();
  const db = (await clientPromise).db("kaizanshop");
  console.log(email,password,name);
  
  const exists = await db.collection("user_credentials").findOne({ email });
  if (exists)
    return NextResponse.json({ error: "Email đã tồn tại" }, { status: 400 });

  const passwordHash = await bcrypt.hash(password, 12);
  const { insertedId } = await db.collection("user_credentials").insertOne({
    email,
    name: name ?? "Chưa có tên",
    passwordHash,
    createdAt: new Date(),
  });

  return NextResponse.json({ id: String(insertedId) }, { status: 201 });
}
