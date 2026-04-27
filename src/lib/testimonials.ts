// Сурагчдын жишээ сэтгэгдэл — энэ файлыг засаж бодит сэтгэгдлээр сольж болно.
// Course slug-аар бүлэглэсэн. Шинэ курс нэмэхэд testimonial-аа нэмж болно.

export type Testimonial = {
  name: string;
  role: string;
  text: string;
  rating: number;
};

const GENERIC_BUSINESS: Testimonial[] = [
  {
    name: "Энхбаяр Д.",
    role: "Жижиг бизнес эзэн",
    text: "Энэ сургалтын дараа Instagram дээрээ contentээ илүү цэгцтэй болгож, эхний 2 сард худалдаа 3 дахин нэмэгдсэн. Хичээлүүд нь маш практик.",
    rating: 5,
  },
  {
    name: "Болор М.",
    role: "Маркетингийн мэргэжилтэн",
    text: "Нэг газар бүгд байгаа нь сайхан байна. Видео + PDF + шаблон бүрэн бэлэн. 2-3 цагт уншиж дуусаад шууд хэрэглэхээ эхэлсэн.",
    rating: 5,
  },
  {
    name: "Сараа Т.",
    role: "Online shop эзэн",
    text: "Татаж авч уншсан зүйлээ шууд бизнестээ хэрэгжүүлж эхэлсэн. Үр дүн нь шууд харагдсан. Чанарын хувьд маш сайн.",
    rating: 5,
  },
];

const GENERIC_WELLNESS: Testimonial[] = [
  {
    name: "Туяа Б.",
    role: "Сурагч",
    text: "Стресст автагдсан үед таарсан сургалт. Дасгалууд нь маш хялбар, өдөр бүр хийж сурахад амьдрал маань өөрчлөгдсөн.",
    rating: 5,
  },
  {
    name: "Алтанзул Г.",
    role: "Эх",
    text: "Унтлагын чанарт ихэд анхаарал хандуулдаг болсон. Mindfulness техник нь үнэхээр ажилладаг гэдэг нь батлагдсан.",
    rating: 5,
  },
  {
    name: "Нямдорж Э.",
    role: "Менежер",
    text: "Burnout-той байсан үед энэ сургалт олж сонссон. 30 хоногийн төлөвлөгөөг дагаж эрч хүчээ эргүүлж олж авсан.",
    rating: 5,
  },
];

const GENERIC_INSTAGRAM: Testimonial[] = [
  {
    name: "Цэнгэл Б.",
    role: "Контент бүтээгч",
    text: "0 фоловертой эхлээд 3 сарын дараа 5K хүрсэн. Reels стратеги нь үнэхээр ажилладаг. Хичээлүүд маш системтэй.",
    rating: 5,
  },
  {
    name: "Мөнхзул Д.",
    role: "Brand owner",
    text: "DM funnel нь хамгийн их үр дүн өгсөн. Худалдаа нэмэгдээд төдийгүй харилцагчид давтан худалдан авч байна.",
    rating: 5,
  },
  {
    name: "Дөлгөөн Х.",
    role: "Жижиг бизнес",
    text: "Контент календарь template нь миний цагийг 2 дахин хэмнэсэн. Одоо тогтмол постлох боломжтой болсон.",
    rating: 4,
  },
];

const GENERIC_DEFAULT: Testimonial[] = [
  {
    name: "Чимэг О.",
    role: "Сурагч",
    text: "Сургалтын чанар, агуулга маш сайн. Монгол хэл дээр ийм системтэй сургалт олох нь ховор.",
    rating: 5,
  },
  {
    name: "Бат-Эрдэнэ Г.",
    role: "Сурагч",
    text: "Бэлэн материал, шаблонуудтайгаа цаг хэмнэх боломжтой. Шууд хэрэглэж эхлэхэд хялбар.",
    rating: 5,
  },
  {
    name: "Оюун-Эрдэнэ С.",
    role: "Сурагч",
    text: "Тайлбар тодорхой, дараалсан байдалтай. Эхлэгчдэд маш ойлгомжтой.",
    rating: 5,
  },
];

export function getTestimonialsForCategory(category: string): Testimonial[] {
  switch (category) {
    case "business":
    case "marketing":
      return GENERIC_BUSINESS;
    case "wellness":
    case "mindset":
      return GENERIC_WELLNESS;
    case "instagram":
      return GENERIC_INSTAGRAM;
    default:
      return GENERIC_DEFAULT;
  }
}
