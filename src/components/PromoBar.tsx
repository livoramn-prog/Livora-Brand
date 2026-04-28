"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

type Props = {
  endDateIso: string;
  message: string;
  shortMessage: string;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function diff(endMs: number) {
  const now = Date.now();
  const ms = endMs - now;
  if (ms <= 0) return null;
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

export function PromoBar({ endDateIso, message, shortMessage }: Props) {
  const endMs = new Date(endDateIso).getTime();
  const [time, setTime] = useState<ReturnType<typeof diff>>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(diff(endMs));
    const id = setInterval(() => {
      const t = diff(endMs);
      if (!t) {
        setTime(null);
        clearInterval(id);
        return;
      }
      setTime(t);
    }, 1000);
    return () => clearInterval(id);
  }, [endMs]);

  // Хугацаа дууссан эсвэл hydration хүртэл server placeholder
  if (mounted && !time) return null;

  const placeholder = !mounted;

  return (
    <div
      className="relative overflow-hidden text-white"
      style={{ background: "var(--brand)" }}
      role="region"
      aria-label="Урам зоригын мэдэгдэл"
    >
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 animate-promo-shine"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-xs sm:py-2.5 sm:text-sm">
        <Sparkles size={14} className="hidden shrink-0 sm:inline-block" />
        <span className="hidden sm:inline">{message}</span>
        <span className="sm:hidden">🔥 {shortMessage}</span>
        <span className="opacity-50">·</span>
        {placeholder ? (
          <span className="font-mono tabular-nums opacity-80">--ө --ц --м --с</span>
        ) : time ? (
          <span className="font-mono tabular-nums">
            {time.days > 0 && (
              <>
                <strong>{time.days}</strong>ө{" "}
              </>
            )}
            <strong>{pad(time.hours)}</strong>ц{" "}
            <strong>{pad(time.minutes)}</strong>м{" "}
            <strong>{pad(time.seconds)}</strong>с
          </span>
        ) : null}
      </div>
    </div>
  );
}
