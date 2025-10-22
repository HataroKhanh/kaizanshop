import drive from "@/lib/newAuth";
import { NextResponse } from "next/server";
import { Readable } from "stream"; // Import Readable

export async function GET(req: Request) { // Bỏ 'res: Response' đi
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get("id");

  if (!fileId) {
    return NextResponse.json({ error: "Thiếu fileId" }, { status: 400 });
  }

  try {
    // Bước A: Lấy metadata
    const metaDataResponse = await drive.files.get({
      fileId: fileId,
      fields: "mimeType, name",
    });

    const mimeType = metaDataResponse.data.mimeType;

    // Bước B: Lấy nội dung file (stream)
    const driveStreamResponse = await drive.files.get(
      {
        fileId: fileId,
        alt: "media",
      },
      {
        responseType: "stream",
      }
    );
    
    // (Optional) Chuyển đổi Node.js Stream thành Web Stream
    // Mặc dù Next.js 13+ có thể tự xử lý, nhưng đây là cách tường minh
    const stream = Readable.toWeb(driveStreamResponse.data as Readable) as ReadableStream;

    // Bước C: Return một Response MỚI
    // Truyền stream vào body và set headers
    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": mimeType || 'application/octet-stream', // Fallback
        "Cache-Control": "public, max-age=31536000, immutable",
        // Thêm Content-Disposition nếu muốn gợi ý tên file khi tải
        "Content-Disposition": `inline; filename="${metaDataResponse.data.name}"`,
      },
    });

  } catch (error) {
    console.error('Lỗi khi gọi Google Drive API:', (error as Error).message);
    return NextResponse.json({ error: 'Lỗi máy chủ nội bộ' }, { status: 500 });
  }
}