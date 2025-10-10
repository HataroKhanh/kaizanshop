"use client";

import AddToCart from "@/components/Cart/Add-To-Cart";

export default function ProductClient({
  productName,
  description,
  price,
  category,
  author,
  productCart,
}: {
  productName: string;
  description: string;
  price: number;
  category: string[];
  author: string[];
  productCart: { name: string; price: number };
}) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
        {productName}
      </h1>

      <p className="text-base text-neutral-600 dark:text-neutral-300">
        {description}
      </p>

      <div className="flex items-center justify-between rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4">
        <span className="text-xl md:text-2xl font-bold">
          {price ? `${price.toLocaleString()} ₫` : "—"}
        </span>

        {/* Add to cart: logic sessionStorage đã đặt trong component client này */}
        <AddToCart product={productCart} quantity={1} />
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4">
        <h2 className="font-semibold mb-2">Thông tin thêm</h2>
        <ul className="list-disc pl-5 text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
          <li>Danh mục: {category.length ? category.join(", ") : "—"}</li>
          <li>Tác giả: {author.length ? author.join(", ") : "—"}</li>
        </ul>
      </div>
    </div>
  );
}
