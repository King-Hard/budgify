// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./lib/configs/session";

const protectedRoutes = ["/admin", "/admin/dashboard", "/admin/add_budget", "/admin/bill_reminder", "/admin/goal_tracker"];
const authRoutes = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const pathname = request.nextUrl.pathname;

  // 1. Check if user is trying to access protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // 2. Check if user is trying to access auth route
  const isAuthRoute = authRoutes.includes(pathname);

  // 3. Verify session if it exists
  let isValidSession = false;
  if (session) {
    try {
      const decryptedSession = await decrypt(session);
      isValidSession = !!decryptedSession?.userId;
    } catch (error) {
      console.log("Invalid session:", error);
    }
  };

  // Scenario 1: User tries to access protected route without valid session
  if (isProtectedRoute && !isValidSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  };

  // Scenario 2: User tries to access auth route with valid session
  if (isAuthRoute && isValidSession) {
    return NextResponse.redirect(new URL("/admin", request.url));
  };

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};