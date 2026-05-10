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
  discountPercent: 25,                       // % утга
  endDateIso: "2026-05-16T15:59:59Z",        // 2026-05-16 23:59 UB цаг (UTC+8)
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
