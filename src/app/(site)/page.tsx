import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { CourseCard } from "@/components/CourseCard";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticles, getFeaturedCourses, getFreeCourses } from "@/lib/data";

export default async function HomePage() {
  const [featured, free, allArticles] = await Promise.all([
    getFeaturedCourses(6),
    getFreeCourses(),
    getAllArticles(),
  ]);
  const latestArticles = allArticles.slice(0, 3);
  const freeTop = free.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Анимэйшнтай gradient background */}
        <div className="hero-gradient absolute inset-0 -z-10 opacity-70" />
        {/* Хөвөгч цэцэг өнгөт орбит */}
        <div
          className="hero-orb"
          style={{
            top: "-15%",
            right: "-10%",
            width: "55%",
            height: "55%",
            background: "var(--brand)",
            animation: "hero-orb-1 16s ease-in-out infinite",
          }}
        />
        <div
          className="hero-orb"
          style={{
            bottom: "-20%",
            left: "-15%",
            width: "60%",
            height: "60%",
            background: "var(--warm)",
            animation: "hero-orb-2 22s ease-in-out infinite",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="hero-parallax max-w-3xl fade-up">
            <p className="brand-wordmark text-xs uppercase text-muted-foreground">
              Live · Inspire · Vision · Organize · Rise · Achieve
            </p>
            <h1 className="mt-6 text-5xl font-light leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Дижитал чадвар.
              <br />
              Эрүүл сэтгэл.
              <br />
              <span className="italic" style={{ color: "var(--brand)" }}>Шинэ Чи.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Монгол хэл дээрх премиум сургалтууд — Instagram бизнесээс сэтгэлийн тэнцвэр хүртэл.
              Бэлэн материал, видео, шаблонтой. Шууд эхлээд, шууд хэрэглэнэ.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm uppercase tracking-widest text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--brand)" }}
              >
                Сургалтуудыг үзэх <ArrowRight size={16} />
              </Link>
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm uppercase tracking-widest text-foreground transition-colors hover:bg-muted"
              >
                Нийтлэл унших
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-4">
              <Stat value="8" label="Сургалт" />
              <Stat value="6" label="Чиглэл" />
              <Stat value="100%" label="Монгол хэл" />
              <Stat value="24ч" label="Email хариу" />
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px bg-border md:grid-cols-3">
          <ValueProp
            icon={<Sparkles size={20} />}
            title="Системчилсэн"
            description="Эхлэгчээс эхлээд мэргэжлийн түвшинд хүртэл алхам алхмаар."
          />
          <ValueProp
            icon={<ShieldCheck size={20} />}
            title="Батлагдсан"
            description="Шинжлэх ухаан, реал case study-д тулгуурласан агуулга."
          />
          <ValueProp
            icon={<Zap size={20} />}
            title="Шууд хэрэглэх"
            description="Видео, PDF, template — бэлэн материалаар шууд ажиллана."
          />
        </div>
      </section>

      {/* Featured courses */}
      <Section
        eyebrow="Premium сургалтууд"
        title="Хамгийн их сонгогдсон"
        action={{ href: "/courses", label: "Бүгдийг үзэх" }}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </Section>

      {/* Free courses */}
      <Section
        eyebrow="Үнэгүй контент"
        title="Эхлэхдээ үнэгүй"
        description="Шууд татаад хэрэглэхэд бэлэн гарын авлага, template, challenge-ууд."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {freeTop.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </Section>

      {/* Articles */}
      <Section
        eyebrow="Блог"
        title="Сүүлийн нийтлэлүүд"
        action={{ href: "/articles", label: "Бүгдийг унших" }}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="overflow-hidden rounded-3xl px-8 py-20 text-center text-white sm:px-16"
          style={{ background: "var(--brand)" }}
        >
          <p className="brand-wordmark text-xs uppercase opacity-70">Livora</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-light leading-tight sm:text-5xl">
            Өөрчлөлт өнөөдөр л эхэлнэ.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed opacity-80">
            Үнэгүй сургалтаа татаад, өнөөдрөөс л шинэ замаар алх.
          </p>
          <Link
            href="/courses"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm uppercase tracking-widest text-foreground transition-opacity hover:opacity-90"
          >
            Эхлэх <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-light text-foreground">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

function ValueProp({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-background p-10">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border">
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-medium">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

function Section({
  eyebrow,
  title,
  description,
  action,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="brand-wordmark text-xs uppercase text-muted-foreground">{eyebrow}</p>
          <h2 className="mt-2 text-3xl font-light leading-tight sm:text-4xl">{title}</h2>
          {description && (
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {action && (
          <Link
            href={action.href}
            className="hidden items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            {action.label} <ArrowRight size={14} />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
