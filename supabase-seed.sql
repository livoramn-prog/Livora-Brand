-- =====================================================================
-- ХУУЧИН ЖИШЭЭ ӨГӨГДЛИЙГ SUPABASE РУУ ОРУУЛАХ
-- (Хүснэгтүүд аль хэдийн үүссэн байх ёстой)
-- =====================================================================

-- БАНКНЫ ДАНСУУД
insert into bank_accounts (id, bank_name, account_number, iban, account_holder, is_active, sort_order) values
  ('tdb', 'ХХБ (TDB)', '426068518', 'MN950004000426068518', 'Чинбам Мөнхжаргал', true, 1),
  ('khas', 'Хас Банк', '5004519704', 'MN620032005004519704', 'Чинбам Мөнхжаргал', true, 2);

-- КУРСУУД
insert into courses (slug, title, short_description, description, category, price, cover_image, duration_minutes, lessons, level, instructor, rating, students_count, is_published, created_at) values
  ('instagram-business-mastery', 'Instagram Business Mastery', 'Instagram дээр бизнесээ 0-ээс эхлүүлж сард 10 саяын борлуулалт хийх систем.', E'Энэ сургалт нь Instagram дээр бизнесээ нээж, контент стратеги боловсруулж, target audience-аа таньж, борлуулалтын funnel байгуулах бүхий л алхмуудыг агуулсан. 12 модулиар хуваагдсан, 40+ цагийн видео, бэлэн загвар, checklist-үүдтэй.\n\nЮу сурах вэ:\n- Brand identity бүтээх\n- Контент календарь хийх\n- Reels стратеги\n- DM funnel байгуулах\n- Ads ажиллуулах\n- Analytics уншиж шинжлэх', 'instagram', 299000, 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop', 2400, 48, 'Эхлэн', 'Livora Team', 4.9, 1247, true, '2026-01-15'),
  ('digital-marketing-fundamentals', 'Дижитал Маркетингийн Үндэс', 'SEO, SMM, Email, Ads — бүх digital сувгуудыг нэг сургалтад.', 'Дижитал маркетингийн бүх үндсэн ойлголтыг нэг дор. Facebook Ads, Google Ads, SEO, email marketing, content strategy, analytics.', 'marketing', 199000, 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&auto=format&fit=crop', 1800, 32, 'Эхлэн', 'Livora Team', 4.8, 892, true, '2026-02-01'),
  ('online-shop-launch-guide', 'Онлайн Шоп Эхлэх Гарын Авлага', 'Shopify, e-commerce setup, бүтээгдэхүүн судалгаа, нийлүүлэлт — A-Z.', 'Хэрхэн онлайн шоп нээх, бүтээгдэхүүн сонгох, нийлүүлэгчтэй холбогдох, маркетинг хийх бүх алхам.', 'business', 249000, 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop', 1500, 28, 'Эхлэн', 'Livora Team', 4.7, 634, true, '2026-02-20'),
  ('free-instagram-starter', 'Instagram эхлэгчдэд Starter Pack', 'Instagram-ыг бизнесд хэрхэн ашиглах эхний алхмууд. Үнэгүй.', 'Бизнес дансаа нээж, эхний 100 фоловертоо хүрэх практик гарын авлага.', 'instagram', 0, 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&auto=format&fit=crop', 90, 5, 'Эхлэн', 'Livora Team', 4.9, 3421, true, '2026-03-01'),
  ('stress-burnout-recovery', 'Стресс ба Burnout-ийг даван туулах', 'Сэтгэл зүйн ачаалал, ядаргаанаас гарах системтэй арга.', E'Орчин үеийн хүний хамгийн том асуудал болсон стресс, burnout, сэтгэлийн дарамтыг шинжлэх ухаанаар нотлогдсон аргуудаар хэрхэн даван туулах вэ.\n\nАгуулга:\n- Стрессийн физиологи\n- Mindfulness дасгалууд\n- Унтлагын чанарыг сайжруулах\n- Хоолны зуршил\n- Хил хязгаар тогтоох', 'wellness', 149000, 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop', 720, 18, 'Эхлэн', 'Livora Team', 5.0, 521, true, '2026-03-10'),
  ('free-morning-routine', '7 хоногийн өглөөний зуршил', 'Өглөө бүр сэргэг, эрч хүчтэй сэрэх 7 хоногийн challenge. Үнэгүй.', 'Өглөө бүр илүү бүтээмжтэй, эрч хүчтэй эхлэх 21 хоногийн зуршил тогтоох төлөвлөгөө.', 'lifestyle', 0, 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop', 60, 7, 'Эхлэн', 'Livora Team', 4.8, 2103, true, '2026-03-15'),
  ('small-business-finance', 'Жижиг бизнесийн санхүү', 'Орлого, зарлага, татвар, хөрөнгө оруулалт — бизнес эзний санхүү.', 'Жижиг бизнес эрхлэгч хүн заавал мэдэх ёстой санхүүгийн үндэс. Excel template болон real case study.', 'business', 179000, 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop', 600, 15, 'Дунд', 'Livora Team', 4.7, 312, true, '2026-03-20'),
  ('mindset-growth', 'Growth Mindset — Хязгааргүй боломж', 'Бодлын тогтолцоогоо өөрчилж, амьдралаа дээшлүүлэх практик курс.', 'Carol Dweck-ийн судалгаанд тулгуурласан growth mindset-ийн практик хэрэглээ.', 'mindset', 129000, 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&auto=format&fit=crop', 480, 12, 'Эхлэн', 'Livora Team', 4.9, 745, true, '2026-03-25');

-- КУРСЫН ФАЙЛУУД
insert into course_files (course_id, name, type, size_mb, url)
select c.id, f.name, f.type, f.size_mb, f.url from courses c, (values
  ('instagram-business-mastery', 'Модуль 1 - Brand Identity.mp4', 'video', 245, '#'),
  ('instagram-business-mastery', 'Контент календарь template.xlsx', 'xlsx', 0.8, '#'),
  ('instagram-business-mastery', 'DM funnel scripts.pdf', 'pdf', 2.4, '#'),
  ('digital-marketing-fundamentals', 'Бүрэн сургалт.mp4', 'video', 1800, '#'),
  ('digital-marketing-fundamentals', 'Workbook.pdf', 'pdf', 5.2, '#'),
  ('online-shop-launch-guide', 'Хичээл 1-28.mp4', 'video', 1200, '#'),
  ('online-shop-launch-guide', 'Бүтээгдэхүүн судалгааны template.xlsx', 'xlsx', 0.5, '#'),
  ('free-instagram-starter', 'Starter Guide.pdf', 'pdf', 3.1, '#'),
  ('free-instagram-starter', 'Bio template.docx', 'docx', 0.2, '#'),
  ('stress-burnout-recovery', 'Бүх хичээл.mp4', 'video', 720, '#'),
  ('stress-burnout-recovery', 'Дасгалын дэвтэр.pdf', 'pdf', 4.5, '#'),
  ('free-morning-routine', '7-day Challenge.pdf', 'pdf', 1.8, '#'),
  ('small-business-finance', 'Санхүүгийн модель.xlsx', 'xlsx', 1.2, '#'),
  ('small-business-finance', 'Бүх хичээл.mp4', 'video', 600, '#'),
  ('mindset-growth', 'Бүх хичээл.mp4', 'video', 480, '#'),
  ('mindset-growth', 'Дасгалын дэвтэр.pdf', 'pdf', 2.8, '#')
) as f(course_slug, name, type, size_mb, url)
where c.slug = f.course_slug;

-- НИЙТЛЭЛҮҮД
insert into articles (slug, title, excerpt, content, cover_image, category, read_minutes, author, published_at) values
  ('stress-management-basics', 'Стрессийг удирдах 5 нотлогдсон арга', 'Орчин үеийн хүний амьдралд стресс гэдэг бол тогтмол хамтрагч. Гэхдээ түүнийг удирдах боломжтой...', E'Орчин үеийн хүний амьдралд стресс гэдэг бол тогтмол хамтрагч. Гэхдээ түүнийг удирдах боломжтой бөгөөд шинжлэх ухаанаар нотлогдсон практик аргууд бий.\n\n**1. Гүнзгий амьсгалын дасгал**\nӨдөрт 4-7-8 техник хийж үзээрэй. 4 секунд амьсгал авч, 7 секунд барьж, 8 секундэд гарга.\n\n**2. Body scan медитаци**\n10 минутын турш биеэ толгойноос хөл хүртэл скан хийж, хурцадмал газруудыг сулруулна.\n\n**3. Журнал бичих**\nӨдөрт 3 талархмаар зүйлээ бичих нь стрессийг 30%-р бууруулдаг.\n\n**4. Дасгал хийх**\n7 хоногт 150 минут дунд эрчимтэй дасгал нь cortisol-ыг бууруулна.\n\n**5. Хил хязгаар тогтоох**\n''Үгүй'' гэж хэлэхэд сурах нь сэтгэлийн чөлөөт байдлын үндэс.', 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&auto=format&fit=crop', 'mental-health', 6, 'Livora Team', '2026-04-10'),
  ('morning-routine-success', 'Амжилттай хүмүүсийн өглөөний зуршил', 'Tim Cook, Oprah, Elon Musk нарын өглөөний зуршлуудаас сурах сонирхолтой зүйлс...', E'Амжилттай хүмүүсийн өглөө бол тэдний өдрийн чанарыг тодорхойлдог. Энд дэлхийн топ удирдагчдын зуршил.\n\n**Эрт сэрэх**\nИхэнх нь 5-6 цагт сэрдэг.\n\n**Дасгал**\n30-60 минутын дасгал — кардио, йога, эсвэл хүчний.\n\n**Медитаци**\n10-20 минутын дотоод тайван цаг.\n\n**Унших**\n30 минутын ном унших — мэдлэгийн хөрөнгө оруулалт.\n\n**Чухал зүйлээс эхлэх**\nӨдрийн хамгийн чухал ажлыг эхэнд нь хийх (eat the frog principle).', 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop', 'motivation', 5, 'Livora Team', '2026-04-15'),
  ('instagram-growth-2026', '2026 онд Instagram-аар фоловер цуглуулах 7 арга', 'Algorithm өөрчлөгдсөн ч ажилладаг бодит стратегиуд...', E'Instagram алгоритм 2026 онд маш их өөрчлөгдсөн. Энд яг одоо ажиллаж буй стратегиуд.\n\n**1. Reels-д анхаарах**\nReels хамгийн их reach өгсөөр.\n\n**2. Carousel постууд**\nSave болон share өндөр.\n\n**3. SEO бичвэр**\nКаптион дотор keyword ашиглах.\n\n**4. Тогтмол байх**\n7 хоногт 3-5 удаа пост.\n\n**5. DM-р холбогдох**\nХариу бичиж буй фоловертой жинхэнэ харилцаа үүсгэх.\n\n**6. Trend-ийг ашиглах**\nGGYM trending audio, hashtag.\n\n**7. Collaboration**\nӨөр creator-уудтай хамтрах.', 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&auto=format&fit=crop', 'business', 7, 'Livora Team', '2026-04-20'),
  ('burnout-recovery', 'Burnout-аас сэргэх 30 хоногийн төлөвлөгөө', 'Сэтгэлийн ядаргаа бол тэмдэг. Хэрхэн сэргэх вэ?', E'Burnout бол урт хугацааны стрессийн үр дүн. Сэргэх боломжтой, гэхдээ цаг хэрэгтэй.\n\n**Эхний 7 хоног — Тайван**\n- Унтлагын хуваарийг сэргээх\n- Эрчтэй ажлуудыг хойшлуулах\n- Гадаа алхах\n\n**8-14 хоног — Бие**\n- Зөв хооллох\n- Хөнгөн дасгал\n- Хөл хийх\n\n**15-21 хоног — Сэтгэл**\n- Сэтгэл зүйчтэй уулзах\n- Журнал бичих\n- Hobby сэргээх\n\n**22-30 хоног — Эргэн орох**\n- Ажилдаа аажмаар орох\n- Хил хязгаар тогтоох\n- Урт хугацааны төлөвлөгөө', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop', 'wellness', 8, 'Livora Team', '2026-04-22');

-- 3 ЖИШЭЭ ЗАХИАЛГА (туршихад зориулсан)
insert into orders (course_id, course_title, customer_name, customer_email, customer_phone, amount, bank_used, status, created_at)
select c.id, c.title, o.customer_name, o.customer_email, o.customer_phone, o.amount, o.bank_used, o.status, o.created_at
from courses c, (values
  ('instagram-business-mastery', 'Болор Б.', 'bolor@example.com', '99112233', 299000, 'ХХБ (TDB)', 'pending', '2026-04-24'::timestamptz),
  ('stress-burnout-recovery', 'Сараа Г.', 'saraa@example.com', '88445566', 149000, 'Хас Банк', 'completed', '2026-04-22'::timestamptz),
  ('digital-marketing-fundamentals', 'Энхбаяр Д.', 'enkhbayar@example.com', '95553344', 199000, 'ХХБ (TDB)', 'completed', '2026-04-20'::timestamptz)
) as o(course_slug, customer_name, customer_email, customer_phone, amount, bank_used, status, created_at)
where c.slug = o.course_slug;
