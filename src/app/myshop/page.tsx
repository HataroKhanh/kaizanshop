"use client";

// =========================
// My Shop (static JSON demo)
// =========================
import { ProductType } from "@/utils/definitions";
import Header from "@/components/Header/Header";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Myshop() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR<ProductType[]>(
    "/api/product/get_list_product/1",
    fetcher
  );

  return (
    <>
      <Header />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-amber-50">
            My Shop
          </h1>
          <span className="text-xs text-slate-500 dark:text-amber-50">
            Demo dữ liệu tĩnh · Sẽ lưu vào MongoDB sau
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data ? (
            data.map((p) => {
              return <ProductCard key={p._id.toString()} data={p} />;
            })
          ) : (
            <div>khanh</div>
          )}
        </div>
      </section>
    </>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700 ring-1 ring-slate-200">
      {children}
    </span>
  );
}

function formatPrice(v: number) {
  // Simple VND formatter without Intl to keep it tree‑shakable
  const s = Math.round(v).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
}
