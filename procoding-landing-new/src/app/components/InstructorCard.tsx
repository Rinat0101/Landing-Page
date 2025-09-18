"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

type InstructorCardProps = {
  name: string;
  role: string;
  description: string;
  image: string;
};

export default function InstructorCard({
  name,
  role,
  description,
  image,
}: InstructorCardProps) {
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
        className={`rounded-[14px] p-6 flex flex-col items-center text-center h-full ${
          isLight ? "bg-white text-black" : "bg-[#111111] text-white"
        }`}
      >
        <Image
          src={image}
          alt={name}
          width={180}
          height={180}
          className="mb-4 rounded-full"
        />
        <span className="bg-[#F28237] text-xs font-semibold text-white px-3 py-1 rounded-full mb-3">
          {role}
        </span>
        <h3 className="text-lg font-bold mb-2">{name}</h3>
        <p
          className={`text-sm mb-4 ${
            isLight ? "text-gray-800" : "text-gray-300"
          }`}
        >
          {description}
        </p>
        <div className="mt-auto">
          <button
            className={`rounded-full px-4 py-2 text-sm transition border font-semibold ${
              isLight
                ? "border-[#D726B3] text-[#D726B3] hover:bg-[#D726B3] hover:text-white"
                : "border-white text-white hover:bg-white hover:text-black"
            }`}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}