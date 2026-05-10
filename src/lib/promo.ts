/**
 * Урам зориг бар + урамшууллын тохиргоо
 *
 * Хямдрал зогсох эсвэл өөрчлөхдөө доорх утгуудыг засна.
 * Дууссаны дараа автоматаар бар алга болж, үнэ хэвийн харагдана.
 */

export type PromoConfig = {
  active: boolean;
  discountPercent: number;
  endDateIso: string; // UTC
  message: string;
  shortMessage: string; // мобайл хувилбар
};

// ⚠️ Энд дансаа засна
export const PROMO = {
  active: true,                              // false болговол шууд унтарна
  discountPercent: 20,                       // % утга
  endDateIso: "2026-05-04T15:59:59Z",        // 2026-05-04 23:59 UB цаг (UTC+8) — 6 хоног
  message: "6 хоногийн онцгой санал — бүх Premium сургалт 20% хямдартай",
  shortMessage: "20% хямдрал",
};

export function isPromoActive(): boolean {
  if (!PROMO.active) return false;
  return Date.now() < new Date(PROMO.endDateIso).getTime();
}

export function applyDiscount(price: number): number {
  if (!isPromoActive() || price === 0) return price;
  // Хямдруулсан үнийг хамгийн ойрын 1,000-аар тоймлож харагдалтыг цэвэрхэн болгоно
  // (Жнь: 99,000 × 80% = 79,200 → 79,000)
  const raw = (price * (100 - PROMO.discountPercent)) / 100;
  return Math.round(raw / 1000) * 1000;
}

export function getPromoState() {
  const active = isPromoActive();
  return {
    active,
    discountPercent: PROMO.discountPercent,
    endDateIso: PROMO.endDateIso,
    message: PROMO.message,
    shortMessage: PROMO.shortMessage,
  };
}
