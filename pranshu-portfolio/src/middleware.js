import { NextResponse } from "next/server";
import { LEGACY_ASSET_REDIRECTS } from "@/config/legacy-asset-redirects";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const target = LEGACY_ASSET_REDIRECTS[pathname];
  if (target) {
    return NextResponse.redirect(new URL(target, request.url), 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/images/:path*", "/resume.pdf"],
};
