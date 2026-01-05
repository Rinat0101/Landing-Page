"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

type Props = {
  data: { [key: string]: string | undefined };
  locale: "en" | "ru";
};

export default function Footer({ data, locale }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error" | "loading">("idle");

  // Translation helper
  const t = (key: string) => data[`${key}_${locale}`] || data[key] || "";

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(`/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          message: "Newsletter signup",
          name: "Newsletter",
          phone: "",
          type: "newsletter",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    if (status === "success") {
      const timeout = setTimeout(() => setStatus("idle"), 5000);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  return (
    <footer
      className={`w-full px-4 sm:px-6 md:px-12 py-10 rounded-t-4xl transition-colors duration-300 ${
        isDark ? "bg-[#0f0f0f] text-white" : "bg-[#f3f2ff] text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10 md:grid md:grid-cols-3 lg:grid-cols-4">
        {/* Logo + Social */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image src="/images/logo.svg" alt="ProCoding logo" width={24} height={24} priority />
            <span className="font-semibold text-lg">ProCoding</span>
          </div>
          <p className={`mb-4 text-sm ${isDark ? "text-white/80" : "text-black/70"}`}>
            {t("footer_social")}
          </p>
          <div className="flex gap-3">
            {[
              {
                href: "https://www.facebook.com/procodingcom",
                src: "/images/fb_icon.svg",
                alt: "Facebook",
                size: 12,
              },
              {
                href: "https://www.linkedin.com/company/pro-coding",
                src: "/images/linkedin_icon.svg",
                alt: "LinkedIn",
                size: 16,
              },
              {
                href: "https://www.instagram.com/procodingcom",
                src: "/images/instagram_icon.svg",
                alt: "Instagram",
                size: 16,
              },
            ].map(({ href, src, alt, size }) => (
              <a
                key={alt}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={alt}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition hover:scale-105 shadow-sm ${
                  isDark ? "bg-[#0A0A0A]" : "bg-white"
                }`}
              >
                <Image src={src} alt={alt} width={size} height={size} />
              </a>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div>
          <h3 className="font-semibold mb-2 text-base">{t("footer_documents_title")}</h3>
          <ul className={`space-y-1 text-sm ${isDark ? "text-white/70" : "text-black/70"}`}>
            <li><a href="/privacy-policy">{t("footer_privacypolicy")}</a></li>
            <li><a href="/terms-of-service">{t("footer_terms")}</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-2 text-base">{t("footer_contact_title")}</h3>
          <div className={`flex items-center gap-2 text-sm mb-2 ${isDark ? "text-white/70" : "text-black/70"}`}>
            <Image src="/images/email_icon.svg" alt="Email" width={20} height={20} className={isDark ? "" : "invert"} />
            <span>{t("footer_contact_email") || "apply@procoding.com"}</span>
          </div>
          <div className={`flex items-center gap-2 text-sm mb-2 ${isDark ? "text-white/70" : "text-black/70"}`}>
            <Image src="/images/phone.svg" alt="Phone" width={20} height={20} className={isDark ? "" : "invert"} />
            <span>+1 404-620-2426</span>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-2 text-base">{t("footer_newsletter_title")}</h3>
          <form onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("footer_newsletter_emailplaceholder")}
              required
              className={`w-full px-4 py-2 rounded-xl text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${
                isDark
                  ? "bg-[#0a0a0a] text-white/70 border border-white/20 placeholder-white/50"
                  : "bg-white text-black border border-black/10 placeholder-black/40"
              }`}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#D726B3] hover:bg-[#B71D99] text-white font-semibold py-2 rounded-full transition duration-200 text-sm"
            >
              {status === "loading" ? (locale === "ru" ? "Отправка..." : "Sending...") : t("footer_newsletter_submit")}
            </button>
            {status === "success" && (
              <p className="text-green-500 text-sm mt-1">
                {locale === "ru" ? "Вы успешно подписались!" : "Subscribed successfully!"}
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-sm mt-1">
                {locale === "ru"
                  ? "Что-то пошло не так. Пожалуйста, попробуйте снова."
                  : "Something went wrong. Please try again."}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className={`mt-10 text-center text-sm px-4 sm:px-6 ${isDark ? "text-white/50" : "text-black/50"}`}>
        {t("footer_copyright")}
      </div>
    </footer>
  );
}