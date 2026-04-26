import Link from "next/link";
import { ArrowRight, Heart, Target, Lightbulb } from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
          <p className="brand-wordmark text-xs uppercase text-muted-foreground">Бидний тухай</p>
          <h1 className="mt-4 text-5xl font-light leading-[1.1] sm:text-6xl">
            Амжилттай амьдрах нь сурах боломжтой ур чадвар.
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            Livora нь Монгол хүмүүст дижитал маркетинг, жижиг бизнес, эрүүл амьдралын стратегийг
            нэг дороос үнэн зөв, системтэйгээр сурах боломж олгох зорилгоор үүсгэгдсэн.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <p className="brand-wordmark text-xs uppercase text-muted-foreground">Бидний эрхэм зорилго</p>
            <h2 className="mt-3 text-3xl font-light leading-tight sm:text-4xl">
              Бүх Монгол хүн өөрийгөө илүү цэгцтэй, амжилттай авч явах боломжийг бий болгох.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              Бид итгэдэг — амжилт бол хэн нэгний онцгой авъяас бус, харин системтэй сурч хэрэгжүүлбэл
              хэн ч хүрэх боломжтой үр дүн.
            </p>
            <p>
              Иймээс бид батлагдсан, шинжлэх ухаанд суурилсан, реал case-уудыг нэгтгэсэн сургалтуудыг
              боловсруулж, хүн бүхэнд хүртээмжтэй болгохоор зорьж байна.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="brand-wordmark text-xs uppercase text-muted-foreground">Үндсэн үнэт зүйлс</p>
        <h2 className="mt-3 text-3xl font-light leading-tight sm:text-4xl">Бидний ажлын зарчим</h2>

        <div className="mt-12 grid grid-cols-1 gap-px bg-border md:grid-cols-3">
          <Value
            icon={<Heart size={22} />}
            title="Чин сэтгэл"
            description="Бид хэрэглэгчийг дугаар бус, хүн гэж харж, тэдний амжилтыг өөрийнхөөрөө хүлээн авдаг."
          />
          <Value
            icon={<Target size={22} />}
            title="Үр дүн"
            description="Онол биш, шууд хэрэглэх боломжтой практик мэдлэг л үнэ цэнтэй гэж үздэг."
          />
          <Value
            icon={<Lightbulb size={22} />}
            title="Энгийн байдал"
            description="Хүндэтгэл, ойлгомжтой, хэн ч ойлгох боломжтой хэлээр заана."
          />
        </div>
      </section>

      {/* What we do */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border p-10 lg:p-16">
          <p className="brand-wordmark text-xs uppercase text-muted-foreground">Юу хийдэг вэ?</p>
          <h2 className="mt-3 text-3xl font-light leading-tight sm:text-4xl">
            Сургалт. Контент. Хэрэгсэл.
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Pillar
              number="01"
              title="Дижитал ур чадвар"
              description="Instagram, дижитал маркетинг, контент бүтээлтийн системтэй сургалтууд."
            />
            <Pillar
              number="02"
              title="Бизнес эрхлэлт"
              description="Жижиг бизнес, онлайн шоп нээх, санхүү удирдах практик гарын авлага."
            />
            <Pillar
              number="03"
              title="Амьдралын чанар"
              description="Сэтгэл зүй, эрүүл мэнд, өсөлтийн mindset-ийн талаарх контент."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-foreground px-8 py-20 text-center text-background sm:px-16">
          <h2 className="mx-auto max-w-3xl text-4xl font-light leading-tight sm:text-5xl">
            Чи өнөөдрөөс эхэлж чадна.
          </h2>
          <Link
            href="/courses"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 text-sm uppercase tracking-widest text-foreground transition-opacity hover:opacity-90"
          >
            Сургалтуудыг үзэх <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Value({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-background p-10">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-medium">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

function Pillar({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="brand-wordmark text-xs uppercase text-muted-foreground">{number}</p>
      <h3 className="mt-2 text-xl font-medium">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}
