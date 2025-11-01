"use client";

import Header from "@/app/components/Header";
import EditableField from "@/app/components/EditableField";
import RemoveProduct from "@/app/components/RemoveProduct";
import { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Scrollbar, A11y } from "swiper/modules";
import { FaTrash } from "react-icons/fa";

export default function EditProductPage() {
  const { id } = useParams();

  const [dataProduct, setDataProduct] = useState<any>(null);
  const [listId, setListId] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [price, setPrice] = useState<string>(
    dataProduct?.price?.toString() || ""
  );

  useEffect(() => {
    fetch(`/api/products/get_self_product/?id=${id}`)
      .then((data) => data.json())
      .then((data) => {
        if (data && !data.error) {
          setDataProduct(data);
          setPrice(dataProduct?.price?.toString());

          setListId([
            data.file.fileId,
            ...Array.from(data.images)
              .map((item: any) => item.id)
              .filter((item) => item),
          ]);
        }
      })
      .catch((err) => {
        console.error("Lỗi fetch data:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const [nameProduct, setNameProduct] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [descriptionFull, setDescriptionFull] = useState<string>("");
  const [fileProduct, setFileProduct] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImageFiles((prev) => [...prev, ...newFiles]);
    }
    e.target.value = "";
  };

  useEffect(() => {
    const loadProductData = async () => {
      if (dataProduct) {
        setNameProduct(dataProduct.nameProduct || "");
        setDescription(dataProduct.description || "");
        setDescriptionFull(dataProduct.descriptionFull || "");
        setPrice(dataProduct.price || "");

        const Images = Array.from(dataProduct.images);

        if (Images && Images.length !== 0) {
          const dataImagesPromise = Images.map(async (item: any) => {
            try {
              const res = await fetch(`/api/image/get_image?id=${item.id}`);
              if (!res.ok) {
                console.error(`Failed to fetch image ${item.id}`);
                return null;
              }

              const blob = await res.blob();
              let filename = "image.jpg";

              const disposition = res.headers.get("Content-Disposition");
              if (disposition) {
                const filenameMatch = /filename="([^"]+)"/.exec(disposition);
                if (filenameMatch && filenameMatch[1]) {
                  filename = filenameMatch[1];
                }
              }

              const file = new File([blob], filename, {
                type: blob.type,
                lastModified: Date.now(),
              });

              return file;
            } catch (error) {
              console.error(`Lỗi khi tải ảnh ${item.id}:`, error);
              return null;
            }
          });

          const loadedImageFiles = await Promise.all(dataImagesPromise);
          setImageFiles(
            loadedImageFiles.filter((file): file is File => file !== null)
          );
        } else {
          setImageFiles([]);
        }
      }
    };

    loadProductData();
  }, [dataProduct]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isUploading) {
        e.preventDefault();
        e.returnValue = ""; // Bắt buộc với Chrome
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isUploading]);

  const handleRemoveImage = ({ url, name }: { url: string; name: string }) => {
    setImageFiles((prev) => {
      const index = prev.findIndex((item) => item.name === name);
      if (index === -1) return prev;
      const newArr = [...prev];
      newArr.splice(index, 1);
      return newArr;
    });

    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData();

    formData.append("options", "edit");
    formData.append("name-product", nameProduct);
    formData.append("description-product", description);
    formData.append("description-full-product", descriptionFull);
    formData.append("idProduct", id?.toString() || "");
    formData.append("price", price);

    imageFiles.forEach((item) => {
      formData.append("image-file", item);
    });

    if (fileProduct) {
      formData.append("file-product", fileProduct);
    }

    try {
      const res = await fetch("/api/products/update_self_product", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload");

      const data = await res.json();
      if (data.error) {
        return "fail data :()()()()()()";
      }
      console.log("ok data abcxyz adidaphat");
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
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

  if (!dataProduct) {
    return (
      <>
        <Header />
        <div className="p-8 text-center text-red-500">
          Lỗi hoặc không tìm thấy sản phẩm.
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="mx-auto max-w-3xl py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Chỉnh sửa sản phẩm
        </h1>

        <div className="text-end p-5">
          <RemoveProduct idProduct={id?.toString() || ""} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
        >
          <EditableField
            label="Tên sản phẩm"
            value={nameProduct}
            onChange={setNameProduct}
          />

          <hr className="dark:border-gray-700" />

          <EditableField
            label="Mô tả ngắn"
            value={description}
            onChange={setDescription}
            isTextArea={true}
          />

          <hr className="dark:border-gray-700" />

          <EditableField label="Giá" value={price} onChange={setPrice} />

          <hr className="dark:border-gray-700" />

          <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-600 p-6 flex flex-col md:flex-row gap-6">
            {/* Cột bên trái */}
            <div className="flex-1">
              <label
                htmlFor="file-image"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Thêm ảnh mới
              </label>
              <input
                type="file"
                accept="image/*"
                name="file-image"
                id="file-image"
                multiple
                onChange={handleAddImage}
                className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:text-gray-400 dark:file:bg-indigo-900 dark:file:text-indigo-300 dark:hover:file:bg-indigo-800"
              />
            </div>

            {/* Cột bên phải - Swiper */}
            <div className="flex-1 min-w-[250px]">
              <div className="w-full max-w-md mx-auto">
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  className="rounded-lg overflow-hidden"
                >
                  {imageFiles.map((item, index) => {
                    const url = URL.createObjectURL(item);
                    const name = item.name;
                    return (
                      <SwiperSlide key={index} className="relative z-20">
                        <img
                          src={url}
                          alt="Slide"
                          className="w-full h-64 object-cover z-0"
                        />
                        <button
                          onClick={() => handleRemoveImage({ url, name })}
                          className="absolute top-2 right-2 z-50"
                        >
                          <FaTrash className="text-[#4f39f6] text-2xl" />
                        </button>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-dashed border-gray-300 p-6 dark:border-gray-600">
            <label
              htmlFor="file-image"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Thay đổi file
            </label>
            <input
              type="file"
              accept=".exe,.rar,.zip,.tar,.tar.gz"
              name="file-product"
              id="file-product"
              onChange={(e) => setFileProduct(e.target.files?.[0] || null)}
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:text-gray-400 dark:file:bg-indigo-900 dark:file:text-indigo-300 dark:hover:file:bg-indigo-800"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
