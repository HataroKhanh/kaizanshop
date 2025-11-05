'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { FaTrash } from 'react-icons/fa';

interface ImageItem {
  id: string;
  name: string;
}

interface ProductImageGalleryProps {
  images: ImageItem[];
  onRemoveImage?: (image: ImageItem) => void;
}

export const ProductImageGallery = ({
  images,
  onRemoveImage,
}: ProductImageGalleryProps) => {
  if (!images?.length) {
    return (
      <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg text-gray-500">
        Chưa có ảnh
      </div>
    );
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={12}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      loop={false}
      autoHeight
      className="rounded-lg overflow-hidden max-w-full"
      breakpoints={{
        640: { slidesPerView: 1, spaceBetween: 12 },
        768: { slidesPerView: 1, spaceBetween: 16 },
        1024: { slidesPerView: 1, spaceBetween: 20 },
      }}
    >
      {images.map((img) => {
        const url = `/api/image/get_image?id=${img.id}`;
        const name = img.name;

        return (
          <SwiperSlide key={img.id} className="relative z-20">
            {/* === WRAPPER GIỚI HẠN CHIỀU RỘNG === */}
            <div className="w-full overflow-hidden rounded-lg">
              <img src={url} alt={name} className="w-full aspect-square object-cover" />
            </div>

            {onRemoveImage && (
              <button
                onClick={() => onRemoveImage(img)}
                className="absolute top-2 right-2 z-50 bg-white/90 backdrop-blur rounded-full p-1 shadow-md hover:bg-gray-100 sm:flex hidden"
              >
                <FaTrash className="text-[#4f39f6] text-xl" />
              </button>
            )}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
