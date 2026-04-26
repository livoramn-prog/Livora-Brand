import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllCourses } from "@/lib/data";
import { CATEGORY_LABELS } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { CourseRowActions } from "@/components/admin/CourseRowActions";

export default async function AdminCoursesPage() {
  const courses = await getAllCourses();

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <p className="brand-wordmark text-xs uppercase text-muted-foreground">Сургалтууд</p>
          <h1 className="mt-2 text-3xl font-light">Бүх сургалт удирдах</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Сургалт нэмэх, засварлах, нуух, устгах боломжтой.
          </p>
        </div>
        <Link
          href="/admin/courses/new"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-xs uppercase tracking-widest text-background transition-opacity hover:opacity-90"
        >
          <Plus size={14} /> Шинэ сургалт
        </Link>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-border">
        {courses.length === 0 ? (
          <p className="p-10 text-center text-sm text-muted-foreground">
            Сургалт нэмж эхлэхийн тулд "Шинэ сургалт" товч дарна уу.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr>
                <Th>Сургалт</Th>
                <Th>Чиглэл</Th>
                <Th>Үнэ</Th>
                <Th>Сурагч</Th>
                <Th>Төлөв</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-muted/40">
                  <Td>
                    <div>
                      <p className="font-medium">{course.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {course.lessons} хичээл · {course.files.length} файл
                      </p>
                    </div>
                  </Td>
                  <Td>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                      {CATEGORY_LABELS[course.category]}
                    </span>
                  </Td>
                  <Td>
                    <span className={course.price === 0 ? "text-muted-foreground" : "font-medium"}>
                      {formatPrice(course.price)}
                    </span>
                  </Td>
                  <Td>{course.studentsCount.toLocaleString()}</Td>
                  <Td>
                    <span
                      className={`inline-block rounded-full px-3 py-0.5 text-[10px] uppercase tracking-widest ${
                        course.isPublished
                          ? "bg-foreground text-background"
                          : "border border-border text-muted-foreground"
                      }`}
                    >
                      {course.isPublished ? "Идэвхтэй" : "Нуугдсан"}
                    </span>
                  </Td>
                  <Td>
                    <CourseRowActions
                      courseId={course.id}
                      slug={course.slug}
                      isPublished={course.isPublished}
                    />
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  return (
    <th className="px-6 py-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
      {children}
    </th>
  );
}
function Td({ children }: { children?: React.ReactNode }) {
  return <td className="px-6 py-5">{children}</td>;
}
