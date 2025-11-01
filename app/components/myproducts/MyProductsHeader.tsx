"use client";
import Link from "next/link";
import { CiSquarePlus } from "react-icons/ci";

export const MyProductsHeader = () => {
  return (
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
  );
};

