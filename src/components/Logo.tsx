import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Хадгалсан хэвтэй — image нь "LIVORA" текстийг агуулдаг тул дахин нэр гаргадаггүй */
  showWordmark?: boolean;
  href?: string;
}

const SIZES = {
  sm: 56,
  md: 80,
  lg: 160,
} as const;

export function Logo({ className, size = "md", href = "/" }: LogoProps) {
  const dimension = SIZES[size];

  const inner = (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center", className)}
      style={{ height: dimension, width: dimension }}
    >
      <Image
        src="/livora-logo.png"
        alt="Livora"
        width={dimension * 2}
        height={dimension * 2}
        className="h-full w-full object-contain"
        priority
        data-no-dim
      />
    </span>
  );

  if (!href) return inner;
  return <Link href={href}>{inner}</Link>;
}
