"use client";

import { useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslation } from "@/lib/TranslationContext";

const faqData = [
  {
    questionKey: "faq.q1",
    answerKey: "faq.a1",
  },
  {
    questionKey: "faq.q2",
    answerKey: "faq.a2",
  },
  {
    questionKey: "faq.q3",
    answerKey: "faq.a3",
  },
  {
    questionKey: "faq.q4",
    answerKey: "faq.a4",
  },
  {
    questionKey: "faq.q5",
    answerKey: "faq.a5",
  },
  {
    questionKey: "faq.q6",
    answerKey: "faq.a6",
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
      className={`w-full flex justify-center py-16 px-4 transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="w-full max-w-3xl">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-4">
          {t("faq.title")}
        </h2>
        <p
          className={`text-center max-w-2xl mx-auto mb-10 text-sm md:text-base ${
            isDark ? "text-white/80" : "text-black/70"
          }`}
        >
          {t("faq.subtitle")}
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
                  <Image
                    src="/images/plus_icon.svg"
                    alt="toggle"
                    width={28}
                    height={28}
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    style={{
                      filter: isDark
                        ? "invert(100%)"
                        : "invert(0%) brightness(0%)",
                    }}
                  />
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
                      isDark ? "text-white/80" : "text-black/80"
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