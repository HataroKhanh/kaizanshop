"use client";

import useSWR from "swr";
import Header from "../components/Header";
import { useState } from "react";
import { SePayWebhookPayload } from "@/types/sepay";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DonatePage() {
  const [page, setPage] = useState(0);
  const { data, isLoading, error } = useSWR<SePayWebhookPayload[]>(
    `/api/donate?page=${page}`,
    fetcher
  );

  if (isLoading) return <p className="text-center p-10">Loading...</p>;
  if (error || !data)
    return <p className="text-center p-10 text-red-600">Lỗi tải dữ liệu</p>;

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10">
        <section className="flex flex-col">
          <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 px-2">
            Cảm Ơn Mọi Người Đã Donate Cho Mình
          </h1>
        </section>

        <section className="space-y-3 sm:space-y-4">
          {data.length === 0 ? (
            <p className="text-center opacity-70 text-sm sm:text-base">Chưa có ai donate 😭</p>
          ) : (
            data.map((item, index) => (
              <div
                key={index}
                className="border p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-2"
              >
                <span className="font-medium text-sm sm:text-base break-words">{item.description}</span>
                <span className="font-bold text-sm sm:text-base whitespace-nowrap">{item.transferAmount}₫</span>
              </div>
            ))
          )}
        </section>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="px-4 py-2 text-sm sm:text-base border rounded disabled:opacity-40 w-full sm:w-auto"
          >
            Trang trước
          </button>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={data.length < 10}
            className="px-4 py-2 text-sm sm:text-base border rounded disabled:opacity-40 w-full sm:w-auto"
          >
            Trang sau
          </button>
        </div>
      </main>
    </>
  );
}
