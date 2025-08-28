'use client';

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

const desktopNavItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Instructors", href: "#instructors" },
  { label: "Guarantees", href: "#guarantee" },
  { label: "Program", href: "#program" },
  { label: "Jobs", href: "#jobs" },
  { label: "Pricing", href: "#plans" },
  { label: "Faq", href: "#reviews" },
  { label: "Contact Us", href: "#contact" },
];

const mobileNavItems = [
  { label: "Home", href: "#home", icon: "/images/home_icon.svg" },
  { label: "About", href: "#about", icon: "/images/about_cup_icon.svg" },
  { label: "Instructors", href: "#instructors", icon: "/images/about_people.svg" },
  { label: "Program", href: "#program", icon: "/images/programm_icon.svg" },
  { label: "Pricing", href: "#plans", icon: "/images/pricing_bag_icon.svg" },
  { label: "Contact Us", href: "#contact", icon: "/images/contact_icon.svg" },
];

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hydration guard
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Animate mobile menu
  useEffect(() => {
    if (menuOpen) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [menuOpen]);

  // Scrollspy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let current = "";
      [...desktopNavItems, ...mobileNavItems].forEach(({ href }) => {
        const section = document.querySelector(href);
        if (section) {
          const offsetTop = section.getBoundingClientRect().top + window.scrollY;
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

  // Change background on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Don’t render until client hydration is done
  if (!mounted) return null;

  const themeIcon = isDark
    ? "/images/theme_btn_dark.svg"
    : "/images/theme_btn_light.svg";

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
            className={`font-bold text-lg ${isDark ? "text-white" : "text-black"}`}
          >
            ProCoding
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex gap-6 text-base font-medium">
          {desktopNavItems.map(({ label, href }) => (
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
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-4 z-50">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
            className="p-2"
          >
            <Image src={themeIcon} alt="Theme Toggle" width={50} height={50} />
          </button>

          {/* Desktop Telegram */}
          <a
            href="https://t.me/procoding"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex bg-[#a855f7] text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition items-center gap-2"
          >
            <Image
              src="/images/telegram_white.svg"
              alt="Telegram"
              width={20}
              height={20}
            />
            Telegram
          </a>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(true)} className="lg:hidden">
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
            {/* Close button */}
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

            {/* Mobile nav links */}
            {mobileNavItems.map(({ label, href, icon }) => (
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
                  alt={`${label} icon`}
                  width={24}
                  height={24}
                  style={
                    icon.includes("home_icon")
                      ? {
                          filter: isDark ? "invert(1)" : "invert(0)",
                          transition: "filter 0.3s ease",
                        }
                      : {
                          filter: isDark ? "invert(0)" : "invert(1)",
                          transition: "filter 0.3s ease",
                        }
                  }
                />
                {label}
              </a>
            ))}

            {/* Telegram mobile */}
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
          </div>
        </>
      )}

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </header>
  );
}