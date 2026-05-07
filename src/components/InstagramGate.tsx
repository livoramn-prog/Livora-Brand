"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { InstagramIcon } from "./SocialIcons";

const STORAGE_KEY = "livora_instagram_ack";
const INSTAGRAM_URL = "https://www.instagram.com/livora.mn2025/";

type Stage = "idle" | "followed";

export function InstagramGate() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("idle");

  useEffect(() => {
    try {
      const ack = localStorage.getItem(STORAGE_KEY);
      if (!ack) {
        // Зөвхөн анх удаа орохуйд (мөн жижигхэн delay-тай)
        const t = setTimeout(() => setOpen(true), 800);
        return () => clearTimeout(t);
      }
    } catch {
      /* localStorage блоклогдсон үед чимээгүй өнгөрөөнө */
    }
  }, []);

  const handleFollow = () => {
    window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer");
    setStage("followed");
  };

  const handleContinue = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* noop */
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-black/60 backdrop-blur-md sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="ios-sheet relative w-full max-w-md overflow-hidden bg-background-pure shadow-2xl sm:p-0"
        style={{ borderRadius: "var(--radius-2xl) var(--radius-2xl) 0 0" }}
      >
        {/* Drag handle (mobile) */}
        <div
          className="mx-auto mt-3 mb-1 h-1 w-10 rounded-full bg-muted-foreground/30 sm:hidden"
          aria-hidden="true"
        />

        {/* Чимэглэл — бренд ногоон gradient header */}
        <div
          className="relative overflow-hidden p-8 pt-10 text-center text-white"
          style={{
            background:
              "linear-gradient(135deg, var(--brand) 0%, var(--brand-soft) 100%)",
          }}
        >
          {/* Хэлбэр чимэглэлүүд */}
          <div
            className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20"
            style={{ background: "var(--warm)" }}
          />
          <div
            className="absolute -left-12 -bottom-16 h-44 w-44 rounded-full opacity-15"
            style={{ background: "white" }}
          />

          <div className="relative">
            <div
              className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              }}
            >
              <InstagramIcon size={32} />
            </div>
            <p className="brand-wordmark mt-5 text-[10px] uppercase opacity-80">
              Зөвхөн нэг алхам
            </p>
            <h2 className="mt-2 text-2xl font-medium leading-tight">
              Livora-г Instagram дээр дагаарай
            </h2>
            <p className="mt-3 text-sm leading-relaxed opacity-90">
              Шинэ сургалт, бэлэн материал, хямдрал — хамгийн түрүүнд танд хүрнэ.
            </p>
          </div>
        </div>

        {/* Үйлдлийн хэсэг */}
        <div className="space-y-3 p-6 sm:p-8">
          {stage === "idle" ? (
            <>
              <button
                type="button"
                onClick={handleFollow}
                className="ios-press inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-ios-md transition-opacity hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                }}
              >
                <InstagramIcon size={18} />
                @livora.mn2025 — Дагах
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Шинэ tab-д Instagram нээгдэнэ. Дагасны дараа энд буцаж ирээрэй.
              </p>
            </>
          ) : (
            <>
              <div
                className="flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm"
                style={{ background: "var(--brand-bg)", color: "var(--brand)" }}
              >
                <Check size={16} />
                Instagram нээгдсэн. Дагасны дараа доошхи товч дарна уу.
              </div>
              <button
                type="button"
                onClick={handleContinue}
                className="ios-press inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-ios-md transition-opacity hover:opacity-90"
                style={{ background: "var(--brand)" }}
              >
                Дагалаа, үргэлжлүүлэх <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={handleFollow}
                className="w-full rounded-full px-6 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Instagram-ыг дахин нээх
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
