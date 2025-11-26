"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

type CompaniesData = {
  futureemployers_title_en: string;
  futureemployers_title_ru: string;
  futureemployers_subtitle_en: string;
  futureemployers_subtitle_ru: string;
};

type Props = {
  data: CompaniesData;
  locale: "en" | "ru";
};

const baseLogos = [
  { name: "google", alt: "Google" },
  { name: "meta", alt: "Meta" },
  { name: "amazon", alt: "Amazon" },
  { name: "microsoft", alt: "Microsoft" },
  { name: "samsung", alt: "Samsung" },
  { name: "fedex", alt: "FedEx" },
  { name: "ebay", alt: "eBay" },
];

export default function CompaniesMarqueeSection({ data, locale }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const title =
    locale === "ru" ? data.futureemployers_title_ru : data.futureemployers_title_en;

  const subtitle =
    locale === "ru" ? data.futureemployers_subtitle_ru : data.futureemployers_subtitle_en;

  const logos = baseLogos.map((logo) => {
    const lightVersions = ["meta", "amazon", "microsoft", "samsung"];
    const logoSrc = `/logos/${logo.name}${isDark && lightVersions.includes(logo.name) ? "-light" : ""}.svg`;
    return { ...logo, src: logoSrc };
  });

  return (
    <section
      className={`py-20 px-4 sm:px-6 md:px-8 transition-colors duration-300 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .scrolling-logos {
            animation: scroll 30s linear infinite;
          }
        `}
      </style>

      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-4xl font-bold text-center leading-tight mb-4 ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {title}
        </h2>

        <p
          className={`text-center mb-12 text-base max-w-xl mx-auto ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {subtitle}
        </p>

        <div className="relative overflow-hidden">
          <div className="flex scrolling-logos w-max gap-16">
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-16 min-w-[150px]"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}