"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, A11y } from "swiper/modules";

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
      >
        {images.map((img: any) => (
          <SwiperSlide key={img.id}>
            <img
              src={`/api/image/get_image?id=${img.id}`}
              alt={img.name}
              className="w-full h-96 object-cover rounded-lg"
            />
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

