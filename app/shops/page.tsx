"use client";
import Link from "next/link";
import Header from "../components/Header";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ShopsPage() {
  const { data, error, isLoading } = useSWR("/api/products/show_shop", fetcher);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          Đang tải sản phẩm...
        </div>
      </>
    );
  }

  if (error || !data || data.length === 0) {
    return (
      <>
        <Header />
        <div className="p-8 text-center text-red-500">Không có sản phẩm</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Cửa hàng sản phẩm
        </h1>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.map((product: any) => {
            const mainImage = product.images?.[0]?.id
              ? `/api/image/get_image?id=${product.images[0].id}`
              : "/placeholder.png";

            return (
              <Link href={`/products/${product.idProduct}`}>
                <div
                  key={product.idProduct}
                  className="p-2 bg-[#1e2939] rounded-[5px] flex flex-col gap-2 hover:shadow-lg transition-all duration-200 border border-[#323d4e]"
                >
                  {/* Ảnh sản phẩm */}
                  <div>
                    <img
                      src={mainImage}
                      alt={product.nameProduct}
                      className="h-48 w-full object-cover rounded-[5px]"
                    />
                  </div>

                  {/* Nội dung */}
                  <div className="flex flex-col gap-5 p-2">
                    {/* Tên + giá */}
                    <div>
                      <h2 className="text-lg font-semibold text-white truncate">
                        {product.nameProduct}
                      </h2>
                      <p className="text-indigo-400 font-bold">
                        {product.price?.toLocaleString() || 0} đ
                      </p>
                    </div>

                    {/* Người bán */}
                    <div className="flex flex-row items-center">
                      <img
                        src={product.owner?.image}
                        alt={product.owner?.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="flex flex-col ml-5 gap-1 text-gray-300 text-sm">
                        <span>{product.owner?.name}</span>
                        <span className="line-clamp-2 text-gray-400 text-xs">
                          {product.description || "Chưa có mô tả"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      </main>
    </>
  );
}
