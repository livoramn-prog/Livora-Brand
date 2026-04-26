"use client";

import { useTransition } from "react";
import { Check, X } from "lucide-react";
import { updateOrderStatus } from "@/app/admin/_actions";

export function OrderActions({ orderId }: { orderId: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="mt-5 flex items-center gap-2 border-t border-border pt-5">
      <button
        type="button"
        onClick={() => startTransition(() => updateOrderStatus(orderId, "completed"))}
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs uppercase tracking-widest text-background transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        <Check size={14} /> Баталгаажуулах
      </button>
      <button
        type="button"
        onClick={() => startTransition(() => updateOrderStatus(orderId, "cancelled"))}
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
      >
        <X size={14} /> Цуцлах
      </button>
    </div>
  );
}
