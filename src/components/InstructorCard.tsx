import { GraduationCap } from "lucide-react";

export function InstructorCard({ name }: { name: string }) {
  return (
    <section className="mt-16 border-t border-border pt-12">
      <p className="brand-wordmark text-xs uppercase text-muted-foreground">Багш</p>
      <h2 className="mt-2 text-3xl font-light">Хэн заах вэ?</h2>

      <div className="mt-6 flex flex-col gap-6 rounded-2xl border border-border bg-background p-6 sm:flex-row sm:items-start sm:p-8">
        <div
          className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-2xl font-medium text-white"
          style={{ background: "var(--brand)" }}
        >
          {name.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-medium">{name}</h3>
          <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
            Livora багийн гишүүн
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Олон жилийн практик туршлагатай мэргэжилтэн. Жинхэнэ амьдралын кейс, бэлэн шаблон,
            алхам алхмаар тайлбар бүхий сургалтаар Монголын хэрэглэгчдэд зориулж бэлдсэн.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <GraduationCap size={14} /> 5+ жилийн туршлага
            </span>
            <span>·</span>
            <span>Email-ээр асуулт хариулна</span>
          </div>
        </div>
      </div>
    </section>
  );
}
