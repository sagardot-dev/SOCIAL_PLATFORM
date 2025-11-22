import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/auth";

const protectRoute = ["/profile", "/settings"];

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isProtected = protectRoute.some((route) => pathname.startsWith(route));
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session && isProtected) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/setting/:path*", "/:path*"],
};
