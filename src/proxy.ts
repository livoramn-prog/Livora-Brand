import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const expectedUser = process.env.ADMIN_USER ?? "admin";
  const expectedPass = process.env.ADMIN_PASSWORD ?? "livora2026";

  const cookie = request.cookies.get("livora_admin")?.value;

  if (cookie) {
    try {
      const decoded = Buffer.from(cookie, "base64").toString("utf-8");
      const [user, pass] = decoded.split(":");
      if (user === expectedUser && pass === expectedPass) {
        return NextResponse.next();
      }
    } catch {
      // invalid cookie, fall through to redirect
    }
  }

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
