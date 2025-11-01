"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, A11y } from "swiper/modules";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: { id: string; name: string }[];
}

export const ProductImageGallery = ({ images }: ProductImageGalleryProps) => {
  if (images?.length > 0) {
    return (
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView="auto"
        loop={false}
        className="p-10"
      >
        {images.map((img: any) => (
          // 1. Chỉ giữ lại flex-shrink-0 trên SwiperSlide
          // 2. Thêm "key" prop là bắt buộc khi dùng .map()
          <SwiperSlide key={img.id} className="flex-shrink-0">
            {/* 3. Tạo một div bọc bên trong để chứa styling */}
            <div className="relative aspect-[1/1] overflow-hidden rounded-lg">
              <Image
                src={`/api/image/get_image?id=${img.id}`}
                alt={img.name}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return (
    <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg text-gray-500">
      Chưa có ảnh
    </div>
  );
};