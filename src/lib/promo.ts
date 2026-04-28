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
export const PROMO: PromoConfig = {
  active: true,
  discountPercent: 25,
  // Энэ долоо хоногийн ням гарагт 23:59 Улаанбаатарын цагаар (UTC+8)
  endDateIso: "2026-05-03T15:59:59Z",
  message: "Зөвхөн энэ долоо хоногт бүх Premium сургалт 25% хямдартай",
  shortMessage: "25% хямдрал",
};

export function isPromoActive(): boolean {
  if (!PROMO.active) return false;
  return Date.now() < new Date(PROMO.endDateIso).getTime();
}

export function applyDiscount(price: number): number {
  if (!isPromoActive() || price === 0) return price;
  return Math.round((price * (100 - PROMO.discountPercent)) / 100);
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
