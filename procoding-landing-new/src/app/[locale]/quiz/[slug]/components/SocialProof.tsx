'use client';

import Image from 'next/image';

type Props = {
  onNext: () => void;
  onBack: () => void;
};

export default function SocialProof({ onNext, onBack }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-24 md:pt-0 bg-white text-black">
      <div className="w-full max-w-md">
        {/* 🌆 Top Image */}
        <div className="w-full mb-6">
          <Image
            src="/images/icons/Career support included.webp" 
            alt="Career support"
            width={500}
            height={300}
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>

        {/* 🧾 Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg w-full">
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-900">
            What’s included in our Career Support
          </h2>

          <ul className="text-gray-800 text-sm md:text-base font-medium space-y-3 mb-8 list-disc list-inside">
            <li>Resume + LinkedIn upgrade</li>
            <li>Technical interview preparation</li>
            <li>US job application strategy</li>
          </ul>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={onBack}
              className="text-sm text-gray-600 hover:underline"
            >
              ← Back
            </button>

            <button
              onClick={onNext}
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition"
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}