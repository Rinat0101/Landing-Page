"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

type CourseCardProps = {
  title: string;
  description: string;
  image: string;
  duration: string;
  features: string[];
  cta: string;
  isFirst?: boolean;
  link?: string;
};

export default function CourseCard({
  title,
  description,
  image,
  duration,
  features,
  cta,
  isFirst = false,
  link,
}: CourseCardProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div
      className={`relative rounded-2xl transition-all duration-300 shadow-lg h-full ${
        isLight
          ? "p-[2px] bg-gradient-to-br from-[#F28237] via-[#F4EBFF] to-[#D726B3] shadow-[#F28237]/30 animated-gradient-border"
          : "p-[2px] bg-gradient-to-br from-[#F28237] via-[#111111] to-[#D726B3] animated-gradient-border"
      }`}
    >
      <div
        className={`rounded-[14px] p-5 flex flex-col justify-between text-left h-full ${
          isLight ? "bg-white text-black" : "bg-zinc-900 text-white"
        }`}
      >
        {/* Content wrapper */}
        <div className="flex-1 flex flex-col">
          {/* Image wrapper */}
          <div className="relative w-full aspect-[3/2] rounded-md overflow-hidden mb-4">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={isFirst}
              loading={isFirst ? "eager" : "lazy"}
            />
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold mb-2">{title}</h3>

          {/* Description */}
          <div className="mb-4 text-sm leading-relaxed h-40 overflow-hidden">
            {description}
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 text-sm font-semibold mb-4">
            <Image
              src="/images/calendar_icon.svg"
              alt="Duration"
              width={20}
              height={20}
            />
            <span>{duration}</span>
          </div>

          {/* Features */}
          <ul className="text-sm space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Image
                  src={`/images/icons_school/${
                    index === 0 ? "hat_pink.svg" : "suitcase_pink.svg"
                  }`}
                  alt="Feature icon"
                  width={20}
                  height={20}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="mt-6">
          <a href={link || "#contact"}>
            <button className="bg-[#A943D5] hover:opacity-90 text-white w-full py-2 rounded-full transition text-sm font-semibold">
              {cta}
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
