"use client";

import { useState } from "react";
import { X, Check, Download } from "lucide-react";
import { Course } from "@/lib/types";

export function FreeDownloadModal({
  course,
  open,
  onClose,
}: {
  course: Course;
  open: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/free-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug: course.slug,
          customerEmail: email,
          customerPhone: phone,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Алдаа гарлаа");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Алдаа гарлаа");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-background p-8 shadow-2xl sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Хаах"
          className="absolute right-5 top-5 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-foreground text-background">
              <Check size={28} />
            </div>
            <h2 className="mt-6 text-2xl font-medium">Татаж эхэллээ</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
              Файлууд таны төхөөрөмж рүү татагдаж байна. Мөн email хаяг руу тань илгээгдсэн.
            </p>
            <div className="mt-6 space-y-2">
              {course.files.map((f) => (
                <a
                  key={f.id}
                  href={f.url}
                  download
                  className="flex items-center justify-between rounded-xl border border-border p-3 text-left text-sm transition-colors hover:bg-muted"
                >
                  <span className="truncate">{f.name}</span>
                  <Download size={14} />
                </a>
              ))}
            </div>
          </div>
        ) : (
          <>
            <p className="brand-wordmark text-xs uppercase text-muted-foreground">Үнэгүй татах</p>
            <h2 className="mt-2 text-xl font-medium leading-tight">{course.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Мэдээллээ оруулснаар та сургалтыг шууд татах боломжтой.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  required
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground">
                  Утас
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="99112233"
                  required
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
                />
              </div>

              {error && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs text-red-700">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm uppercase tracking-widest text-background transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                <Download size={16} /> {submitting ? "Илгээж байна..." : "Татаж авах"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
