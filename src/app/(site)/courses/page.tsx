import { CoursesList } from "@/components/CoursesList";
import { getPublishedCourses } from "@/lib/data";

export default async function CoursesPage() {
  const courses = await getPublishedCourses();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="brand-wordmark text-xs uppercase text-muted-foreground">Бүх сургалт</p>
        <h1 className="mt-3 text-4xl font-light leading-tight sm:text-5xl">
          Шинэ ур чадварыг сурах цаг
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Премиум болон үнэгүй сургалтуудаас өөрт хэрэгтэйгээ сонгож үзээрэй.
        </p>
      </div>

      <CoursesList courses={courses} />
    </div>
  );
}
