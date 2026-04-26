import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const expectedUser = process.env.ADMIN_USER ?? "admin";
  const expectedPass = process.env.ADMIN_PASSWORD ?? "livora2026";

  const auth = request.headers.get("authorization");

  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = Buffer.from(encoded, "base64").toString("utf-8");
      const [user, pass] = decoded.split(":");
      if (user === expectedUser && pass === expectedPass) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Нэвтрэх шаардлагатай", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Livora Admin", charset="UTF-8"',
    },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
