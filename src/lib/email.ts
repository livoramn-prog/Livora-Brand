import nodemailer from "nodemailer";
import type { Course } from "./types";

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");

  if (!user || !pass) {
    throw new Error(
      "GMAIL_USER ба GMAIL_APP_PASSWORD-г .env.local дотор тохируулна уу."
    );
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

const FROM = `"Livora" <${process.env.GMAIL_USER ?? "livora.mn@gmail.com"}>`;
const ADMIN = process.env.ADMIN_EMAIL ?? process.env.GMAIL_USER ?? "livora.mn@gmail.com";

export async function sendOrderEmails(order: {
  course: Course;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bankUsed?: string;
}) {
  const transporter = getTransporter();
  const { course, customerName, customerEmail, customerPhone, bankUsed } = order;
  const amount = new Intl.NumberFormat("mn-MN").format(course.price);

  await transporter.sendMail({
    from: FROM,
    to: ADMIN,
    subject: `🛒 Шинэ захиалга — ${course.title}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px">
        <h2 style="margin:0 0 16px">Шинэ захиалга гарлаа</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px 0;color:#666">Сургалт</td><td><strong>${course.title}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#666">Үнэ</td><td><strong>${amount}₮</strong></td></tr>
          <tr><td style="padding:8px 0;color:#666">Нэр</td><td>${customerName}</td></tr>
          <tr><td style="padding:8px 0;color:#666">Email</td><td><a href="mailto:${customerEmail}">${customerEmail}</a></td></tr>
          <tr><td style="padding:8px 0;color:#666">Утас</td><td>${customerPhone}</td></tr>
          ${bankUsed ? `<tr><td style="padding:8px 0;color:#666">Банк</td><td>${bankUsed}</td></tr>` : ""}
        </table>
        <p style="margin-top:24px;color:#666;font-size:13px">
          Гүйлгээг шалгаад баталгаажуулсны дараа сургалтын файлыг хэрэглэгчид илгээнэ.
        </p>
      </div>
    `,
  });

  await transporter.sendMail({
    from: FROM,
    to: customerEmail,
    subject: `Захиалга хүлээн авлаа — ${course.title}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px">
        <h2 style="margin:0 0 16px">Сайн байна уу, ${customerName}!</h2>
        <p>Та <strong>${course.title}</strong> сургалтад хамрагдах хүсэлтээ илгээсэнд баярлалаа.</p>
        <p>Бид төлбөрийг шалгаад <strong>24 цагийн дотор</strong> энэ имэйл хаяг руу сургалтын материалыг илгээнэ.</p>
        <div style="background:#f5f5f5;border-radius:12px;padding:16px;margin:24px 0">
          <div style="color:#666;font-size:12px;text-transform:uppercase;letter-spacing:1px">Захиалгын мэдээлэл</div>
          <div style="margin-top:8px"><strong>${course.title}</strong></div>
          <div style="color:#666;font-size:14px">Үнэ: ${amount}₮</div>
        </div>
        <p style="color:#666;font-size:13px">Асуух зүйл байвал livora.mn@gmail.com хаяг руу бичээрэй.</p>
        <p style="margin-top:32px;color:#999;font-size:12px">— Livora багийнхан</p>
      </div>
    `,
  });
}

export async function sendFreeDownloadEmail(args: {
  course: Course;
  customerEmail: string;
  customerPhone: string;
}) {
  const transporter = getTransporter();
  const { course, customerEmail, customerPhone } = args;

  const filesHtml = course.files
    .map(
      (f) =>
        `<li style="margin:8px 0"><a href="${f.url}" style="color:#000">${f.name}</a> <span style="color:#999;font-size:12px">(${f.sizeMb} MB)</span></li>`
    )
    .join("");

  await transporter.sendMail({
    from: FROM,
    to: customerEmail,
    subject: `Үнэгүй татах — ${course.title}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px">
        <h2 style="margin:0 0 16px">Сайн байна уу!</h2>
        <p>Таны хүссэн <strong>${course.title}</strong> сургалт энд байна.</p>
        <ul style="padding-left:20px">${filesHtml}</ul>
        <p style="color:#666;font-size:13px;margin-top:24px">Анхааруулга: Линкүүд таны зөвхөн өөрийн хувийн хэрэглээнд зориулагдсан.</p>
        <p style="margin-top:32px;color:#999;font-size:12px">— Livora багийнхан</p>
      </div>
    `,
  });

  await transporter.sendMail({
    from: FROM,
    to: ADMIN,
    subject: `📥 Үнэгүй татаж авсан — ${course.title}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px">
        <h3>Шинэ хэрэглэгч үнэгүй сургалт татлаа</h3>
        <p>Сургалт: <strong>${course.title}</strong></p>
        <p>Email: ${customerEmail}</p>
        <p>Утас: ${customerPhone}</p>
      </div>
    `,
  });
}
