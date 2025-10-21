"use client";
import Header from "@/app/components/Header";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  ChangeEvent,
} from "react";

type EditableFieldProps = {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  isTextArea?: boolean;
};

function EditableField({
  label,
  value,
  onChange,
  isTextArea = false,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      // 1. THÊM p-4 VÀO ĐÂY ĐỂ KHỚP VỚI TRẠNG THÁI "XEM"
      <div className="relative p-4">
        <label
          htmlFor={label}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
        {isTextArea ? (
          <textarea
            id={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => setIsEditing(false)}
            autoFocus
            rows={5}
            // 2. ĐỔI FONT THÀNH text-base
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-base"
          />
        ) : (
          <input
            type="text"
            id={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => setIsEditing(false)}
            autoFocus
            // 2. ĐỔI FONT THÀNH text-base
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-base"
          />
        )}
      </div>
    );
  }

  // TRẠNG THÁI "XEM" (ĐÃ CÓ p-4 SẴN)
  return (
    <div
      onClick={() => setIsEditing(true)}
      title="Click để chỉnh sửa"
      className="group relative cursor-pointer rounded-lg border border-transparent p-4 transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      <span className="absolute right-4 top-4 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100">
        ✏️
      </span>
      <strong className="block text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </strong>
      <span
        style={{ whiteSpace: "pre-wrap" }}
        // Font này đã là text-base (khớp với input đã sửa)
        className="mt-1 block text-base text-gray-900 dark:text-white break-words"
      >
        {value || <span className="text-gray-400">(Trống)</span>}
      </span>
    </div>
  );
}

export default function EditProductPage() {
  const id = "68f6482331a9921d88b1a84f";

  const [dataProduct, setDataProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/get_self_product/?id=${id}`)
      .then((data) => data.json())
      .then((data) => {
        if (data && !data.error) {
          setDataProduct(data);
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
  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImageFiles((prev) => [...prev, ...newFiles]);
    }
  };

  useEffect(() => {
    if (dataProduct) {
      setNameProduct(dataProduct.nameProduct || "");
      setDescription(dataProduct.description || "");
      setDescriptionFull(dataProduct.descriptionFull || "");
    }
  }, [dataProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      nameProduct,
      description,
      descriptionFull,
    };
    console.log("Đang gửi data:", updatedData);
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

          <EditableField
            label="Mô tả đầy đủ"
            value={descriptionFull}
            onChange={setDescriptionFull}
            isTextArea={true}
          />

          <hr className="dark:border-gray-700" />

          <div className="rounded-lg border border-dashed border-gray-300 p-6 dark:border-gray-600">
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
          <div className="rounded-lg border border-dashed border-gray-300 p-6 dark:border-gray-600">
            <label
              htmlFor="file-image"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Thêm File Mới
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
              className="rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
