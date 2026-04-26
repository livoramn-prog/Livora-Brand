"use client";

import { useState } from "react";
import { Download, ShoppingBag } from "lucide-react";
import { Course } from "@/lib/types";
import { BuyModal } from "./BuyModal";
import { FreeDownloadModal } from "./FreeDownloadModal";

export function CourseActions({ course }: { course: Course }) {
  const [open, setOpen] = useState(false);
  const isFree = course.price === 0;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm uppercase tracking-widest text-background transition-opacity hover:opacity-90"
      >
        {isFree ? (
          <>
            <Download size={16} /> Үнэгүй татах
          </>
        ) : (
          <>
            <ShoppingBag size={16} /> Худалдан авах
          </>
        )}
      </button>

      {isFree ? (
        <FreeDownloadModal course={course} open={open} onClose={() => setOpen(false)} />
      ) : (
        <BuyModal course={course} open={open} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
