"use client";

import { useState } from "react";
import { Check, X, Mail, Phone } from "lucide-react";
import { ORDERS } from "@/lib/data";
import { Order } from "@/lib/types";
import { formatPrice, formatDate } from "@/lib/utils";

type StatusFilter = "all" | "pending" | "completed" | "cancelled";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(ORDERS);
  const [filter, setFilter] = useState<StatusFilter>("all");

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const updateStatus = (id: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div>
      <div>
        <p className="brand-wordmark text-xs uppercase text-muted-foreground">Захиалгууд</p>
        <h1 className="mt-2 text-3xl font-light">Захиалгуудыг удирдах</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Төлбөр баталгаажуулсны дараа хэрэглэгчид сургалт автоматаар email-ээр илгээгдэнэ.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        {(["all", "pending", "completed", "cancelled"] as StatusFilter[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`rounded-full border px-4 py-1.5 text-xs transition-all ${
              filter === s
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {s === "all"
              ? "Бүгд"
              : s === "pending"
              ? "Хүлээгдэж буй"
              : s === "completed"
              ? "Баталгаажсан"
              : "Цуцлагдсан"}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center">
            <p className="text-muted-foreground">Захиалга байхгүй байна.</p>
          </div>
        ) : (
          filtered.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-border p-6 transition-shadow hover:shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium">{order.customerName}</h3>
                    <span
                      className={`rounded-full px-3 py-0.5 text-[10px] uppercase tracking-widest ${
                        order.status === "completed"
                          ? "bg-foreground text-background"
                          : order.status === "pending"
                          ? "border border-foreground text-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {order.status === "completed"
                        ? "Баталгаажсан"
                        : order.status === "pending"
                        ? "Хүлээгдэж буй"
                        : "Цуцлагдсан"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{order.courseTitle}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <a
                      href={`mailto:${order.customerEmail}`}
                      className="inline-flex items-center gap-1.5 hover:text-foreground"
                    >
                      <Mail size={12} /> {order.customerEmail}
                    </a>
                    <a
                      href={`tel:${order.customerPhone}`}
                      className="inline-flex items-center gap-1.5 hover:text-foreground"
                    >
                      <Phone size={12} /> {order.customerPhone}
                    </a>
                    <span>· {formatDate(order.createdAt)}</span>
                    {order.bankAccountUsed && <span>· {order.bankAccountUsed}</span>}
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-light">{formatPrice(order.amount)}</p>
                </div>
              </div>

              {order.status === "pending" && (
                <div className="mt-5 flex items-center gap-2 border-t border-border pt-5">
                  <button
                    type="button"
                    onClick={() => updateStatus(order.id, "completed")}
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs uppercase tracking-widest text-background transition-opacity hover:opacity-90"
                  >
                    <Check size={14} /> Баталгаажуулах
                  </button>
                  <button
                    type="button"
                    onClick={() => updateStatus(order.id, "cancelled")}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X size={14} /> Цуцлах
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
