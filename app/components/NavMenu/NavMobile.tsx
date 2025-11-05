"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { navLinks, authLinks } from "./dataNavMenu";
import Link from "next/link";

export default function NavMobile() {
  const [openNav, setOpenNav] = useState(false);
  const { data: session, status } = useSession();

  const closeNav = () => setOpenNav(false);

  // Ngăn scroll khi mở menu
  useEffect(() => {
    if (openNav) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [openNav]);

  return (
    <>
      <div className="relative">
        {/* Nút toggle */}
        <button
          onClick={() => setOpenNav(!openNav)}
          className="text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {openNav ? <IoMdClose /> : <IoMdMenu />}
        </button>

        {/* Overlay + Menu */}
        {openNav && (
          <div
            className="fixed inset-0 z-50 flex justify-end"
            onClick={closeNav}
          >
            {/* Backdrop (nền mờ) */}
            <div className="absolute inset-0  bg-black/50" aria-hidden="true" />

            {/* Menu panel */}
            <div
              className="relative h-dvh z-10 w-80 max-w-full bg-black shadow-2xl animate-in slide-in-from-right duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <IoMdClose
                className="text-4xl absolute right-5 top-5"
                onClick={() => setOpenNav(false)}
              />
              <div className="p-6 pt-20">
                {" "}
                {/* pt-20 để tránh đè lên header nếu có */}
                <h2 className="text-xl font-semibold mb-6">Menu</h2>
                {/* Ví dụ: Danh sách navLinks */}
                <ul className="space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block text-lg hover:text-blue-600 transition"
                        onClick={closeNav}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                {/* Auth links nếu có session */}
                {status !== "authenticated" && (
                  <div className="absolute bottom-[50px]">
                    {authLinks.map((link, index) => (
                      <Link
                        key={link.href}
                        className={`rounded-xl px-3 py-1.5 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900 ${
                          index === 1
                            ? "border border-neutral-300 dark:border-neutral-700 font-semibold"
                            : ""
                        }`}
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
