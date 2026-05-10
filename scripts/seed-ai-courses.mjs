// Хуучин сургалтуудыг устгаад AI-н 2 шинэ сургалтыг оруулж, PDF-үүдийг Storage-руу
// байршуулдаг нэг удаагийн скрипт.
//
// Ажиллуулах: node scripts/seed-ai-courses.mjs

import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

// .env.local-аас унших — секрет түлхүүрүүд GitHub-д орохгүй
import "dotenv/config";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET = process.env.SUPABASE_SECRET_KEY;

if (!SUPABASE_URL || !SUPABASE_SECRET) {
  console.error(
    "❌ SUPABASE_URL ба SUPABASE_SECRET_KEY-г .env.local дотор тохируулна уу."
  );
  process.exit(1);
}

const FREE_PDF = "C:/Users/Chinbat/Claude Cowork/AI-ERIN-UYED-KHOTSROKHGUI-FREE.pdf";
const PAID_PDF = "C:/Users/Chinbat/Claude Cowork/AI-MASTER-30-PAID.pdf";

const sb = createClient(SUPABASE_URL, SUPABASE_SECRET);

async function ensureBucket() {
  // Bucket байгаа эсэхийг шалгаад MIME хязгаарыг өргөтгөнө
  const { data: buckets } = await sb.storage.listBuckets();
  const exists = buckets?.find((b) => b.name === "uploads");
  if (!exists) {
    await sb.storage.createBucket("uploads", {
      public: true,
      fileSizeLimit: 50 * 1024 * 1024, // 500 MB
    });
  } else {
    // Хязгаарыг өргөтгөн шинэчилнэ (PDF, видео, Word, Excel, zip гэх мэт)
    const { error: updateErr } = await sb.storage.updateBucket("uploads", {
      public: true,
      fileSizeLimit: 50 * 1024 * 1024,
      allowedMimeTypes: [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
        "image/gif",
        "application/pdf",
        "video/mp4",
        "video/quicktime",
        "video/webm",
        "application/zip",
        "application/x-zip-compressed",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/octet-stream",
      ],
    });
    if (updateErr) console.error("Bucket update warning:", updateErr.message);
  }
}

const FREE_COURSE = {
  slug: "ai-erin-hocrohgui",
  title: "AI Эрин Үед Хоцрохгүй",
  short_description:
    "10 шидэт Prompt — ажлаа 2 дахин хурдан хийх 7 хоногийн үнэгүй гарын авлага.",
  description:
    "AI чиний ажлыг хийхгүй. Чи AI-аар ажлаа илүү сайн хийнэ. Энэ нь том ялгаа.\n\n12 хуудаст 10 ШИДЭТ PROMPT багтсан — өдөр бүр copy-paste хийгээд туршаад л үр дүн нь шууд харагдана.\n\nЯмар prompt-ууд багтаж байна вэ:\n- Имэйл бичих 30 секундэд\n- Уулзалтын тайлан 1 минутэд\n- Excel формула — VBA-гүй\n- 30 хоногийн контент 1 цагт\n- Илтгэлийн outline 2 минутэд\n- Англи хэлний орчуулга + товч\n- Асуудлын 3 шийдэл\n- Шинэ ур чадвар 30 хоногт\n- Социал медиа comment хариулт\n- Өдрийн review reflection\n\n7 хоногийн дараа чи өөрийгөө танихгүй байх болно.",
  category: "business",
  price: 0,
  cover_image:
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop",
  duration_minutes: 60,
  lessons: 10,
  level: "Эхлэн",
  instructor: "Livora Team",
  rating: 5.0,
  students_count: 0,
  is_published: true,
};

