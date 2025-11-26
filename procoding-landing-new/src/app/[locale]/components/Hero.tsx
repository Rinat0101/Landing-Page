"use client";

import Image from "next/image";
import Button from "../../components/shared/Button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SyllabusModal from "../../components/shared/SyllabusModal";

type HeroProps = {
  data: {
    [key: string]: string;
  };
  locale: "en" | "ru";
};

export default function Hero({ data, locale }: HeroProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isLight = resolvedTheme === "light";
  const get = (key: string) => data[`${key}_${locale}`] || "";

  return (
    <>
      <section
        className={`relative overflow-hidden flex flex-col lg:flex-row items-center justify-between px-6 pt-16 pb-10 max-w-screen-xl mx-auto lg:gap-10 transition-colors duration-300 ${
          isLight ? "bg-white" : "bg-black"
        }`}
      >
        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-4xl xl:text-6xl font-bold leading-tight ${
              isLight ? "text-black" : "text-white"
            }`}
          >
            {get("hero_title1")} <br />
            {get("hero_title2")} <br />
            {get("hero_title3")}
          </h1>

          <p className={`text-lg mt-6 max-w-lg ${isLight ? "text-black" : "text-white"}`}>
            {get("hero_description")}
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-wrap justify-center lg:justify-start mt-8 gap-4 w-full">
            <Button
              variant="outline"
              size="lg"
              href="#contact"
              className={`w-4/5 sm:w-4/5 lg:w-auto mx-auto sm:mx-0 border ${
                isLight
                  ? "border-black text-black hover:text-white"
                  : "border-white text-white"
              } hover:border-transparent hover:bg-[#9333ea]`}
            >
              {get("hero_consultation")}
            </Button>

            <Button
              variant="solid"
              size="lg"
              onClick={() => setShowModal(true)}
              className="w-4/5 sm:w-4/5 lg:w-auto mx-auto sm:mx-0 bg-[#9333ea] hover:opacity-90 text-white"
            >
              {get("hero_syllabus")}
            </Button>
          </div>

          {/* MOBILE IMAGE */}
          <div className="block lg:hidden w-full max-w-[440px] mx-auto mt-8 mb-[-2.5rem]">
            <Image
              src="/images/Group 19 (1).webp"
              alt="Hero Image"
              width={600}
              height={600}
              className="w-full h-auto object-contain pointer-events-none select-none"
              priority
            />
          </div>
        </div>

        {/* DESKTOP IMAGE */}
        <div className="hidden lg:block w-full h-full absolute bottom-0 right-0 z-0">
          <Image
            src="/images/Group 19 (1).webp"
            alt="Hero Image"
            width={800}
            height={900}
            className="absolute bottom-[-4rem] xl:bottom-0 right-[-6rem] object-contain scale-[1.25] xl:scale-[1.1] 2xl:scale-[1.2] lg:scale-[0.8] pointer-events-none select-none"
            priority
          />
        </div>
      </section>

      {/* DIVIDER */}
      <div className="relative w-full max-w-screen-xl mx-auto px-6 mt-[-0.5rem] z-20">
        <div className="w-full rounded-full bg-gradient-to-r from-[#009FD9] via-[#380E8C] to-[#B923AE] py-3 px-6">
          <div className="flex justify-center items-center text-white text-sm sm:text-base font-medium text-center gap-4 sm:gap-6">
            <span>{get("hero_divider_weeks")}</span>
            <span className="text-white">|</span>
            <span>{get("hero_divider_practice")}</span>
            <span className="text-white">|</span>
            <span>{get("hero_divider_projects")}</span>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && <SyllabusModal onClose={() => setShowModal(false)} />}
    </>
  );
}