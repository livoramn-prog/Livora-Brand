"use client";

import { useState } from "react";
import { X, Copy, Check } from "lucide-react";
import { BankAccount, Course } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";
import { BankLogo } from "./BankLogo";
import { applyDiscount, isPromoActive, PROMO } from "@/lib/promo";

export function BuyModal({
  course,
  banks,
  open,
  onClose,
}: {
  course: Course;
  banks: BankAccount[];
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      /* noop */
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug: course.slug,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Захиалга илгээхэд алдаа гарлаа");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Алдаа гарлаа");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-background p-8 shadow-2xl sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Хаах"
          className="absolute right-5 top-5 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <SuccessView email={email} onClose={onClose} />
        ) : (
          <>
            <p className="brand-wordmark text-xs uppercase text-muted-foreground">Худалдан авах</p>
            <h2 className="mt-2 text-2xl font-medium leading-tight">{course.title}</h2>
            {(() => {
              const promoOn = isPromoActive() && course.price > 0;
              const finalPrice = promoOn ? applyDiscount(course.price) : course.price;
              return (
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="text-3xl font-light">{formatPrice(finalPrice)}</span>
                  {promoOn && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(course.price)}
                    </span>
                  )}
                  <span className="rounded-full bg-foreground px-3 py-1 text-[10px] uppercase tracking-widest text-background">
                    Premium
                  </span>
                  {promoOn && (
                    <span
                      className="rounded-full px-3 py-1 text-[10px] uppercase tracking-widest text-white"
                      style={{ background: "var(--brand)" }}
                    >
                      -{PROMO.discountPercent}%
                    </span>
                  )}
                </div>
              );
            })()}

            {/* Banks */}
            <div className="mt-8">
              <h3 className="text-sm font-medium">1. Дансаар шилжүүлэх</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Аль нэг данс дээр дарж дугаарыг хуулна. Гүйлгээний утга дээр өөрийн утасны дугаараа
                бичнэ үү.
              </p>
              <div className="mt-4 space-y-3">
                {banks.map((bank) => (
                  <div
                    key={bank.id}
                    className="overflow-hidden rounded-2xl border border-border bg-background"
                  >
                    {/* Bank header */}
                    <div className="flex items-center gap-3 p-4">
                      <BankLogo bankId={bank.id} bankName={bank.bankName} size={36} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{bank.bankName}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {bank.accountHolder}
                        </p>
                      </div>
                    </div>

                    {/* Account number row */}
                    <button
                      type="button"
                      onClick={() => handleCopy(bank.accountNumber, bank.id)}
                      className="flex w-full items-center justify-between gap-3 border-t border-border px-4 py-3 text-left transition-colors hover:bg-muted/50 active:bg-muted"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          Дансны дугаар
                        </p>
                        <p className="mt-0.5 font-mono text-base font-medium">
                          {bank.accountNumber}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors",
                          copiedId === bank.id
                            ? "border-foreground bg-foreground text-background"
                            : "border-border text-muted-foreground"
                        )}
                      >
                        {copiedId === bank.id ? <Check size={15} /> : <Copy size={15} />}
                      </span>
                    </button>

                    {/* IBAN row */}
                    {bank.iban && (
                      <button
                        type="button"
                        onClick={() => handleCopy(bank.iban!, `${bank.id}-iban`)}
                        className="flex w-full items-center justify-between gap-3 border-t border-border px-4 py-3 text-left transition-colors hover:bg-muted/50 active:bg-muted"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                            IBAN
                          </p>
                          <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
                            {bank.iban}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors",
                            copiedId === `${bank.id}-iban`
                              ? "border-foreground bg-foreground text-background"
                              : "border-border text-muted-foreground"
                          )}
                        >
                          {copiedId === `${bank.id}-iban` ? (
                            <Check size={13} />
                          ) : (
                            <Copy size={13} />
                          )}
                        </span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {copiedId && (
                <p className="mt-3 text-xs text-foreground">✓ Дансны дугаар хуулагдлаа</p>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <h3 className="text-sm font-medium">2. Мэдээлэл оруулна уу</h3>
              <Field
                label="Нэр"
                value={name}
                onChange={setName}
                placeholder="Таны нэр"
                required
              />
              <Field
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="example@gmail.com"
                hint="Сургалтын линк энэ email рүү очно"
                required
              />
              <Field
                label="Утас"
                type="tel"
                value={phone}
                onChange={setPhone}
                placeholder="99112233"
                hint="Гүйлгээний утга дээр энэ дугаар бичсэн байх"
                required
              />

              {error && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs text-red-700">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="mt-6 w-full rounded-full bg-foreground px-6 py-4 text-sm uppercase tracking-widest text-background transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? "Илгээж байна..." : "Төлбөр төлсөн →"}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Бид төлбөрийг шалгаад 24 цагийн дотор сургалтыг email-ээр илгээнэ.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function SuccessView({ email, onClose }: { email: string; onClose: () => void }) {
  return (
    <div className="py-8 text-center">
      <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-foreground text-background">
        <Check size={28} />
      </div>
      <h2 className="mt-6 text-2xl font-medium">Захиалга илгээгдлээ</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
        Бид төлбөрийг шалгаад тун удахгүй <strong className="text-foreground">{email}</strong>{" "}
        хаяг руу сургалтыг илгээнэ.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-8 rounded-full border border-border px-6 py-3 text-xs uppercase tracking-widest transition-colors hover:bg-muted"
      >
        Хаах
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
      />
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
