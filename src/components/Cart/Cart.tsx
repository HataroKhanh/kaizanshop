// CartButton.tsx
"use client";
import { CartType } from "@/utils/definitions";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Cart() {
  const [cartData, setCartData] = useState<CartType>({ count: 0, products: [] });

  useEffect(() => {
    const load = () => {
      try {
        const raw = sessionStorage.getItem("cart");
        const parsed = raw ? JSON.parse(raw) : { count: 0, products: [] };
        if (Array.isArray(parsed?.products)) setCartData(parsed);
        else setCartData({ count: 0, products: [] }); // guard định dạng
      } catch {
        setCartData({ count: 0, products: [] });
      }
    };

    // khởi tạo lần đầu
    if (!sessionStorage.getItem("cart")) {
      sessionStorage.setItem("cart", JSON.stringify({ count: 0, products: [] }));
    }
    load();

    // nghe cập nhật từ AddToCart
    const onUpdated = () => load();
    window.addEventListener("cart:updated", onUpdated);

    return () => window.removeEventListener("cart:updated", onUpdated);
  }, []);

  const cartCount = cartData.count;

  return (
    <button
      className="relative inline-flex items-center justify-center rounded-xl border border-transparent p-2 hover:bg-neutral-100"
      aria-label="Giỏ hàng"
    >
      <Link href="/cart">
        <ShoppingCart className="h-6 w-6" />

        {cartCount > 0 && (
          <span
            className="absolute -right-1 -top-1 min-w-5 h-5 px-1
                     rounded-full bg-blue-600 text-white text-xs
                     leading-5 text-center"
            aria-label={`${cartCount} sản phẩm trong giỏ`}
          >
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}

      </Link>
    </button>
  );
}
