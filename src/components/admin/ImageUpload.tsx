"use client";

import { useRef, useState } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";

export function ImageUpload({
  name,
  defaultValue,
  folder = "covers",
  label = "Зураг",
  hint,
}: {
  name: string;
  defaultValue?: string;
  folder?: string;
  label?: string;
  hint?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);
      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Алдаа гарлаа");
      setUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Алдаа гарлаа");
    } finally {
      setUploading(false);
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  };

  const clear = () => {
    setUrl("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </label>

      <input type="hidden" name={name} value={url} />

      {url ? (
        <div className="mt-2 group relative overflow-hidden rounded-2xl border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt="preview"
            className="h-48 w-full object-cover"
          />
          <button
            type="button"
            onClick={clear}
            className="ios-press absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black/80"
            aria-label="Зураг устгах"
          >
            <X size={16} />
          </button>
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent p-3 text-xs text-white">
            <span className="truncate">Байршуулсан</span>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="ios-press rounded-full bg-white/20 px-3 py-1 backdrop-blur-md hover:bg-white/30"
            >
              Солих
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={`mt-2 flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed py-12 transition-all ${
            dragOver
              ? "border-foreground bg-muted"
              : "border-border bg-muted/40 hover:bg-muted"
          }`}
        >
          {uploading ? (
            <>
              <Loader2 size={28} className="animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Байршуулж байна...</p>
            </>
          ) : (
            <>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-background-pure shadow-ios-sm">
                <Upload size={20} />
              </span>
              <div className="text-center">
                <p className="text-sm font-medium">Зураг сонгох эсвэл чирж тавь</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  PNG, JPG, WebP — 5MB хүртэл
                </p>
              </div>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
        onChange={onFileSelect}
        className="hidden"
      />

      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p className="mt-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
