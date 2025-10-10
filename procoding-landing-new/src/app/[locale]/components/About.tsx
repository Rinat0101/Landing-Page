"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import AboutCard from "../../components/AboutCard";
import SectionTitle from "../../components/shared/SectionTitle";
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
      <div className="max-w-screen-xl mx-auto text-center">
        {/* Section Title */}
        <h2
          className={`${
            isLight ? "text-black" : "text-white"
          } text-4xl font-bold mb-4`}
        >
          {t("about.title")}
        </h2>
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AboutCard
            icon="about_laptop.svg"
            title={t("about.cards.0.title")}
            description={t("about.cards.0.description")}
          />
          <AboutCard
            icon="icons/suitcase.svg"
            title={t("about.cards.1.title")}
            description={t("about.cards.1.description")}
          />
          <AboutCard
            icon="icons/pencil.svg"
            title={t("about.cards.2.title")}
            description={t("about.cards.2.description")}
          />
          <AboutCard
            icon="icons/star.svg"
            title={t("about.cards.3.title")}
            description={t("about.cards.3.description")}
          />
          <AboutCard
            icon="icons/clock.svg"
            title={t("about.cards.4.title")}
            description={t("about.cards.4.description")}
          />
          <AboutCard
            icon="about_people.svg"
            title={t("about.cards.5.title")}
            description={t("about.cards.5.description")}
          />
        </div>
      </div>
    </section>
  );
}
