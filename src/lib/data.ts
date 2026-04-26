import { Article, BankAccount, Course, Order } from "./types";

export const COURSES: Course[] = [
  {
    id: "1",
    slug: "instagram-business-mastery",
    title: "Instagram Business Mastery",
    shortDescription: "Instagram дээр бизнесээ 0-ээс эхлүүлж сард 10 саяын борлуулалт хийх систем.",
    description:
      "Энэ сургалт нь Instagram дээр бизнесээ нээж, контент стратеги боловсруулж, target audience-аа таньж, борлуулалтын funnel байгуулах бүхий л алхмуудыг агуулсан. 12 модулиар хуваагдсан, 40+ цагийн видео, бэлэн загвар, checklist-үүдтэй.\n\nЮу сурах вэ:\n- Brand identity бүтээх\n- Контент календарь хийх\n- Reels стратеги\n- DM funnel байгуулах\n- Ads ажиллуулах\n- Analytics уншиж шинжлэх",
    category: "instagram",
    price: 299000,
    coverImage:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop",
    durationMinutes: 2400,
    lessons: 48,
    level: "Эхлэн",
    instructor: "Livora Team",
    rating: 4.9,
    studentsCount: 1247,
    isPublished: true,
    createdAt: "2026-01-15",
    files: [
      { id: "f1", name: "Модуль 1 - Brand Identity.mp4", type: "video", sizeMb: 245, url: "#" },
      { id: "f2", name: "Контент календарь template.xlsx", type: "xlsx", sizeMb: 0.8, url: "#" },
      { id: "f3", name: "DM funnel scripts.pdf", type: "pdf", sizeMb: 2.4, url: "#" },
    ],
  },
  {
    id: "2",
    slug: "digital-marketing-fundamentals",
    title: "Дижитал Маркетингийн Үндэс",
    shortDescription: "SEO, SMM, Email, Ads — бүх digital сувгуудыг нэг сургалтад.",
    description:
      "Дижитал маркетингийн бүх үндсэн ойлголтыг нэг дор. Facebook Ads, Google Ads, SEO, email marketing, content strategy, analytics.",
    category: "marketing",
    price: 199000,
    coverImage:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&auto=format&fit=crop",
    durationMinutes: 1800,
    lessons: 32,
    level: "Эхлэн",
    instructor: "Livora Team",
    rating: 4.8,
    studentsCount: 892,
    isPublished: true,
    createdAt: "2026-02-01",
    files: [
      { id: "f4", name: "Бүрэн сургалт.mp4", type: "video", sizeMb: 1800, url: "#" },
      { id: "f5", name: "Workbook.pdf", type: "pdf", sizeMb: 5.2, url: "#" },
    ],
  },
  {
    id: "3",
    slug: "online-shop-launch-guide",
    title: "Онлайн Шоп Эхлэх Гарын Авлага",
    shortDescription: "Shopify, e-commerce setup, бүтээгдэхүүн судалгаа, нийлүүлэлт — A-Z.",
    description: "Хэрхэн онлайн шоп нээх, бүтээгдэхүүн сонгох, нийлүүлэгчтэй холбогдох, маркетинг хийх бүх алхам.",
    category: "business",
    price: 249000,
    coverImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
    durationMinutes: 1500,
    lessons: 28,
    level: "Эхлэн",
    instructor: "Livora Team",
    rating: 4.7,
    studentsCount: 634,
    isPublished: true,
    createdAt: "2026-02-20",
    files: [
      { id: "f6", name: "Хичээл 1-28.mp4", type: "video", sizeMb: 1200, url: "#" },
      { id: "f7", name: "Бүтээгдэхүүн судалгааны template.xlsx", type: "xlsx", sizeMb: 0.5, url: "#" },
    ],
  },
  {
    id: "4",
    slug: "free-instagram-starter",
    title: "Instagram эхлэгчдэд Starter Pack",
    shortDescription: "Instagram-ыг бизнесд хэрхэн ашиглах эхний алхмууд. Үнэгүй.",
    description: "Бизнес дансаа нээж, эхний 100 фоловертоо хүрэх практик гарын авлага.",
    category: "instagram",
    price: 0,
    coverImage:
      "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&auto=format&fit=crop",
    durationMinutes: 90,
    lessons: 5,
    level: "Эхлэн",
    instructor: "Livora Team",
    rating: 4.9,
    studentsCount: 3421,
    isPublished: true,
    createdAt: "2026-03-01",
    files: [
      { id: "f8", name: "Starter Guide.pdf", type: "pdf", sizeMb: 3.1, url: "#" },
      { id: "f9", name: "Bio template.docx", type: "docx", sizeMb: 0.2, url: "#" },
    ],
  },
  {
    id: "5",
    slug: "stress-burnout-recovery",
    title: "Стресс ба Burnout-ийг даван туулах",
    shortDescription: "Сэтгэл зүйн ачаалал, ядаргаанаас гарах системтэй арга.",
    description:
      "Орчин үеийн хүний хамгийн том асуудал болсон стресс, burnout, сэтгэлийн дарамтыг шинжлэх ухаанаар нотлогдсон аргуудаар хэрхэн даван туулах вэ.\n\nАгуулга:\n- Стрессийн физиологи\n- Mindfulness дасгалууд\n- Унтлагын чанарыг сайжруулах\n- Хоолны зуршил\n- Хил хязгаар тогтоох",
    category: "wellness",
    price: 149000,
    coverImage:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop",
    durationMinutes: 720,
    lessons: 18,
    level: "Эхлэн",
    instructor: "Livora Team",
    rating: 5.0,
    studentsCount: 521,
    isPublished: true,
    createdAt: "2026-03-10",
    files: [
      { id: "f10", name: "Бүх хичээл.mp4", type: "video", sizeMb: 720, url: "#" },
      { id: "f11", name: "Дасгалын дэвтэр.pdf", type: "pdf", sizeMb: 4.5, url: "#" },
    ],
  },
  {
    id: "6",
    slug: "free-morning-routine",
    title: "7 хоногийн өглөөний зуршил",
    shortDescription: "Өглөө бүр сэргэг, эрч хүчтэй сэрэх 7 хоногийн challenge. Үнэгүй.",
    description: "Өглөө бүр илүү бүтээмжтэй, эрч хүчтэй эхлэх 21 хоногийн зуршил тогтоох төлөвлөгөө.",
    category: "lifestyle",
    price: 0,
    coverImage:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop",
    durationMinutes: 60,
    lessons: 7,
    level: "Эхлэн",
    instructor: "Livora Team",
    rating: 4.8,
    studentsCount: 2103,
    isPublished: true,
    createdAt: "2026-03-15",
    files: [
      { id: "f12", name: "7-day Challenge.pdf", type: "pdf", sizeMb: 1.8, url: "#" },
    ],
  },
  {
    id: "7",
    slug: "small-business-finance",
    title: "Жижиг бизнесийн санхүү",
    shortDescription: "Орлого, зарлага, татвар, хөрөнгө оруулалт — бизнес эзний санхүү.",
    description: "Жижиг бизнес эрхлэгч хүн заавал мэдэх ёстой санхүүгийн үндэс. Excel template болон real case study.",
    category: "business",
    price: 179000,
    coverImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop",
    durationMinutes: 600,
    lessons: 15,
    level: "Дунд",
    instructor: "Livora Team",
    rating: 4.7,
    studentsCount: 312,
    isPublished: true,
    createdAt: "2026-03-20",
    files: [
      { id: "f13", name: "Санхүүгийн модель.xlsx", type: "xlsx", sizeMb: 1.2, url: "#" },
      { id: "f14", name: "Бүх хичээл.mp4", type: "video", sizeMb: 600, url: "#" },
    ],
  },
  {
    id: "8",
    slug: "mindset-growth",
    title: "Growth Mindset — Хязгааргүй боломж",
    shortDescription: "Бодлын тогтолцоогоо өөрчилж, амьдралаа дээшлүүлэх практик курс.",
    description: "Carol Dweck-ийн судалгаанд тулгуурласан growth mindset-ийн практик хэрэглээ.",
    category: "mindset",
    price: 129000,
    coverImage:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&auto=format&fit=crop",
    durationMinutes: 480,
    lessons: 12,
    level: "Эхлэн",
    instructor: "Livora Team",
    rating: 4.9,
    studentsCount: 745,
    isPublished: true,
    createdAt: "2026-03-25",
    files: [
      { id: "f15", name: "Бүх хичээл.mp4", type: "video", sizeMb: 480, url: "#" },
      { id: "f16", name: "Дасгалын дэвтэр.pdf", type: "pdf", sizeMb: 2.8, url: "#" },
    ],
  },
];

