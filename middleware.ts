// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: Request & { headers: Headers }) {
  const url = new URL(req.url);
  const isProtected =
    url.pathname.startsWith("/dashboard") ||
    url.pathname.startsWith("/account");

  console.log(url);
  if (!isProtected) return NextResponse.next();

  const token = await getToken({
    req: req as any,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/account/:path*"],
};
