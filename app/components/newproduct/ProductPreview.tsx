"use client";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import { formatPrice } from "@/utils/formatPrice";
import formatStringTitle from "@/utils/formatStringTitle";

interface ProductPreviewProps {
  nameProduct: string;
  description: string;
  price: number;
  mainImage: string;
  listImage: File[];
  onRemoveImage: ({ url, name }: { url: string; name: string }) => void;
  onSetMainImage: (url: string) => void;
}

export const ProductPreview = ({
  nameProduct,
  description,
  price,
  mainImage,
  listImage,
  onRemoveImage,
  onSetMainImage,
}: ProductPreviewProps) => {
  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-6">
        {/* Ảnh chính */}
        <div className="relative w-full max-w-sm aspect-square overflow-hidden rounded-xl border border-white/20">
          <Image
            src={mainImage || "/fallback.png"}
            alt="main image"
            width={400}
            height={400}
            className="object-cover bg-white"
          />
        </div>

        {/* Gallery nhỏ */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {listImage.length === 0 ? (
            <div className="relative w-20 aspect-square overflow-hidden rounded border border-gray-600">
              <Image
                src="/fallback.png"
                alt="thumb-fallback"
                fill
                className="object-cover bg-white"
              />
            </div>
          ) : (
            listImage.map((item, i) => {
              const url = URL.createObjectURL(item);
              const name = item.name;

              return (
                <div
                  key={i}
                  className={`relative w-20 aspect-square overflow-hidden rounded border cursor-pointer ${
                    url === mainImage
                      ? "ring-2 ring-blue-500"
                      : "border-gray-400"
                  }`}
                  onClick={() => {
                    onSetMainImage(url);
                  }}
                >
                  <Image
                    src={url}
                    alt={`thumb-${i}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => onRemoveImage({ url, name })}
                    className="absolute z-10 top-1 right-1 bg-black/50 p-1 rounded-full text-white"
                  >
                    <FaTrashAlt size={12} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Thông tin preview */}
      <div className="mt-4 text-gray-100 flex-col flex gap-2">
        <h2 className="text-2xl font-semibold mb-2">
          {nameProduct === ""
            ? "Tên sản phẩm"
            : formatStringTitle(nameProduct)}
        </h2>
        <p className="text-gray-400 mb-2">
          {description || "Mô tả ngắn: ..."}
        </p>
        <p className="text-sm text-gray-400">Số lượt bán: 0</p>
        <p className="text-2xl">Giá: {formatPrice(price)}</p>
      </div>
    </div>
  );
};

