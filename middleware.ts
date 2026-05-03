import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PROD_HOSTS = new Set(["bernebysolutions.de", "www.bernebysolutions.de"]);
const BLOCKED_TEST_ROUTES = [/^\/socials(?:\/|$|-)/i, /^\/visitenkarten-a4-vergleich(?:\/|$|-)/i];

function isStaticOrSystemPath(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/llms.txt"
  );
}

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  const hostname = request.nextUrl.hostname.toLowerCase();
  const pathname = request.nextUrl.pathname;

  if (!PROD_HOSTS.has(hostname) || isStaticOrSystemPath(pathname)) {
    return NextResponse.next();
  }

  const isBlockedRoute = BLOCKED_TEST_ROUTES.some((pattern) => pattern.test(pathname));
  if (isBlockedRoute) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};

