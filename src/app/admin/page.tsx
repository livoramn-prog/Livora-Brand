import { TrendingUp, Users, BookOpen, DollarSign, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { COURSES, ORDERS } from "@/lib/data";
import { formatPrice, formatDate } from "@/lib/utils";

export default function AdminDashboard() {
  const totalRevenue = ORDERS.filter((o) => o.status === "completed").reduce(
    (sum, o) => sum + o.amount,
    0
  );
  const pendingOrders = ORDERS.filter((o) => o.status === "pending").length;
  const totalStudents = COURSES.reduce((sum, c) => sum + c.studentsCount, 0);

  return (
    <div>
      <div>
        <p className="brand-wordmark text-xs uppercase text-muted-foreground">Тойм</p>
        <h1 className="mt-2 text-3xl font-light">Сайн байна уу, Чинбат 👋</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Өнөөдрийн ерөнхий статистик. {formatDate(new Date().toISOString())}.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          icon={<DollarSign size={18} />}
          label="Нийт орлого"
          value={formatPrice(totalRevenue)}
        />
        <Stat
          icon={<ShoppingBag size={18} />}
          label="Хүлээгдэж буй"
          value={`${pendingOrders} захиалга`}
          highlight
        />
        <Stat icon={<BookOpen size={18} />} label="Нийт сургалт" value={`${COURSES.length}`} />
        <Stat
          icon={<Users size={18} />}
          label="Нийт сурагч"
          value={totalStudents.toLocaleString()}
        />
      </div>

      {/* Recent orders */}
      <div className="mt-12 rounded-3xl border border-border">
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="text-lg font-medium">Сүүлийн захиалгууд</h2>
          <Link
            href="/admin/orders"
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            Бүгдийг үзэх →
          </Link>
        </div>
        <div className="divide-y divide-border">
          {ORDERS.slice(0, 5).map((order) => (
            <div key={order.id} className="flex items-center justify-between p-6">
              <div>
                <p className="font-medium">{order.customerName}</p>
                <p className="mt-1 text-sm text-muted-foreground">{order.courseTitle}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatPrice(order.amount)}</p>
                <span
                  className={`mt-1 inline-block rounded-full px-3 py-0.5 text-[10px] uppercase tracking-widest ${
                    order.status === "completed"
                      ? "bg-foreground text-background"
                      : order.status === "pending"
                      ? "border border-foreground text-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {order.status === "completed"
                    ? "Хүлээн авсан"
                    : order.status === "pending"
                    ? "Хүлээгдэж буй"
                    : "Цуцлагдсан"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick info */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <InfoCard
          icon={<TrendingUp size={18} />}
          title="Энэ долоо хоногийн өсөлт"
          value="+12.5%"
          description="Өнгөрсөн долоо хоногтой харьцуулахад захиалга өссөн."
        />
        <InfoCard
          title="Хамгийн их зарагдсан"
          value={COURSES.sort((a, b) => b.studentsCount - a.studentsCount)[0].title}
          description="Энэ сард хамгийн их сонгогдсон сургалт."
        />
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  highlight,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 ${
        highlight ? "border-foreground bg-foreground text-background" : "border-border"
      }`}
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-70">
        {icon} {label}
      </div>
      <p className="mt-3 text-2xl font-medium">{value}</p>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
  description,
}: {
  icon?: React.ReactNode;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border p-6">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        {icon} {title}
      </div>
      <p className="mt-3 text-xl font-medium leading-tight">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
