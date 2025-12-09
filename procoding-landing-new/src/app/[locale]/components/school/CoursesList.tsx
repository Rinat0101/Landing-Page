"use client";

import { useTheme } from "next-themes";
import { useTranslation } from "@/lib/TranslationContext";
import CourseCard from "../../../components/CourseCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type Props = {
  courses: any[]; // WP courses
  locale: string;
};

export default function CoursesList({ courses, locale }: Props) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const textColor = isLight ? "text-black" : "text-white";
  const bgColor = isLight ? "bg-white" : "bg-black";

  // 🧠 Transform ALL WP courses into CourseCard data dynamically
  const wpCourses = courses.map((course) => ({
    title: course.title?.rendered ?? t("school.courses.items.0.title"),
    description: course.excerpt?.rendered ?? t("school.courses.items.0.description"),
    duration: course.acf?.duration ?? t("school.courses.items.0.duration"),
    features: course.acf?.features ?? [
      t("school.courses.items.0.features.first"),
      t("school.courses.items.0.features.second"),
    ],
    cta: t("school.courses.items.0.cta"),
    image:
      course._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
      "/images/school/Course_cover_1.webp",
    link: `/${locale}/courses/${course.slug}`,
  }));

  // 🧱 Static placeholders (keep them unchanged for now)
  const staticCourses = [
    {
      title: t("school.courses.items.1.title"),
      description: t("school.courses.items.1.description"),
      duration: t("school.courses.items.1.duration"),
      features: [
        t("school.courses.items.1.features.first"),
        t("school.courses.items.1.features.second"),
      ],
      cta: t("school.courses.items.1.cta"),
      image: "/images/school/Course_cover_2.webp",
      link: "#",
    },
    {
      title: t("school.courses.items.2.title"),
      description: t("school.courses.items.2.description"),
      duration: t("school.courses.items.2.duration"),
      features: [
        t("school.courses.items.2.features.first"),
        t("school.courses.items.2.features.second"),
      ],
      cta: t("school.courses.items.2.cta"),
      image: "/images/school/Course_cover_3.webp",
      link: "#",
    },
  ];

  const mixedCourses = [...wpCourses, ...staticCourses];

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
          {mixedCourses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              description={course.description}
              duration={course.duration}
              features={course.features}
              cta={course.cta}
              image={course.image}
              link={course.link}
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
            {mixedCourses.map((course, index) => (
              <SwiperSlide key={index}>
                <div className="w-[90%] sm:w-[80%] md:w-[70%] mx-auto">
                  <CourseCard
                    title={course.title}
                    description={course.description}
                    duration={course.duration}
                    features={course.features}
                    cta={course.cta}
                    image={course.image}
                    link={course.link}
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