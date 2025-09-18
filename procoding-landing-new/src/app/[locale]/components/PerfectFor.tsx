"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslation } from "@/lib/TranslationContext";

type CardData = {
  title: string;
  description: string;
};

export default function PerfectForSection() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const { t } = useTranslation();

  const cards: CardData[] = [
    {
      title: t("perfectFor.beginners.title"),
      description: t("perfectFor.beginners.description"),
    },
    {
      title: t("perfectFor.careerChangers.title"),
      description: t("perfectFor.careerChangers.description"),
    },
    {
      title: t("perfectFor.graduates.title"),
      description: t("perfectFor.graduates.description"),
    },
  ];

  return (
    <section
      className={`py-20 px-4 md:px-6 transition-colors duration-300 ${
        isLight ? "bg-white" : "bg-black"
      }`}
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Top Heading */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-bold ${
              isLight ? "text-black" : "text-white"
            }`}
          >
            {t("perfectFor.heading")}
          </h2>
        </div>

        {/* Responsive layout: column on md and below, row on lg */}
        <div className="flex flex-col-reverse lg:flex-row gap-12 items-start">
          {/* LEFT on desktop / BELOW on mobile: Image */}
          <div className="w-full lg:w-2/5 flex justify-center">
            <div className="relative w-full aspect-[6/5] max-w-[500px] md:max-w-[600px] lg:max-w-[700px]">
              <Image
                src="/images/dragon/Mask group (1).png"
                alt="Dragon with laptop"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* RIGHT on desktop / ABOVE on mobile: Cards */}
          <div className="w-full lg:w-3/5 grid grid-cols-1 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`relative rounded-2xl transition-all duration-300 shadow-lg ${
                  isLight
                    ? "p-[2px] bg-gradient-to-br from-[#F28237] via-[#F4EBFF] to-[#D726B3] shadow-[#F28237]/30 animated-gradient-border"
                    : "p-[2px] bg-gradient-to-br from-[#F28237] via-[#111111] to-[#D726B3] animated-gradient-border"
                }`}
              >
                <div
                  className={`rounded-[14px] p-6 ${
                    isLight ? "bg-white text-black" : "bg-[#111111] text-white"
                  }`}
                >
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      isLight ? "text-black" : "text-white"
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      isLight ? "text-gray-800" : "text-white/80"
                    }`}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}