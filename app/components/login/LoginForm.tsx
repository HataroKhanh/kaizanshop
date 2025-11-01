"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const mapError = (code?: string) => {
  switch (code) {
    case "CredentialsSignin":
      return "Sai email hoặc mật khẩu.";
    case "OAuthAccountNotLinked":
      return "Email này đã được dùng với nhà cung cấp khác. Hãy đăng nhập bằng provider đã dùng trước.";
    case "AccessDenied":
      return "Bạn không được phép đăng nhập.";
    case "OAuthCallback":
    case "OAuthCallbackError":
      return "Có lỗi khi xử lý với nhà cung cấp OAuth.";
    default:
      return "Đăng nhập thất bại. Vui lòng thử lại.";
  }
};

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const form = e.currentTarget as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const res = await signIn("credentials", { redirect: false, email, password });
    setLoading(false);

    if (res?.error) return alert(mapError(res.error));

    router.push("/");
    // ok
  }

  async function oauthLogin(provider: "google" | "github") {
    if (loading) return;
    setLoading(true);
    await signIn(provider, { redirect: false, callbackUrl: "/" });
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="mx-auto flex max-w-xl flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-semibold">Đăng nhập</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              {/* Label màu trung tính hơn cho 2 theme */}
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Mật khẩu
                </label>
                <Link
                  tabIndex={-1}
                  href="#"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-neutral-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          {/* Nút OAuth cân bằng light/dark, border rõ ràng */}
          <div className="mt-10 flex gap-3">
            <button
              onClick={() => oauthLogin("google")}
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-gray-50 disabled:opacity-60 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
            >
              <Image src="google.svg" alt="Google" height={20} width={20} />
              Google
            </button>

            <button
              onClick={() => oauthLogin("github")}
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-gray-50 disabled:opacity-60 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
            >
              <Image src="github.svg" alt="GitHub" height={20} width={20} />
              GitHub
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-gray-600 dark:text-gray-400">
            Chưa có tài khoản?{" "}
            <Link
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

