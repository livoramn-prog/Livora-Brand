import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseForm } from "@/components/admin/CourseForm";
import { updateCourse } from "@/app/admin/_actions";
import { supabaseAdmin } from "@/lib/supabase";

export default async function EditCoursePage(props: PageProps<"/admin/courses/[id]/edit">) {
  const { id } = await props.params;
  const { data } = await supabaseAdmin
    .from("courses")
    .select("*, course_files(*)")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  const course = {
    id: data.id,
    slug: data.slug,
    title: data.title,
    shortDescription: data.short_description ?? "",
    description: data.description ?? "",
    category: data.category,
    price: data.price,
    coverImage: data.cover_image ?? "",
    durationMinutes: data.duration_minutes ?? 0,
    lessons: data.lessons ?? 0,
    level: data.level ?? "Эхлэн",
    instructor: data.instructor ?? "",
    rating: data.rating ?? 5,
    studentsCount: data.students_count ?? 0,
    isPublished: data.is_published,
    createdAt: data.created_at,
    files: [],
  };

  const action = updateCourse.bind(null, id);

  return (
    <div>
      <Link
        href="/admin/courses"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={12} /> Сургалт руу
      </Link>
      <h1 className="mt-4 text-3xl font-light">Сургалт засах</h1>
      <CourseForm course={course} action={action} submitLabel="Хадгалах" />
    </div>
  );
}
