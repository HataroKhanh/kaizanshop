// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: Request & { headers: Headers }) {
  const url = new URL(req.url);

  const token = await getToken({
    req: req as any,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token && url.pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/myproducts/:path*", "/profile", "/login"],
};
