"use client";

import { useTransition } from "react";
import { Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteArticle } from "@/app/admin/_actions";

export function ArticleRowActions({
  articleId,
  slug,
}: {
  articleId: string;
  slug: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/articles/${slug}`}
        target="_blank"
        aria-label="Үзэх"
        className="rounded-full border border-border p-2 transition-colors hover:bg-muted"
      >
        <Eye size={14} />
      </Link>
      <Link
        href={`/admin/articles/${articleId}/edit`}
        aria-label="Засах"
        className="rounded-full border border-border p-2 transition-colors hover:bg-muted"
      >
        <Edit size={14} />
      </Link>
      <button
        type="button"
        onClick={() => {
          if (!confirm("Нийтлэлийг устгах уу?")) return;
          startTransition(() => deleteArticle(articleId));
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
