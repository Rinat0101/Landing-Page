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
  const isEn = locale === "en";

  const textColor = isLight ? "text-black" : "text-white";
  const bgColor = isLight ? "bg-white" : "bg-black";

  const wpCourses = courses.map((course) => {
    const acf = course.acf ?? {};

    // Get localized advantages
    const features = [
      isEn ? acf.advantage1_en : acf.advantage1_ru,
      isEn ? acf.advantage2_en : acf.advantage2_ru,
      isEn ? acf.advantage3_en : acf.advantage3_ru,
      isEn ? acf.advantage4_en : acf.advantage4_ru,
      isEn ? acf.advantage5_en : acf.advantage5_ru,
    ].filter(Boolean);

    return {
      title: course.title?.rendered ?? "",
      description:
        (isEn ? acf.course_description_en : acf.course_description_ru) ?? "",
      duration: (isEn ? acf.duration_en : acf.duration_ru) ?? "",
      features,
      cta: t("school.courses.items.0.cta"), // Or make this dynamic if needed
      image: acf.course_card_image || "/images/school/Course_cover_1.webp",
      link: `/${locale}/courses/${course.slug}`,
    };
  });

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
          {wpCourses.map((course, index) => (
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
            {wpCourses.map((course, index) => (
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