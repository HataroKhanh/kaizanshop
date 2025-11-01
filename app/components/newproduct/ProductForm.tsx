"use client";
import { AiOutlineLoading } from "react-icons/ai";

interface ProductFormProps {
  nameProduct: string;
  description: string;
  price: number;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onPriceChange: (value: number) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  percentProcess: number;
  infoProcess: {
    className: string;
    text: string;
  };
  infoError: boolean;
}

export const ProductForm = ({
  nameProduct,
  description,
  price,
  onNameChange,
  onDescriptionChange,
  onPriceChange,
  onImageChange,
  onFileChange,
  onSubmit,
  percentProcess,
  infoProcess,
  infoError,
}: ProductFormProps) => {
  return (
    <form
      action={onSubmit}
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
            onChange={(e) => onNameChange(e.target.value)}
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
            onChange={(e) => onDescriptionChange(e.target.value)}
          />
        </div>

        {/* Giá */}
        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="text-gray-300 font-medium">
            Giá
          </label>
          <input
            onChange={(e) => onPriceChange(Number(e.target.value))}
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
            onChange={onImageChange}
            type="file"
            name="file-image"
            id="file-image"
            multiple
            accept="image/*"
            className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
            file:text-sm file:font-medium file:bg-blue-600 file:text-white
            hover:file:bg-blue-700 transition-all duration-200 text-gray-100"
          />
        </div>

        {/* File tool */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-300 font-medium">File tool</label>
          <input
            required
            onChange={onFileChange}
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
          <p className="text-sm text-gray-400">
            *Giới hạn 200mb
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
  );
};

