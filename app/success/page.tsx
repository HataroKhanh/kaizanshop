// app/success/page.tsx
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MdCheckCircle } from "react-icons/md"; // ← Dùng react-icons

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;

  // Nếu không có code → về trang chủ
  if (!code) {
    redirect("/");
  }

  // Tự động về trang chủ sau 10 giây
  const autoRedirect = () => {
    setTimeout(() => {
      window.location.href = "/";
    }, 10000);
  };

  return (
    <>
      <Header />

      <main className="flex-1 max-w-7xl mx-auto py-10 sm:py-20 px-4 text-center">
        <div className="max-w-md mx-auto">
          {/* Icon thành công */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <MdCheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-emerald-400 animate-pulse" />
          </div>

          {/* Tiêu đề */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-100 mb-4">
            Thanh toán thành công!
          </h1>

          {/* Mã giao dịch */}
          <div className="bg-gray-800 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 border border-gray-700">
            <p className="text-xs sm:text-sm text-gray-400">Mã giao dịch Sepay:</p>
            <p className="text-base sm:text-lg font-mono text-emerald-400 break-all">
              {code}
            </p>
          </div>

          {/* Thông báo */}
          <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
            Cảm ơn bạn đã ủng hộ!
            <span className="block mt-2 text-xs sm:text-sm text-yellow-400">
              Giao dịch đã được ghi nhận. Sẽ tự động về trang chủ sau 10 giây...
            </span>
          </p>

          {/* Nút hành động */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center">
            <Link
              href="/"
              className="inline-block w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition"
            >
              Về trang chủ
            </Link>

            <Link
              href="/donate"
              className="inline-block w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition"
            >
              Ủng hộ thêm
            </Link>
          </div>
        </div>
      </main>

      {/* Tự động redirect */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(${autoRedirect.toString()})()`,
        }}
      />
    </>
  );
}
