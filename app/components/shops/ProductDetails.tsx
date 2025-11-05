"use client";
import { Product } from "@/utils/definitions";
import BuyNow from "@/app/components/BuyNow";

interface ProductDetailsProps {
  product: Product;
  isOwner: boolean;
  onEdit: () => void;
}

export const ProductDetails = ({
  product,
  isOwner,
  onEdit,
}: ProductDetailsProps) => {
  return (
    <div className="flex flex-col gap-4">
      {isOwner ? (
        <div className="flex py-2 sm:py-5 justify-end">
          <button
            onClick={onEdit}
            className="px-3 py-2 text-sm sm:text-base border rounded-[5px] hover:bg-blue-900 cursor-pointer "
          >
            Chỉnh sửa sản phẩm
          </button>
        </div>
      ) : null}
      
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          {product.nameProduct || "Chưa có tên"}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
          {product.description || "Chưa có mô tả"}
        </p>
        <p className="text-xl sm:text-2xl font-semibold text-indigo-600">
          {product.price?.toLocaleString() || 0} đ
        </p>

        <div className="flex items-center gap-3 mt-4">
          <img
            src={`/${product.owner?.image!}`}
            alt={product.owner?.name as string}
            className="w-10 h-10 rounded-full bg-white"
          />
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
            {product.owner?.name}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4">
          <div className="p-3 sm:p-4 border rounded-lg bg-white dark:bg-gray-800 text-sm sm:text-base">
            Sold: {product.sold}
          </div>
          <div className="p-3 sm:p-4 border rounded-lg bg-white dark:bg-gray-800 text-sm sm:text-base">
            Rate: {product.rate ?? "Chưa có đánh giá"}
          </div>
        </div>
        
        <div className="flex justify-center align-bottom items-center mt-auto">
          <BuyNow idProduct={product.idProduct}></BuyNow>
        </div>
      </div>
    </div>
  );
};

