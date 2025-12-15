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

  // Dynamically handled instructor fields from 1 to 6
  [key: string]: string | undefined;
};

type Props = {
  data: InstructorData;
  locale: "en" | "ru";
};

export default function OurTeam({ data, locale }: Props) {
  if (!data) return null;

  const { theme } = useTheme();
  const isLight = theme === "light";

  const t = (key: string) =>
    data[`${key}_${locale}` as keyof InstructorData] || "";

  const instructors = Array.from({ length: 6 }, (_, i) => {
    const index = i + 1;
    const name = t(`instructor${index}_name`);
    const role = t(`instructor${index}_role`);
    const description = t(`instructor${index}_description`);
    const imageKey = `instructor${index}_image`;

    // Skip if there's no name or no image
    if (!name || !data[imageKey]) return null;

    return {
      name,
      role: role || "",
      description: description || "",
      imageKey,
    };
  }).filter(Boolean) as {
    name: string;
    role: string;
    description: string;
    imageKey: string;
  }[];

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
              imageKey={instructor.imageKey}
              data={data}
              locale={locale}
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
                    imageKey={instructor.imageKey}
                    data={data}
                    locale={locale}
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