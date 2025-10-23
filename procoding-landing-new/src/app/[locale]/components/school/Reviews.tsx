"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "@/lib/TranslationContext";
import { useTheme } from "next-themes";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const students = [
  {
    id: 1,
    nameKey: "school.reviews.0.name",
    titleKey: "school.reviews.0.title",
    textKey: "school.reviews.0.text",
    image: "/images/school/students/review.png",
  },
  {
    id: 2,
    nameKey: "school.reviews.1.name",
    titleKey: "school.reviews.1.title",
    textKey: "school.reviews.1.text",
    image: "/images/school/students/review.png",
  },
  {
    id: 3,
    nameKey: "school.reviews.2.name",
    titleKey: "school.reviews.2.title",
    textKey: "school.reviews.2.text",
    image: "/images/school/students/review.png",
  },
  {
    id: 4,
    nameKey: "school.reviews.3.name",
    titleKey: "school.reviews.3.title",
    textKey: "school.reviews.3.text",
    image: "/images/school/students/review.png",
  },
  {
    id: 5,
    nameKey: "school.reviews.4.name",
    titleKey: "school.reviews.4.title",
    textKey: "school.reviews.4.text",
    image: "/images/school/students/review.png",
  },
];

export default function StudentReviews() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const { theme } = useTheme();
  const isLight = theme === "light";
  const student = students[active];

  return (
    <section
      className={`py-20 px-6 transition-all duration-300 ${
        isLight ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16">
        {/* ---------- LEFT: Title + Avatars ---------- */}
        <div className="flex-1 max-w-[480px] text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            {t("school.reviews.heading")}
          </h2>
          <p className="mb-6">{t("school.reviews.subheading")}</p>

          {/* --- Desktop Version (No Swiper) --- */}
          <div className="hidden lg:flex justify-start items-end gap-4 mt-[10px]">
            {students.map((s, index) => {
              const isActive = index === active;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(index)}
                  className={`w-20 h-20 rounded-full overflow-hidden transition-all duration-300 ${
                    isActive
                      ? isLight
                        ? "p-[2px] bg-gradient-to-tr from-[#F28237] via-[#F4EBFF] to-[#D726B3] -translate-y-2"
                        : "p-[2px] bg-gradient-to-tr from-[#F28237] via-[#111111] to-[#D726B3] -translate-y-2"
                      : "p-1"
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={s.image}
                      alt={`Student ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* --- Mobile Swiper (like OurTeam) --- */}
<div className="block lg:hidden mt-6 relative">
  <Swiper
    modules={[Pagination]}
    slidesPerView={3}
    spaceBetween={8}
    pagination={{ clickable: true }}
    className="!pb-10"
  >
    {students.map((s, index) => {
      const isActive = index === active;
      return (
        <SwiperSlide key={s.id} className="flex justify-center">
          <button
            onClick={() => setActive(index)}
            className={`w-20 h-20 rounded-full overflow-hidden transition-all duration-300 ${
              isActive
                ? isLight
                  ? "p-[2px] bg-gradient-to-tr from-[#F28237] via-[#F4EBFF] to-[#D726B3] -translate-y-1"
                  : "p-[2px] bg-gradient-to-tr from-[#F28237] via-[#111111] to-[#D726B3] -translate-y-1"
                : "p-1"
            }`}
          >
            <div className="w-full h-full rounded-full overflow-hidden">
              <Image
                src={s.image}
                alt={`Student ${index + 1}`}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
          </button>
        </SwiperSlide>
      );
    })}
  </Swiper>
</div>
</div>

        {/* ---------- RIGHT: Review Content ---------- */}
        <div className="flex-1 max-w-[480px] w-full">
          <div className="flex flex-col sm:flex-row items-center gap-10 text-left">
            <div className="rounded-[32px] overflow-hidden w-[190px] aspect-[3/5] shrink-0">
              <Image
                src={student.image}
                alt={t(student.nameKey)}
                width={190}
                height={320}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="self-center text-center sm:text-left">
              <h3 className="text-lg font-bold mb-1">{t(student.nameKey)}</h3>
              <p className="font-medium mb-3">{t(student.titleKey)}</p>
              <p className="text-sm leading-relaxed">{t(student.textKey)}</p>

              <div className="mt-6 flex justify-center sm:justify-start">
                <button className="px-4 py-2 bg-[#A943D5] rounded-full text-sm font-semibold text-white hover:opacity-90 transition">
                  {t("school.reviews.cta")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}