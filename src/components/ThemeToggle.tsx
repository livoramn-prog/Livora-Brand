"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // FOUC-аас сэргийлэхийн тулд html дээр data-theme аль хэдийн тавьсан байна
    // (layout.tsx-ийн inline script). Зөвхөн state-аа sync хийнэ.
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (next === "dark") {
      document.documentElement.dataset.theme = "dark";
    } else {
      delete document.documentElement.dataset.theme;
    }
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode etc. — чимээгүй чэрэлгэнэ */
    }
  };

  // Hydration mismatch-ээс зайлсхийхийн тулд эхний render-д placeholder
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Theme"
        className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border ${className ?? ""}`}
      >
        <span className="h-4 w-4" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Гэрэлтэй тэмат шилжих" : "Харанхуй тэмат шилжих"}
      title={isDark ? "Гэрэлтэй" : "Харанхуй"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-foreground hover:text-foreground ${className ?? ""}`}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
