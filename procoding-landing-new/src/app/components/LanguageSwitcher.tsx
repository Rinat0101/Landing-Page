"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const LANGUAGES = [
  {
    code: "en",
    name: "EN",
    flag: "/images/flag_en.svg",
  },
  {
    code: "ru",
    name: "RU",
    flag: "/images/flag_ru.svg",
  },
];

interface Props {
  locale: string;
  handleLanguageChange: (newLocale: string) => void;
  isDark: boolean;
}

export default function LanguageSwitcher({
  locale,
  handleLanguageChange,
  isDark,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = LANGUAGES.find((lang) => lang.code === locale);

  return (
    <div ref={ref} className="relative z-50">
      {/* Language Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-4 py-1 w-[113px] h-[40px] rounded-full border transition-all ${
          isDark
            ? "bg-[#0A0A0A] border-[#333333] text-white"
            : "bg-white border-[#333333] text-black"
        }`}
      >
        <div className="w-5 h-5 relative">
          <Image
            src={currentLang?.flag || "/images/flag_en.svg"}
            alt={`${currentLang?.code} flag`}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-sm font-medium">{currentLang?.name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className={`absolute top-full mt-2 w-full rounded-xl shadow-xl overflow-hidden border backdrop-blur-md ${
            isDark
              ? "bg-black/20 text-white border-[#333333]"
              : "bg-white/20 text-black border-black"
          }`}
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setOpen(false);
                handleLanguageChange(lang.code);
              }}
              className={`flex items-center gap-3 px-4 py-2 text-sm w-full transition-colors ${
                locale === lang.code ? "font-semibold" : ""
              } hover:bg-[#D726B3] hover:text-white`}
            >
              <div className="w-5 h-5 relative">
                <Image
                  src={lang.flag}
                  alt={`${lang.name} flag`}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}