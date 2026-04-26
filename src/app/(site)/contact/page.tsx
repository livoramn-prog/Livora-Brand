"use client";

import { useState } from "react";
import { Mail, MapPin, Send, Check } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/SocialIcons";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setSent(false);
    }, 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        {/* Left */}
        <div>
          <p className="brand-wordmark text-xs uppercase text-muted-foreground">Холбоо барих</p>
          <h1 className="mt-3 text-4xl font-light leading-tight sm:text-5xl">
            Танай асуултанд бид хариулахад үргэлж бэлэн.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Сургалтын талаар, хамтын ажиллагаа, эсвэл санал хүсэлт байвал доорх хэлбэрээр бидэнтэй
            холбогдоорой.
          </p>

          <div className="mt-12 space-y-6">
            <ContactItem
              icon={<Mail size={18} />}
              label="Email"
              value="livora.mn@gmail.com"
              href="mailto:livora.mn@gmail.com"
            />
            <ContactItem
              icon={<InstagramIcon size={18} />}
              label="Instagram"
              value="@livora.mn"
              href="https://instagram.com/livora.mn"
            />
            <ContactItem
              icon={<FacebookIcon size={18} />}
              label="Facebook"
              value="Livora"
              href="https://facebook.com/livora.mn"
            />
            <ContactItem icon={<MapPin size={18} />} label="Хаяг" value="Улаанбаатар, Монгол" />
          </div>
        </div>

        {/* Right form */}
        <div className="rounded-3xl border border-border bg-background p-8 sm:p-10">
          <h2 className="text-2xl font-medium">Захидал илгээх</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Бид 24 цагийн дотор хариу илгээх болно.
          </p>

          {sent ? (
            <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-border py-16 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-foreground text-background">
                <Check size={28} />
              </div>
              <p className="mt-6 text-lg font-medium">Илгээгдлээ</p>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                Бид удахгүй email-ээр тантай холбогдоно.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground">
                  Нэр
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground">
                  Зурвас
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm uppercase tracking-widest text-background transition-opacity hover:opacity-90"
              >
                <Send size={16} /> Илгээх
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border">
        {icon}
      </span>
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-base">{value}</p>
      </div>
    </>
  );
  if (href)
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="flex items-center gap-4 transition-opacity hover:opacity-70"
      >
        {content}
      </a>
    );
  return <div className="flex items-center gap-4">{content}</div>;
}
