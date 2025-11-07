'use client';

import { useEffect, useState } from 'react';

type Props = {
  question: string;
  options: string[];
  currentStep: number;
  totalSteps: number;
  onSelect: (answer: string) => void;
  onBack: () => void;
};

export default function QuestionStep({
  question,
  options,
  currentStep,
  totalSteps,
  onSelect,
  onBack,
}: Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selectedOption !== null) {
      onSelect(selectedOption);
      setSelectedOption(null);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-32 md:pt-0 bg-white">
      <div className="bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-md text-left">
        {/* Step indicator */}
        <div className="text-sm text-gray-500 mb-4">
          Question {currentStep} of {totalSteps}
        </div>

        {/* Question text */}
        <h2 className="text-2xl font-bold mb-6">{question}</h2>

        {/* Options */}
        <div className="space-y-4 mb-8">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(option)}
              className={`w-full text-left px-6 py-4 border-2 rounded-lg transition duration-300 
                ${
                  selectedOption === option
                    ? 'border-purple-600 bg-purple-100'
                    : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
                }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="text-sm text-gray-600 hover:underline"
          >
            ← Back
          </button>

          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className={`px-6 py-2 rounded-full text-white font-semibold transition duration-300
              ${
                selectedOption
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}