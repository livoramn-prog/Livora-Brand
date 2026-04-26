import Link from "next/link";
import { Plus, Edit, Eye } from "lucide-react";
import { COURSES } from "@/lib/data";
import { CATEGORY_LABELS } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function AdminCoursesPage() {
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <p className="brand-wordmark text-xs uppercase text-muted-foreground">Сургалтууд</p>
          <h1 className="mt-2 text-3xl font-light">Бүх сургалт удирдах</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Сургалт нэмэх, засварлах, файл оруулах боломжтой.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-xs uppercase tracking-widest text-background transition-opacity hover:opacity-90"
        >
          <Plus size={14} /> Шинэ сургалт
        </button>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-border">
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
            {COURSES.map((course) => (
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
                    {course.isPublished ? "Идэвхтэй" : "Ноорог"}
                  </span>
                </Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/courses/${course.slug}`}
                      target="_blank"
                      aria-label="Үзэх"
                      className="rounded-full border border-border p-2 transition-colors hover:bg-muted"
                    >
                      <Eye size={14} />
                    </Link>
                    <button
                      type="button"
                      aria-label="Засах"
                      className="rounded-full border border-border p-2 transition-colors hover:bg-muted"
                    >
                      <Edit size={14} />
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
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
