// Одоо байгаа сургалтуудын students_count-ыг 10-15 хооронд санамсаргүй болгоно
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

const { data: courses, error } = await sb
  .from("courses")
  .select("id, title, students_count");

if (error) {
  console.error("Алдаа:", error);
  process.exit(1);
}

console.log("Шинэчлэхээс өмнө:");
courses.forEach((c) => console.log(`  ${c.title}: ${c.students_count}`));

console.log("\nШинэчилж байна...");
for (const c of courses) {
  const n = Math.floor(Math.random() * 6) + 10; // 10-15
  await sb.from("courses").update({ students_count: n }).eq("id", c.id);
  console.log(`  ✓ ${c.title} → ${n} сурагч`);
}

console.log("\n✅ Бэлэн!");
