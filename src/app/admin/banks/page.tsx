import { Plus } from "lucide-react";
import Link from "next/link";
import { getAllBankAccountsAdmin } from "@/lib/data";
import { BankLogo } from "@/components/BankLogo";
import { BankRowActions } from "@/components/admin/BankRowActions";

export default async function AdminBanksPage() {
  const banks = await getAllBankAccountsAdmin();
  const isActiveById = await getBankActiveMap();

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
        <Link
          href="/admin/banks/new"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-xs uppercase tracking-widest text-background transition-opacity hover:opacity-90"
        >
          <Plus size={14} /> Данс нэмэх
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {banks.length === 0 ? (
          <p className="col-span-full rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Данс байхгүй байна. "Данс нэмэх" товч дарна уу.
          </p>
        ) : (
          banks.map((bank) => {
            const active = isActiveById.get(bank.id) ?? true;
            return (
              <div
                key={bank.id}
                className={`rounded-2xl border p-6 ${active ? "border-border" : "border-dashed border-border opacity-60"}`}
              >
                <div className="flex items-start justify-between">
                  <BankLogo bankId={bank.id} bankName={bank.bankName} size={40} />
                  <BankRowActions bankId={bank.id} isActive={active} />
                </div>
                <p className="mt-4 text-lg font-medium">{bank.bankName}</p>
                <p className="mt-1 text-sm text-muted-foreground">{bank.accountHolder}</p>
                <p className="mt-4 font-mono text-xl">{bank.accountNumber}</p>
                {bank.iban && (
                  <p className="mt-1 font-mono text-xs text-muted-foreground">{bank.iban}</p>
                )}
                {!active && (
                  <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
                    Нуугдсан
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// Helper to get is_active flag (db.ts strips it). Direct query.
import { supabaseAdmin } from "@/lib/supabase";
async function getBankActiveMap(): Promise<Map<string, boolean>> {
  const { data } = await supabaseAdmin.from("bank_accounts").select("id, is_active");
  const m = new Map<string, boolean>();
  for (const row of (data ?? []) as { id: string; is_active: boolean }[]) {
    m.set(row.id, row.is_active);
  }
  return m;
}
