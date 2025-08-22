"use client";

import { useState } from "react";
import Image from "next/image";

const faqData = [
  { question: "Do I need programming experience to start learning?" },
  { question: "How much time should I dedicate weekly?" },
  { question: "What technologies will I learn?" },
  { question: "What happens at the end of the course?" },
  { question: "Do you help with job placement?" },
  { question: "Is there a money-back guarantee?" },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full flex justify-center py-16 px-4">
      <div className="w-full max-w-3xl">
        <h2 className="text-center text-white text-3xl md:text-4xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-white/80 max-w-2xl mx-auto mb-10 text-sm md:text-base">
          We’ve gathered answers to the most common questions our students ask
          before starting. If you can’t find the info you need — just message
          us, we’re here to help.
        </p>

        <div className="space-y-4">
          {faqData.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className="bg-[#0f0f0f] rounded-2xl overflow-hidden transition-all"
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
                      className={isOpen ? "text-purple-500" : "text-orange-500"}
                      style={{
                        filter: isOpen
                          ? "brightness(1.1) saturate(2) hue-rotate(280deg)"
                          : "brightness(1.1) saturate(1.2) hue-rotate(0deg)",
                      }}
                    />
                    <h3 className="text-white font-semibold text-base md:text-lg">
                      {item.question}
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
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen
                      ? "max-h-[500px] opacity-100 py-4 px-14"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-white/80 text-sm md:text-base leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    non risus. Suspendisse lectus tortor, dignissim sit amet,
                    adipiscing nec, ultricies sed, dolor. Cras elementum
                    ultrices diam.
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
