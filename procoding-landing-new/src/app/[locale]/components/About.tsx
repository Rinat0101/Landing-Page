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
        <SectionTitle
          title={t("about.title")}
          subtitle={t("about.subtitle")}
          className={isLight ? "text-black" : "text-white"}
        />

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <AboutCard
            icon="about_laptop.svg"
            title={t("about.cards.0.title")}
            description={t("about.cards.0.description")}
          />
          <AboutCard
            icon="about_book.svg"
            title={t("about.cards.1.title")}
            description={t("about.cards.1.description")}
          />
          <AboutCard
            icon="about_people.svg"
            title={t("about.cards.2.title")}
            description={t("about.cards.2.description")}
          />
          <AboutCard
            icon="about_bulb.svg"
            title={t("about.cards.3.title")}
            description={t("about.cards.3.description")}
          />

          {/* Image Card */}
          <div className="rounded-2xl overflow-hidden h-full w-full">
            <Image
              src="/images/about_view.svg"
              alt="City View"
              width={600}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}