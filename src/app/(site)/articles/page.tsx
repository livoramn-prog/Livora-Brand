import { ArticleCard } from "@/components/ArticleCard";
import { ARTICLES } from "@/lib/data";

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="brand-wordmark text-xs uppercase text-muted-foreground">Блог</p>
        <h1 className="mt-3 text-4xl font-light leading-tight sm:text-5xl">
          Сэтгэгдэл төрүүлэх нийтлэлүүд
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Сэтгэл зүй, эрүүл мэнд, бизнес, амьдралын ур чадварын сэдвээр шинжлэх ухаанд тулгуурласан
          практик зөвлөгөөнүүд.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
