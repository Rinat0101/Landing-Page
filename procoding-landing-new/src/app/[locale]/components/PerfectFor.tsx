"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

type Props = {
  data: {
    [key: string]: string;
  };
  locale: "en" | "ru";
};

export default function PerfectForSection({ data, locale }: Props) {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const get = (key: string) => data[`${key}_${locale}`] || "";

  // ✅ Process the image URL safely
  const rawImageUrl = data.perfectfor_image;
  const isValidImageUrl =
    typeof rawImageUrl === "string" &&
    rawImageUrl.trim() !== "" &&
    (rawImageUrl.trim().startsWith("http") || rawImageUrl.trim().startsWith("/"));

  const imageUrl = isValidImageUrl
    ? rawImageUrl.trim()
    : "/images/dragon/Mask group (1).png";

  const cards = [
    {
      title: get("perfectfor_beginners_title"),
      description: get("perfectfor_beginners_description"),
    },
    {
      title: get("perfectfor_careerchangers_title"),
      description: get("perfectfor_careerchangers_description"),
    },
    {
      title: get("perfectfor_graduates_title"),
      description: get("perfectfor_graduates_description"),
    },
  ];

  return (
    <section
      className={`py-20 transition-colors duration-300 ${
        isLight ? "bg-white" : "bg-black"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        {/* Top Heading */}
        <div className="text-center mb-12">
          <h2
            className={`text-4xl font-bold ${
              isLight ? "text-black" : "text-white"
            }`}
          >
            {get("perfectfor_heading")}
          </h2>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col-reverse lg:flex-row gap-12 items-start">
          {/* LEFT: Image */}
          <div className="w-full lg:w-2/5 flex justify-center">
            <div className="relative w-full aspect-[6/5] max-w-[500px] md:max-w-[600px] lg:max-w-[700px]">
              <Image
                src={imageUrl}
                alt="Perfect For Illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* RIGHT: Cards */}
          <div className="w-full lg:w-3/5 grid grid-cols-1 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`relative rounded-2xl transition-all duration-300 shadow-lg ${
                  isLight
                    ? "p-[2px] bg-gradient-to-br from-[#F28237] via-[#F4EBFF] to-[#D726B3] shadow-[#F28237]/30 animated-gradient-border"
                    : "p-[2px] bg-gradient-to-br from-[#F28237] via-[#111111] to-[#D726B3] animated-gradient-border"
                }`}
              >
                <div
                  className={`rounded-[14px] p-6 ${
                    isLight ? "bg-white text-black" : "bg-[#111111] text-white"
                  }`}
                >
                  <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm leading-relaxed">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}