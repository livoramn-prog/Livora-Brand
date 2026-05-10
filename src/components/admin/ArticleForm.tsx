"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { Article } from "@/lib/types";
import { ImageUpload } from "./ImageUpload";
import type { ActionResult } from "@/app/admin/_actions";

const CATEGORIES = [
  { value: "mental-health", label: "Сэтгэл зүй" },
  { value: "wellness", label: "Эрүүл мэнд" },
  { value: "motivation", label: "Урам зориг" },
  { value: "business", label: "Бизнес" },
];

export function ArticleForm({
  article,
  action,
  submitLabel = "Хадгалах",
}: {
  article?: Article;
  action: (formData: FormData) => Promise<ActionResult>;
  submitLabel?: string;
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
        setTimeout(() => {
          router.push("/admin/articles");
          router.refresh();
        }, 800);
      } else {
        setMessage({ ok: false, text: result.error });
      }
    });
  };

  return (
    <form action={handleSubmit} className="mt-8 max-w-3xl space-y-6">
      <Field label="Гарчиг *" name="title" defaultValue={article?.title} required />
      <Field
        label="URL slug *"
        name="slug"
        defaultValue={article?.slug}
        required
        hint="Жишээ: stress-management (зайгүй, бяцхан үсэг)"
      />
      <TextArea label="Товч агуулга" name="excerpt" defaultValue={article?.excerpt} rows={3} />
      <TextArea
        label="Үндсэн агуулга"
        name="content"
        defaultValue={article?.content}
        rows={15}
        hint="**гарчиг** гэж бичвэл тод гарчиг болно. Шинэ мөр шууд ажиллана."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Чиглэл"
          name="category"
          options={CATEGORIES}
          defaultValue={article?.category}
        />
        <Field
          label="Унших цаг (минут)"
          name="read_minutes"
          type="number"
          defaultValue={article?.readMinutes?.toString() ?? "5"}
        />
        <Field label="Зохиогч" name="author" defaultValue={article?.author ?? "Livora Team"} />
      </div>

      <ImageUpload
        name="cover_image"
        defaultValue={article?.coverImage}
        folder="articles"
        label="Cover зураг"
        hint="Сайхан зураг сонгоорой (хамгийн ихдээ 50MB)"
      />

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
          href="/admin/articles"
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
