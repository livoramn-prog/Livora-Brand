import Link from "next/link";
import { BankAccount } from "@/lib/types";

export function BankForm({
  bank,
  action,
  isEdit = false,
  submitLabel = "Хадгалах",
}: {
  bank?: BankAccount;
  action: (formData: FormData) => void | Promise<void>;
  isEdit?: boolean;
  submitLabel?: string;
}) {
  return (
    <form action={action} className="mt-8 max-w-xl space-y-6">
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

      <div className="flex items-center gap-3 border-t border-border pt-6">
        <button
          type="submit"
          className="rounded-full bg-foreground px-6 py-3 text-xs uppercase tracking-widest text-background transition-opacity hover:opacity-90"
        >
          {submitLabel}
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
      <label className="block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
      />
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
