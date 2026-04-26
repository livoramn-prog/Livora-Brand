"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";

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

export async function createCourse(formData: FormData) {
  const slug = String(formData.get("slug") || "").trim();
  const title = String(formData.get("title") || "").trim();
  if (!slug || !title) throw new Error("slug болон title заавал хэрэгтэй");

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
    is_published: formData.get("is_published") === "on",
  };

  const { error } = await supabaseAdmin.from("courses").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  redirect("/admin/courses");
}

export async function updateCourse(courseId: string, formData: FormData) {
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
  const { error } = await supabaseAdmin.from("courses").update(data).eq("id", courseId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  redirect("/admin/courses");
}

// ===== ARTICLES =====

export async function deleteArticle(articleId: string) {
  const { error } = await supabaseAdmin.from("articles").delete().eq("id", articleId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/articles");
  revalidatePath("/articles");
}

export async function createArticle(formData: FormData) {
  const slug = String(formData.get("slug") || "").trim();
  const title = String(formData.get("title") || "").trim();
  if (!slug || !title) throw new Error("slug болон title заавал хэрэгтэй");

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
  if (error) throw new Error(error.message);
  revalidatePath("/admin/articles");
  revalidatePath("/articles");
  redirect("/admin/articles");
}

export async function updateArticle(articleId: string, formData: FormData) {
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
  const { error } = await supabaseAdmin.from("articles").update(data).eq("id", articleId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/articles");
  revalidatePath("/articles");
  redirect("/admin/articles");
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

export async function createBank(formData: FormData) {
  const id = String(formData.get("id") || "").trim().toLowerCase();
  const bank_name = String(formData.get("bank_name") || "").trim();
  const account_number = String(formData.get("account_number") || "").trim();
  const account_holder = String(formData.get("account_holder") || "").trim();

  if (!id || !bank_name || !account_number || !account_holder) {
    throw new Error("Бүх талбарыг бөглөнө үү");
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
  if (error) throw new Error(error.message);
  revalidatePath("/admin/banks");
  redirect("/admin/banks");
}

export async function updateBank(bankId: string, formData: FormData) {
  const data = {
    bank_name: String(formData.get("bank_name") || ""),
    account_number: String(formData.get("account_number") || ""),
    iban: String(formData.get("iban") || "") || null,
    account_holder: String(formData.get("account_holder") || ""),
    sort_order: Number(formData.get("sort_order") || 99),
  };
  const { error } = await supabaseAdmin.from("bank_accounts").update(data).eq("id", bankId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/banks");
  redirect("/admin/banks");
}
