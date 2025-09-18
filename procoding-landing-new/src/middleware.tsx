import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "ru"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Skip API routes and static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.[^\/]+$/) // static assets with extensions like .svg, .png, .js
  ) {
    return NextResponse.next();
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}`)
  );

  if (pathnameIsMissingLocale) {
    const locale = request.headers.get("accept-language")?.startsWith("ru") ? "ru" : "en";
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|.*\\..*).*)"],
};