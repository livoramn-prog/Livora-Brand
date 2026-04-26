import Image from "next/image";
import Link from "next/link";
import { Article, ARTICLE_CATEGORY_LABELS } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border transition-all hover:shadow-lg hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          {ARTICLE_CATEGORY_LABELS[article.category]}
        </p>
        <h3 className="mt-2 text-lg font-medium leading-snug line-clamp-2">
          {article.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatDate(article.publishedAt)}</span>
          <span>{article.readMinutes} мин унших</span>
        </div>
      </div>
    </Link>
  );
}
