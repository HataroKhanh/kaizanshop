"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import ProfileAvatar from "./ProfileAvatar";
export default function Header() {
  const session = useSession();
  const sessionData = session.data;
  const sessionStatus = session.status;

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200/60 dark:border-neutral-800/60 backdrop-blur bg-white/70 dark:bg-neutral-950/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tight flex justify-around"
          >
            Kaizan<span className="text-purple-600">Market</span>
          </Link>

          {/* Nav menu */}
          <nav>
            <Link
              className="rounded-xl px-3 py-1.5 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900"
              href="/"
            >
              Trang chủ
            </Link>
            <Link
              className="rounded-xl px-3 py-1.5 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900"
              href="/shops"
            >
              Cửa hàng
            </Link>
            <Link
              className="rounded-xl px-3 py-1.5 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900"
              href="/about"
            >
              Về Kaizan
            </Link> 
          </nav>


          {/* Avatar */}
          {console.log(sessionStatus)
          }
          {sessionStatus === "authenticated" ? (
            <ProfileAvatar sessionData={sessionData}></ProfileAvatar>
          ) : (
            <nav className="hidden md:flex items-center gap-2">
              <Link
                className="rounded-xl px-3 py-1.5 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900"
                href="/login"
              >
                Đăng nhập
              </Link>
              <Link
                className="rounded-xl border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-sm font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-900"
                href="/signup"
              >
                Đăng ký
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
