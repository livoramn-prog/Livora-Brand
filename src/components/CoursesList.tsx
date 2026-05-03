"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CourseCard } from "@/components/CourseCard";
import { CATEGORY_LABELS, Course, CourseCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

type PriceFilter = "all" | "free" | "paid";

export function CoursesList({ courses }: { courses: Course[] }) {
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [category, setCategory] = useState<CourseCategory | "all">("all");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      if (priceFilter === "free" && c.price !== 0) return false;
      if (priceFilter === "paid" && c.price === 0) return false;
      if (category !== "all" && c.category !== category) return false;
      if (
        search &&
        !c.title.toLowerCase().includes(search.toLowerCase()) &&
        !c.shortDescription.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [courses, search, priceFilter, category]);

  return (
    <>
      <div className="mt-10 space-y-5">
        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            placeholder="Сургалт хайх..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl bg-muted py-3.5 pl-12 pr-4 text-base outline-none transition-all focus:bg-background-pure focus:shadow-ios-sm"
          />
        </div>

        {/* iOS-style segmented control */}
        <div className="ios-segment overflow-x-auto no-scrollbar">
          {(["all", "free", "paid"] as PriceFilter[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriceFilter(p)}
              className={`ios-segment-item shrink-0 ${priceFilter === p ? "active" : ""}`}
            >
              {p === "all" ? "Бүгд" : p === "free" ? "Үнэгүй" : "Premium"}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar">
          <FilterChip active={category === "all"} onClick={() => setCategory("all")} label="Бүх чиглэл" />
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

      <div className="mt-10">
        <p className="mb-6 text-sm text-muted-foreground">{filtered.length} сургалт олдлоо</p>
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
    </>
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
        "ios-press shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all",
        active
          ? "bg-foreground text-background shadow-ios-sm"
          : "bg-muted text-muted-foreground hover:bg-background-pure hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}
