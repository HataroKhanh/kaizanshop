import { NextResponse } from "next/server";
import { google } from "googleapis";
import { PassThrough } from "stream";

export async function POST(req: Request) {
  const form = await req.formData();

  const nameProduct = (form.get("name-product") as string) ?? "";
  const description = (form.get("description-product") as string) ?? "";
  const priceProduct = Number(form.get("price") ?? 0);

  const file = form.get("file-product") as File;

  const arrayBuf = await file.arrayBuffer();

  const buf = Buffer.from(arrayBuf);
}
