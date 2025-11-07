'use client';

import React from 'react';

type Props = {
  onNext: () => void;
  onBack: () => void;
};

export default function ProgressMessage({ onNext, onBack }: Props) {
  return (
    <div className="flex flex-col items-center justify-center px-4 pt-8 md:pt-0 bg-white text-black">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg w-full text-center">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">
            Fact
          </h2>

          <p className="text-gray-700 text-sm md:text-base mb-8">
            Most of our students started without any prior IT experience
          </p>

          {/* Buttons */}
          <div className="flex justify-between">
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