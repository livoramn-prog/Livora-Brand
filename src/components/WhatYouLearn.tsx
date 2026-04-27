import { Check } from "lucide-react";

export function WhatYouLearn({ description }: { description: string }) {
  // Тайлбараас "- xxx" эсвэл "* xxx" гэсэн мөрүүдийг олно
  const bullets = description
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("- ") || l.startsWith("* "))
    .map((l) => l.replace(/^[-*]\s+/, ""));

  if (bullets.length === 0) return null;

  return (
    <section className="mt-12 rounded-2xl bg-[var(--brand-bg)] p-6 sm:p-8">
      <p className="brand-wordmark text-xs uppercase text-muted-foreground">Та юу сурах вэ?</p>
      <h2 className="mt-2 text-2xl font-light">Сургалтаар олж авах ур чадвар</h2>

      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <span
              className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
              style={{ background: "var(--brand)" }}
            >
              <Check size={12} strokeWidth={3} />
            </span>
            <span className="leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
