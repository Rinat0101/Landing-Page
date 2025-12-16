"use client";

import { useTheme } from "next-themes";
import AboutCard from "../../components/AboutCard";

type AboutProps = {
  data: {
    about_title_en?: string;
    about_title_ru?: string;

    about_card1_title_en?: string;
    about_card1_title_ru?: string;
    about_card1_description_en?: string;
    about_card1_description_ru?: string;
    about_card1_icon?: string;

    about_card2_title_en?: string;
    about_card2_title_ru?: string;
    about_card2_description_en?: string;
    about_card2_description_ru?: string;
    about_card2_icon?: string;

    about_card3_title_en?: string;
    about_card3_title_ru?: string;
    about_card3_description_en?: string;
    about_card3_description_ru?: string;
    about_card3_icon?: string;

    about_card4_title_en?: string;
    about_card4_title_ru?: string;
    about_card4_description_en?: string;
    about_card4_description_ru?: string;
    about_card4_icon?: string;

    about_card5_title_en?: string;
    about_card5_title_ru?: string;
    about_card5_description_en?: string;
    about_card5_description_ru?: string;
    about_card5_icon?: string;

    about_card6_title_en?: string;
    about_card6_title_ru?: string;
    about_card6_description_en?: string;
    about_card6_description_ru?: string;
    about_card6_icon?: string;
  };
  locale: "en" | "ru";
};

export default function AboutSection({ data, locale }: AboutProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const get = (key: string) => {
    const localizedKey = `${key}_${locale}` as keyof typeof data;
    return data?.[localizedKey] || "";
  };

  const cards = Array.from({ length: 6 }, (_, i) => {
    const index = i + 1;
    return {
      icon: data[`about_card${index}_icon` as keyof typeof data] as string,
      title: get(`about_card${index}_title`),
      description: get(`about_card${index}_description`),
    };
  }).filter((card) => card.title && card.description);

  return (
    <section
      className={`py-20 px-6 transition-colors duration-300 ${
        isLight ? "bg-white" : "bg-black"
      }`}
    >
      <div className="max-w-screen-xl mx-auto text-center">
        <h2
          className={`text-4xl font-bold mb-4 ${
            isLight ? "text-black" : "text-white"
          }`}
        >
          {get("about_title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <AboutCard
              key={idx}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}