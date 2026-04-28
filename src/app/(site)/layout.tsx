import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PromoBar } from "@/components/PromoBar";
import { getPromoState } from "@/lib/promo";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const promo = getPromoState();

  return (
    <>
      {promo.active && (
        <PromoBar
          endDateIso={promo.endDateIso}
          message={promo.message}
          shortMessage={promo.shortMessage}
        />
      )}
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
