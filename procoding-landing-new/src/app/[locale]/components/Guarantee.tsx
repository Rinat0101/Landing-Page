"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

type GuaranteeData = {
  guarantee_title_en: string;
  guarantee_title_ru: string;
  guarantee_description_en: string;
  guarantee_description_ru: string;
};

type Props = {
  data: GuaranteeData;
  locale: "en" | "ru";
};

export default function GuaranteeSection({ data, locale }: Props) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  if (!data) return null;

  const title =
    locale === "ru" ? data.guarantee_title_ru : data.guarantee_title_en;

  const description =
    locale === "ru"
      ? data.guarantee_description_ru
      : data.guarantee_description_en;

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div
        className={`relative border border-[#F28237] rounded-[1.625rem] py-16 md:py-20 mt-20 max-w-screen-xl mx-auto ${
          isLight ? "bg-[#FFF6EC]" : "bg-[#221C0E]"
        }`}
      >
        {/* Icon circle */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-[#F28237] rounded-full w-28 h-28 flex items-center justify-center shadow-md">
            <Image
              src="/images/money.svg"
              alt="Guarantee Icon"
              width={52}
              height={42}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4 sm:px-6">
          <h2
            className={`text-4xl md:text-4xl font-extrabold mb-8 ${
              isLight ? "text-black" : "text-white"
            }`}
          >
            {title}
          </h2>
          <p
            className={`text-base md:text-lg ${
              isLight ? "text-black" : "text-white"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}