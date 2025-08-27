'use client';

import Image from "next/image";
import { useTheme } from "next-themes";

interface AboutCardProps {
  icon: string;
  title: string;
  description: string;
  dark?: boolean;
}

export default function AboutCard({ icon, title, description, dark = false }: AboutCardProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  // Background color logic
  const bgColor = isLight
    ? dark
      ? "bg-[#F3E8FF]" // lighter purple for dark-type cards
      : "bg-[#F9F4FF]" // soft background for normal cards
    : dark
    ? "bg-[#1A001E]"
    : "bg-[#0C0C0C]";

  // Text color logic
  const headingColor = isLight ? "text-[#1A1A1A]" : "text-white";
  const descColor = isLight ? "text-[#555]" : "text-white/80";

  return (
    <div className={`rounded-2xl p-6 ${bgColor} flex flex-col gap-4 transition-colors duration-300`}>
      <Image
        src={`/images/${icon}`}
        alt={title}
        width={40}
        height={40}
        className="w-10 h-10"
      />
      <h3 className={`font-semibold text-lg text-left ${headingColor}`}>{title}</h3>
      <p className={`text-sm leading-relaxed text-left ${descColor}`}>{description}</p>
    </div>
  );
}