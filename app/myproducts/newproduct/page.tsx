"use client";
import Header from "@/app/components/Header";
import { formatPrice } from "@/utils/formatPrice";
import formatStringTitle from "@/utils/formatStringTitle";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";

export default function NewProductPage() {
  const router = useRouter();

  const [nameProduct, setNameProduct] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [mainImage, setMainImage] = useState<string>();
  const [listImage, setListImage] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [productFile, setProductFile] = useState<File | null>(null);
  const [percentProcess, setPercentProcess] = useState<number>(0);
  const [infoProcess, setInfoProcess] = useState<{
    className: string;
    text: string;
  }>({ className: "", text: "" });
  const [infoError, setInfoError] = useState<boolean>(false);

  useEffect(() => {
    if (percentProcess !== 0 && percentProcess < 100 && !infoError) {
      setInfoProcess({
        className: "text-[#ffc100]",
        text: "Vui lòng không đóng tab hay reload lại trang web!",
      });
    }
  }, [percentProcess]);

  const MAX_IMAGES = 3;

  function onchangeImg(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.currentTarget.files;
    if (!files?.length) return;
    setImageFiles(files);

    const picked = Array.from(files);
    setListImage((prev) => {
      const remaining = MAX_IMAGES - prev.length;
      if (remaining <= 0) return prev;

      const selected = picked
        .slice(0, remaining)
        .filter((f) => f.type.startsWith("image/"));

      const newUrls = selected.map((f) => URL.createObjectURL(f));
      const newListImage = [...prev, ...newUrls];
      setMainImage(newListImage[0] || "/fallback.png");
      return newListImage;
    });
  }

  function handleRemoveImage(url: string) {
    setListImage((prev) => {
      const next = prev.filter((item) => item !== url);

      setMainImage((cur) => {
        if (cur === url) {
          return next.length ? next[next.length - 1] : "/fallback.png";
        }

        return next.includes(cur ?? "")
          ? cur
          : next.length
          ? next[next.length - 1]
          : "/fallback.png";
      });

      return next;
    });

    URL.revokeObjectURL(url);
  }

  function handleSubmit() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/products/push_new_product");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        router.push("/myproducts");
      } else if (xhr.status == 409) {
        setInfoProcess({
          className: "text-[#ff4545]",
          text: "File này đã tồn tại trên hệ thống! Vui lòng liên hệ admin nếu bạn là chủ của file này",
        });
        setInfoError(true);
        setPercentProcess(0);
      } else {
        setInfoProcess({
          className: "text-[#ff4545]",
          text: `Upload thất bại. Lỗi: ${xhr.statusText || xhr.status}`,
        });
        setInfoError(true);
        setPercentProcess(0);
      }
    };

    xhr.onerror = () => {
      setInfoProcess({
        className: "text-[#ff4545]",
        text: "Lỗi mạng. Vui lòng kiểm tra kết nối và thử lại.",
      });
      setInfoError(true);
      setPercentProcess(0);
    };

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = (event.loaded / event.total) * 100;
        setPercentProcess(percent);
      }
    };

    const formData = new FormData();
    formData.append("name-product", nameProduct);
    formData.append("description-product", description);
    formData.append("price", price.toString());
    if (productFile) formData.append("file-product", productFile);
    if (imageFiles) {
      Array.from(imageFiles).map((item) => {
        formData.append("file-image", item);
      });
    }
    xhr.send(formData);
  }

  return (
    <>
      <Header />
      <section className="p-6 sm:p-10 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl sm:text-5xl font-semibold text-center sm:text-left text-white">
            Tạo sản phẩm mới
          </h1>

          {/* Layout responsive */}
          <div className="flex flex-col lg:flex-row gap-10 mt-6">
            {/* PREVIEW */}
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
                    listImage.map((item, i) => (
                      <div
                        key={i}
                        className={`relative w-20 aspect-square overflow-hidden rounded border cursor-pointer ${
                          item === mainImage
                            ? "ring-2 ring-blue-500"
                            : "border-gray-400"
                        }`}
                        onClick={() => setMainImage(item)}
                      >
                        <Image
                          src={item}
                          alt={`thumb-${i}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() => handleRemoveImage(item)}
                          className="absolute z-10 top-1 right-1 bg-black/50 p-1 rounded-full text-white"
                        >
                          <FaTrashAlt size={12} />
                        </button>
                      </div>
                    ))
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
            {/* FORM */}
            <form
              encType="multipart/form-data"
              action={handleSubmit}
              method="POST"
              className="flex-1 bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-100">
                Thông tin sản phẩm
              </h2>

              <div className="flex flex-col gap-6 w-full">
                {/* Tên sản phẩm */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name-product"
                    className="text-gray-300 font-medium"
                  >
                    Tên sản phẩm
                  </label>
                  <input
                    id="name-product"
                    type="text"
                    name="name-product"
                    placeholder="Nhập tên sản phẩm..."
                    className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-gray-100 placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setNameProduct(e.target.value)}
                    required
                  />
                </div>

                {/* Mô tả */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="description-product"
                    className="text-gray-300 font-medium"
                  >
                    Mô tả
                  </label>
                  <textarea
                    id="description-product"
                    name="description-product"
                    rows={3}
                    placeholder="Mô tả ngắn về sản phẩm..."
                    className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-gray-100 placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Giá */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="price" className="text-gray-300 font-medium">
                    Giá
                  </label>
                  <input
                    onChange={(e) => setPrice(Number(e.target.value))}
                    type="number"
                    name="price"
                    id="price"
                    className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-gray-100 placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Ảnh sản phẩm */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-300 font-medium">
                    Ảnh sản phẩm
                  </label>
                  <input
                    onChange={onchangeImg}
                    type="file"
                    name="file-image"
                    id="file-image"
                    multiple
                    accept="image/*"
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                    file:text-sm file:font-medium file:bg-blue-600 file:text-white
                    hover:file:bg-blue-700 transition-all duration-200 text-gray-100"
                  />
                  <p className="text-sm text-gray-400">*Hỗ trợ tối đa 3 ảnh</p>
                </div>

                {/* File tool */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-300 font-medium">File tool</label>
                  <input
                    required
                    onChange={(e) =>
                      setProductFile(e.target.files?.[0] || null)
                    }
                    type="file"
                    name="file-product"
                    id="file-product"
                    accept=".exe,.rar,.zip,.tar,.tar.gz"
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                    file:text-sm file:font-medium file:bg-blue-600 file:text-white
                    hover:file:bg-blue-700 transition-all duration-200 text-gray-100"
                  />
                  <p className="text-sm text-gray-400">
                    *Hỗ trợ file .exe .rar .zip .tar.gz
                  </p>
                </div>

                {/* Nút submit */}
                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all duration-200"
                  >
                    {infoError ? (
                      ":(("
                    ) : percentProcess === 0 ? (
                      "Tạo sản phẩm"
                    ) : percentProcess < 100 ? (
                      <p>
                        Đang tải lên: <span>{percentProcess.toFixed(2)}%</span>
                      </p>
                    ) : (
                      <p>
                        Đang tạo sản phẩm{" "}
                        <AiOutlineLoading className="animate-spin inline-block mx-auto" />
                      </p>
                    )}
                  </button>

                  <p className={`mt-2 text-center ${infoProcess.className}`}>
                    {infoProcess.text}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
