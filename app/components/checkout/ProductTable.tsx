import { Product } from "@/utils/definitions";
import Image from "next/image";


type ProductTableProps = {
  product: Product;
  mainImage: string;
};

export default function ProductTable({ product, mainImage }: ProductTableProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-hidden">
      {/* Mobile view */}
      <div className="block md:hidden p-4 space-y-4">
        <div className="flex gap-4">
          <div className="relative w-20 h-20 bg-gray-600 rounded-md overflow-hidden flex-shrink-0">
            {mainImage ? <Image
              src={mainImage}
              alt={product.nameProduct}
              fill
              className="object-cover"
              sizes="80px"
            /> : <Image
              src="/fallback-product.webp"
              alt={product.nameProduct}
              fill
              className="object-cover"
              sizes="80px"
            />}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-100 mb-2">{product.nameProduct}</h3>
            <p className="text-sm text-gray-300 line-clamp-2 mb-2">{product.description || "Không có mô tả"}</p>
            <p className="font-semibold text-gray-100">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.price)}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <table className="hidden md:table w-full text-sm sm:text-base">
        <thead className="bg-gray-700 border-b border-gray-600">
          <tr>
            <th className="text-left py-4 px-6 font-medium text-gray30100">Sản phẩm</th>
            <th className="text-left py-4 px-6 font-medium text-gray30100">Mô tả</th>
            <th className="text-left py-4 px-6 font-medium text-gray30100">Giá</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-600 hover:bg-gray-700 transition">
            <td className="py-6 px-6">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 bg-gray-600 rounded-md overflow-hidden flex-shrink-0">
                  {mainImage ? <Image
                    src={mainImage}
                    alt={product.nameProduct}
                    fill
                    className="object-cover"
                    sizes="80px"
                  /> : <Image
                    src="/fallback-product.webp"
                    alt={product.nameProduct}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />}
                </div>
                <span className="font-medium text-gray-100">{product.nameProduct}</span>
              </div>
            </td>
            <td className="py-6 px-6 text-gray-300 max-w-xs">
              <p className="line-clamp-2">{product.description || "Không có mô tả"}</p>
            </td>
            <td className="py-6 px-6 font-semibold text-gray-100">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.price)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}