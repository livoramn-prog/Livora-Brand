import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ARTICLES, getArticleBySlug } from "@/lib/data";
import { ARTICLE_CATEGORY_LABELS } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { ArticleCard } from "@/components/ArticleCard";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export default async function ArticleDetailPage(props: PageProps<"/articles/[slug]">) {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/articles"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} /> Бүх нийтлэл
      </Link>

      <p className="brand-wordmark mt-8 text-xs uppercase text-muted-foreground">
        {ARTICLE_CATEGORY_LABELS[article.category]}
      </p>
      <h1 className="mt-3 text-4xl font-light leading-tight sm:text-5xl">{article.title}</h1>
      <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
        <span>{article.author}</span>
        <span>·</span>
        <span>{formatDate(article.publishedAt)}</span>
        <span>·</span>
        <span>{article.readMinutes} мин</span>
      </div>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
          priority
        />
      </div>

      <div className="prose prose-neutral mt-12 max-w-none text-base leading-relaxed text-foreground">
        {article.content.split("\n\n").map((paragraph, i) => {
          if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
            return (
              <h3 key={i} className="mt-8 text-xl font-medium text-foreground">
                {paragraph.slice(2, -2)}
              </h3>
            );
          }
          const isHeader = /^\*\*.+\*\*$/.test(paragraph.trim().split("\n")[0]);
          if (isHeader) {
            const lines = paragraph.split("\n");
            const heading = lines[0].replace(/\*\*/g, "");
            const rest = lines.slice(1).join("\n");
            return (
              <div key={i}>
                <h3 className="mt-8 text-xl font-medium text-foreground">{heading}</h3>
                <p className="mt-2 text-muted-foreground">{rest}</p>
              </div>
            );
          }
          return (
            <p key={i} className="mt-4 text-muted-foreground">
              {paragraph}
            </p>
          );
        })}
      </div>

      {related.length > 0 && (
        <section className="mt-20 border-t border-border pt-12">
          <h2 className="text-2xl font-light">Бусад нийтлэл</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
