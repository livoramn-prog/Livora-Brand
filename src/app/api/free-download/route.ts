import { NextResponse } from "next/server";
import { getCourseBySlug } from "@/lib/data";
import { sendFreeDownloadEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { courseSlug, customerEmail, customerPhone } = body;

    if (!courseSlug || !customerEmail || !customerPhone) {
      return NextResponse.json(
        { error: "Шаардлагатай талбарууд дутуу байна" },
        { status: 400 }
      );
    }

    const course = getCourseBySlug(courseSlug);
    if (!course) {
      return NextResponse.json({ error: "Сургалт олдсонгүй" }, { status: 404 });
    }

    await sendFreeDownloadEmail({ course, customerEmail, customerPhone });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Free download email error:", error);
    return NextResponse.json(
      { error: "Имэйл илгээх үед алдаа гарлаа. Дахин оролдоно уу." },
      { status: 500 }
    );
  }
}
