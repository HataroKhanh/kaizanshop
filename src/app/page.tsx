"use client";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800">
      {/* Header */}
      <Header></Header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Kaizan — <span className="text-sky-600">Personal Shop</span> & Dev Tools
            </h1>
            <p className="mt-4 max-w-prose text-slate-600">
              Bán hàng cá nhân & chia sẻ công cụ học/làm code. Mình là sinh viên năm nhất, hiện học HTML, CSS, JS cơ bản và Python; trang này được xây bằng Next.js + MongoDB.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
              <Badge>Freshman</Badge>
              <Badge>HTML/CSS/JS (basic)</Badge>
              <Badge>Python (basic)</Badge>
              <Badge variant="outline">Built with Next.js + MongoDB</Badge>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/myshop"
                className="rounded-xl bg-sky-600 px-4 py-2 text-white shadow hover:bg-sky-700 transition-colors"
              >
                Vào Shop
              </Link>
              <Link
                href="#about"
                className="rounded-xl border border-slate-200 px-4 py-2 text-slate-700 hover:border-slate-300"
              >
                Xem Giới Thiệu
              </Link>
            </div>
          </div>
          <div className="relative mx-auto flex h-52 w-full max-w-md items-center justify-center md:h-64">
            <div className="absolute inset-0 -z-10 animate-pulse rounded-3xl bg-sky-100/60 blur-2xl" />
            <KaizanLogo className="h-32 w-32 drop-shadow md:h-40 md:w-40" />
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" title="Về mình">
        <div className="prose prose-slate max-w-none">
          <p>
            Mình là <strong>Kaizan</strong> (Khanh) — sinh viên năm nhất mê code và tự học.
            Kiến thức hiện tại: HTML, CSS, JavaScript cơ bản và Python cơ bản. Trang web này mình tự làm bằng <strong>Next.js</strong> (App Router) và lưu dữ liệu trên <strong>MongoDB</strong>.
          </p>
          <p>
            Mục tiêu: xây các tool nhỏ hỗ trợ học tập/làm việc và đăng bán các sản phẩm số đơn giản (template, ghi chú, cheat‑sheet,...).
          </p>
        </div>
      </Section>

      {/* Shop */}
      <Section id="shop" title="Shop (Sản phẩm số)">
        <ProductGrid>
          <ProductCard
            title="Starter HTML/CSS Notes"
            price="49,000đ"
            description="Tài liệu ghi chú ngắn gọn cho người mới: box model, flex, grid, tips thực chiến."
            ctaHref="#"
          />
          <ProductCard
            title="JS Basics Cheat‑Sheets"
            price="59,000đ"
            description="Tổng hợp cú pháp, array methods, DOM quick refs + ví dụ ngắn."
            ctaHref="#"
          />
          <ProductCard
            title="Python Mini Toolkit"
            price="69,000đ"
            description="Snippet xử lý file, JSON, requests, CLI template để bắt đầu nhanh."
            ctaHref="#"
          />
        </ProductGrid>
      </Section>

      {/* Tools */}
      <Section id="tools" title="Tools mình recommend">
        <CardGrid>
          <Card title="Next.js" description="React framework hiện đại: App Router, RSC, edge." linkHref="https://nextjs.org/" />
          <Card title="Tailwind CSS" description="Utility‑first CSS: nhanh, chuẩn, dễ scale." linkHref="https://tailwindcss.com/" />
          <Card title="MongoDB" description="Document DB linh hoạt, dễ bắt đầu." linkHref="https://www.mongodb.com/" />
          <Card title="FastAPI (Python)" description="Viết API nhanh, type‑hints rõ ràng." linkHref="https://fastapi.tiangolo.com/" />
          <Card title="ESLint + Prettier" description="Lint & format tự động, code sạch." linkHref="https://eslint.org/" />
          <Card title="Docker" description="Môi trường nhất quán từ dev đến prod." linkHref="https://www.docker.com/" />
        </CardGrid>
      </Section>

      {/* Footer */}
      <Footer></Footer>
    </main>
  );
}

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

function ProductGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

function Card({
  title,
  description,
  linkHref,
}: {
  title: string;
  description: string;
  linkHref: string;
}) {
  return (
    <Link
      href={linkHref}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 h-8 w-8 shrink-0 rounded-xl bg-sky-50 p-1.5 ring-1 ring-sky-100">
          <SparkleIcon />
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900 group-hover:text-sky-700">
            {title}
          </h3>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
      </div>
    </Link>
  );
}

function ProductCard({
  title,
  price,
  description,
  ctaHref,
}: {
  title: string;
  price: string;
  description: string;
  ctaHref: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 shrink-0 rounded-xl bg-slate-100 ring-1 ring-slate-200" />
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-slate-900 group-hover:text-sky-700">{title}</h3>
            <span className="rounded-lg bg-sky-50 px-2 py-1 text-xs font-medium text-sky-700 ring-1 ring-sky-100">{price}</span>
          </div>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
          <div className="mt-3">
            <Link href={ctaHref} className="inline-block rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-700">
              Mua / Xem chi tiết
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ children, variant = "solid" }: { children: React.ReactNode; variant?: "solid" | "outline" }) {
  const base = "rounded-lg px-2.5 py-1 font-medium";
  const styles =
    variant === "solid"
      ? "bg-sky-50 text-sky-700 ring-1 ring-sky-100"
      : "border border-slate-200 text-slate-700";
  return <span className={`${base} text-xs ${styles}`}>{children}</span>;
}

function KaizanLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Kaizan logo"
    >
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <rect rx="14" width="64" height="64" fill="url(#g)" />
      <g transform="translate(12,12)">
        <path d="M12 0 L0 12 L6 12 L0 24 L6 24 L18 12 L12 12 L24 0 Z" fill="white" opacity="0.9" />
        <circle cx="32" cy="20" r="5" fill="white" opacity="0.9" />
      </g>
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-full w-full"
    >
      <path
        d="M12 2l2.2 4.6L19 9l-4.8 2.4L12 16l-2.2-4.6L5 9l4.8-2.4L12 2zm7 10l1.1 2.3L22 15l-1.9.7L19 18l-.7-1.9L16 15l2.3-1.1L19 12zM4 12l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z"
        fill="currentColor"
      />
    </svg>
  );
}
