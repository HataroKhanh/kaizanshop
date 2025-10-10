"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Gallery({ images }: { images: string[] }) {
  const safeImages = useMemo(
    () =>
      Array.isArray(images) && images.length
        ? images.filter(Boolean)
        : ["/placeholder.png"],
    [images]
  );
  const [main, setMain] = useState(safeImages[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Ảnh chính */}
      <div className="relative w-full aspect-square overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
        <Image
          src={main}
          alt="main"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 hover:scale-[1.03]"
          priority
        />
      </div>

      {/* Thumbnails */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={12}
        slidesPerView={4}
        navigation
        loop={safeImages.length > 4}
        className="w-full"
      >
        {safeImages.map((img) => (
          <SwiperSlide key={img}>
            <button
              onClick={() => setMain(img)}
              className={[
                "relative w-full aspect-square overflow-hidden rounded-xl",
                "border-2 transition-all duration-200",
                main === img
                  ? "border-blue-500 ring-2 ring-blue-300/50"
                  : "border-transparent hover:border-neutral-300 dark:hover:border-neutral-700",
              ].join(" ")}
              aria-label="Select image"
            >
              <Image
                src={img}
                alt="thumb"
                fill
                sizes="(max-width: 768px) 20vw, 10vw"
                className="object-cover"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
