"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

type PricingData = {
  [key: string]: string | undefined;
};

export default function PricingSection({
  data,
  locale,
}: {
  data: PricingData;
  locale: "en" | "ru";
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const t = (key: string) => {
    // example: pricing_title → pricing_title_en
    const localized = data[`${key}_${locale}`];
    return localized || data[key] || "";
  };

  // ---------- BENEFITS ----------
  const benefits = Object.keys(data)
    .filter(
      (key) =>
        key.startsWith("pricing_benefit") &&
        (data[`${key}_${locale}`] || data[key])?.trim()
    )
    .map((key) => t(key));

  // ---------- SCHEDULE (MULTILINE) ----------
  const scheduleLines = (t("pricing_schedule") || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <section
      className={`py-20 px-4 transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* HEADER */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">{t("pricing_title")}</h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base">
          {t("pricing_description")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* -------------------------------------- */}
        {/* LEFT CARD — WHAT YOU GET */}
        {/* -------------------------------------- */}
        <div
          className={`rounded-2xl border px-6 py-8 shadow-md flex flex-col justify-between ${
            isDark
              ? "bg-[#141414] border-white/10 text-white"
              : "bg-[#F4F1FB] border-gray-200 text-black"
          }`}
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-6">
            {t("pricing_whatyouget")}
          </h3>

          <ul className="space-y-4 text-sm sm:text-base">
            {benefits.map((benefit, i) => (
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

        {/* -------------------------------------- */}
        {/* RIGHT SIDE — START DATE + PRICE */}
        {/* -------------------------------------- */}
        <div className="flex flex-col gap-6">
          {/* START DATE */}
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
              {t("pricing_startdate")}
            </h3>

            <p className="text-center mb-1 font-medium">
              {t("pricing_duration")}
            </p>

            <ul className="text-center space-y-1">
              {scheduleLines.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>

          {/* PRICE + CTA */}
          <div
            className={`rounded-2xl border px-6 py-8 shadow-md flex flex-col justify-between ${
              isDark
                ? "bg-[#141414] border-white/10 text-white"
                : "bg-[#F4F1FB] border-gray-200 text-black"
            }`}
          >
            <div>
              {/* LABEL */}
              <p className="uppercase text-sm font-bold text-center text-red-600 mb-3 tracking-wider">
                🔥 Black Friday Special
              </p>

              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">
                {t("pricing_joinnow")}
              </h3>

              {/* PRICE */}
              <div className="flex flex-col items-center gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <p className="text-2xl sm:text-3xl line-through opacity-60">
                    $6,580
                  </p>
                  <span className="text-xs sm:text-sm font-semibold bg-red-500 text-white px-2 py-1 rounded-md">
                    -50%
                  </span>
                </div>
                <p className="text-4xl sm:text-5xl font-bold text-[#D726B3]">
                  $3,290
                </p>
              </div>

              <p className="text-sm text-center mb-2">{t("pricing_monthlynote")}</p>
              <p className="text-sm text-center mb-6">{t("pricing_note")}</p>
            </div>

            {/* CTA BUTTON */}
            <a
              href="#contact"
              className="block w-full text-center bg-purple-600 text-white font-bold py-3 rounded-full transition hover:bg-purple-700"
            >
              {t("pricing_button")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}