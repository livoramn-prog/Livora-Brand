import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BankForm } from "@/components/admin/BankForm";
import { createBank } from "@/app/admin/_actions";

export default function NewBankPage() {
  return (
    <div>
      <Link
        href="/admin/banks"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={12} /> Дансууд руу
      </Link>
      <h1 className="mt-4 text-3xl font-light">Шинэ данс нэмэх</h1>
      <BankForm action={createBank} submitLabel="Данс үүсгэх" />
    </div>
  );
}
