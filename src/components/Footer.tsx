import Link from "next/link";
import { Logo } from "./Logo";
import { Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "./SocialIcons";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo size="lg" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              Дижитал маркетинг, жижиг бизнес, Instagram, эрүүл амьдрал — амжилтын төлөөх бүх ур
              чадварыг нэг дор.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.instagram.com/livora.mn2025/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100065203522377"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <FacebookIcon size={20} />
              </a>
              <a
                href="mailto:livora.mn@gmail.com"
                aria-label="Email"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-foreground">Холбоосууд</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/courses" className="hover:text-foreground">
                  Бүх сургалт
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-foreground">
                  Нийтлэл
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground">
                  Бидний тухай
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Холбоо барих
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-widest text-foreground">Холбоо</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="mailto:livora.mn@gmail.com" className="hover:text-foreground">
                  livora.mn@gmail.com
                </a>
              </li>
              <li>Улаанбаатар, Монгол</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Livora. Бүх эрх хуулиар хамгаалагдсан.</p>
          <p className="brand-wordmark uppercase">Live · Inspire · Vision · Organize · Rise · Achieve</p>
        </div>
      </div>
    </footer>
  );
}
