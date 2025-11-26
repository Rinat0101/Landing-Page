"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { useTheme } from "next-themes";
import InstructorCard from "../../components/InstructorCard";

type InstructorData = {
  instructors_title_en: string;
  instructors_title_ru: string;
  instructors_description_en: string;
  instructors_description_ru: string;
  instructor1_name_en: string;
  instructor1_name_ru: string;
  instructor1_role_en: string;
  instructor1_role_ru: string;
  instructor1_description_en: string;
  instructor1_description_ru: string;
  instructor2_name_en: string;
  instructor2_name_ru: string;
  instructor2_role_en: string;
  instructor2_role_ru: string;
  instructor2_description_en: string;
  instructor2_description_ru: string;
  instructor3_name_en: string;
  instructor3_name_ru: string;
  instructor3_role_en: string;
  instructor3_role_ru: string;
  instructor3_description_en: string;
  instructor3_description_ru: string;
};

type Props = {
  data: InstructorData;
  locale: "en" | "ru";
};

export default function OurTeam({ data, locale }: Props) {
  if (!data) return null;
  const { theme } = useTheme();
  const isLight = theme === "light";

  const t = (key: string) => data[`${key}_${locale}` as keyof InstructorData];

  const instructors = [
    {
      name: t("instructor1_name"),
      role: t("instructor1_role"),
      description: t("instructor1_description"),
      image: "/images/Mask group (5).webp",
    },
    {
      name: t("instructor2_name"),
      role: t("instructor2_role"),
      description: t("instructor2_description"),
      image: "/images/Mask group (6).webp",
    },
    {
      name: t("instructor3_name"),
      role: t("instructor3_role"),
      description: t("instructor3_description"),
      image: "/images/Mask group (4).webp",
    },
  ].filter((instructor) => instructor.name?.trim());

  return (
    <section
      className={`py-20 transition-colors duration-300 ${
        isLight ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">{t("instructors_title")}</h2>
        <p className="max-w-3xl mx-auto mb-12">{t("instructors_description")}</p>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {instructors.map((instructor, index) => (
            <InstructorCard
              key={index}
              name={instructor.name}
              role={instructor.role}
              description={instructor.description}
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
                    name={instructor.name}
                    role={instructor.role}
                    description={instructor.description}
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