import "server-only";
import { supabase, supabaseAdmin } from "./supabase";
import type { Article, BankAccount, Course, CourseFile, Order } from "./types";

// ===== Map DB rows (snake_case) → TS types (camelCase) =====

type CourseRow = {
  id: string;
  slug: string;
  title: string;
  short_description: string | null;
  description: string | null;
  category: string;
  price: number;
  cover_image: string | null;
  duration_minutes: number | null;
  lessons: number | null;
  level: string | null;
  instructor: string | null;
  rating: number | null;
  students_count: number | null;
  is_published: boolean;
  created_at: string;
  course_files?: CourseFileRow[];
};

type CourseFileRow = {
  id: string;
  course_id?: string;
  name: string;
  type: string;
  size_mb: number | null;
  url: string;
};

type ArticleRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  category: string | null;
  read_minutes: number | null;
  author: string | null;
  published_at: string;
};

type BankRow = {
  id: string;
  bank_name: string;
  account_number: string;
  iban: string | null;
  account_holder: string;
  is_active: boolean;
  sort_order: number;
};

type OrderRow = {
  id: string;
  course_id: string | null;
  course_title: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  amount: number;
  bank_used: string | null;
  status: string;
  created_at: string;
};

function mapFile(r: CourseFileRow): CourseFile {
  return {
    id: r.id,
    name: r.name,
    type: r.type as CourseFile["type"],
    sizeMb: Number(r.size_mb ?? 0),
    url: r.url,
  };
}

function mapCourse(r: CourseRow): Course {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    shortDescription: r.short_description ?? "",
    description: r.description ?? "",
    category: r.category as Course["category"],
    price: r.price,
    coverImage: r.cover_image ?? "",
    durationMinutes: r.duration_minutes ?? 0,
    lessons: r.lessons ?? 0,
    level: (r.level ?? "Эхлэн") as Course["level"],
    instructor: r.instructor ?? "Livora Team",
    files: (r.course_files ?? []).map(mapFile),
    isPublished: r.is_published,
    createdAt: r.created_at,
    rating: Number(r.rating ?? 5),
    studentsCount: r.students_count ?? 0,
  };
}

function mapArticle(r: ArticleRow): Article {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt ?? "",
    content: r.content ?? "",
    coverImage: r.cover_image ?? "",
    category: (r.category ?? "wellness") as Article["category"],
    publishedAt: r.published_at,
    readMinutes: r.read_minutes ?? 5,
    author: r.author ?? "Livora Team",
  };
}

function mapBank(r: BankRow): BankAccount {
  return {
    id: r.id,
    bankName: r.bank_name,
    accountNumber: r.account_number,
    iban: r.iban ?? undefined,
    accountHolder: r.account_holder,
    logoEmoji: "🏦",
  };
}

function mapOrder(r: OrderRow): Order {
  return {
    id: r.id,
    courseId: r.course_id ?? "",
    courseTitle: r.course_title ?? "",
    customerName: r.customer_name,
    customerEmail: r.customer_email,
    customerPhone: r.customer_phone,
    amount: r.amount,
    status: r.status as Order["status"],
    bankAccountUsed: r.bank_used ?? undefined,
    createdAt: r.created_at,
  };
}

// ===== Public reads =====

export async function getAllCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from("courses")
    .select("*, course_files(*)")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getAllCourses:", error);
    return [];
  }
  return (data as CourseRow[]).map(mapCourse);
}

export async function getPublishedCourses(): Promise<Course[]> {
  const all = await getAllCourses();
  return all.filter((c) => c.isPublished);
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  const { data, error } = await supabase
    .from("courses")
    .select("*, course_files(*)")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("getCourseBySlug:", error);
    return undefined;
  }
  return data ? mapCourse(data as CourseRow) : undefined;
}

export async function getFreeCourses(): Promise<Course[]> {
  const list = await getPublishedCourses();
  return list.filter((c) => c.price === 0);
}

export async function getPaidCourses(): Promise<Course[]> {
  const list = await getPublishedCourses();
  return list.filter((c) => c.price > 0);
}

export async function getFeaturedCourses(limit = 6): Promise<Course[]> {
  const list = await getPublishedCourses();
  return [...list].sort((a, b) => b.studentsCount - a.studentsCount).slice(0, limit);
}

export async function getAllArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) {
    console.error("getAllArticles:", error);
    return [];
  }
  return (data as ArticleRow[]).map(mapArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("getArticleBySlug:", error);
    return undefined;
  }
  return data ? mapArticle(data as ArticleRow) : undefined;
}

export async function getActiveBankAccounts(): Promise<BankAccount[]> {
  const { data, error } = await supabase
    .from("bank_accounts")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  if (error) {
    console.error("getActiveBankAccounts:", error);
    return [];
  }
  return (data as BankRow[]).map(mapBank);
}

// ===== Admin reads =====

export async function getAllOrders(): Promise<Order[]> {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getAllOrders:", error);
    return [];
  }
  return (data as OrderRow[]).map(mapOrder);
}

export async function getAllBankAccountsAdmin(): Promise<BankAccount[]> {
  const { data, error } = await supabaseAdmin
    .from("bank_accounts")
    .select("*")
    .order("sort_order");
  if (error) {
    console.error("getAllBankAccountsAdmin:", error);
    return [];
  }
  return (data as BankRow[]).map(mapBank);
}

export async function getAdminStats(): Promise<{
  totalRevenue: number;
  pendingOrders: number;
  totalCourses: number;
  totalStudents: number;
  weekGrowth: number;
}> {
  const [coursesRes, ordersRes] = await Promise.all([
    supabaseAdmin.from("courses").select("students_count"),
    supabaseAdmin.from("orders").select("amount, status, created_at"),
  ]);

  const courses = (coursesRes.data ?? []) as { students_count: number | null }[];
  const orders = (ordersRes.data ?? []) as {
    amount: number;
    status: string;
    created_at: string;
  }[];

  const totalRevenue = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.amount, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const totalCourses = courses.length;
  const totalStudents = courses.reduce((sum, c) => sum + (c.students_count ?? 0), 0);

  const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  const thisWeek = orders.filter(
    (o) => o.status === "completed" && now - new Date(o.created_at).getTime() < oneWeekMs
  ).length;
  const lastWeek = orders.filter((o) => {
    if (o.status !== "completed") return false;
    const t = now - new Date(o.created_at).getTime();
    return t >= oneWeekMs && t < oneWeekMs * 2;
  }).length;
  const weekGrowth =
    lastWeek === 0 ? (thisWeek > 0 ? 100 : 0) : Math.round(((thisWeek - lastWeek) / lastWeek) * 100);

  return { totalRevenue, pendingOrders, totalCourses, totalStudents, weekGrowth };
}

export async function getTopSellingCourse(): Promise<Course | null> {
  const list = await getAllCourses();
  if (list.length === 0) return null;
  return [...list].sort((a, b) => b.studentsCount - a.studentsCount)[0];
}
