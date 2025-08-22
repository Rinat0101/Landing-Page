"use client";

import Image from "next/image";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Instructors", href: "#instructors" },
  { label: "Guarantee", href: "#guarantee" },
  { label: "Program", href: "#program" },
  { label: "Jobs", href: "#jobs" },
  { label: "Plans", href: "#plans" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact Us", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md">
      <nav className="flex justify-between items-center px-6 py-4 max-w-screen-xl mx-auto">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <Image
            src="/images/logo.svg"
            alt="ProCoding Logo"
            width={36}
            height={36}
            priority
          />
          <span className="text-white font-bold text-lg">ProCoding</span>
        </a>

        {/* Navigation Links */}
        <ul className="flex gap-6 text-base font-medium">
          {navItems.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={`transition-colors underline-offset-4 text-white hover:text-[#D726B3]`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Telegram Button */}
        <a
          href="https://t.me/procoding"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#a855f7] text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition flex items-center gap-2"
        >
          <Image
            src="/images/telegram_white.svg"
            alt="Telegram icon"
            width={20}
            height={20}
          />
          Telegram
        </a>
      </nav>
    </header>
  );
}
