import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "./lib/supabase/server";

const roleRoutes: Record<string, string[]> = {
  admin: ["/dashboard", "/barangay-official", "/custodian-of-record/resident"],
  Secretary: [
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
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  if (protectedRoutes.some((r) => pathname.startsWith(r)) && !user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (unprotectedRoutes.includes(pathname) && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (user) {
    const role = user.user_metadata?.role as string;

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
