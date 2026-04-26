"use client";

import { useTransition } from "react";
import { Edit, Eye, Trash2, EyeOff } from "lucide-react";
import Link from "next/link";
import { deleteCourse, toggleCoursePublished } from "@/app/admin/_actions";

export function CourseRowActions({
  courseId,
  slug,
  isPublished,
}: {
  courseId: string;
  slug: string;
  isPublished: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/courses/${slug}`}
        target="_blank"
        aria-label="Үзэх"
        className="rounded-full border border-border p-2 transition-colors hover:bg-muted"
      >
        <Eye size={14} />
      </Link>
      <Link
        href={`/admin/courses/${courseId}/edit`}
        aria-label="Засах"
        className="rounded-full border border-border p-2 transition-colors hover:bg-muted"
      >
        <Edit size={14} />
      </Link>
      <button
        type="button"
        onClick={() => startTransition(() => toggleCoursePublished(courseId, !isPublished))}
        disabled={pending}
        aria-label={isPublished ? "Нуух" : "Идэвхжүүлэх"}
        title={isPublished ? "Нуух" : "Идэвхжүүлэх"}
        className="rounded-full border border-border p-2 transition-colors hover:bg-muted disabled:opacity-50"
      >
        {isPublished ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>
      <button
        type="button"
        onClick={() => {
          if (!confirm("Сургалтыг устгах уу? Энэ үйлдлийг буцаах боломжгүй.")) return;
          startTransition(() => deleteCourse(courseId));
        }}
        disabled={pending}
        aria-label="Устгах"
        className="rounded-full border border-border p-2 text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
