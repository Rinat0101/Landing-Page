"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useTranslation } from "@/lib/TranslationContext";

export default function PricingSection() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === "dark";

  // Helper to fetch translated benefits
  const getTranslatedArray = (baseKey: string, count: number) => {
    return Array.from({ length: count }, (_, i) => t(`${baseKey}.${i}`));
  };

  return (
    <section
      className={`py-20 px-4 transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">{t("pricing.title")}</h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base">
          {t("pricing.description")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Left: What You Get */}
        <div
          className={`rounded-2xl border px-6 py-8 shadow-md flex flex-col justify-between ${
            isDark
              ? "bg-[#141414] border-white/10 text-white"
              : "bg-[#F4F1FB] border-gray-200 text-black"
          }`}
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-6">
            {t("pricing.whatYouGet")}
          </h3>
          <ul className="space-y-4 text-sm sm:text-base">
            {getTranslatedArray("pricing.benefits", 9).map((benefit, i) => (
              <li key={i} className="flex gap-3">
                <Image
                  src="/images/green_check_icon.svg"
                  alt="Check"
                  width={20}
                  height={20}
                  className="mt-1"
                />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Price Card + Start Date Card stacked */}
        <div className="flex flex-col gap-6">
          {/* Price and CTA */}
          <div
            className={`rounded-2xl border px-6 py-8 shadow-md flex flex-col justify-between ${
              isDark
                ? "bg-[#141414] border-white/10 text-white"
                : "bg-[#F4F1FB] border-gray-200 text-black"
            }`}
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                {t("pricing.joinNow")}
              </h3>
              <p className="text-4xl font-bold text-[#D726B3] mb-1">$3 290</p>
              <p className="text-sm mb-6">{t("pricing.monthlyNote")}</p>
              <p className="text-sm mb-6">{t("pricing.note")}</p>
            </div>
            <a
              href="#contact"
              className="block w-full text-center bg-purple-600 text-white font-bold py-3 rounded-full transition hover:bg-purple-700"
            >
              {t("pricing.button")}
            </a>
          </div>

          {/* Start Date & Schedule */}
          <div
            className={`rounded-2xl border px-6 py-6 text-sm sm:text-base shadow-md ${
              isDark
                ? "bg-[#1a1a1a] border-white/10 text-white"
                : "bg-[#F4F1FB] border-gray-200 text-black"
            }`}
          >
            <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
              <Image
                src="/images/calendar_icon.svg"
                alt="Calendar icon"
                width={20}
                height={20}
              />
              {t("pricing.startDate")}
            </h3>
            <p className="text-center mb-1 font-medium">
              {t("pricing.duration")}
            </p>
            <ul className="text-center space-y-1">
              <li>{t("pricing.schedule.0")}</li>
              <li>{t("pricing.schedule.1")}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}