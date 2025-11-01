"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RemoveProduct({
  idProduct,
}: {
  idProduct: string;
}) {
  const [checkRemoveProduct, setChangeRemoveProduct] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const router = useRouter();

  const handleRemoveProduct = () => {
    if (idProduct !== "") {
      setIsRemoving(true);
      const res = fetch("/api/products/remove_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: idProduct,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          if (data?.success) {
            router.push("/myproducts");
          }
        })
        .finally(() => setIsRemoving(false));
    }
  };

  return checkRemoveProduct ? (
    <div className="flex flex-row gap-8 justify-end">
      <button
        className="w-22 py-2 border rounded-[5px] hover:bg-red-500 cursor-pointer"
        onClick={() => setChangeRemoveProduct(false)}
      >
        Huỷ
      </button>

      {isRemoving ? (
        <button
          type="button"
          className="bg-indigo-500 text-white px-4 py-2 rounded flex items-center justify-center"
          disabled
        >
          <svg
            className="size-5 animate-spin stroke-white"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              d="M4 12a8 8 0 018-8"
              strokeWidth="4"
              strokeLinecap="round"
            ></path>
          </svg>
        </button>
      ) : (
        <button
          className="w-22 py-2 border rounded-[5px] hover:bg-green-500 cursor-pointer"
          onClick={handleRemoveProduct}
        >
          Tiếp tục
        </button>
      )}
    </div>
  ) : (
    <button
      onClick={() => setChangeRemoveProduct(true)}
      className="border px-3 py-2 rounded-[5px] cursor-pointer hover:bg-red-500 duration-200"
    >
      Xoá sản phẩm
    </button>
  );
}

