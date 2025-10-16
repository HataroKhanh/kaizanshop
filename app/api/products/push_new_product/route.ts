import { NextResponse } from "next/server";
import { google } from "googleapis";
import { PassThrough } from "stream";

export async function POST(req: Request) {
  const form = await req.formData();

  const nameProduct =
    (form.get("name-product") as string) ?? "";
  const description =
    (form.get("description-product") as string) ?? "";
  const priceProduct = Number(form.get("price") ?? 0);

  const file = form.get("file-product") as File;

  const arrayBuf = await file.arrayBuffer();

  const buf = Buffer.from(arrayBuf);
  const origName = file.name || "upload.bin";
  const mimeType = file.type || "application/octet-stream";

  console.log(form);
  return NextResponse.json(buf);
  const auth = new google.auth.JWT({
    email: process.env.GSA_CLIENT_EMAIL!,
    key: process.env.GSA_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });

  const drive = google.drive({ version: "v3", auth });

  await drive.files.create({
    requestBody: {
      name: "big.mp4",
      parents: ["<FOLDER_ID>"],
    },
    media: {
      mimeType: "video/mp4",
      body: fs.createReadStream("./big.mp4"),
    },
    fields: "id",
  });
  return NextResponse.json({});
}
