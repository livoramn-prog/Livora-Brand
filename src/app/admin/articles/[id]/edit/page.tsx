import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { updateArticle } from "@/app/admin/_actions";
import { supabaseAdmin } from "@/lib/supabase";

export default async function EditArticlePage(props: PageProps<"/admin/articles/[id]/edit">) {
  const { id } = await props.params;
  const { data } = await supabaseAdmin.from("articles").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  const article = {
    id: data.id,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt ?? "",
    content: data.content ?? "",
    coverImage: data.cover_image ?? "",
    category: data.category,
    publishedAt: data.published_at,
    readMinutes: data.read_minutes ?? 5,
    author: data.author ?? "",
  };

  const action = updateArticle.bind(null, id);

  return (
    <div>
      <Link
        href="/admin/articles"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={12} /> Нийтлэл руу
      </Link>
      <h1 className="mt-4 text-3xl font-light">Нийтлэл засах</h1>
      <ArticleForm article={article} action={action} submitLabel="Хадгалах" />
    </div>
  );
}
