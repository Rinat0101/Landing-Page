"use client";

import { useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslation } from "@/lib/TranslationContext";

const faqData = [
  {
    questionKey: "school.faq.q1",
    answerKey: "school.faq.a1",
  },
  {
    questionKey: "school.faq.q2",
    answerKey: "school.faq.a2",
  },
  {
    questionKey: "school.faq.q3",
    answerKey: "school.faq.a3",
  },
  {
    questionKey: "school.faq.q4",
    answerKey: "school.faq.a4",
  },
  {
    questionKey: "school.faq.q5",
    answerKey: "school.faq.a5",
  },
  {
    questionKey: "school.faq.q6",
    answerKey: "school.faq.a6",
  },
  {
    questionKey: "school.faq.q7",
    answerKey: "school.faq.a7",
  },
  {
    questionKey: "school.faq.q8",
    answerKey: "school.faq.a8",
  },
  {
    questionKey: "school.faq.q9",
    answerKey: "school.faq.a9",
  },
  {
    questionKey: "school.faq.q10",
    answerKey: "school.faq.a10",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { t } = useTranslation();

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className={`w-full flex justify-center py-16 px-6 transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="w-full max-w-3xl">
        <h2 className="text-center text-4xl font-bold mb-4">
          {t("school.faq.title")}
        </h2>
        <p
          className={`text-center max-w-2xl mx-auto mb-12 text-sm md:text-base ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {t("school.faq.subtitle")}
        </p>

        <div className="space-y-4">
          {faqData.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                  isDark
                    ? "bg-[#0f0f0f]"
                    : "bg-[#f3f2ff] border border-black/10"
                }`}
              >
                <button
                  onClick={() => toggleIndex(i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src="/images/question_mark_icon.svg"
                      alt="?"
                      width={30}
                      height={30}
                      style={{
                        filter: isOpen
                          ? "brightness(1.1) saturate(2) hue-rotate(280deg)"
                          : "brightness(1.1) saturate(1.2)",
                      }}
                    />
                    <h3 className="font-semibold text-base md:text-lg">
                      {t(item.questionKey)}
                    </h3>
                  </div>
                  <span
                    className={`text-2xl font-bold transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    } ${isDark ? "text-white" : "text-black"}`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen
                      ? "max-h-[500px] opacity-100 py-4 px-14"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p
                    className={`text-sm md:text-base leading-relaxed ${
                      isDark ? "text-white" : "text-black"
                    }`}
                  >
                    {t(item.answerKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
