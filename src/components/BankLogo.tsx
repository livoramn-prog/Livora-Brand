type BankLogoConfig = {
  bg: string;
  fg: string;
  label: string;
};

const CONFIG: Record<string, BankLogoConfig> = {
  tdb: { bg: "#005F3C", fg: "#ffffff", label: "TDB" },
  khas: { bg: "#C8102E", fg: "#ffffff", label: "Хас" },
};

const FALLBACK: BankLogoConfig = { bg: "#000000", fg: "#ffffff", label: "?" };

export function BankLogo({ bankId, size = 44 }: { bankId: string; size?: number }) {
  const cfg = CONFIG[bankId] ?? FALLBACK;

  return (
    <div
      className="inline-flex shrink-0 items-center justify-center rounded-xl font-semibold tracking-tight"
      style={{
        width: size,
        height: size,
        backgroundColor: cfg.bg,
        color: cfg.fg,
        fontSize: size * 0.32,
      }}
      aria-hidden="true"
    >
      {cfg.label}
    </div>
  );
}
