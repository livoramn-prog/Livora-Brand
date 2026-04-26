import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CourseForm } from "@/components/admin/CourseForm";
import { createCourse } from "@/app/admin/_actions";

export default function NewCoursePage() {
  return (
    <div>
      <Link
        href="/admin/courses"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={12} /> Сургалт руу
      </Link>
      <h1 className="mt-4 text-3xl font-light">Шинэ сургалт нэмэх</h1>
      <CourseForm action={createCourse} submitLabel="Сургалт үүсгэх" />
    </div>
  );
}
