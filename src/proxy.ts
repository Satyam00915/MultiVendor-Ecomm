import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const publicRoutes = [
    "/login",
    "/register",
    "/api/auth",
    "/favicon.ico",
    "/_next",
  ];

  if (publicRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const session = await auth();
  if (!session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * 1. /api (API routes) - remove this if you want middleware to protect API routes too
     * 2. /_next (Next.js internal static files and images)
     * 3. Static files with extensions (e.g. .svg, .png, .jpg, .css, .js, etc.)
     * 4. Metadata files (favicon.ico, sitemap.xml, robots.txt)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js)).*)",
  ],
};
