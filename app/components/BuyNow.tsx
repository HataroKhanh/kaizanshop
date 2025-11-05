"use client";
import { useRouter } from "next/navigation";
export default function BuyNow({ idProduct }: { idProduct: string }) {
  const router = useRouter();
  const handleDownload = () => {
    router.push(`/checkout/${idProduct}`);
  };

  return (
    <div
      onClick={handleDownload}
      className="cursor-pointer w-full flex justify-center content-center bg-[#3e3df1] p-2 sm:p-3 rounded-[5px] hover:bg-blue-600"
    >
      <button className="text-sm sm:text-base">Mua Ngay</button>
    </div>
  );
}
