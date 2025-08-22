// components/GuaranteeSection.tsx
import Image from "next/image";

export default function GuaranteeSection() {
  return (
    <div className="relative w-full bg-[#221C0E] border border-[#F28237] rounded-[1.625rem] px-4 py-16 md:py-20 mt-20 max-w-screen-xl mx-auto">
      {/* Large centered orange circle with icon */}
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
      <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
        <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-4">
          Learn without risks — we’ll give your money back
        </h2>
        <p className="text-white text-base md:text-lg">
          If within the first 14 days you realize the course isn’t for you — we’ll refund the full amount, no questions asked. Your confidence in the choice is our priority.
        </p>
      </div>
    </div>
  );
}