"use client";
import { Product } from "@/utils/definitions";
import { ShopProductCard } from "./ShopProductCard";

interface ShopProductsListProps {
  isLoading: boolean;
  error: any;
  data: Product[] | undefined;
}

export const ShopProductsList = ({
  isLoading,
  error,
  data,
}: ShopProductsListProps) => {
  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        Đang tải sản phẩm...
      </div>
    );
  }

  if (error || !data || data.length === 0) {
    return (
      <div className="p-8 text-center text-red-500">Không có sản phẩm</div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Cửa hàng sản phẩm
      </h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((product: Product) => (
          <ShopProductCard key={product.idProduct} product={product} />
        ))}
      </section>
    </main>
  );
};

