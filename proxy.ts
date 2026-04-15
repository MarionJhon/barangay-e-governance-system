import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "./lib/supabase/server";
import { updateSession } from "./lib/supabase/proxy";

const roleRoutes: Record<string, string[]> = {
  admin: ["/dashboard", "/barangay-official", "/custodian-of-record/resident"],
  secretary: [
    "/dashboard",
    "/barangay-official",
    "/custodian-of-record/resident",
  ],
  resident: ["/dashboard"],
};

const protectedRoutes = ["/dashboard", "/custodian-of-record"];

const unprotectedRoutes = ["/", "/signin"];

export const proxy = async (request: NextRequest) => {
  const supabase = await createClient();

  const {
    data,
  } = await supabase.auth.getClaims();

  const user = data?.claims

  const { pathname } = request.nextUrl;

  if (protectedRoutes.some((r) => pathname.startsWith(r)) && !user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (unprotectedRoutes.includes(pathname) && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (user) {
    const role = String(user.app_metadata?.role ?? "resident").toLowerCase();

    const allowedAccess = roleRoutes[role] ?? [];

    const isAccessingRoleRoute = Object.values(roleRoutes)
      .flat()
      .some((r) => pathname.startsWith(r));

    if (
      isAccessingRoleRoute &&
      !allowedAccess.some((r) => pathname.startsWith(r))
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}