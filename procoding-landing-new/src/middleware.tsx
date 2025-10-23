import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "ru"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Skip static files and API routes
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.[^\/]+$/)
  ) {
    return NextResponse.next();
  }

  // ✅ If pathname already starts with a locale, continue as normal
  if (locales.some((locale) => pathname.startsWith(`/${locale}`))) {
    return NextResponse.next();
  }

  // ✅ Determine user's preferred language from headers
  const acceptLanguage = request.headers.get("accept-language");
  const preferredLocale = acceptLanguage?.startsWith("ru") ? "ru" : defaultLocale;

  // ✅ Redirect to preferred locale version of the path
  return NextResponse.redirect(
    new URL(`/${preferredLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|.*\\..*).*)"],
};