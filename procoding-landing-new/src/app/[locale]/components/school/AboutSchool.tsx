"use client";

import { useTheme } from "next-themes";
import AboutCard from "../../../components/AboutCard";
import { useTranslation } from "@/lib/TranslationContext";

export default function AboutSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const { t } = useTranslation();

  return (
    <section
      className={`py-20 px-6 transition-colors duration-300 ${
        isLight ? "bg-white" : "bg-black"
      }`}
    >
      <div className="max-w-screen-xl mx-auto text-center sm:px-6">
        {/* Section Title */}
        <h2
          className={`${
            isLight ? "text-black" : "text-white"
          } text-4xl font-bold mb-4`}
        >
          {t("school.about.title")}
        </h2>
        <p
          className={`${
            isLight ? "text-black" : "text-white"
          } max-w-3xl mx-auto mb-12`}
        >
          {t("school.about.description")}
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AboutCard
            icon="/images/icons_school/hammer.svg"
            title={t("school.about.cards.0.title")}
            description={t("school.about.cards.0.description")}
          />
          <AboutCard
            icon="/images/icons_school/certificate.svg"
            title={t("school.about.cards.1.title")}
            description={t("school.about.cards.1.description")}
          />
          <AboutCard
            icon="/images/icons_school/confidence.svg"
            title={t("school.about.cards.2.title")}
            description={t("school.about.cards.2.description")}
          />
          <AboutCard
            icon="/images/icons_school/ways.svg"
            title={t("school.about.cards.3.title")}
            description={t("school.about.cards.3.description")}
          />
        </div>
      </div>
    </section>
  );
}