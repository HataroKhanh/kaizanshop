import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div className="grid md:grid-cols-2 gap-12 md:items-center">
        {/* Text */}
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            Về trang <span className="text-blue-600">KaizanShop</span>
          </h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-400">
            Đây là nơi mọi người có thể bán và chia sẻ các công cụ của mình
            cho cộng đồng. Từ phần mềm, script, plugin đến tài nguyên học tập
            — tất cả đều có thể được giới thiệu tại đây.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              target="_blank"
              href="/login"
              className="py-3 px-6 inline-flex items-center justify-center gap-x-2 text-base font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
            >
              Bắt đầu
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>

            <Link
              href="/myproducts"
              className="py-3 px-6 inline-flex items-center justify-center gap-x-2 text-base font-medium rounded-lg border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 active:scale-95 transition-all shadow-sm"
            >
              Bán công cụ của tôi
            </Link>
          </div>
        </div>

        {/* Image */}
        <a href="https://github.com/HataroKhanh/Fly_With_Me" target="_blank">
          <div className="relative cursor-pointer">
            <div className="rounded-xl overflow-hidden shadow-lg ">
              <img
                src="/fly_with_me.png"
                alt="Hero"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-transparent rounded-xl"></div>
          </div>
        </a>
      </div>
    </section>
  );
};

