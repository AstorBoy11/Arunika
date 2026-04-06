import { auth } from "@/auth";
import { NextResponse } from "next/server";

const applySecurityHeaders = (response: NextResponse): NextResponse => {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return response;
};

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;
  const isLoggedIn = !!session;
  const role = session?.user?.role;

  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isUserRoute = nextUrl.pathname.startsWith("/user");
  const isAuthRoute = nextUrl.pathname.startsWith("/auth");

  if (isAuthRoute && isLoggedIn) {
    if (role === "admin") {
      return applySecurityHeaders(
        NextResponse.redirect(new URL("/admin/dashboard", nextUrl))
      );
    }
    return applySecurityHeaders(
      NextResponse.redirect(new URL("/user/dashboard", nextUrl))
    );
  }

  if ((isAdminRoute || isUserRoute) && !isLoggedIn) {
    return applySecurityHeaders(NextResponse.redirect(new URL("/auth", nextUrl)));
  }

  if (isAdminRoute && role !== "admin") {
    return applySecurityHeaders(
      NextResponse.redirect(new URL("/user/dashboard", nextUrl))
    );
  }

  return applySecurityHeaders(NextResponse.next());
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
