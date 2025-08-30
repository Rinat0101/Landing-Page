"use client";

import Image from "next/image";
import SectionTitle from "../../components/shared/SectionTitle";
import Button from "../../components/shared/Button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/TranslationContext";

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isLight = resolvedTheme === "light";

  return (
    <section
      className={`flex flex-col lg:flex-row items-center justify-between px-6 py-16 max-w-screen-xl mx-auto lg:gap-10 transition-colors duration-300 ${
        isLight ? "bg-white" : "bg-black"
      }`}
    >
      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 order-2 lg:order-1 mb-10 lg:mb-0 flex flex-col items-center lg:items-start text-center lg:text-left">
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-tight ${
            isLight ? "text-black" : "text-white"
          }`}
        >
          {t("hero.title1")} <br />
          {t("hero.title2")} <br />
          {t("hero.title3")}
        </h1>

        <p
          className={`text-lg mt-6 max-w-lg ${
            isLight ? "text-black/80" : "text-white/80"
          }`}
        >
          {t("hero.description")}
        </p>

        <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4 mt-8 w-full">
          <Button
            variant="secondary"
            size="md"
            href="#contact"
            className={`w-4/5 sm:w-4/5 lg:w-auto mx-auto sm:mx-0 ${
              isLight
                ? "bg-[#a855f7] text-white hover:bg-[#9333ea]"
                : "bg-[#9333ea] text-white hover:bg-[#a855f7]"
            } transition-colors duration-300`}
          >
            {t("hero.contact")}
          </Button>
          <Button
            variant="outline"
            size="md"
            href="#consultation"
            className={`w-4/5 sm:w-4/5 lg:w-auto mx-auto sm:mx-0 border-2 ${
              isLight
                ? "border-black text-black hover:bg-black hover:text-white"
                : "border-white text-white hover:bg-white hover:text-black"
            } transition-colors duration-300`}
          >
            {t("hero.consultation")}
          </Button>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <img
            src="/images/project_icon_1.svg"
            alt="Portfolio Icons"
            className={`w-[140px] h-auto transition`}
          />
          <p
            className={`text-sm sm:text-base leading-tight ${
              isLight ? "text-black/70" : "text-white/70"
            }`}
          >
            {t("hero.projects")}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full hidden lg:block lg:w-1/2 order-1 lg:order-2 flex justify-center">
        <Image
          src="/images/main_img.svg"
          alt="Hero Image"
          width={600}
          height={600}
          className="w-full h-auto max-h-[50vh] lg:max-h-full object-contain"
          priority
        />
      </div>
    </section>
  );
}