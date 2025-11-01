"use client";
import { ProductCard } from "./ProductCard";

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

interface FeaturedProductsSectionProps {
  isLoading: boolean;
  products: Product[] | undefined;
}

export const FeaturedProductsSection = ({
  isLoading,
  products,
}: FeaturedProductsSectionProps) => {
  return (
    <section className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-20">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        🌟 Các sản phẩm nổi bật
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
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
          products?.map((product: any) => <ProductCard key={product.idProduct} product={product} />)
        )}
      </div>
    </section>
  );
};

