"use client";

import { Product } from "@/utils/definitions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PaymentCardProps = {
  dataProduct: Product;
  code: string;
};

export default function   PaymentCard({ dataProduct, code }: PaymentCardProps) {
  const router = useRouter();
  const [qrUrl, setQrUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pay/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, price: dataProduct.price }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.qrUrl) setQrUrl(data.qrUrl);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [code, dataProduct.price]);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(async () => {
      // Hết hạn sau 5 phút
      if (Date.now() - startTime > 5 * 60 * 1000) {
        clearInterval(interval);
        router.replace("/");
        return;
      }

      try {
        const res = await fetch(`/api/pay/status?code=${code}`);
        const data = await res.json();

        if (data.status === "paid") {
          clearInterval(interval);
          router.replace(`/success?code=${code}`);
        }
        if (data.status === "expired") {
          clearInterval(interval);
          router.replace("/");
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [code, router]);

  return (
    <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-4 sm:p-6 lg:sticky lg:top-24">
      <h2 className="text-lg font-semibold mb-4 text-gray-100">Tổng cộng</h2>
      <div className="space-y-3 text-sm">
        <div className="flex flex-col items-center">
          {loading ? (
            <div className="w-full max-w-[250px] aspect-square bg-gray-700 animate-pulse rounded"></div>
          ) : qrUrl ? (
            <Image
              src={qrUrl}
              width={250}
              height={250}
              alt="QR Thanh toán"
              className="self-center border border-gray-600 rounded w-full max-w-[250px] h-auto"
            />
          ) : (
            <div className="text-red-400">Lỗi tạo QR</div>
          )}
        </div>

        <div className="border-t border-gray-600 pt-3 space-y-2">
          <div className="flex justify-between font-bold">
            <span className="text-gray-100">Thành tiền</span>
            <span className="text-xl text-emerald-400">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(dataProduct.price)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Người nhận:</span>
            <span>{dataProduct?.owner.name || "Anonymous"}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Mã GD:</span>
            <span className="font-mono">{code.slice(0, 12)}...</span>
          </div>

          <div className="text-xs text-yellow-400 mt-2">
            Đang chờ thanh toán... (Tối đa 5 phút)
          </div>

          <div className="text-xs text-gray-400 space-y-1">
            <p>QR đang thử nghiệm – Các bạn có thể quét qr ủng hộ mình</p>
            <p>
              Mình xin cảm ơn tại{" "}
              <Link href="/donate" className="text-blue-400 hover:underline">
                đây
              </Link>
            </p>
          </div>
        </div>
      </div>

      <button onClick={()=>window.open(`/api/products/download_product?id=${dataProduct.file.fileId}`)} className="mt-6 cursor-pointer w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-lg font-medium transition">
        Mua miễn phí
      </button>
      <Link href="/donate">
        <button className="mt-2 w-full cursor-pointer bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium transition">
          Ủng hộ tớ ❤️
        </button>
      </Link>
    </div>
  );
}