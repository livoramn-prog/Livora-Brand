"use client";

import { useTransition } from "react";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { deleteBank, toggleBankActive } from "@/app/admin/_actions";

export function BankRowActions({
  bankId,
  isActive,
}: {
  bankId: string;
  isActive: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-1">
      <Link
        href={`/admin/banks/${bankId}/edit`}
        aria-label="Засах"
        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Edit size={14} />
      </Link>
      <button
        type="button"
        onClick={() => startTransition(() => toggleBankActive(bankId, !isActive))}
        disabled={pending}
        aria-label={isActive ? "Нуух" : "Идэвхжүүлэх"}
        title={isActive ? "Нуух" : "Идэвхжүүлэх"}
        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
      >
        {isActive ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>
      <button
        type="button"
        onClick={() => {
          if (!confirm("Дансыг устгах уу?")) return;
          startTransition(() => deleteBank(bankId));
        }}
        disabled={pending}
        aria-label="Устгах"
        className="rounded-full p-2 text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
