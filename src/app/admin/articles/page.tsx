import { Plus } from "lucide-react";
import Link from "next/link";
import { getAllArticles } from "@/lib/data";
import { ARTICLE_CATEGORY_LABELS } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { ArticleRowActions } from "@/components/admin/ArticleRowActions";

export default async function AdminArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <p className="brand-wordmark text-xs uppercase text-muted-foreground">Нийтлэлүүд</p>
          <h1 className="mt-2 text-3xl font-light">Блог удирдах</h1>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-xs uppercase tracking-widest text-background transition-opacity hover:opacity-90"
        >
          <Plus size={14} /> Шинэ нийтлэл
        </Link>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-border">
        {articles.length === 0 ? (
          <p className="p-10 text-center text-sm text-muted-foreground">
            Нийтлэл нэмж эхлэхийн тулд "Шинэ нийтлэл" товч дарна уу.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-muted-foreground">
                  Гарчиг
                </th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-muted-foreground">
                  Чиглэл
                </th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-muted-foreground">
                  Огноо
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-muted/40">
                  <td className="px-6 py-5">
                    <p className="font-medium">{article.title}</p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                      {article.excerpt}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                      {ARTICLE_CATEGORY_LABELS[article.category]}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-muted-foreground">
                    {formatDate(article.publishedAt)}
                  </td>
                  <td className="px-6 py-5">
                    <ArticleRowActions articleId={article.id} slug={article.slug} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
