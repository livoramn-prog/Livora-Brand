import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import type { FileType } from "@/lib/types";

const BUCKET = "uploads";
// Supabase free tier нэг файл дээр 50MB хязгаартай. Үүнээс илүү файл upload
// хийхийн тулд Supabase Pro plan ($25/сар) шаардлагатай.
const MAX_BYTES = 50 * 1024 * 1024;

const TYPE_MAP: Record<string, FileType> = {
  "application/pdf": "pdf",
  "video/mp4": "video",
  "video/quicktime": "video",
  "video/webm": "video",
  "image/png": "png",
  "image/jpeg": "png",
  "image/jpg": "png",
  "image/webp": "png",
  "image/gif": "png",
  "application/zip": "zip",
  "application/x-zip-compressed": "zip",
  "application/msword": "docx",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/vnd.ms-excel": "xlsx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
};

function inferType(file: File): FileType {
  const fromMime = TYPE_MAP[file.type];
  if (fromMime) return fromMime;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (["mp4", "mov", "webm", "avi"].includes(ext)) return "video";
  if (ext === "pdf") return "pdf";
  if (["doc", "docx"].includes(ext)) return "docx";
  if (["xls", "xlsx"].includes(ext)) return "xlsx";
  if (["png", "jpg", "jpeg", "webp", "gif"].includes(ext)) return "png";
  if (ext === "zip") return "zip";
  return "pdf";
}

async function ensureBucket() {
  const { data: buckets } = await supabaseAdmin.storage.listBuckets();
  if (!buckets?.find((b) => b.name === BUCKET)) {
    await supabaseAdmin.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: MAX_BYTES,
    });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string | null) ?? "files";

    if (!file) {
      return NextResponse.json({ error: "Файл байхгүй" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Файлын хэмжээ 50MB-ээс хэтрэхгүй байх ёстой (Supabase Free plan)" },
        { status: 400 }
      );
    }

    await ensureBucket();

    const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
    const safeFolder = folder.replace(/[^a-z0-9-]/gi, "");
    const path = `${safeFolder}/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;

    const buffer = await file.arrayBuffer();

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(path, buffer, {
        contentType: file.type || "application/octet-stream",
        cacheControl: "31536000",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { error: "Файл байршуулахад алдаа: " + uploadError.message },
        { status: 500 }
      );
    }

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);

    return NextResponse.json({
      url: publicUrl,
      name: file.name,
      type: inferType(file),
      sizeMb: Number((file.size / (1024 * 1024)).toFixed(2)),
    });
  } catch (error) {
    console.error("Upload route error:", error);
    return NextResponse.json({ error: "Сервер дээр алдаа" }, { status: 500 });
  }
}
