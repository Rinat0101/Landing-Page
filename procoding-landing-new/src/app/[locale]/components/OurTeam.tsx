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
    nameKey: "instructors.kate.name",
    roleKey: "instructors.kate.role",
    descriptionKey: "instructors.kate.description",
    image: "/images/Mask group (5).webp",
  },
  {
    nameKey: "instructors.anastasiia.name",
    roleKey: "instructors.anastasiia.role",
    descriptionKey: "instructors.anastasiia.description",
    image: "/images/Mask group (6).webp",
  },
  {
    nameKey: "instructors.angelina.name",
    roleKey: "instructors.angelina.role",
    descriptionKey: "instructors.angelina.description",
    image: "/images/Mask group (4).webp",
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
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">{t("instructors.title")}</h2>
        <p
          className={`max-w-3xl mx-auto mb-12 ${
            isLight ? "text-black" : "text-white"
          }`}
        >
          {t("instructors.description")}
        </p>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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

        {/* Mobile Swiper */}
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