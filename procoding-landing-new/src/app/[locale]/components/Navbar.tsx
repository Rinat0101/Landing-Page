"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useTranslation } from "@/lib/TranslationContext";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

const desktopNavItems = [
  { key: "nav.home", href: "#home" },
  { key: "nav.about", href: "#about" },
  { key: "nav.instructors", href: "#instructors" },
  { key: "nav.guarantees", href: "#guarantee" },
  { key: "nav.program", href: "#program" },
  { key: "nav.jobs", href: "#jobs" },
  { key: "nav.pricing", href: "#plans" },
  { key: "nav.faq", href: "#reviews" },
  { key: "nav.contact", href: "#contact" },
];

const mobileNavItems = [
  { key: "nav.home", href: "#home", icon: "/images/home_icon.svg" },
  { key: "nav.about", href: "#about", icon: "/images/about_cup_icon.svg" },
  {
    key: "nav.instructors",
    href: "#instructors",
    icon: "/images/about_people.svg",
  },
  { key: "nav.program", href: "#program", icon: "/images/programm_icon.svg" },
  { key: "nav.pricing", href: "#plans", icon: "/images/pricing_bag_icon.svg" },
  { key: "nav.contact", href: "#contact", icon: "/images/contact_icon.svg" },
];

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, locale } = useTranslation();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (menuOpen) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let current = "";
      [...desktopNavItems, ...mobileNavItems].forEach(({ href }) => {
        const section = document.querySelector(href);
        if (section) {
          const offsetTop =
            section.getBoundingClientRect().top + window.scrollY;
          if (scrollY >= offsetTop - 100) {
            current = href;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";
  const themeIcon = isDark
    ? "/images/theme_btn_dark.svg"
    : "/images/theme_btn_light.svg";

  const handleLanguageChange = (newLocale: string) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${locale}`, `/${newLocale}`);
    window.location.assign(newPath);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isDark
          ? "bg-black"
          : isScrolled
          ? "bg-white/70 backdrop-blur-md"
          : "bg-white"
      }`}
    >
      <nav className="flex w-full justify-between items-center px-6 py-4 max-w-screen-xl mx-auto">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 z-50">
          <Image
            src="/images/logo.svg"
            alt="ProCoding Logo"
            width={36}
            height={36}
            priority
          />
          <span
            className={`font-bold text-lg ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            ProCoding
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden custom-md:flex gap-6 text-sm font-medium">
          {desktopNavItems.map(({ key, href }) => (
            <li key={href}>
              <a
                href={href}
                className={`transition-colors underline-offset-4 ${
                  activeSection === href
                    ? "text-[#D726B3]"
                    : isDark
                    ? "text-white hover:text-[#D726B3]"
                    : "text-black hover:text-[#D726B3]"
                }`}
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions (Theme + Lang + Telegram) */}
        <div className="flex items-center gap-4 z-50">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Image src={themeIcon} alt="Theme Toggle" width={70} height={60} />
          </button>

          {/* Language & Telegram (Only on custom-md+) */}
          <div className="hidden custom-md:flex items-center gap-4 z-50 h-12">
            <div className="h-12 flex items-center">
              <LanguageSwitcher
                locale={locale}
                handleLanguageChange={handleLanguageChange}
                isDark={isDark}
              />
            </div>

            <a
              href="https://t.me/procoding"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-4 rounded-full bg-[#a855f7] text-white text-sm font-medium hover:opacity-90 transition items-center gap-2 flex"
            >
              <Image
                src="/images/telegram_white.svg"
                alt="Telegram"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              Telegram
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button onClick={() => setMenuOpen(true)} className="custom-md:hidden">
            <Image
              src="/images/menu_icon.svg"
              alt="Menu"
              width={28}
              height={28}
              style={{
                filter: isDark ? "invert(0)" : "invert(1)",
                transition: "filter 0.3s ease",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isVisible && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/80"
            onClick={() => setMenuOpen(false)}
          />
          <div
            className={`fixed top-0 right-0 w-full h-screen z-50 px-8 pt-10 overflow-y-auto transition-transform duration-300 ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            } ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6"
              aria-label="Close menu"
            >
              <Image
                src="/images/close_icon.svg"
                alt="Close"
                width={28}
                height={28}
                style={{
                  filter: isDark ? "invert(0)" : "invert(1)",
                  transition: "filter 0.3s ease",
                }}
              />
            </button>

            {mobileNavItems.map(({ key, href, icon }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-semibold transition flex items-center gap-4 mt-6 ${
                  activeSection === href
                    ? "text-[#D726B3]"
                    : isDark
                    ? "text-white hover:text-[#D726B3]"
                    : "text-black hover:text-[#D726B3]"
                }`}
              >
                <Image
                  src={icon}
                  alt={`${key} icon`}
                  width={24}
                  height={24}
                  style={{
                    filter: icon.includes("home_icon")
                      ? isDark
                        ? "invert(1)"
                        : "invert(0)"
                      : isDark
                      ? "invert(0)"
                      : "invert(1)",
                    transition: "filter 0.3s ease",
                  }}
                />
                {t(key)}
              </a>
            ))}

            {/* Telegram button */}
            <a
              href="https://t.me/procoding"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="bg-[#a855f7] text-white py-2 px-6 rounded-full text-2xl font-semibold hover:opacity-90 transition flex items-center gap-4 mt-6 w-fit"
            >
              <Image
                src="/images/telegram_white.svg"
                alt="Telegram"
                width={24}
                height={24}
              />
              Telegram
            </a>

            {/* LanguageSwitcher under Telegram */}
            <div className="mt-6">
              <LanguageSwitcher
                locale={locale}
                handleLanguageChange={handleLanguageChange}
                isDark={isDark}
              />
            </div>
          </div>
        </>
      )}
    </header>
  );
}