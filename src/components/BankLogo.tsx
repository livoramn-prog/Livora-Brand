import Image from "next/image";

const KNOWN_LOGOS: Record<string, { src: string; alt: string; bg: string }> = {
  tdb: { src: "/banks/tdb.png", alt: "ХХБ (TDB)", bg: "#ffffff" },
  khas: { src: "/banks/khas.png", alt: "Хас Банк", bg: "#ffffff" },
};

export function BankLogo({
  bankId,
  bankName,
  size = 44,
}: {
  bankId: string;
  bankName?: string;
  size?: number;
}) {
  const logo = KNOWN_LOGOS[bankId];

  if (logo) {
    return (
      <div
        className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border"
        style={{
          width: size * 2,
          height: size,
          backgroundColor: logo.bg,
        }}
      >
        <Image
          src={logo.src}
          alt={logo.alt}
          width={size * 2}
          height={size}
          className="h-full w-full object-contain p-1.5"
        />
      </div>
    );
  }

  // Fallback for unknown banks: text initials
  const initial = (bankName ?? bankId).trim().slice(0, 2).toUpperCase();
  return (
    <div
      className="inline-flex shrink-0 items-center justify-center rounded-xl bg-foreground font-semibold text-background"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.32,
      }}
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}
