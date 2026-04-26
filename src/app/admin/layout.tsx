import Link from "next/link";
import { LayoutDashboard, BookOpen, ShoppingBag, FileText, CreditCard, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Logo";
import { LogoutButton } from "@/components/LogoutButton";

const NAV = [
  { href: "/admin", label: "Тойм", icon: LayoutDashboard },
  { href: "/admin/courses", label: "Сургалтууд", icon: BookOpen },
  { href: "/admin/orders", label: "Захиалгууд", icon: ShoppingBag },
  { href: "/admin/articles", label: "Нийтлэлүүд", icon: FileText },
  { href: "/admin/banks", label: "Дансны мэдээлэл", icon: CreditCard },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1400px]">
      <aside className="hidden w-64 shrink-0 border-r border-border lg:block">
        <div className="sticky top-0 flex h-screen flex-col p-6">
          <Logo size="md" href="/admin" />
          <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
            Admin Panel
          </p>

          <nav className="mt-10 flex flex-col gap-1">
            {NAV.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={12} /> Сайт руу буцах
            </Link>
            <LogoutButton />
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <div className="border-b border-border bg-background lg:hidden">
          <div className="flex items-center justify-between px-4 py-4">
            <Logo size="sm" href="/admin" />
            <nav className="flex gap-2 overflow-x-auto no-scrollbar">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="shrink-0 rounded-full border border-border px-3 py-1 text-xs"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="p-6 sm:p-10">{children}</div>
      </div>
    </div>
  );
}
