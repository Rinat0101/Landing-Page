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
    textKey: "school.reviews.0.text",
    image: "/images/school/students/review.png",
  },
  {
    id: 2,
    nameKey: "school.reviews.1.name",
    textKey: "school.reviews.1.text",
    image: "/images/school/students/review2.jpg",
  },
  {
    id: 3,
    nameKey: "school.reviews.2.name",
    textKey: "school.reviews.2.text",
    image: "/images/school/students/review3.jpeg",
  },
  {
    id: 4,
    nameKey: "school.reviews.3.name",
    textKey: "school.reviews.3.text",
    image: "/images/school/students/review5.jpeg",
  },
  {
    id: 5,
    nameKey: "school.reviews.4.name",
    textKey: "school.reviews.4.text",
    image: "/images/school/students/review4.jpeg",
  },
];

export default function StudentReviews() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [active, setActive] = useState(0);

  const student = students[active];

  return (
    <section
      className={`py-20 px-6 transition-all duration-300 ${
        isLight ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16">

        {/* LEFT SIDE — Title + Avatars */}
        <div className="flex-1 max-w-[480px] text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            {t("school.reviews.heading")}
          </h2>
          <p className="mb-6">{t("school.reviews.subheading")}</p>

          {/* Desktop avatars */}
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
                      alt={t(s.nameKey)}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile Swiper */}
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
                          alt={t(s.nameKey)}
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

        {/* RIGHT SIDE — Review Content */}
        <div className="flex-1 max-w-[480px] w-full">
          <div className="flex flex-col sm:flex-row items-center gap-10 text-left">

            {/* MAIN IMAGE with pill shape */}
            <div className="shrink-0 w-[210px] aspect-[3/5] overflow-hidden rounded-[120px]">
              <Image
                src={student.image}
                alt={t(student.nameKey)}
                width={210}
                height={360}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Text */}
            <div className="self-center text-center sm:text-left">
              <h3 className="text-xl font-bold mb-3">{t(student.nameKey)}</h3>

              {/* Removed titleKey */}
              {/* Removed CTA button */}

              <p className="text-sm leading-relaxed">{t(student.textKey)}</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}