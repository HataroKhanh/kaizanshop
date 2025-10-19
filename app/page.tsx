"use client";
import Header from "@/app/components/Header";
import CategoryMenu from "@/app/components/CategoryMenu";
import ShopCard from "@/app/components/ShopCard";
import ProductCard from "@/app/components/ProductCard";
import Footer from "@/app/components/Footer";
import { Badge } from "@/app/components/utils/Index";
import { useMemo, useState } from "react";
import MyComponent from "./components/Test";
import Loading from "./components/utils/Loading";

const SHOPS = [
  {
    id: "s1",
    name: "Kaizan Tech Store",
    avatar: "https://picsum.photos/seed/shop1/96/96",
    banner: "https://picsum.photos/seed/shop1b/1200/320",
    rating: 4.9,
    products: 128,
    isVerified: true,
  },
  {
    id: "s2",
    name: "Hataro Home",
    avatar: "https://picsum.photos/seed/shop2/96/96",
    banner: "https://picsum.photos/seed/shop2b/1200/320",
    rating: 4.7,
    products: 76,
  },
  {
    id: "s3",
    name: "ZenGarden Crafts",
    avatar: "https://picsum.photos/seed/shop3/96/96",
    banner: "https://picsum.photos/seed/shop3b/1200/320",
    rating: 4.8,
    products: 53,
    isVerified: true,
  },
] as const;

const PRODUCTS = Array.from({ length: 12 }).map((_, i) => ({
  id: `p${i + 1}`,
  title: [
    "Wireless Headphones",
    "Bamboo Coffee Cup",
    "Minimal Desk Lamp",
    "Cotton Hoodie",
    "Mechanical Keyboard",
    "Ceramic Vase",
  ][i % 6],
  price: [59, 12, 39, 28, 99, 22][i % 6],
  currency: "USD",
  image: `https://picsum.photos/seed/prod${i}/600/600`,
  shopId: SHOPS[i % SHOPS.length].id,
  rating: 4 + (i % 5) / 10,
  sold: 50 + i * 3,
  tags: ["popular", i % 2 ? "new" : "bestseller"],
}));


export default function MarketplaceHomePage() {
  const [sort, setSort] = useState("popular");

  const filtered = useMemo(() => {
    let arr = PRODUCTS;
    if (sort === "price-asc") arr = [...arr].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") arr = [...arr].sort((a, b) => b.price - a.price);
    if (sort === "rating")
      arr = [...arr].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return arr;
  }, [sort]);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-white text-black dark:bg-neutral-950 dark:text-white">
      {/* Background accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-15%] h-[50vh] w-[80vw] -translate-x-1/2 rounded-[100%] bg-gradient-to-r from-purple-300/40 via-cyan-300/40 to-emerald-300/40 blur-3xl dark:from-purple-500/20 dark:via-cyan-500/20 dark:to-emerald-500/20" />
        <div className="absolute bottom-[-25%] right-[-10%] h-[60vh] w-[40vw] rounded-[100%] bg-gradient-to-br from-fuchsia-200/50 to-sky-200/50 blur-3xl dark:from-fuchsia-400/20 dark:to-sky-400/20" />
      </div>
      <Header />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="col-span-2 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950">
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Marketplace nhiều người bán – tìm mọi thứ bạn cần
            </h1>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400 max-w-prose">
              Khám phá các shop uy tín, sản phẩm trending và khuyến mãi độc
              quyền.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>Miễn phí vận chuyển</Badge>
              <Badge>Đảm bảo hoàn tiền</Badge>
              <Badge>Thanh toán an toàn</Badge>
            </div>
            <div className="mt-6 flex gap-2">
              <a
                href="#featured"
                className="rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2 font-semibold"
              >
                Xem sản phẩm nổi bật
              </a>
              <a
                href="#become-seller"
                className="rounded-xl border border-neutral-300 dark:border-neutral-700 px-4 py-2 font-semibold"
              >
                Trở thành người bán
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/60 dark:bg-neutral-950/60 backdrop-blur">
            <h3 className="font-semibold">Danh mục hot</h3>
            <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
            </div>
          </div>
        </div>
      </section>

      {/* Featured shops */}
      <section
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10"
        id="shops"
      >
        <div className="flex items-end justify-between">
          <h2 className="text-xl sm:text-2xl font-bold">Shop nổi bật</h2>
          <a href="#/shops" className="text-sm hover:underline">
            Xem tất cả
          </a>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SHOPS.map((s) => (
            <ShopCard key={s.id} s={s} />
          ))}
        </div>
      </section>

      {/* Controls */}
      <section
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10"
        id="featured"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold">Sản phẩm nổi bật</h2>
          <div className="flex items-center gap-2">
            <select
              className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="popular">Phổ biến</option>
              <option value="rating">Đánh giá cao</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
            </select>
          </div>
        </div>

        {/* Product grid */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* Become a seller */}
      <section
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12"
        id="become-seller"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Bắt đầu bán hàng trên KaizanMarket
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400 max-w-prose">
              Đăng ký nhanh, quản lý kho dễ dàng, thanh toán linh hoạt. Nhận hỗ
              trợ ra mắt shop và quảng cáo nội sàn.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>• Phí thấp, rút tiền nhanh</li>
              <li>• Công cụ phân tích doanh thu</li>
              <li>• Hệ thống đánh giá minh bạch</li>
            </ul>
            <div className="mt-6 flex gap-2">
              <a
                className="rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2 font-semibold"
                href="#/seller/signup"
              >
                Đăng ký bán
              </a>
              <a
                className="rounded-xl border border-neutral-300 dark:border-neutral-700 px-4 py-2 font-semibold"
                href="#/seller/guide"
              >
                Xem hướng dẫn
              </a>
            </div>
          </div>
          <div className="order-1 lg:order-2 rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
            <img
              src="https://picsum.photos/seed/seller/1200/700"
              alt="Seller dashboard"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
