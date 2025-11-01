"use client";
import Link from "next/link";
import { Product } from "@/utils/definitions";

interface ShopProductCardProps {
  product: Product;
}

export const ShopProductCard = ({ product }: ShopProductCardProps) => {
  const mainImage = product.images?.[0]?.id
    ? `/api/image/get_image?id=${product.images[0].id}`
    : "/fallback-product.webp";

  return (
    <Link href={`/shops/${product.idProduct}`} key={product.idProduct}>
      <div className="p-2 bg-[#1e2939] rounded-[5px] flex flex-col gap-2 hover:shadow-lg transition-all duration-200 border border-[#323d4e]">
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
            <span className="line-clamp-2 text-gray-400 text-xs">
              {product.description || "Chưa có mô tả"}
            </span>
            <p className="text-indigo-400 font-bold mt-5">
              {product.price?.toLocaleString() || 0} đ
            </p>
          </div>
          {/* Người bán */}
          <div className="flex flex-row items-center">
            <img
              src={product.owner?.image!}
              alt={product.owner?.name || "Chưa đặt tên"}
              className="h-10 w-10 rounded-full"
            />
            <div className="flex flex-col ml-5 gap-1 text-gray-300 text-sm">
              <span>{product.owner?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

