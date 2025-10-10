"use client";
import Link from "next/link";
import KaizanLogo from "./KaizanLogo";
import Cart from "../Cart/Cart";
export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-white/80 dark:bg-white dark:text-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <KaizanLogo className="h-8 w-8" />
          <span className="font-semibold tracking-wide">Kaizan</span>
        </Link>
        <nav className="hidden gap-6 text-sm md:flex">
          <Link href="#python" className="hover:text-sky-600 transition-colors">
            Python
          </Link>
          <Link
            href="#javascript"
            className="hover:text-sky-600 transition-colors"
          >
            JavaScript
          </Link>
          <Link href="#tools" className="hover:text-sky-600 transition-colors">
            Tools
          </Link>
        </nav>
        <div>
          <Cart ></Cart>
        </div>
      </div>
    </header>
  );
}
