"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";

export type ActionResult = { ok: true } | { ok: false; error: string };

function revalidateAll() {
  // Бүх кеш цэвэрлэх — admin болон public хоёр тал шууд шинэчлэгдэнэ
  revalidatePath("/", "layout");
}

// ===== ORDERS =====

export async function updateOrderStatus(orderId: string, status: "pending" | "completed" | "cancelled") {
  const { error } = await supabaseAdmin.from("orders").update({ status }).eq("id", orderId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}

// ===== COURSES =====

export async function toggleCoursePublished(courseId: string, isPublished: boolean) {
  const { error } = await supabaseAdmin
    .from("courses")
    .update({ is_published: isPublished })
    .eq("id", courseId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/courses");
  revalidatePath("/courses");
}

export async function deleteCourse(courseId: string) {
  const { error } = await supabaseAdmin.from("courses").delete().eq("id", courseId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/courses");
  revalidatePath("/courses");
}

type UploadedFileInput = {
  name: string;
  type: string;
  sizeMb: number;
  url: string;
};

function parseFiles(raw: FormDataEntryValue | null): UploadedFileInput[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(String(raw));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function createCourse(formData: FormData): Promise<ActionResult> {
  try {
    const slug = String(formData.get("slug") || "").trim();
    const title = String(formData.get("title") || "").trim();
    if (!slug || !title) {
      return { ok: false, error: "Slug болон гарчиг заавал хэрэгтэй" };
    }

    const defaultStudents = Math.floor(Math.random() * 6) + 10;

    const data = {
      slug,
      title,
      short_description: String(formData.get("short_description") || ""),
      description: String(formData.get("description") || ""),
      category: String(formData.get("category") || "marketing"),
      price: Number(formData.get("price") || 0),
      cover_image: String(formData.get("cover_image") || ""),
      duration_minutes: Number(formData.get("duration_minutes") || 0),
      lessons: Number(formData.get("lessons") || 0),
      level: String(formData.get("level") || "Эхлэн"),
      instructor: String(formData.get("instructor") || "Livora Team"),
      students_count: defaultStudents,
      is_published: formData.get("is_published") === "on",
    };

    const { data: created, error } = await supabaseAdmin
      .from("courses")
      .insert(data)
      .select("id")
      .single();
    if (error) {
      console.error("createCourse insert error:", error);
      return { ok: false, error: "Хадгалах боломжгүй: " + error.message };
    }

    const files = parseFiles(formData.get("files"));
    if (files.length > 0 && created) {
      const fileRows = files.map((f) => ({
        course_id: created.id,
        name: f.name,
        type: f.type,
        size_mb: f.sizeMb,
        url: f.url,
      }));
      const { error: filesError } = await supabaseAdmin.from("course_files").insert(fileRows);
      if (filesError) console.error("Файл хадгалахад алдаа:", filesError);
    }

    revalidateAll();
    return { ok: true };
  } catch (e) {
    console.error("createCourse error:", e);
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Тодорхойгүй алдаа",
    };
  }
}

export async function updateCourse(
  courseId: string,
  formData: FormData
): Promise<ActionResult> {
  try {
    const data = {
      slug: String(formData.get("slug") || ""),
      title: String(formData.get("title") || ""),
      short_description: String(formData.get("short_description") || ""),
      description: String(formData.get("description") || ""),
      category: String(formData.get("category") || "marketing"),
      price: Number(formData.get("price") || 0),
      cover_image: String(formData.get("cover_image") || ""),
      duration_minutes: Number(formData.get("duration_minutes") || 0),
      lessons: Number(formData.get("lessons") || 0),
      level: String(formData.get("level") || "Эхлэн"),
      instructor: String(formData.get("instructor") || "Livora Team"),
      is_published: formData.get("is_published") === "on",
    };
    const { error } = await supabaseAdmin
      .from("courses")
      .update(data)
      .eq("id", courseId);
    if (error) {
      console.error("updateCourse error:", error);
      return { ok: false, error: "Хадгалах боломжгүй: " + error.message };
    }

    // Файлуудыг шинэчлэх — хуучнаа устгаад шинээр оруулна
    const files = parseFiles(formData.get("files"));
    await supabaseAdmin.from("course_files").delete().eq("course_id", courseId);
    if (files.length > 0) {
      const fileRows = files.map((f) => ({
        course_id: courseId,
        name: f.name,
        type: f.type,
        size_mb: f.sizeMb,
        url: f.url,
      }));
      const { error: filesError } = await supabaseAdmin
        .from("course_files")
        .insert(fileRows);
      if (filesError) console.error("Файл шинэчлэхэд алдаа:", filesError);
    }

    revalidateAll();
    return { ok: true };
  } catch (e) {
    console.error("updateCourse exception:", e);
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Тодорхойгүй алдаа",
    };
  }
}

// ===== ARTICLES =====

export async function deleteArticle(articleId: string) {
  const { error } = await supabaseAdmin.from("articles").delete().eq("id", articleId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/articles");
  revalidatePath("/articles");
}

export async function createArticle(formData: FormData): Promise<ActionResult> {
  try {
    const slug = String(formData.get("slug") || "").trim();
    const title = String(formData.get("title") || "").trim();
    if (!slug || !title) {
      return { ok: false, error: "Slug болон гарчиг заавал хэрэгтэй" };
    }

    const data = {
      slug,
      title,
      excerpt: String(formData.get("excerpt") || ""),
      content: String(formData.get("content") || ""),
      cover_image: String(formData.get("cover_image") || ""),
      category: String(formData.get("category") || "wellness"),
      read_minutes: Number(formData.get("read_minutes") || 5),
      author: String(formData.get("author") || "Livora Team"),
    };
    const { error } = await supabaseAdmin.from("articles").insert(data);
    if (error) {
      console.error("createArticle error:", error);
      return { ok: false, error: "Хадгалах боломжгүй: " + error.message };
    }
    revalidateAll();
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Тодорхойгүй алдаа",
    };
  }
}

export async function updateArticle(
  articleId: string,
  formData: FormData
): Promise<ActionResult> {
  try {
    const data = {
      slug: String(formData.get("slug") || ""),
      title: String(formData.get("title") || ""),
      excerpt: String(formData.get("excerpt") || ""),
      content: String(formData.get("content") || ""),
      cover_image: String(formData.get("cover_image") || ""),
      category: String(formData.get("category") || "wellness"),
      read_minutes: Number(formData.get("read_minutes") || 5),
      author: String(formData.get("author") || "Livora Team"),
    };
    const { error } = await supabaseAdmin
      .from("articles")
      .update(data)
      .eq("id", articleId);
    if (error) {
      console.error("updateArticle error:", error);
      return { ok: false, error: "Хадгалах боломжгүй: " + error.message };
    }
    revalidateAll();
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Тодорхойгүй алдаа",
    };
  }
}

// ===== BANKS =====

export async function toggleBankActive(bankId: string, isActive: boolean) {
  const { error } = await supabaseAdmin
    .from("bank_accounts")
    .update({ is_active: isActive })
    .eq("id", bankId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/banks");
}

export async function deleteBank(bankId: string) {
  const { error } = await supabaseAdmin.from("bank_accounts").delete().eq("id", bankId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/banks");
}

export async function createBank(formData: FormData): Promise<ActionResult> {
  try {
    const id = String(formData.get("id") || "").trim().toLowerCase();
    const bank_name = String(formData.get("bank_name") || "").trim();
    const account_number = String(formData.get("account_number") || "").trim();
    const account_holder = String(formData.get("account_holder") || "").trim();

    if (!id || !bank_name || !account_number || !account_holder) {
      return { ok: false, error: "Бүх талбарыг бөглөнө үү" };
    }

    const data = {
      id,
      bank_name,
      account_number,
      iban: String(formData.get("iban") || "") || null,
      account_holder,
      is_active: true,
      sort_order: Number(formData.get("sort_order") || 99),
    };
    const { error } = await supabaseAdmin.from("bank_accounts").insert(data);
    if (error) {
      console.error("createBank error:", error);
      return { ok: false, error: "Хадгалах боломжгүй: " + error.message };
    }
    revalidateAll();
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Тодорхойгүй алдаа",
    };
  }
}

export async function updateBank(
  bankId: string,
  formData: FormData
): Promise<ActionResult> {
  try {
    const data = {
      bank_name: String(formData.get("bank_name") || ""),
      account_number: String(formData.get("account_number") || ""),
      iban: String(formData.get("iban") || "") || null,
      account_holder: String(formData.get("account_holder") || ""),
      sort_order: Number(formData.get("sort_order") || 99),
    };
    const { error } = await supabaseAdmin
      .from("bank_accounts")
      .update(data)
      .eq("id", bankId);
    if (error) {
      console.error("updateBank error:", error);
      return { ok: false, error: "Хадгалах боломжгүй: " + error.message };
    }
    revalidateAll();
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Тодорхойгүй алдаа",
    };
  }
}
