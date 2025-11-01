import Link from "next/link";

export default function AboutCTA() {
  return (
    <section className="text-center">
      <div className="bg-purple-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Bắt đầu mua sắm ngay!</h2>
        <p className="mb-6 text-purple-100">
          Khám phá hàng ngàn sản phẩm chất lượng từ các cửa hàng uy tín
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shops"
            className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
          >
            Khám phá cửa hàng
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-purple-700 text-white rounded-xl font-semibold hover:bg-purple-800 transition-colors"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </section>
  );
}

