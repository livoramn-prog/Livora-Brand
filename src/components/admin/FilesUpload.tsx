"use client";

import { useRef, useState } from "react";
import {
  Upload,
  X,
  FileText,
  FileVideo,
  FileImage,
  FileSpreadsheet,
  FileType2,
  Loader2,
  Plus,
} from "lucide-react";

type UploadedFile = {
  name: string;
  type: string;
  sizeMb: number;
  url: string;
};

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  video: FileVideo,
  pdf: FileText,
  docx: FileType2,
  xlsx: FileSpreadsheet,
  png: FileImage,
  zip: FileText,
};

const TYPE_LABEL: Record<string, string> = {
  video: "Видео",
  pdf: "PDF",
  docx: "Word",
  xlsx: "Excel",
  png: "Зураг",
  zip: "Архив",
};

export function FilesUpload({
  name,
  defaultValue,
  folder = "course-files",
  label = "Сургалтын файлууд",
}: {
  name: string;
  defaultValue?: UploadedFile[];
  folder?: string;
  label?: string;
}) {
  const [files, setFiles] = useState<UploadedFile[]>(defaultValue ?? []);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (fileList: FileList) => {
    setError(null);
    setUploading(true);
    try {
      const uploaded: UploadedFile[] = [];
      for (const file of Array.from(fileList)) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("folder", folder);
        const res = await fetch("/api/admin/upload-file", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Алдаа");
        uploaded.push({
          name: data.name,
          type: data.type,
          sizeMb: data.sizeMb,
          url: data.url,
        });
      }
      setFiles((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Алдаа гарлаа");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const remove = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <div className="flex items-end justify-between">
        <label className="block text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </label>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="ios-press inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-background-pure hover:shadow-ios-sm disabled:opacity-50"
        >
          {uploading ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />}
          {uploading ? "Байршуулж байна..." : "Файл нэмэх"}
        </button>
      </div>

      <input type="hidden" name={name} value={JSON.stringify(files)} />

      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf,.mp4,.mov,.webm,.docx,.doc,.xlsx,.xls,.png,.jpg,.jpeg,.webp,.zip"
        onChange={(e) => e.target.files && upload(e.target.files)}
        className="hidden"
      />

      <div className="mt-3 space-y-2">
        {files.length === 0 ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/40 py-10 transition-colors hover:bg-muted"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background-pure shadow-ios-sm">
              <Upload size={16} />
            </span>
            <p className="text-sm font-medium">Видео, PDF, Word, Excel оруул</p>
            <p className="text-xs text-muted-foreground">Олон файл сонгож болно · 50MB хүртэл</p>
          </button>
        ) : (
          files.map((f, i) => {
            const Icon = ICON_MAP[f.type] || FileText;
            return (
              <div
                key={i}
                className="flex items-center gap-3 rounded-2xl border border-border bg-background-pure p-3"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border">
                  <Icon size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{f.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {TYPE_LABEL[f.type] || f.type.toUpperCase()} · {f.sizeMb} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  aria-label="Устгах"
                  className="ios-press inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X size={14} />
                </button>
              </div>
            );
          })
        )}
      </div>

      {error && (
        <p className="mt-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
