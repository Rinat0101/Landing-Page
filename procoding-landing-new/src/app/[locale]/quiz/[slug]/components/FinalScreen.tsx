'use client';

import Image from 'next/image';

type Props = {
  calendlyLink: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
};

export default function FinalScreen({
  calendlyLink,
  title = 'Great!',
  subtitle = 'Step 2 — book your intro session 👇',
  ctaText = 'Book your appointment',
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 bg-white text-black text-center">
      
      <div className="relative w-80 h-60 mb-12">
        <Image
          src="/images/icons/quiz_final.webp"
          alt="Student successfully completed the quiz"
          fill
          className="object-cover rounded-md"
          priority
        />
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-purple-700">
        {title}
      </h2>
      
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        {subtitle}
      </p>

      <a
        href={calendlyLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ctaText}
        className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition"
      >
        {ctaText}
      </a>
    </div>
  );
}