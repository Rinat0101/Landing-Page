"use client";

import { useTheme } from "next-themes";
import { useTranslation } from "@/lib/TranslationContext";
import CourseCard from "../../../components/CourseCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const courses = [
  {
    titleKey: "school.courses.items.0.title",
    descriptionKey: "school.courses.items.0.description",
    durationKey: "school.courses.items.0.duration",
    featuresKeys: [
      "school.courses.items.0.features.first",
      "school.courses.items.0.features.second",
    ],
    ctaKey: "school.courses.items.0.cta",
    image: "/images/school/Course_cover_1.webp",
  },
  {
    titleKey: "school.courses.items.1.title",
    descriptionKey: "school.courses.items.1.description",
    durationKey: "school.courses.items.1.duration",
    featuresKeys: [
      "school.courses.items.1.features.first",
      "school.courses.items.1.features.second",
    ],
    ctaKey: "school.courses.items.1.cta",
    image: "/images/school/Course_cover_2.webp",
  },
  {
    titleKey: "school.courses.items.2.title",
    descriptionKey: "school.courses.items.2.description",
    durationKey: "school.courses.items.2.duration",
    featuresKeys: [
      "school.courses.items.2.features.first",
      "school.courses.items.2.features.second",
    ],
    ctaKey: "school.courses.items.2.cta",
    image: "/images/school/Course_cover_3.webp",
  },
];

export default function CoursesList() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const textColor = isLight ? "text-black" : "text-white";
  const bgColor = isLight ? "bg-white" : "bg-black";

  return (
    <section className={`py-16 px-6 ${bgColor}`} aria-label="Courses Section">
      <div className="max-w-screen-xl mx-auto text-center sm:px-6">
        {/* Title & Description */}
        <header>
          <h2 className={`text-3xl md:text-4xl font-bold ${textColor}`}>
            {t("school.courses.heading")}
          </h2>
          <p className={`mt-4 max-w-2xl mx-auto ${textColor}`}>
            {t("school.courses.description")}
          </p>
        </header>

        {/* Grid view for desktop */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              title={t(course.titleKey)}
              description={t(course.descriptionKey)}
              duration={t(course.durationKey)}
              features={course.featuresKeys.map(t)}
              cta={t(course.ctaKey)}
              image={course.image}
            />
          ))}
        </div>

        {/* Swiper for mobile/tablet */}
        <div className="block lg:hidden mt-10">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={24}
            pagination={{ clickable: true }}
            className="!pb-12"
          >
            {courses.map((course, index) => (
              <SwiperSlide key={index}>
                <div className="w-[90%] sm:w-[80%] md:w-[70%] mx-auto">
                  <CourseCard
                    title={t(course.titleKey)}
                    description={t(course.descriptionKey)}
                    duration={t(course.durationKey)}
                    features={course.featuresKeys.map(t)}
                    cta={t(course.ctaKey)}
                    image={course.image}
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