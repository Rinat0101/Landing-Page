"use client";

import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  subtitle: string;
  onNext: () => void;
};

export default function WelcomeScreen({ title, subtitle, onNext }: Props) {
  return (
    <div className="flex flex-col items-center justify-start px-4 text-center bg-white pt-2 md:pt-0">
    {/* 🌆 Top Main Image */}
      <div className="w-full max-w-md mb-6">
        <Image
          src="/images/icons/Ready to transform your career and grow in IT_.webp"
          alt="Main visual"
          width={500}
          height={300}
          className="w-full h-auto object-cover rounded-xl"
        />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold mb-4">{title}</h1>
      <p className="text-base md:text-lg text-gray-600 mb-8">{subtitle}</p>

      <button
        onClick={onNext}
        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
      >
        Start
      </button>
    </div>
  );
}