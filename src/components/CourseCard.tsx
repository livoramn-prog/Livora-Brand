import Image from "next/image";
import Link from "next/link";
import { Clock, BookOpen, Star } from "lucide-react";
import { Course, CATEGORY_LABELS } from "@/lib/types";
import { formatPrice, formatDuration } from "@/lib/utils";
import { applyDiscount, isPromoActive, PROMO } from "@/lib/promo";

export function CourseCard({ course }: { course: Course }) {
  const isFree = course.price === 0;
  const promoOn = isPromoActive() && !isFree;
  const finalPrice = promoOn ? applyDiscount(course.price) : course.price;
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={course.coverImage}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span
            className={`rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-widest ${
              isFree
                ? "bg-background text-foreground"
                : "bg-foreground text-background"
            }`}
          >
            {isFree ? "Үнэгүй" : "Premium"}
          </span>
          {promoOn && (
            <span
              className="rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white"
              style={{ background: "var(--brand)" }}
            >
              -{PROMO.discountPercent}%
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          {CATEGORY_LABELS[course.category]}
        </p>
        <h3 className="mt-2 text-lg font-medium leading-snug text-foreground line-clamp-2">
          {course.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
          {course.shortDescription}
        </p>

        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock size={13} /> {formatDuration(course.durationMinutes)}
          </span>
          <span className="inline-flex items-center gap-1">
            <BookOpen size={13} /> {course.lessons} хичээл
          </span>
          <span className="inline-flex items-center gap-1">
            <Star size={13} className="fill-foreground text-foreground" /> {course.rating}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="flex items-baseline gap-2">
            <span className="text-lg font-medium">{formatPrice(finalPrice)}</span>
            {promoOn && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(course.price)}
              </span>
            )}
          </span>
          <span className="text-xs uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground">
            Үзэх →
          </span>
        </div>
      </div>
    </Link>
  );
}
