import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const BUCKET = "uploads";
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"];

async function ensureBucket() {
  const { data: buckets } = await supabaseAdmin.storage.listBuckets();
  if (!buckets?.find((b) => b.name === BUCKET)) {
    await supabaseAdmin.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: MAX_BYTES,
      allowedMimeTypes: ALLOWED_TYPES,
    });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string | null) ?? "covers";

    if (!file) {
      return NextResponse.json({ error: "Файл байхгүй байна" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Файлын хэмжээ 5MB-ээс хэтрэхгүй байх ёстой" },
        { status: 400 }
      );
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Зөвхөн PNG, JPG, WebP, GIF зөвшөөрөгдөнө" },
        { status: 400 }
      );
    }

    await ensureBucket();

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeFolder = folder.replace(/[^a-z0-9-]/gi, "");
    const fileName = `${safeFolder}/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(fileName, arrayBuffer, {
        contentType: file.type,
        cacheControl: "31536000",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { error: "Файл байршуулахад алдаа гарлаа: " + uploadError.message },
        { status: 500 }
      );
    }

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(fileName);

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error("Upload route error:", error);
    return NextResponse.json(
      { error: "Сервер дээр алдаа гарлаа" },
      { status: 500 }
    );
  }
}
