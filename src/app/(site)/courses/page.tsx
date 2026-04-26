"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CourseCard } from "@/components/CourseCard";
import { COURSES } from "@/lib/data";
import { CATEGORY_LABELS, CourseCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

type PriceFilter = "all" | "free" | "paid";

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [category, setCategory] = useState<CourseCategory | "all">("all");

  const filtered = useMemo(() => {
    return COURSES.filter((c) => {
      if (priceFilter === "free" && c.price !== 0) return false;
      if (priceFilter === "paid" && c.price === 0) return false;
      if (category !== "all" && c.category !== category) return false;
      if (search && !c.title.toLowerCase().includes(search.toLowerCase()) &&
          !c.shortDescription.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, priceFilter, category]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="brand-wordmark text-xs uppercase text-muted-foreground">Бүх сургалт</p>
        <h1 className="mt-3 text-4xl font-light leading-tight sm:text-5xl">
          Шинэ ур чадварыг сурах цаг
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Премиум болон үнэгүй сургалтуудаас өөрт хэрэгтэйгээ сонгож үзээрэй.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-10 space-y-6 border-y border-border py-6">
        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            placeholder="Сургалт хайх..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-border bg-background py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-foreground"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs uppercase tracking-widest text-muted-foreground">
            Үнэ:
          </span>
          {(["all", "free", "paid"] as PriceFilter[]).map((p) => (
            <FilterChip
              key={p}
              active={priceFilter === p}
              onClick={() => setPriceFilter(p)}
              label={p === "all" ? "Бүгд" : p === "free" ? "Үнэгүй" : "Premium"}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs uppercase tracking-widest text-muted-foreground">
            Чиглэл:
          </span>
          <FilterChip active={category === "all"} onClick={() => setCategory("all")} label="Бүгд" />
          {(Object.keys(CATEGORY_LABELS) as CourseCategory[]).map((c) => (
            <FilterChip
              key={c}
              active={category === c}
              onClick={() => setCategory(c)}
              label={CATEGORY_LABELS[c]}
            />
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="mt-10">
        <p className="mb-6 text-sm text-muted-foreground">
          {filtered.length} сургалт олдлоо
        </p>
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-20 text-center">
            <p className="text-muted-foreground">Тохирох сургалт олдсонгүй.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-1.5 text-xs transition-all",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}
