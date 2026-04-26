import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BankForm } from "@/components/admin/BankForm";
import { updateBank } from "@/app/admin/_actions";
import { supabaseAdmin } from "@/lib/supabase";

export default async function EditBankPage(props: PageProps<"/admin/banks/[id]/edit">) {
  const { id } = await props.params;
  const { data } = await supabaseAdmin.from("bank_accounts").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  const bank = {
    id: data.id,
    bankName: data.bank_name,
    accountNumber: data.account_number,
    iban: data.iban ?? undefined,
    accountHolder: data.account_holder,
    logoEmoji: "🏦",
  };

  const action = updateBank.bind(null, id);

  return (
    <div>
      <Link
        href="/admin/banks"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={12} /> Дансууд руу
      </Link>
      <h1 className="mt-4 text-3xl font-light">Данс засах</h1>
      <BankForm bank={bank} action={action} isEdit submitLabel="Хадгалах" />
    </div>
  );
}
