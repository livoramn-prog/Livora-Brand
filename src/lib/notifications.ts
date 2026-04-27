import "server-only";
import type { Course } from "./types";

/**
 * Захиалгын мэдэгдлийг Telegram bot-аар утсанд илгээнэ.
 * Үүний тулд:
 *   1. Telegram-аас @BotFather хайж бот үүсгэж BOT_TOKEN авна
 *   2. Өөрийн бот руугаа нэг удаа /start гэж бичнэ
 *   3. https://api.telegram.org/bot<TOKEN>/getUpdates -ыг нээж "chat":{"id":XXXXX} утгыг олно
 *   4. .env.local дотор TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID-ыг хадгална
 */
export async function sendTelegramOrderNotification(args: {
  course: Course;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bankUsed?: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    // Тохируулаагүй бол чимээгүй буцна (имэйл хэвээр явна)
    return;
  }

  const { course, customerName, customerEmail, customerPhone, bankUsed } = args;
  const amount = new Intl.NumberFormat("mn-MN").format(course.price);

  const text = [
    `🛒 *Шинэ захиалга*`,
    ``,
    `📚 *Сургалт:* ${course.title}`,
    `💰 *Үнэ:* ${amount}₮`,
    ``,
    `👤 *Нэр:* ${customerName}`,
    `📧 *Email:* ${customerEmail}`,
    `📱 *Утас:* ${customerPhone}`,
    bankUsed ? `🏦 *Банк:* ${bankUsed}` : "",
    ``,
    `Админд орж баталгаажуулна уу 👉`,
    `https://livora-brand-y569.vercel.app/admin/orders`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }),
    });
  } catch (err) {
    console.error("Telegram notification error:", err);
  }
}
