"use client";
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

interface MyProductCardProps {
  product: Product;
  imageUrl?: string;
}

export const MyProductCard = ({ product, imageUrl }: MyProductCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all rounded-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700">
      {/* Ảnh 1:1 */}
      <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-700">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.nameProduct}
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
            {product.nameProduct}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">
            {product.description}
          </p>
          <h3 className="text-blue-600 dark:text-blue-400 font-bold mt-3">
            {product.price ? product.price.toLocaleString("vi-VN") : null}₫
          </h3>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-700 dark:text-gray-300">
          <div>
            <p>Lượt mua: {product.count || 0}</p>
            <p>Đánh giá: {product.rate || 0}</p>
          </div>
          <Link href={`/shops/${product.idProduct}`}>
            <button className="cursor-pointer border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/40 transition-all">
              Xem thêm
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

