"use client";
import Header from "@/app/components/Header";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { useRouter } from "next/navigation";
import BuyNow from "@/app/components/BuyNow";
import { useState } from "react";
import { Session } from "inspector";

const fetcher = (url: string) =>
  fetch(url, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  }).then((res) => res.json());

export default function ProductPage() {
  const { id } = useParams();
  const session = useSession();
  const router = useRouter();
  const { data, error, isLoading } = useSWR(
    `/api/products/get_self_product?id=${id}`,
    fetcher
  );

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");

  const handleEdit = () => {
    router.push(`/myproducts/editproduct/${id}`);
  };

  const handleComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("options", "comment");
    formData.append("text", comment);
    formData.append("rate", rating.toString());
    formData.append("user", JSON.stringify(session.data?.user));
    formData.append("idProduct", id as string);

    fetch("/api/products/update_self_product", {
      method: "POST",
      headers: {
        Content_Type: "application/json",
      },
      body: formData,
    });
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          Đang tải dữ liệu...
        </div>
      </>
    );
  }

  if (error || data === undefined) {
    return (
      <>
        <Header />
        <div className="p-8 text-center text-red-500">Không thấy sản phẩm</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {session.data?.user.id !== data?.owner?.id ? null : (
          <div className="flex p-5 justify-end">
            <button
              onClick={() => handleEdit()}
              className="px-3 py-2 border rounded-[5px] hover:bg-blue-900 cursor-pointer"
            >
              Chỉnh sửa sản phẩm
            </button>
          </div>
        )}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left: ảnh sản phẩm */}
          <div>
            {data.images?.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination, A11y]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={20}
              >
                {data.images.map((img: any) => (
                  <SwiperSlide key={img.id}>
                    <img
                      src={`/api/image/get_image?id=${img.id}`}
                      alt={img.name}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg text-gray-500">
                Chưa có ảnh
              </div>
            )}
          </div>

          {/* Right: thông tin sản phẩm */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {data.nameProduct || "Chưa có tên"}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {data.description || "Chưa có mô tả"}
            </p>
            <p className="text-2xl font-semibold text-indigo-600">
              {data.price?.toLocaleString() || 0} đ
            </p>

            <div className="flex items-center gap-3 mt-4">
              <img
                src={data.owner?.image}
                alt={data.owner?.name}
                className="w-10 h-10 rounded-full"
              />
              <span className="text-gray-700 dark:text-gray-300">
                {data.owner?.name}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
                Sold: {data.sold}
              </div>
              <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
                Rate: {data.rate ?? "Chưa có đánh giá"}
              </div>
            </div>
            <div className="flex justify-center align-bottom items-center mt-auto">
              {" "}
              <BuyNow idProduct={data?.file?.fileId || ""}></BuyNow>
            </div>
          </div>
        </section>
        <section>
          <div className="mt-10 border-t border-gray-300 dark:border-gray-700 pt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Bình luận & Đánh giá
            </h2>

            {/* Hiển thị danh sách bình luận */}
            <div className="space-y-4 mb-6">
              {data?.comment?.length ? (
                data.comment.map((r: any, i: number) => (
                  <div
                    key={i}
                    className="p-4 border rounded-lg bg-white dark:bg-gray-800"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={r.user.image}
                        alt={r.user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {r.user.name}
                      </span>
                    </div>
                    <div className="flex items-center mb-1 text-yellow-400">
                      {"★".repeat(r.rate)}
                      {"☆".repeat(5 - r.rate)}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {r.text}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  Chưa có bình luận.
                </p>
              )}
            </div>

            {/* Form bình luận */}
            {session ? (
              <form className="space-y-3">
                <div className="flex gap-2 text-yellow-400 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <span
                      key={num}
                      onClick={() => setRating(num)}
                      className={
                        num <= rating ? "text-yellow-400" : "text-gray-400"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Viết bình luận của bạn..."
                  className="w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  onClick={(e) => handleComment(e)}
                >
                  Gửi
                </button>
              </form>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                Vui lòng đăng nhập để bình luận.
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
