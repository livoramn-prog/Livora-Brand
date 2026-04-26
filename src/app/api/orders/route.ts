import { NextResponse } from "next/server";
import { getCourseBySlug } from "@/lib/data";
import { sendOrderEmails } from "@/lib/email";
import { supabaseAdmin } from "@/lib/supabase";

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

    const course = await getCourseBySlug(courseSlug);
    if (!course) {
      return NextResponse.json({ error: "Сургалт олдсонгүй" }, { status: 404 });
    }

    // 1. Insert order to Supabase
    const { error: dbError } = await supabaseAdmin.from("orders").insert({
      course_id: course.id,
      course_title: course.title,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      amount: course.price,
      bank_used: bankUsed ?? null,
      status: "pending",
    });
    if (dbError) {
      console.error("Order DB insert error:", dbError);
      // Continue to send email even if DB fails
    }

    // 2. Send notification + confirmation emails
    try {
      await sendOrderEmails({ course, customerName, customerEmail, customerPhone, bankUsed });
    } catch (emailError) {
      console.error("Order email error:", emailError);
      // Don't fail the request if email fails — order is already saved
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json(
      { error: "Захиалга бүртгэхэд алдаа гарлаа. Дараа дахин оролдоно уу." },
      { status: 500 }
    );
  }
}
