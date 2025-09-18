"use client";

import Image from "next/image";
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
    <>
      <section
        className={`relative overflow-hidden flex flex-col lg:flex-row items-center justify-between px-6 pt-16 pb-10 max-w-screen-xl mx-auto lg:gap-10 transition-colors duration-300 ${
          isLight ? "bg-white" : "bg-black"
        }`}
      >
        {/* LEFT SIDE: Text + Button */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-4xl xl:text-6xl font-bold leading-tight ${
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

          <div className="flex justify-center lg:justify-start mt-8 w-full">
            <Button
              variant="outline"
              size="md"
              href="#contact"
              className={`w-4/5 sm:w-4/5 lg:w-auto mx-auto sm:mx-0 border 
      ${
        isLight
          ? "border-black text-black hover:text-white"
          : "border-white text-white"
      } 
      hover:border-transparent hover:bg-[#9333ea]`}
            >
              {t("hero.consultation")}
            </Button>
          </div>

          {/* IMAGE FOR MOBILE */}
          <div className="block lg:hidden w-full max-w-[440px] mx-auto mt-8 mb-[-2.5rem]">
            <Image
              src="/images/Group 19 (1).png"
              alt="Hero Image"
              width={600}
              height={600}
              className="w-full h-auto object-contain pointer-events-none select-none"
              priority
            />
          </div>
        </div>

        {/* IMAGE FOR DESKTOP */}
        <div className="hidden lg:block w-full h-full absolute bottom-0 right-0 z-0">
          <Image
            src="/images/Group 19 (1).png"
            alt="Hero Image"
            width={800}
            height={900}
            className="absolute bottom-[-4rem] xl:bottom-0 right-[-6rem] object-contain scale-[1.25] xl:scale-[1.1] 2xl:scale-[1.2] lg:scale-[0.8] pointer-events-none select-none"
            priority
          />
        </div>
      </section>

      {/* DIVIDER WITH CENTERED TEXT */}
      <div className="relative w-full max-w-screen-xl mx-auto px-6 mt-[-0.5rem] z-20">
        <div className="w-full rounded-full bg-gradient-to-r from-[#009FD9] via-[#380E8C] to-[#B923AE] py-3 px-6">
          <div className="flex justify-center items-center text-white text-sm sm:text-base font-medium text-center gap-4 sm:gap-6">
            <span>24 weeks</span>
            <span className="text-white/70">|</span>
            <span>288+ hours of practice</span>
            <span className="text-white/70">|</span>
            <span>3 projects in portfolio</span>
          </div>
        </div>
      </div>
    </>
  );
}
