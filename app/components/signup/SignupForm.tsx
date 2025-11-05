"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ApiResult = { ok: boolean; message?: string };

export const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const form = new FormData(e.currentTarget);
      const name =
        (form.get("first-name") as string)?.trim() +
        " " +
        (form.get("last-name") as string)?.trim();
      const payload = {
        name: name,
        email: (form.get("email") as string)?.trim(),
        password: form.get("password") as string,
      };

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as ApiResult;

      if (!res.ok) {
        throw new Error(data?.message || `Đăng ký thất bại (HTTP ${res.status})`);
      }

      setSuccessMsg(data?.message || "Đăng ký thành công!");
      router.push("/login");
    } catch (err: any) {
      setErrorMsg(err?.message || "Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="flex flex-col justify-center px-6 py-12 lg:px-8 mx-auto max-w-xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-semibold">
            Đăng ký
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-5">
              <div className="flex-1 flex flex-col w-full">
                <label
                  htmlFor="first-name"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Họ
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  required
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-neutral-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
                />
              </div>
              <div className="flex-1 flex flex-col w-full">
                <label
                  htmlFor="last-name"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Tên
                </label>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  required
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-neutral-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-neutral-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Mật khẩu
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-neutral-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
                />
              </div>
            </div>

            {!!errorMsg && (
              <p className="text-sm text-red-500" role="alert">
                {errorMsg}
              </p>
            )}
            {!!successMsg && (
              <p className="text-sm text-emerald-500">{successMsg}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
            >
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-600 dark:text-gray-400">
            Đã có tài khoản?{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

