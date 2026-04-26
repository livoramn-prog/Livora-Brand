export type CourseCategory = "marketing" | "business" | "instagram" | "wellness" | "mindset" | "lifestyle";

export type FileType = "video" | "pdf" | "docx" | "xlsx" | "png" | "zip";

export interface CourseFile {
  id: string;
  name: string;
  type: FileType;
  sizeMb: number;
  url: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: CourseCategory;
  price: number;
  coverImage: string;
  videoPreviewUrl?: string;
  durationMinutes: number;
  lessons: number;
  level: "Эхлэн" | "Дунд" | "Ахисан";
  instructor: string;
  files: CourseFile[];
  isPublished: boolean;
  createdAt: string;
  rating: number;
  studentsCount: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: "mental-health" | "wellness" | "motivation" | "business";
  publishedAt: string;
  readMinutes: number;
  author: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  iban?: string;
  accountHolder: string;
  logoEmoji: string;
}

export interface Order {
  id: string;
  courseId: string;
  courseTitle: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: number;
  status: "pending" | "completed" | "cancelled";
  bankAccountUsed?: string;
  createdAt: string;
}

export const CATEGORY_LABELS: Record<CourseCategory, string> = {
  marketing: "Дижитал маркетинг",
  business: "Бизнес",
  instagram: "Instagram",
  wellness: "Эрүүл мэнд",
  mindset: "Сэтгэл зүй",
  lifestyle: "Амьдралын хэв маяг",
};

export const ARTICLE_CATEGORY_LABELS = {
  "mental-health": "Сэтгэл зүй",
  wellness: "Эрүүл мэнд",
  motivation: "Урам зориг",
  business: "Бизнес",
} as const;
