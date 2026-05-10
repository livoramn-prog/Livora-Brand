// AI Master 30 сургалтын үнийг 99,000 болгох нэг удаагийн скрипт
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

const NEW_PRICE = 99000;

const { data, error } = await sb
  .from("courses")
  .update({ price: NEW_PRICE })
  .eq("slug", "ai-master-30")
  .select("title, price");

if (error) {
  console.error("❌ Алдаа:", error);
  process.exit(1);
}

console.log("✅ Шинэчилсэн сургалт:", data);
console.log(`   Шинэ үнэ: ${NEW_PRICE.toLocaleString()}₮`);
console.log(`   20% хямдрал → 79,000₮`);
