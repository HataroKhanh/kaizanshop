"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import useSWR from "swr";
import { CiSquarePlus } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";

interface Product {
  idProduct: string;
  nameProduct: string;
  description: string;
  price: number;
  count?: number;
  rate?: number;
  images: { id: string }[];
}

export default function MyProductsPage() {
  const { data, isLoading } = useSWR<Product[]>(
    "/api/products/show_shop_self",
    (url : any) =>
      fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json())
  );

  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!data) return;

    (async () => {
      for (const item of data) {
        const imgId = item.images?.[0]?.id;
        if (!imgId || imageUrls[imgId]) continue;

        try {
          const res = await fetch(`/api/image/get_image?id=${imgId}`);
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          setImageUrls((prev) => ({ ...prev, [imgId]: url }));
        } catch (err) {
          console.error("Lỗi tải ảnh:", err);
        }
      }
    })();
  }, [data]);

  useEffect(() => {
    return () => {
      Object.values(imageUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  return (
    <>
      <Header />
      <section className="flex flex-col mx-auto mt-10 p-8 pt-0 max-w-7xl transition-colors duration-300 bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center py-8">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
            Sản phẩm của tôi
          </h1>
          <Link
            href="/myproducts/newproduct"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all active:scale-95 shadow-md hover:shadow-lg"
          >
            <CiSquarePlus className="text-xl" />
            <span>Tạo sản phẩm mới</span>
          </Link>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="text-center col-span-full text-gray-500 dark:text-gray-400">
              Đang tải...
            </div>
          ) : !data || data.length === 0 ? (
            <div className="text-center col-span-full text-gray-500 dark:text-gray-400">
              Bạn chưa có sản phẩm nào
            </div>
          ) : (
            data.map((item) => {
              const imgId = item.images?.[0]?.id;
              const imgUrl = imageUrls[imgId];

              return (
                <div
                  key={item.idProduct}
                  className="bg-white dark:bg-gray-800 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all rounded-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700"
                >
                  {/* Ảnh 1:1 */}
                  <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-700">
                    {imgUrl ? (
                      <Image
                        src={imgUrl}
                        alt={item.nameProduct}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 dark:bg-gray-600 animate-pulse" />
                    )}
                  </div>

                  {/* Nội dung */}
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <h2 className="text-lg font-semibold truncate text-gray-800 dark:text-gray-100">
                        {item.nameProduct}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">
                        {item.description}
                      </p>
                      <h3 className="text-blue-600 dark:text-blue-400 font-bold mt-3">
                        {item.price ? item.price.toLocaleString("vi-VN") : null}₫
                      </h3>
                    </div>

                    <div className="flex justify-between items-center mt-4 text-sm text-gray-700 dark:text-gray-300">
                      <div>
                        <p>Lượt mua: {item.count || 0}</p>
                        <p>Đánh giá: {item.rate || 0}</p>
                      </div>
                      <Link href={`/products/${item.idProduct}`}>
                        <button className="cursor-pointer border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/40 transition-all">
                          Xem thêm
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}
