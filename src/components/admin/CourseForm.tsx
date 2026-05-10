"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { Course } from "@/lib/types";
import { ImageUpload } from "./ImageUpload";
import { FilesUpload } from "./FilesUpload";
import type { ActionResult } from "@/app/admin/_actions";

const CATEGORIES = [
  { value: "marketing", label: "Дижитал маркетинг" },
  { value: "business", label: "Бизнес" },
  { value: "instagram", label: "Instagram" },
  { value: "wellness", label: "Эрүүл мэнд" },
  { value: "mindset", label: "Сэтгэл зүй" },
  { value: "lifestyle", label: "Амьдралын хэв маяг" },
];

const LEVELS = ["Эхлэн", "Дунд", "Ахисан"];

export function CourseForm({
  course,
  action,
  submitLabel = "Хадгалах",
  redirectTo = "/admin/courses",
}: {
  course?: Course;
  action: (formData: FormData) => Promise<ActionResult>;
  submitLabel?: string;
  redirectTo?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const handleSubmit = (formData: FormData) => {
    setMessage(null);
    startTransition(async () => {
      const result = await action(formData);
      if (result.ok) {
        setMessage({ ok: true, text: "✓ Амжилттай хадгалагдлаа" });
        // 800ms-ийн дараа жагсаалт руу буцна
        setTimeout(() => {
          router.push(redirectTo);
          router.refresh();
        }, 800);
      } else {
        setMessage({ ok: false, text: result.error });
      }
    });
  };

  return (
    <form action={handleSubmit} className="mt-8 max-w-3xl space-y-6">
      <Field label="Гарчиг *" name="title" defaultValue={course?.title} required />
      <Field
        label="URL slug *"
        name="slug"
        defaultValue={course?.slug}
        required
        hint="Жишээ: instagram-business-mastery (зайгүй, бяцхан үсэг)"
      />
      <Field
        label="Богино тайлбар"
        name="short_description"
        defaultValue={course?.shortDescription}
      />
      <TextArea
        label="Дэлгэрэнгүй тайлбар (Markdown)"
        name="description"
        defaultValue={course?.description}
        rows={10}
        hint="Claude эсвэл бусад AI-аас хуулсан Markdown текстийг шууд буулгаж болно. # Гарчиг, **тод**, - bullet, > ишлэл бүгд ажиллана."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select label="Чиглэл" name="category" options={CATEGORIES} defaultValue={course?.category} />
        <Select
          label="Түвшин"
          name="level"
          options={LEVELS.map((l) => ({ value: l, label: l }))}
          defaultValue={course?.level}
        />
        <Field
          label="Үнэ (₮)"
          name="price"
          type="number"
          defaultValue={course?.price?.toString() ?? "0"}
          hint="Үнэгүй бол 0"
        />
        <Field
          label="Хичээлийн тоо"
          name="lessons"
          type="number"
          defaultValue={course?.lessons?.toString() ?? "0"}
        />
        <Field
          label="Үргэлжлэх хугацаа (минут)"
          name="duration_minutes"
          type="number"
          defaultValue={course?.durationMinutes?.toString() ?? "0"}
        />
        <Field
          label="Багш"
          name="instructor"
          defaultValue={course?.instructor ?? "Livora Team"}
        />
      </div>

      <ImageUpload
        name="cover_image"
        defaultValue={course?.coverImage}
        folder="courses"
        label="Cover зураг"
        hint="Сайхан өндөр чанарын зураг сонгоорой (хамгийн ихдээ 50MB)"
      />

      <FilesUpload
        name="files"
        defaultValue={course?.files?.map((f) => ({
          name: f.name,
          type: f.type,
          sizeMb: f.sizeMb,
          url: f.url,
        }))}
        folder="course-files"
        label="Сургалтын файлууд"
      />

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="is_published"
          name="is_published"
          defaultChecked={course?.isPublished ?? true}
          className="h-4 w-4"
        />
        <label htmlFor="is_published" className="text-sm">
          Нийтлэх (хэрэглэгчдэд харагдах)
        </label>
      </div>

      {message && (
        <div
          className={`flex items-start gap-2 rounded-2xl px-4 py-3 text-sm ${
            message.ok
              ? "border border-green-200 bg-green-50 text-green-800"
              : "border border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.ok ? (
            <Check size={16} className="mt-0.5 shrink-0" />
          ) : (
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
          )}
          <p>{message.text}</p>
        </div>
      )}

      <div className="flex items-center gap-3 border-t border-border pt-6">
        <button
          type="submit"
          disabled={pending}
          className="ios-press inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-ios-md transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ background: "var(--brand)" }}
        >
          {pending && <Loader2 size={14} className="animate-spin" />}
          {pending ? "Хадгалж байна..." : submitLabel}
        </button>
        <Link
          href="/admin/courses"
          className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
        >
          Цуцлах
        </Link>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="mt-1.5 w-full rounded-2xl bg-muted px-4 py-3.5 text-base outline-none transition-all focus:bg-background-pure focus:shadow-ios-sm"
      />
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
  rows = 5,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        className="mt-1.5 w-full rounded-2xl bg-muted px-4 py-3.5 text-base outline-none transition-all focus:bg-background-pure focus:shadow-ios-sm"
      />
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Select({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <select
        name={name}
        defaultValue={defaultValue}
        className="mt-1.5 w-full rounded-2xl bg-muted px-4 py-3.5 text-base outline-none transition-all focus:bg-background-pure focus:shadow-ios-sm"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