export const ARTICLES: Article[] = [
  {
    id: "a1",
    slug: "stress-management-basics",
    title: "Стрессийг удирдах 5 нотлогдсон арга",
    excerpt:
      "Орчин үеийн хүний амьдралд стресс гэдэг бол тогтмол хамтрагч. Гэхдээ түүнийг удирдах боломжтой...",
    content:
      "Орчин үеийн хүний амьдралд стресс гэдэг бол тогтмол хамтрагч. Гэхдээ түүнийг удирдах боломжтой бөгөөд шинжлэх ухаанаар нотлогдсон практик аргууд бий.\n\n**1. Гүнзгий амьсгалын дасгал**\nӨдөрт 4-7-8 техник хийж үзээрэй. 4 секунд амьсгал авч, 7 секунд барьж, 8 секундэд гарга.\n\n**2. Body scan медитаци**\n10 минутын турш биеэ толгойноос хөл хүртэл скан хийж, хурцадмал газруудыг сулруулна.\n\n**3. Журнал бичих**\nӨдөрт 3 талархмаар зүйлээ бичих нь стрессийг 30%-р бууруулдаг.\n\n**4. Дасгал хийх**\n7 хоногт 150 минут дунд эрчимтэй дасгал нь cortisol-ыг бууруулна.\n\n**5. Хил хязгаар тогтоох**\n'Үгүй' гэж хэлэхэд сурах нь сэтгэлийн чөлөөт байдлын үндэс.",
    coverImage:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&auto=format&fit=crop",
    category: "mental-health",
    publishedAt: "2026-04-10",
    readMinutes: 6,
    author: "Livora Team",
  },
  {
    id: "a2",
    slug: "morning-routine-success",
    title: "Амжилттай хүмүүсийн өглөөний зуршил",
    excerpt: "Tim Cook, Oprah, Elon Musk нарын өглөөний зуршлуудаас сурах сонирхолтой зүйлс...",
    content:
      "Амжилттай хүмүүсийн өглөө бол тэдний өдрийн чанарыг тодорхойлдог. Энд дэлхийн топ удирдагчдын зуршил.\n\n**Эрт сэрэх**\nИхэнх нь 5-6 цагт сэрдэг.\n\n**Дасгал**\n30-60 минутын дасгал — кардио, йога, эсвэл хүчний.\n\n**Медитаци**\n10-20 минутын дотоод тайван цаг.\n\n**Унших**\n30 минутын ном унших — мэдлэгийн хөрөнгө оруулалт.\n\n**Чухал зүйлээс эхлэх**\nӨдрийн хамгийн чухал ажлыг эхэнд нь хийх (eat the frog principle).",
    coverImage:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop",
    category: "motivation",
    publishedAt: "2026-04-15",
    readMinutes: 5,
    author: "Livora Team",
  },
  {
    id: "a3",
    slug: "instagram-growth-2026",
    title: "2026 онд Instagram-аар фоловер цуглуулах 7 арга",
    excerpt: "Algorithm өөрчлөгдсөн ч ажилладаг бодит стратегиуд...",
    content:
      "Instagram алгоритм 2026 онд маш их өөрчлөгдсөн. Энд яг одоо ажиллаж буй стратегиуд.\n\n**1. Reels-д анхаарах**\nReels хамгийн их reach өгсөөр.\n\n**2. Carousel постууд**\nSave болон share өндөр.\n\n**3. SEO бичвэр**\nКаптион дотор keyword ашиглах.\n\n**4. Тогтмол байх**\n7 хоногт 3-5 удаа пост.\n\n**5. DM-р холбогдох**\nХариу бичиж буй фоловертой жинхэнэ харилцаа үүсгэх.\n\n**6. Trend-ийг ашиглах**\nGGYM trending audio, hashtag.\n\n**7. Collaboration**\nӨөр creator-уудтай хамтрах.",
    coverImage:
      "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&auto=format&fit=crop",
    category: "business",
    publishedAt: "2026-04-20",
    readMinutes: 7,
    author: "Livora Team",
  },
  {
    id: "a4",
    slug: "burnout-recovery",
    title: "Burnout-аас сэргэх 30 хоногийн төлөвлөгөө",
    excerpt: "Сэтгэлийн ядаргаа бол тэмдэг. Хэрхэн сэргэх вэ?",
    content:
      "Burnout бол урт хугацааны стрессийн үр дүн. Сэргэх боломжтой, гэхдээ цаг хэрэгтэй.\n\n**Эхний 7 хоног — Тайван**\n- Унтлагын хуваарийг сэргээх\n- Эрчтэй ажлуудыг хойшлуулах\n- Гадаа алхах\n\n**8-14 хоног — Бие**\n- Зөв хооллох\n- Хөнгөн дасгал\n- Хөл хийх\n\n**15-21 хоног — Сэтгэл**\n- Сэтгэл зүйчтэй уулзах\n- Журнал бичих\n- Hobby сэргээх\n\n**22-30 хоног — Эргэн орох**\n- Ажилдаа аажмаар орох\n- Хил хязгаар тогтоох\n- Урт хугацааны төлөвлөгөө",
    coverImage:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop",
    category: "wellness",
    publishedAt: "2026-04-22",
    readMinutes: 8,
    author: "Livora Team",
  },
];

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    id: "tdb",
    bankName: "ХХБ (TDB)",
    accountNumber: "426068518",
    iban: "MN950004000426068518",
    accountHolder: "Чинбам Мөнхжаргал",
    logoEmoji: "🏦",
  },
  {
    id: "khas",
    bankName: "Хас Банк",
    accountNumber: "5004519704",
    iban: "MN620032005004519704",
    accountHolder: "Чинбам Мөнхжаргал",
    logoEmoji: "🏛️",
  },
];

