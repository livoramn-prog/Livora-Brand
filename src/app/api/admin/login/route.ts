import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { user, pass } = await request.json();

    const expectedUser = process.env.ADMIN_USER ?? "admin";
    const expectedPass = process.env.ADMIN_PASSWORD ?? "livora2026";

    if (user !== expectedUser || pass !== expectedPass) {
      return NextResponse.json(
        { error: "Нэвтрэх нэр эсвэл нууц үг буруу байна" },
        { status: 401 }
      );
    }

    const token = Buffer.from(`${user}:${pass}`, "utf-8").toString("base64");
    const response = NextResponse.json({ success: true });

    response.cookies.set("livora_admin", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 хоног
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Алдаа гарлаа" }, { status: 500 });
  }
}
