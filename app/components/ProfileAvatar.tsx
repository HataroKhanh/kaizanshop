"use client";
import { Session } from "next-auth";
import { useState, useEffect, useRef } from "react";
import { signOut } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";
import { FaShoppingBag } from "react-icons/fa";

export default function ProfileAvatar({
  sessionData,
}: {
  sessionData: Session | null;
}) {
  const [openProfile, setOpenProfile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!sessionData) return null;

  return (
    <div className="relative " ref={menuRef}>
      {/* Nút avatar */}

      <button
        onClick={() => setOpenProfile(!openProfile)}
        className="flex items-center gap-3 focus:outline-none hover:opacity-90 transition "
      >
        <span className="text-sm font-medium">{sessionData.user?.name}</span>
        <Image
          src={`/${sessionData.user?.image!}`}
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full border border-neutral-300 dark:border-neutral-700 bg-white"
        />
      </button>

      {/* Menu thả xuống */}
      {openProfile && (
        <div className="absolute right-0 animate-fade-up animate-duration-100 mt-2 w-44 rounded-xl bg-white dark:bg-[#0d1117] shadow-lg border border-neutral-200 dark:border-neutral-700 z-50">
          <ul className="flex flex-col text-sm text-neutral-800 dark:text-neutral-200">
            <li className="">
              <Link
                href="/profile"
                className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                <CgProfile /> Hồ sơ
              </Link>
            </li>
            <li className="">
              <Link
                href="/myproducts"
                className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                <FaShoppingBag /> Sản phẩm của tôi
              </Link>
            </li>
            <li className="">
              <Link
                href="/profile"
                className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                <IoMdSettings /> Cài đặt
              </Link>
            </li>
            <li
              onClick={() => signOut()}
              className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 cursor-pointer"
            >
              <CiLogout /> Đăng xuất
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
