"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/TranslationContext";
import Link from "next/link";

export default function SchoolHero() {
  const { resolvedTheme } = useTheme();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isLight = resolvedTheme === "light";

  return (
    <section
      className={`relative overflow-hidden flex flex-col lg:flex-row items-center justify-between px-6 md:px-10 pt-24 pb-16 max-w-screen-xl mx-auto ${
        isLight ? "bg-white" : "bg-black"
      }`}
    >
      {/* IMAGE on top for mobile and md screens */}
      <div className="w-full flex justify-center mb-8 lg:hidden">
        <div className="w-full max-w-[460px] md:max-w-[600px] aspect-[4/3] relative">
          <Image
            src="/images/school/Main.webp"
            alt="ProCoding School Main Illustration"
            fill
            className="rounded-xl object-contain"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px"
          />
        </div>
      </div>

      {/* LEFT SIDE (Text + Buttons) */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
        <h1
          className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 ${
            isLight ? "text-black" : "text-white"
          }`}
        >
          {t("school.hero.title1")} <br />
          {t("school.hero.title2")}
        </h1>

        <p
          className={`text-lg sm:text-xl max-w-lg mb-8 ${
            isLight ? "text-gray-800" : "text-gray-300"
          }`}
        >
          {t("school.hero.description")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto">
          <Link
            href="#contact"
            aria-label="Join the ProCoding school"
            className="bg-[#A943D5] hover:opacity-90 text-white font-semibold py-3 px-8 rounded-full text-center transition-all duration-200"
          >
            {t("school.hero.join")}
          </Link>

          <Link
            href="#courses"
            aria-label="Find your course at ProCoding"
            className={`border font-semibold py-3 px-8 rounded-full text-center transition-all duration-200 ${
              isLight
                ? "border-black text-black hover:bg-black hover:text-white"
                : "border-white text-white hover:bg-white hover:text-black"
            }`}
          >
            {t("school.hero.findCourse")}
          </Link>
        </div>
      </div>

      {/* IMAGE on right side for lg+ screens */}
      <div className="hidden lg:flex w-full lg:w-1/2 justify-end">
        <div className="w-full max-w-[800px] aspect-[4/3] relative overflow-hidden rounded-xl">
          <Image
            src="/images/school/Main.jpg"
            alt="ProCoding School Main Illustration"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 50vw, 800px"
          />
        </div>
      </div>
    </section>
  );
}
