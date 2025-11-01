"use client";
import { useEffect, useState } from "react";
import { MyProductCard } from "./MyProductCard";

interface Product {
  idProduct: string;
  nameProduct: string;
  description: string;
  price: number;
  count?: number;
  rate?: number;
  images: { id: string }[];
}

interface MyProductsGridProps {
  isLoading: boolean;
  data: Product[] | undefined;
}

export const MyProductsGrid = ({ isLoading, data }: MyProductsGridProps) => {
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
  }, [data, imageUrls]);

  useEffect(() => {
    return () => {
      Object.values(imageUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  if (isLoading) {
    return (
      <div className="text-center col-span-full text-gray-500 dark:text-gray-400">
        Đang tải...
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center col-span-full text-gray-500 dark:text-gray-400">
        Bạn chưa có sản phẩm nào
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.map((item) => {
        const imgId = item.images?.[0]?.id;
        const imgUrl = imageUrls[imgId];

        return (
          <MyProductCard key={item.idProduct} product={item} imageUrl={imgUrl} />
        );
      })}
    </div>
  );
};

