"use client";
import Link from "next/link";

interface Product {
  idProduct: string;
  nameProduct: string;
  description: string;
  price: number;
  owner?: {
    name: string;
    image: string;
  };
  images: { id: string }[];
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const mainImage = product.images?.[0]?.id
    ? `/api/image/get_image?id=${product.images[0].id}`
    : "/placeholder.png";

  return (
    <Link href={`/products/${product.idProduct}`} className="group">
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
};

