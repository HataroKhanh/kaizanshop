// File: app/myproducts/[id]/page.tsx
"use server";

import Header from "@/app/components/Header";
import clientPromise from "@/lib/mongodb";
import { FaStar } from "react-icons/fa";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth.config";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  const client = await clientPromise;
  const db = client.db("kaizanshop");
  const products = db.collection("products");

  const product = await products.findOne(
    { idProduct: id.toString() },
    {
      projection: {
        _id: 0,
        "owner.email": 0,
      },
    }
  );

  if (!product) {
    return (
      <>
        <Header />
        <main className="flex items-center justify-center h-[calc(100vh-80px)]">
          <h1 className="text-2xl font-bold">Không tìm thấy sản phẩm</h1>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {session?.user.id === product?.owner.id.toString() ? (
          <div className="flex justify-end-safe">
            <div className="">
              <Link href={`/myproducts/editproduct/${product.idProduct}`}>
                <button className="cursor-pointer px-3 py-2 border rounded-[5px] hover:bg-cyan-700">
                  Sửa bài viết
                </button>
              </Link>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* CỘT BÊN TRÁI: HÌNH ẢNH */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square relative rounded-lg overflow-hidden border border-gray-700">
              <Image
                // Lấy ảnh đầu tiên, nếu không có thì dùng fallback
                src={product.images?.[0]?.url || "/fallback.png"}
                alt={product.nameProduct}
                fill
                className="object-cover bg-white" // Thêm bg-white để fallback.png hiển thị đẹp
              />
            </div>
            {/* TODO: Thêm gallery ảnh thumbnail ở đây nếu muốn */}
          </div>

          {/* CỘT BÊN PHẢI: THÔNG TIN & MUA HÀNG */}
          <div className="flex flex-col gap-4">
            {/* Tên sản phẩm */}
            <h1 className="text-3xl md:text-4xl font-bold">
              {product.nameProduct}
            </h1>

            {/* Thông tin người bán */}
            <div className="flex items-center gap-3">
              <Image
                src={product.owner.image || "/avatar-fallback.png"}
                alt={product.owner.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-medium">{product.owner.name}</span>
            </div>

            {/* Đánh giá và Lượt mua (Trường tương lai) */}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span className="font-semibold text-white">
                  {product.rate || 0}
                </span>
                <span className="ml-1">
                  ({product.reviewsCount || 0} đánh giá)
                </span>
              </div>
              <div className="border-l border-gray-600 h-4"></div>
              <div>
                <span className="font-semibold text-white">
                  {product.count || 0}
                </span>
                <span className="ml-1">lượt mua</span>
              </div>
            </div>

            {/* Mô tả ngắn */}
            <p className="text-gray-300 text-lg max-w-full break-words">
              {product.description}
            </p>

            {/* Giá sản phẩm (Trường tương lai) */}
            <div className="my-4">
              <span className="text-4xl font-bold text-cyan-400">
                {product.price ? formatPrice(product.price) : "Giá liên hệ"}
              </span>
            </div>

            {/* Nút Mua hàng & Giỏ hàng */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-all text-lg">
                Mua ngay
              </button>
              <button className="flex-1 border border-gray-600 hover:bg-gray-800 py-3 px-6 rounded-lg transition-all text-lg">
                Thêm vào giỏ
              </button>
            </div>

            {/* Thông tin file (nếu là sản phẩm số) */}
            <div className="text-sm text-gray-500 mt-2">
              Tệp tin: {product.file.fileName}
            </div>
          </div>
        </div>

        {/* === PHẦN MÔ TẢ CHI TIẾT (HTML TỪ DB) === */}
        <div className="mt-12 md:mt-16">
          <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 mb-4">
            Mô tả chi tiết
          </h2>
          {/* Dùng "prose" để tự động style HTML.
            Cần cài: npm install -D @tailwindcss/typography
            Và thêm vào tailwind.config.js: plugins: [require('@tailwindcss/typography')]
          */}
          <div
            className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white"
            dangerouslySetInnerHTML={{
              __html: product.motaFull || "<p>Chưa có mô tả chi tiết.</p>",
            }}
          />
        </div>

        {/* === PHẦN BÌNH LUẬN === */}
        <div className="mt-12 md:mt-16">
          <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 mb-4">
            Đánh giá & Bình luận
          </h2>
          <div className="flex flex-col gap-6">
            {/* Form viết bình luận (Component Client) */}
            {/* TODO: Tách đây ra thành 1 Client Component để xử lý state */}
            <div className="flex flex-col gap-2">
              <textarea
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3"
                rows={3}
                placeholder="Viết bình luận của bạn..."
              />
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg self-end">
                Gửi
              </button>
            </div>

            {/* Danh sách bình luận */}
            <div className="flex flex-col gap-6">
              {product.binhLuan && product.binhLuan.length > 0 ? (
                product.binhLuan.map((comment: any, index: number) => (
                  <div
                    key={index}
                    className="flex gap-3 border-t border-gray-700 pt-4"
                  >
                    <Image
                      src={comment.user.image || "/avatar-fallback.png"}
                      alt={comment.user.name}
                      width={40}
                      height={40}
                      className="rounded-full h-10 w-10"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold">{comment.user.name}</span>
                      <p className="text-gray-300">{comment.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Chưa có bình luận nào.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
