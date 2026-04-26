import { Plus, Edit, Trash2 } from "lucide-react";
import { BANK_ACCOUNTS } from "@/lib/data";

export default function AdminBanksPage() {
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <p className="brand-wordmark text-xs uppercase text-muted-foreground">Дансны мэдээлэл</p>
          <h1 className="mt-2 text-3xl font-light">Банкны данс удирдах</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Хэрэглэгч худалдан авалт хийхдээ эдгээр данс руу шилжүүлэг хийнэ.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-xs uppercase tracking-widest text-background transition-opacity hover:opacity-90"
        >
          <Plus size={14} /> Данс нэмэх
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BANK_ACCOUNTS.map((bank) => (
          <div key={bank.id} className="rounded-2xl border border-border p-6">
            <div className="flex items-start justify-between">
              <span className="text-3xl">{bank.logoEmoji}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Засах"
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Edit size={14} />
                </button>
                <button
                  type="button"
                  aria-label="Устгах"
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p className="mt-4 text-lg font-medium">{bank.bankName}</p>
            <p className="mt-1 text-sm text-muted-foreground">{bank.accountHolder}</p>
            <p className="mt-4 font-mono text-xl">{bank.accountNumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
