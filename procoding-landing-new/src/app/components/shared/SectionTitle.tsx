'use client';

import { ReactNode } from "react";
import { useTheme } from "next-themes";

interface SectionTitleProps {
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionTitleProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const alignmentClass =
    align === "left"
      ? "text-left items-start"
      : align === "right"
      ? "text-right items-end"
      : "text-center items-center";

  const titleColor = isLight ? "text-[#1A1A1A]" : "text-white";
  const subtitleColor = isLight ? "text-[#555]" : "text-white/70";

  return (
    <div className={`flex flex-col gap-2 mb-10 ${alignmentClass} ${className}`}>
      <h2 className={`text-3xl md:text-4xl font-bold ${titleColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg max-w-2xl ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}