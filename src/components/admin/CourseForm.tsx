import Link from "next/link";
import { Course } from "@/lib/types";

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
}: {
  course?: Course;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel?: string;
}) {
  return (
    <form action={action} className="mt-8 max-w-3xl space-y-6">
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
        label="Дэлгэрэнгүй тайлбар"
        name="description"
        defaultValue={course?.description}
        rows={8}
        hint="Урт тайлбар. Шинэ мөр (\\n) ашиглах боломжтой."
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

      <Field
        label="Cover зурагны URL"
        name="cover_image"
        defaultValue={course?.coverImage}
        hint="https://images.unsplash.com/... гэх мэт"
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

      <div className="flex items-center gap-3 border-t border-border pt-6">
        <button
          type="submit"
          className="rounded-full bg-foreground px-6 py-3 text-xs uppercase tracking-widest text-background transition-opacity hover:opacity-90"
        >
          {submitLabel}
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