const PAID_COURSE = {
  slug: "ai-master-30",
  title: "AI Master 30",
  short_description:
    "30 хоногт AI-ийг өдөр тутамдаа жинхэнэ ашиглаж сурах систем — Ажилтан → AI зохион байгуулагч.",
  description:
    "AI эрин үед ажиллахгүй хоцрогдсон хүн болохоо болих 30 хоног.\n\n30 ХИЧЭЭЛ · 21 PROMPT БАНК · 4 ДОЛОО ХОНОГ\n\n4 долоо хоногт хуваагдсан системтэй сургалт. Долоо хоног бүр өмнөх дээрээ суурилна.\n\n**01. ҮНДЭС (Day 01-07)**\nAI-ийг 'хүн' шиг ярилцах урлаг. 6 алтан дүрмийг сурна. Хариултын чанар 4-5 дахин нэмэгдэнэ.\n\n**02. WORKFLOW (Day 08-14)**\nӨдөр тутмын ажлыг 50% хурдан болгох — имэйл, уулзалт, тайлан, Excel, илтгэл, судалгаа.\n\n**03. БҮТЭЭЛ (Day 15-21)**\nКонтент, дизайн, видео скриптийг AI-аар бүтээх. 30 өдрийн нийтлэлийг 1 цагт.\n\n**04. СИСТЕМ (Day 22-30)**\nТогтвортой ажлын урсгал бий болгох. Хэмжих, оновчтой болгох, өсгөх.\n\nЮу сурах вэ:\n- AI-д хэрхэн зөв 'ярих' (Role, Context, Examples, Goal, Limits, Critique)\n- Имэйлээ 30 минутэд цэгцэлж Inbox 0 болгох\n- Уулзалт болон тайланг 50% хурдан хийх\n- VBA-гүйгээр Excel автоматжуулах\n- 30 өдрийн контент 1 цагт төлөвлөх\n- Видео скрипт, дизайн санаа хурдан үүсгэх\n- Тогтвортой AI workflow тогтоож, өсгөх",
  category: "business",
  price: 199000,
  cover_image:
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop",
  duration_minutes: 600,
  lessons: 30,
  level: "Дунд",
  instructor: "Livora Team",
  rating: 5.0,
  students_count: 0,
  is_published: true,
};

async function uploadPdf(filePath, storagePath) {
  const buffer = fs.readFileSync(filePath);
  const sizeMb = Number((buffer.length / (1024 * 1024)).toFixed(2));

  // Шинэчлэгдэж болно — upsert: true
  const { error } = await sb.storage.from("uploads").upload(storagePath, buffer, {
    contentType: "application/pdf",
    cacheControl: "31536000",
    upsert: true,
  });
  if (error) throw error;

  const { data } = sb.storage.from("uploads").getPublicUrl(storagePath);
  return { url: data.publicUrl, sizeMb, name: path.basename(filePath) };
}

async function main() {
  console.log("1️⃣  Захиалгын course_id-г NULL болгож байна...");
  {
    const { error } = await sb
      .from("orders")
      .update({ course_id: null })
      .not("course_id", "is", null);
    if (error) {
      console.error("orders update warning:", error.message);
    }
  }

  console.log("2️⃣  Хуучин сургалтуудыг устгаж байна...");
  {
    const { error } = await sb.from("courses").delete().not("id", "is", null);
    if (error) throw error;
  }

  console.log("3️⃣  Storage bucket-ийг бэлдэж (бүх төрөл зөвшөөрөх)...");
  await ensureBucket();

  console.log("4️⃣  PDF-үүдийг Storage руу байршуулж байна...");
  const free = await uploadPdf(
    FREE_PDF,
    "courses/ai-erin-hocrohgui/AI-ERIN-UYED-KHOTSROKHGUI-FREE.pdf"
  );
  const paid = await uploadPdf(
    PAID_PDF,
    "courses/ai-master-30/AI-MASTER-30-PAID.pdf"
  );
  console.log("   ✓ FREE :", free.url);
  console.log("   ✓ PAID :", paid.url);

  console.log("4️⃣  2 шинэ сургалтыг оруулж байна...");
  const { data: created, error: insertError } = await sb
    .from("courses")
    .insert([FREE_COURSE, PAID_COURSE])
    .select("id, slug, title");
  if (insertError) throw insertError;
  console.log("   ✓ courses:", created);

  const freeRow = created.find((c) => c.slug === FREE_COURSE.slug);
  const paidRow = created.find((c) => c.slug === PAID_COURSE.slug);

  console.log("5️⃣  course_files-д PDF-үүдийг холбож байна...");
  const { error: fileError } = await sb.from("course_files").insert([
    {
      course_id: freeRow.id,
      name: "AI Эрин Үед Хоцрохгүй — 10 prompt.pdf",
      type: "pdf",
      size_mb: free.sizeMb,
      url: free.url,
    },
    {
      course_id: paidRow.id,
      name: "AI Master 30 — 30 хоногийн систем.pdf",
      type: "pdf",
      size_mb: paid.sizeMb,
      url: paid.url,
    },
  ]);
  if (fileError) throw fileError;

  console.log("\n✅ Бэлэн боллоо!");
  console.log("   FREE  :", `https://livora-brand-y569.vercel.app/courses/${FREE_COURSE.slug}`);
  console.log("   PAID  :", `https://livora-brand-y569.vercel.app/courses/${PAID_COURSE.slug}`);
}

main().catch((err) => {
  console.error("\n❌ Алдаа:", err.message || err);
  process.exit(1);
});
