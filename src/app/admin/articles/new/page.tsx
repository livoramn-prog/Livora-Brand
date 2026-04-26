import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { createArticle } from "@/app/admin/_actions";

export default function NewArticlePage() {
  return (
    <div>
      <Link
        href="/admin/articles"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={12} /> Нийтлэл руу
      </Link>
      <h1 className="mt-4 text-3xl font-light">Шинэ нийтлэл бичих</h1>
      <ArticleForm action={createArticle} submitLabel="Нийтлэл үүсгэх" />
    </div>
  );
}
