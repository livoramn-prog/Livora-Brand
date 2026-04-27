import { Star } from "lucide-react";
import { Testimonial } from "@/lib/testimonials";

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border pt-12">
      <p className="brand-wordmark text-xs uppercase text-muted-foreground">Сэтгэгдэл</p>
      <h2 className="mt-2 text-3xl font-light">Манай сурагчид юу хэлдэг вэ?</h2>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map((t, i) => (
          <article
            key={i}
            className="rounded-2xl border border-border bg-background p-6 transition-shadow hover:shadow-sm"
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  size={14}
                  className={
                    idx < t.rating ? "fill-foreground text-foreground" : "text-muted-foreground"
                  }
                />
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground">&ldquo;{t.text}&rdquo;</p>
            <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
              <div
                className="inline-flex h-10 w-10 items-center justify-center rounded-full font-medium text-white"
                style={{ background: "var(--brand)" }}
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
