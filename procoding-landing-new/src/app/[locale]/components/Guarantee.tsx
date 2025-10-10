"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslation } from "@/lib/TranslationContext";

export default function GuaranteeSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const { t } = useTranslation();

  return (
    <section
      className={`w-full px-4 sm:px-6 lg:px-8 transition-colors duration-300`}
    >
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
            {t("guarantee.title")}
          </h2>
          <p
            className={`text-base md:text-lg ${
              isLight ? "text-black" : "text-white"
            }`}
          >
            {t("guarantee.description")}
          </p>
        </div>
      </div>
    </section>
  );
}