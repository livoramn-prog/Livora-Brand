import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  href?: string;
}

export function Logo({ className, size = "md", showWordmark = true, href = "/" }: LogoProps) {
  const sizes = {
    sm: { mark: 24, text: "text-sm" },
    md: { mark: 32, text: "text-base" },
    lg: { mark: 56, text: "text-2xl" },
  };
  const { mark, text } = sizes[size];

  const inner = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg
        width={mark}
        height={mark}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M14 8 L14 44 L26 44"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          fill="none"
        />
        <path
          d="M30 12 L30 44 L42 44"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="square"
          fill="none"
        />
      </svg>
      {showWordmark && (
        <span className={cn("brand-wordmark uppercase", text)}>Livora</span>
      )}
    </span>
  );

  if (!href) return inner;
  return <Link href={href}>{inner}</Link>;
}
