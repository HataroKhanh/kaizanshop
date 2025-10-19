// /app/api/upload/route.ts
import { NextResponse } from "next/server";
import { google } from "googleapis";
import path from "path";
import { Readable } from "stream";

export async function POST(request: Request) {
  try {
    // 1. Lấy FormData từ request
    const data = await request.formData();
    const file: File | null = data.get("file-product") as unknown as File;

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT,
      process.env.GOOGLE_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

    const drive = google.drive({
      version: "v3",
      auth: oauth2Client,
    });
    if (!file) {
      return NextResponse.json({
        success: false,
        message: "Không tìm thấy file",
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileStream = Readable.from(buffer);


    const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (!FOLDER_ID) {
      throw new Error("Thiếu FOLDER_ID");
    }

    const response = await drive.files.create({
      requestBody: {
        name: file.name, 
        parents: [FOLDER_ID], 
        mimeType: file.type, 
      },
      media: {
        mimeType: file.type,
        body: fileStream, 
      },
      fields: "id,name",
    });

    return NextResponse.json({
      success: true,
      message: "Upload file thành công!",
      fileId: response.data.id,
      fileName: response.data.name,
    });
  } catch (error: any) {
    console.error("Lỗi khi upload lên Google Drive:", error);
    return NextResponse.json(
      { success: false, message: "Upload thất bại", error: error.message },
      { status: 500 }
    );
  }
}
