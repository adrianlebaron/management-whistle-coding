import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authStore } from "../stores/auth_store/Store";

export default function middleware(req: NextRequest) {
  const isAuthenticated = authStore((state) => state.token);
  const protectedRoutes = ["/"];
  const dynamicProtectedRoutes = [/^\/posts\/.*/];
  const { pathname } = req.nextUrl;

  const isProtectedRoute = (route) => {
    if (protectedRoutes.includes(route)) {
      return true;
    }

    return dynamicProtectedRoutes.some(pattern => pattern.test(route));
  };

  if (!isAuthenticated && isProtectedRoute(pathname)) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}