export const ORDERS: Order[] = [
  {
    id: "o1",
    courseId: "1",
    courseTitle: "Instagram Business Mastery",
    customerName: "Болор Б.",
    customerEmail: "bolor@example.com",
    customerPhone: "99112233",
    amount: 299000,
    status: "pending",
    bankAccountUsed: "ХХБ (TDB)",
    createdAt: "2026-04-24",
  },
  {
    id: "o2",
    courseId: "5",
    courseTitle: "Стресс ба Burnout-ийг даван туулах",
    customerName: "Сараа Г.",
    customerEmail: "saraa@example.com",
    customerPhone: "88445566",
    amount: 149000,
    status: "completed",
    bankAccountUsed: "Хас Банк",
    createdAt: "2026-04-22",
  },
  {
    id: "o3",
    courseId: "2",
    courseTitle: "Дижитал Маркетингийн Үндэс",
    customerName: "Энхбаяр Д.",
    customerEmail: "enkhbayar@example.com",
    customerPhone: "95553344",
    amount: 199000,
    status: "completed",
    bankAccountUsed: "ХХБ (TDB)",
    createdAt: "2026-04-20",
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getFreeCourses(): Course[] {
  return COURSES.filter((c) => c.price === 0);
}

export function getPaidCourses(): Course[] {
  return COURSES.filter((c) => c.price > 0);
}

export function getFeaturedCourses(limit = 6): Course[] {
  return [...COURSES].sort((a, b) => b.studentsCount - a.studentsCount).slice(0, limit);
}
