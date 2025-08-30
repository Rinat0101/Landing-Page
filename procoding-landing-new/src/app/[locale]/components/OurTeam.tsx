"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useTheme } from "next-themes";
import InstructorCard from "../../components/InstructorCard";
import { useTranslation } from "@/lib/TranslationContext";

const instructors = [
  {
    name: "Kate",
    role: "Methodologist",
    descriptionKey: "instructors.kate",
    image: "/images/teacher_1.svg",
  },
  {
    name: "Anastasia",
    role: "Course Expert",
    descriptionKey: "instructors.anastasia",
    image: "/images/teacher_2.svg",
  },
  {
    name: "Konstantin",
    role: "AQA Teacher",
    descriptionKey: "instructors.konstantin",
    image: "/images/teacher_3.svg",
  },
];

export default function OurTeam() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const { t } = useTranslation();

  return (
    <section
      className={`py-20 transition-colors duration-300 ${
        isLight ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">{t("instructors.title")}</h2>
        <p
          className={`max-w-3xl mx-auto mb-12 ${
            isLight ? "text-[#555]" : "text-gray-300"
          }`}
        >
          {t("instructors.description")}
        </p>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {instructors.map((instructor, index) => (
            <InstructorCard
              key={index}
              name={instructor.name}
              role={instructor.role}
              description={t(instructor.descriptionKey)}
              image={instructor.image}
            />
          ))}
        </div>

        {/* Mobile Swiper */}
        <div className="block md:hidden relative">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            className="!pb-12"
          >
            {instructors.map((instructor, index) => (
              <SwiperSlide key={index}>
                <InstructorCard
                  name={instructor.name}
                  role={instructor.role}
                  description={t(instructor.descriptionKey)}
                  image={instructor.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-pagination !bottom-0 mt-4 flex justify-center" />
        </div>
      </div>
    </section>
  );
}