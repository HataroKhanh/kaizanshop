"use client";
import Header from "./components/Header";
import Link from "next/link";
import useSWR from "swr";
import Footer from "./components/Footer";

export default function HomePage() {
  const swr = useSWR("/api/products/show_shop", (url) =>
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json())
  );

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid md:grid-cols-2 gap-12 md:items-center">
          {/* Text */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Về trang <span className="text-blue-600">KaizanShop</span>
            </h1>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-400">
              Đây là nơi mọi người có thể bán và chia sẻ các công cụ của mình
              cho cộng đồng. Từ phần mềm, script, plugin đến tài nguyên học tập
              — tất cả đều có thể được giới thiệu tại đây.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                target="_blank"
                href="/login"
                className="py-3 px-6 inline-flex items-center justify-center gap-x-2 text-base font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
              >
                Bắt đầu
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>

              <Link
                href="/myproducts"
                className="py-3 px-6 inline-flex items-center justify-center gap-x-2 text-base font-medium rounded-lg border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 active:scale-95 transition-all shadow-sm"
              >
                Bán công cụ của tôi
              </Link>
            </div>
          </div>

          {/* Image */}
          <a href="https://github.com/HataroKhanh/Fly_With_Me" target="_blank">
            <div className="relative cursor-pointer">
              <div className="rounded-xl overflow-hidden shadow-lg ">
                <img
                  src="/fly_with_me.png"
                  alt="Hero"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-transparent rounded-xl"></div>
            </div>
          </a>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-20">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          🌟 Các sản phẩm nổi bật
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {swr.isLoading ? (
            // Skeleton loading
            <>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="p-3 bg-[#1e2939] rounded-xl flex flex-col gap-3 shadow-md animate-pulse"
                >
                  <div className="h-48 bg-[#323d4e] rounded-lg"></div>
                  <div className="h-5 bg-[#323d4e] w-3/4 rounded-lg"></div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="h-10 w-10 rounded-full bg-[#323d4e]"></div>
                    <div className="flex flex-col gap-2 w-1/2">
                      <div className="h-4 bg-[#323d4e] rounded"></div>
                      <div className="h-4 bg-[#323d4e] rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            // Actual data
            swr.data?.map((product: any) => {
              const mainImage = product.images?.[0]?.id
                ? `/api/image/get_image?id=${product.images[0].id}`
                : "/placeholder.png";

              return (
                <Link
                  key={product.idProduct}
                  href={`/products/${product.idProduct}`}
                  className="group"
                >
                  <div className="p-3 bg-[#1e2939] rounded-xl flex flex-col gap-3 border border-[#2a3548] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Image */}
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src={mainImage}
                        alt={product.nameProduct}
                        className="h-48 w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-3 p-1">
                      <h2 className="text-lg font-semibold text-white truncate">
                        {product.nameProduct}
                      </h2>
                      <p className="text-indi`go`-400 font-bold text-sm">
                        {product.price?.toLocaleString() || 0} đ
                      </p>

                      {/* Owner */}
                      <div className="flex items-center gap-3 mt-2">
                        <img
                          src={product.owner?.image}
                          alt={product.owner?.name}
                          className="h-9 w-9 rounded-full border border-[#323d4e]"
                        />
                        <div className="flex flex-col text-sm text-gray-300">
                          <span>{product.owner?.name}</span>
                          <span className="text-gray-400 text-xs line-clamp-2">
                            {product.description || "Chưa có mô tả"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
