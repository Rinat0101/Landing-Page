'use client';

import Image from "next/image";
import { useTheme } from "next-themes";

export default function GuaranteeSection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="w-full px-4 sm:px-6 md:px-8">
      <div
        className={`relative border border-[#F28237] rounded-[1.625rem] py-16 md:py-20 mt-20 max-w-[1200px] mx-auto transition-colors duration-300 ${
          isLight ? 'bg-[#FFF6EC]' : 'bg-[#221C0E]'
        }`}
      >
        {/* Centered orange circle with icon */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-[#F28237] rounded-full w-28 h-28 flex items-center justify-center shadow-md">
            <Image
              src="/images/guarantees_icon.svg"
              alt="Guarantee Icon"
              width={48}
              height={48}
            />
          </div>
        </div>

        {/* Text content */}
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4 sm:px-6">
          <h2
            className={`text-3xl md:text-4xl font-extrabold mb-4 ${
              isLight ? 'text-black' : 'text-white'
            }`}
          >
            Learn without risks — we’ll give your money back
          </h2>
          <p className={`text-base md:text-lg ${isLight ? 'text-black/80' : 'text-white/80'}`}>
            If within the first 14 days you realize the course isn’t for you — we’ll refund the full amount, no questions asked. Your confidence in the choice is our priority.
          </p>
        </div>
      </div>
    </div>
  );
}