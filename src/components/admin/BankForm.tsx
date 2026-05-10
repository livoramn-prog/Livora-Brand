"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { BankAccount } from "@/lib/types";
import type { ActionResult } from "@/app/admin/_actions";

export function BankForm({
  bank,
  action,
  isEdit = false,
  submitLabel = "Хадгалах",
}: {
  bank?: BankAccount;
  action: (formData: FormData) => Promise<ActionResult>;
  isEdit?: boolean;
  submitLabel?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const handleSubmit = (formData: FormData) => {
    setMessage(null);
    startTransition(async () => {
      const result = await action(formData);
      if (result.ok) {
        setMessage({ ok: true, text: "✓ Амжилттай хадгалагдлаа" });
        setTimeout(() => {
          router.push("/admin/banks");
          router.refresh();
        }, 800);
      } else {
        setMessage({ ok: false, text: result.error });
      }
    });
  };

  return (
    <form action={handleSubmit} className="mt-8 max-w-xl space-y-6">
      {!isEdit && (
        <Field
          label="ID *"
          name="id"
          defaultValue={bank?.id}
          required
          hint="Богино таних кодыг бяцхан үсгээр (жишээ: golomt, state)"
        />
      )}
      <Field label="Банкны нэр *" name="bank_name" defaultValue={bank?.bankName} required />
      <Field
        label="Дансны дугаар *"
        name="account_number"
        defaultValue={bank?.accountNumber}
        required
      />
      <Field label="IBAN" name="iban" defaultValue={bank?.iban} hint="MN95... (заавал биш)" />
      <Field
        label="Дансны эзэмшигч *"
        name="account_holder"
        defaultValue={bank?.accountHolder}
        required
      />
      <Field
        label="Эрэмблэлт"
        name="sort_order"
        type="number"
        defaultValue="1"
        hint="Жижиг тоо эхэнд гарна"
      />

      {message && (
        <div
          className={`flex items-start gap-2 rounded-2xl px-4 py-3 text-sm ${
            message.ok
              ? "border border-green-200 bg-green-50 text-green-800"
              : "border border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.ok ? (
            <Check size={16} className="mt-0.5 shrink-0" />
          ) : (
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
          )}
          <p>{message.text}</p>
        </div>
      )}

      <div className="flex items-center gap-3 border-t border-border pt-6">
        <button
          type="submit"
          disabled={pending}
          className="ios-press inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-ios-md transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ background: "var(--brand)" }}
        >
          {pending && <Loader2 size={14} className="animate-spin" />}
          {pending ? "Хадгалж байна..." : submitLabel}
        </button>
        <Link
          href="/admin/banks"
          className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
        >
          Цуцлах
        </Link>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="mt-1.5 w-full rounded-2xl bg-muted px-4 py-3.5 text-base outline-none transition-all focus:bg-background-pure focus:shadow-ios-sm"
      />
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
