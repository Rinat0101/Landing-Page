'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';

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
  const isLight = theme === 'light';

  return (
    <div
      className={`rounded-xl p-6 flex flex-col items-center text-center transition-colors duration-300 ${
        isLight ? 'bg-[#F4EBFF] text-black' : 'bg-[#111111] text-white'
      }`}
    >
      <Image
        src={image}
        alt={name}
        width={180}
        height={180}
        className="mb-4"
      />
      <span className="bg-[#F28237] text-xs font-semibold text-white px-3 py-1 rounded-full mb-3">
        {role}
      </span>
      <h3 className={`text-lg font-bold mb-2 ${isLight ? 'text-black' : 'text-white'}`}>
        {name}
      </h3>
      <p className={`text-sm mb-4 ${isLight ? 'text-gray-800' : 'text-gray-300'}`}>
        {description}
      </p>
      <button
        className={`rounded-full px-4 py-2 text-sm transition border ${
          isLight
            ? 'border-black text-black hover:bg-black hover:text-white'
            : 'border-white text-white hover:bg-white hover:text-black'
        }`}
      >
        Join
      </button>
    </div>
  );
}