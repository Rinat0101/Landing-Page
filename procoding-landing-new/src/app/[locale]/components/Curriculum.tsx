"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

type CurriculumProps = {
  data: { [key: string]: string };
  locale: "en" | "ru"; // add supported locales here
};

interface Tab {
  label: string;
  title: string;
  learnTitle: string;
  learnPoints: string[];
  getTitle: string;
  getPoints: string[];
  icons: string[];
}

export default function CurriculumOverview({ data, locale }: CurriculumProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const iconsByTab = [
    ["vscode.svg", "github.svg", "git.svg", "html.svg", "css.svg"],
    ["html.svg", "css.svg", "bootstrap.svg", "tailwind.svg", "js.svg"],
    ["nodejs.svg", "fetch.svg", "axios.svg", "mongodb.svg", "postman.svg"],
    ["react.svg", "js.svg"],
    ["php.svg", "ts.svg", "vue.svg", "angular.svg", "copilot.svg"],
    [],
    [],
    [],
  ];

  const key = (base: string) => `${base}_${locale}`;

  const tabs: Tab[] = Array.from({ length: 8 })
    .map((_, i) => {
      const num = i + 1;
      const label = data[key(`curriculum_tab${num}_label`)] || "";
      if (!label) return null;

      return {
        label,
        title: data[key(`curriculum_tab${num}_title`)] || "",
        learnTitle: data[key(`curriculum_tab${num}_learn`)] || "",
        learnPoints:
          (data[key(`curriculum_tab${num}_learn_content`)] || "").split("\n"),
        getTitle: data[key(`curriculum_tab${num}_get`)] || "",
        getPoints:
          (data[key(`curriculum_tab${num}_get_content`)] || "").split("\n"),
        icons: iconsByTab[i] || [],
      };
    })
    .filter(Boolean) as Tab[];

  const active = tabs[activeTab] || tabs[0] || null;

  if (!active) return null;

  return (
    <section
      className={`py-16 transition-colors duration-300 ${
        isLight ? "bg-white" : "bg-black"
      }`}
    >
      <div className="w-full max-w-screen-xl px-4 md:px-6 mx-auto flex flex-col md:flex-row gap-10 md:gap-20">
        {/* LEFT SIDE */}
        <div className="md:w-[44%] w-full text-center md:text-left">
          <h3
            className={`text-4xl font-bold mb-4 ${
              isLight ? "text-black" : "text-white"
            }`}
          >
            {data[key("curriculum_title")]}
          </h3>
          <p className={`${isLight ? "text-black" : "text-white"}`}>
            {isMobile
              ? data[key("curriculum_subtitle_short")] ||
                data[key("curriculum_subtitle")]
              : data[key("curriculum_subtitle")]}
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div
          className={`rounded-xl p-6 shadow-xl md:w-[56%] w-full flex flex-col gap-6 ${
            isLight ? "bg-white" : "bg-[#141414]"
          }`}
          style={{ minHeight: "34rem" }}
        >
          {/* TABS */}
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`relative text-sm md:text-base font-medium px-3 py-2 transition-all duration-200 ${
                  activeTab === index
                    ? `text-[#D726B3] after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-gradient-to-r after:from-[#D726B3] after:to-[#F28237]`
                    : isLight
                    ? "text-black hover:text-[#D726B3]"
                    : "text-white hover:text-[#D726B3]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* CONTENT */}
          <div className="flex flex-col justify-between flex-1 overflow-hidden">
            <div className="mt-4 mx-2 md:mx-4 flex-1 space-y-8">
              <h4
                className={`text-xl md:text-2xl font-semibold mb-5 ${
                  isLight ? "text-black" : "text-white"
                }`}
              >
                {active.title}
              </h4>

              {/* WHAT YOU’LL LEARN */}
              <div>
                <h4
                  className={`text-xl font-semibold mb-3 ${
                    isLight ? "text-black" : "text-white"
                  }`}
                >
                  {active.learnTitle}
                </h4>
                <ul className="list-disc pl-6 space-y-1">
                  {active.learnPoints.map((point, i) =>
                    point.trim() ? (
                      <li
                        key={`learn-${i}`}
                        className={`text-base ${
                          isLight ? "text-black" : "text-white"
                        }`}
                      >
                        {point}
                      </li>
                    ) : null
                  )}
                </ul>
              </div>

              {/* WHAT YOU’LL GET */}
              <div>
                <h4
                  className={`text-xl font-semibold mb-3 ${
                    isLight ? "text-black" : "text-white"
                  }`}
                >
                  {active.getTitle}
                </h4>
                <ul className="list-disc pl-6 space-y-1">
                  {active.getPoints.map((point, i) =>
                    point.trim() ? (
                      <li
                        key={`get-${i}`}
                        className={`text-base ${
                          isLight ? "text-black" : "text-white"
                        }`}
                      >
                        {point}
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            </div>

            {/* TECH ICONS */}
            {active.icons?.length > 0 && (
              <div className="mt-8 mx-2 md:mx-4">
                <h5
                  className={`text-lg font-semibold mb-4 ${
                    isLight ? "text-black" : "text-white"
                  }`}
                >
                  Technologies
                </h5>

                <div className="flex flex-wrap gap-3">
                  {active.icons.map((icon, i) => (
                    <Image
                      key={i}
                      src={`/images/icons/${icon}`}
                      alt={icon.replace(".svg", "")}
                      width={32}
                      height={32}
                      loading="lazy"
                      className={`w-8 h-8 ${
                        icon === "github.svg" && !isLight ? "invert" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}