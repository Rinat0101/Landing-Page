"use client";

import { useEffect, useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import QuestionStep from "./QuestionStep";
import QuizLeadForm from "./QuizLeadForm";
import FinalScreen from "./FinalScreen";
import ProgressBar from "./ProgressBar";
import ProgressMessage from "./ProgressMessage";
import SocialProof from "./SocialProof";

import conversionBoostData from "./quizData/conversionBoost";

export default function ConversionBoostQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  // Force white background
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#ffffff";
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, []);

  const questions = conversionBoostData.questions;
  const totalSteps = 10;
  const isFinal = step === totalSteps - 1;
  const progress = Math.min((step / (totalSteps - 1)) * 100, 100);

  const handleNext = () =>
    setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));
  const handleAnswer = (answer: string) => {
    setAnswers((prev) => [...prev, answer]);
    handleNext();
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-black px-4 pt-6 pb-8">
      {/* Progress Bar */}
      {!isFinal && (
        <div className="w-full max-w-xl mx-auto mb-4">
          <ProgressBar progress={progress} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-xl">
          {/* Step 0 — Welcome */}
          {step === 0 && (
            <WelcomeScreen
              title="Ready to transform your career and grow in IT?"
              subtitle="Answer a few questions to get your personalized IT career roadmap."
              onNext={handleNext}
            />
          )}

          {/* Questions */}
          {step === 1 && (
            <QuestionStep
              question={questions[0].question}
              options={questions[0].options}
              currentStep={step}
              totalSteps={5}
              onSelect={handleAnswer}
              onBack={handleBack}
            />
          )}
          {step === 2 && (
            <QuestionStep
              question={questions[1].question}
              options={questions[1].options}
              currentStep={step}
              totalSteps={5}
              onSelect={handleAnswer}
              onBack={handleBack}
            />
          )}

          {/* Insert: Progress Message */}
          {step === 3 && <ProgressMessage onNext={handleNext} onBack={handleBack} />}

          {step === 4 && (
            <QuestionStep
              question={questions[2].question}
              options={questions[2].options}
              currentStep={step}
              totalSteps={5}
              onSelect={handleAnswer}
              onBack={handleBack}
            />
          )}
          {step === 5 && (
            <QuestionStep
              question={questions[3].question}
              options={questions[3].options}
              currentStep={step}
              totalSteps={5}
              onSelect={handleAnswer}
              onBack={handleBack}
            />
          )}

          {step === 6 && <SocialProof onNext={handleNext} onBack={handleBack} />}

          {step === 7 && (
            <QuestionStep
              question={questions[4].question}
              options={questions[4].options}
              currentStep={step}
              totalSteps={5}
              onSelect={handleAnswer}
              onBack={handleBack}
            />
          )}

          {/* Lead Capture */}
          {step === 8 && (
            <QuizLeadForm
              onNext={handleNext}
              onBack={handleBack}
              answers={answers}
              quizSlug="conversion-boost"
            />
          )}

          {/* Final CTA */}
          {isFinal && (
            <FinalScreen
              calendlyLink="https://calendar.app.google/SbbwwWsVoyuyeLsPA"
              title="You're ready for your next step 🚀"
              subtitle="Your personalized plan is almost ready. Now book a time to speak with a Program Advisor."
              ctaText="Get My IT Career Roadmap"
            />
          )}
        </div>
      </div>

      {/* Spacer */}
      {!isFinal && <div className="h-4" />}
    </div>
  );
}
