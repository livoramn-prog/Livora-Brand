import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Livora — Дижитал чадвар, эрүүл сэтгэл, шинэ Чи",
  description:
    "Монгол хэл дээрх практик сургалтууд: Instagram, дижитал маркетинг, бизнес, сэтгэлийн тэнцвэр, эрүүл амьдрал. Бэлэн материалууд, видео, гарын авлагатай.",
  keywords: [
    "сургалт",
    "дижитал маркетинг",
    "Instagram",
    "бизнес",
    "сэтгэлийн эрүүл мэнд",
    "монгол сургалт",
    "Livora",
  ],
  openGraph: {
    title: "Livora — Дижитал чадвар, эрүүл сэтгэл",
    description: "Монгол хэл дээрх практик сургалтууд: Instagram, бизнес, эрүүл амьдрал.",
    type: "website",
    locale: "mn_MN",
  },
};

// FOUC-аас сэргийлэх — React render хийхээс өмнө data-theme-ыг тохируулна
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      document.documentElement.dataset.theme = 'dark';
    } else if (!stored && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.dataset.theme = 'dark';
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className={`${manrope.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
