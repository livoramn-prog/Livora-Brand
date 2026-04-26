import { NextResponse } from "next/server";
import { getCourseBySlug } from "@/lib/data";
import { sendOrderEmails } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { courseSlug, customerName, customerEmail, customerPhone, bankUsed } = body;

    if (!courseSlug || !customerName || !customerEmail || !customerPhone) {
      return NextResponse.json(
        { error: "Шаардлагатай талбарууд дутуу байна" },
        { status: 400 }
      );
    }

    const course = getCourseBySlug(courseSlug);
    if (!course) {
      return NextResponse.json({ error: "Сургалт олдсонгүй" }, { status: 404 });
    }

    await sendOrderEmails({ course, customerName, customerEmail, customerPhone, bankUsed });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order email error:", error);
    return NextResponse.json(
      { error: "Имэйл илгээх үед алдаа гарлаа. Дараа дахин оролдоно уу." },
      { status: 500 }
    );
  }
}
