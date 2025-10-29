"use client";

export default function BuyNow({ idProduct }: { idProduct: string }) {
  const handleDownload = async () => {
    window.open(`/api/products/download_product?id=${idProduct}`, "_blank");
  };

  return (
    <div
      onClick={handleDownload}
      className="cursor-pointer w-full flex justify-center content-center bg-[#3e3df1] p-3 rounded-[5px] hover:bg-blue-600"
    >
      <button>Mua Ngay</button>
    </div>
  );
}
