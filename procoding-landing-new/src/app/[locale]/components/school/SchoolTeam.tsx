"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { useTheme } from "next-themes";
import InstructorCard from "./InstructorCard";
import { useTranslation } from "@/lib/TranslationContext";

const instructors = [
  {
    nameKey: "school.instructors.Roza.name",
    roleKey: "school.instructors.Roza.role",
    descriptionKey: "school.instructors.Roza.description",
    image: "/images/school/Roza.webp",
  },
  {
    nameKey: "school.instructors.anastasiia.name",
    roleKey: "school.instructors.anastasiia.role",
    descriptionKey: "school.instructors.anastasiia.description",
    image: "/images/Mask group (6).webp",
  },
  {
    nameKey: "school.instructors.konstantin.name",
    roleKey: "school.instructors.konstantin.role",
    descriptionKey: "school.instructors.konstantin.description",
    image: "/images/school/Konstantin.webp",
  },
  {
    nameKey: "school.instructors.kate.name",
    roleKey: "school.instructors.kate.role",
    descriptionKey: "school.instructors.kate.description",
    image: "/images/Mask group (5).webp",
  },
];

export default function OurTeam() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const { t } = useTranslation();

  return (
    <section
      className={`py-20 px-6 transition-colors duration-300 ${
        isLight ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-10">{t("instructors.title")}</h2>

        {/* 🖥 Desktop View (Grid) */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {instructors.map((instructor, index) => (
            <InstructorCard
              key={index}
              name={t(instructor.nameKey)}
              role={t(instructor.roleKey)}
              description={t(instructor.descriptionKey)}
              image={instructor.image}
            />
          ))}
        </div>

        {/* 📱 Mobile View (Swiper) */}
        <div className="block lg:hidden relative">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            className="!pb-12"
          >
            {instructors.map((instructor, index) => (
              <SwiperSlide key={index}>
                <div className="w-[90%] sm:w-[80%] md:w-[60%] mx-auto">
                  <InstructorCard
                    name={t(instructor.nameKey)}
                    role={t(instructor.roleKey)}
                    description={t(instructor.descriptionKey)}
                    image={instructor.image}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}