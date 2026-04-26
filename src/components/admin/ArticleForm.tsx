import Link from "next/link";
import { Article } from "@/lib/types";

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
  action: (formData: FormData) => void | Promise<void>;
  submitLabel?: string;
}) {
  return (
    <form action={action} className="mt-8 max-w-3xl space-y-6">
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

      <Field
        label="Cover зурагны URL"
        name="cover_image"
        defaultValue={article?.coverImage}
        hint="https://images.unsplash.com/... гэх мэт"
      />

      <div className="flex items-center gap-3 border-t border-border pt-6">
        <button
          type="submit"
          className="rounded-full bg-foreground px-6 py-3 text-xs uppercase tracking-widest text-background transition-opacity hover:opacity-90"
        >
          {submitLabel}
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
      <label className="block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
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
      <label className="block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
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
      <label className="block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <select
        name={name}
        defaultValue={defaultValue}
        className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
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
