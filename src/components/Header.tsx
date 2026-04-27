"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Нүүр" },
  { href: "/courses", label: "Сургалт" },
  { href: "/articles", label: "Нийтлэл" },
  { href: "/about", label: "Бидний тухай" },
  { href: "/contact", label: "Холбоо барих" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo size="md" />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/courses"
            className="rounded-full bg-foreground px-5 py-2 text-xs uppercase tracking-widest text-background transition-opacity hover:opacity-90"
          >
            Эхлэх
          </Link>
        </div>

        <button
          type="button"
          aria-label="Цэс"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-border md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3 sm:px-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
