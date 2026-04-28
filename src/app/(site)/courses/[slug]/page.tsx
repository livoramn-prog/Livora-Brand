import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, BookOpen, Star, Users, FileVideo, FileText, FileSpreadsheet, FileImage, FileType2 } from "lucide-react";
import { getActiveBankAccounts, getAllCourses, getCourseBySlug } from "@/lib/data";
import { CATEGORY_LABELS, FileType } from "@/lib/types";
import { formatPrice, formatDuration } from "@/lib/utils";
import { CourseActions } from "@/components/CourseActions";
import { WhatYouLearn } from "@/components/WhatYouLearn";
import { InstructorCard } from "@/components/InstructorCard";
import { Testimonials } from "@/components/Testimonials";
import { getTestimonialsForCategory } from "@/lib/testimonials";
import { applyDiscount, isPromoActive, PROMO } from "@/lib/promo";

export async function generateStaticParams() {
  const all = await getAllCourses();
  return all.map((c) => ({ slug: c.slug }));
}

const FILE_ICONS: Record<FileType, React.ComponentType<{ size?: number; className?: string }>> = {
  video: FileVideo,
  pdf: FileText,
  docx: FileType2,
  xlsx: FileSpreadsheet,
  png: FileImage,
  zip: FileText,
};

const FILE_LABELS: Record<FileType, string> = {
  video: "Видео",
  pdf: "PDF",
  docx: "Word",
  xlsx: "Excel",
  png: "Зураг",
  zip: "Архив",
};

export default async function CourseDetailPage(props: PageProps<"/courses/[slug]">) {
  const { slug } = await props.params;
  const [course, banks] = await Promise.all([getCourseBySlug(slug), getActiveBankAccounts()]);
  if (!course) notFound();

  return (
    <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/courses"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} /> Бүх сургалт
      </Link>

      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_400px]">
        {/* Left: content */}
        <div>
          <p className="brand-wordmark text-xs uppercase text-muted-foreground">
            {CATEGORY_LABELS[course.category]}
          </p>
          <h1 className="mt-3 text-4xl font-light leading-tight sm:text-5xl">{course.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {course.shortDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-border py-6 text-sm">
            <Meta icon={<Clock size={16} />} label={formatDuration(course.durationMinutes)} />
            <Meta icon={<BookOpen size={16} />} label={`${course.lessons} хичээл`} />
            <Meta icon={<Users size={16} />} label={`${course.studentsCount.toLocaleString()} сурагч`} />
            <Meta
              icon={<Star size={16} className="fill-foreground" />}
              label={`${course.rating} үнэлгээ`}
            />
            <Meta label={`Түвшин: ${course.level}`} />
          </div>

          <div className="relative mt-10 aspect-video overflow-hidden rounded-2xl bg-muted">
            <Image
              src={course.coverImage}
              alt={course.title}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-light">Сургалтын тухай</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
              {course.description
                .split("\n")
                .filter((p) => !p.trim().startsWith("- ") && !p.trim().startsWith("* "))
                .map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
            </div>
          </div>

          <WhatYouLearn description={course.description} />

          <div className="mt-12">
            <h2 className="text-2xl font-light">Юу багтсан бэ?</h2>
            <ul className="mt-4 space-y-2">
              {course.files.map((f) => {
                const Icon = FILE_ICONS[f.type];
                return (
                  <li
                    key={f.id}
                    className="flex items-center justify-between rounded-2xl border border-border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border">
                        <Icon size={16} />
                      </span>
                      <div>
                        <p className="text-sm font-medium">{f.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {FILE_LABELS[f.type]} · {f.sizeMb} MB
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <InstructorCard name={course.instructor} />
          <Testimonials items={getTestimonialsForCategory(course.category)} />
        </div>

        {/* Right: sticky purchase card */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-border bg-background p-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Үнэ</p>
            {(() => {
              const promoOn = isPromoActive() && course.price > 0;
              const finalPrice = promoOn ? applyDiscount(course.price) : course.price;
              return (
                <>
                  <div className="mt-2 flex items-baseline gap-3">
                    <p className="text-4xl font-light">{formatPrice(finalPrice)}</p>
                    {promoOn && (
                      <p className="text-lg text-muted-foreground line-through">
                        {formatPrice(course.price)}
                      </p>
                    )}
                  </div>
                  {promoOn && (
                    <p
                      className="mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-white"
                      style={{ background: "var(--brand)" }}
                    >
                      🔥 {PROMO.discountPercent}% хэмнэлээ
                    </p>
                  )}
                </>
              );
            })()}
            <div className="mt-6">
              <CourseActions course={course} banks={banks} />
            </div>
            <ul className="mt-6 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-foreground">✓</span> Хязгааргүй хандалт
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">✓</span> Бүх төхөөрөмж дээр үзэх
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">✓</span> Татаж авах боломжтой
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">✓</span> Email дэмжлэг
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </article>
  );
}

function Meta({ icon, label }: { icon?: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-muted-foreground">
      {icon}
      {label}
    </span>
  );
}
