"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CartItemType, CartType, ProductInputType } from "@/utils/definitions"

export default function AddToCart({
  product,
  quantity = 1,
}: {
  product: ProductInputType;
  quantity?: number;
}) {
  const router = useRouter();

  const [data, setData] = useState<CartType>({ count: 0, products: [] });

  useEffect(() => {
    const data = sessionStorage.getItem("cart");
    const dataParse = data ? JSON.parse(data) : { count: 0, product: [] };

    setData(dataParse);
  }, []);

  function handleAdd() {
    const newCount = data.count + quantity;
    const newProducts = [...data.products]

    const index = newProducts.findIndex((p) => p.name === product.name);

    if (index >= 0) {
      newProducts[index].quantity += quantity;
    } else {
      newProducts.push({ ...product, quantity });
    }
    const dataNew: CartType = { count: newCount, products: newProducts };

    setData(dataNew);

    sessionStorage.setItem("cart", JSON.stringify(dataNew));

    window.dispatchEvent(new CustomEvent("cart:updated"));
  }

  return (
    <button
      onClick={() =>
        handleAdd()
      }
      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 active:scale-[.97]"
    >
      Add to cart
    </button>
  );
}
