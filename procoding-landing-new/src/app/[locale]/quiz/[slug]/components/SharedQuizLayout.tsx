'use client';

import { useEffect, useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import ProgressBar from './ProgressBar';
import QuestionStep from './QuestionStep';
import QuizLeadForm from './QuizLeadForm';
import FinalScreen from './FinalScreen';

import basicLeadData from './quizData/basicLead';
import qualificationData from './quizData/qualification';

type Props = {
  slug: 'basic-lead' | 'qualification';
};

const quizConfigs = {
  'basic-lead': basicLeadData,
  'qualification': qualificationData,
};

export default function SharedQuizLayout({ slug }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  // ✅ Force white background
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#ffffff';
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, []);

  const quizData = quizConfigs[slug];
  const totalSteps = 1 + quizData.questions.length + 1 + 1; // Welcome + Qs + Form + Final
  const isFinal = step === totalSteps - 1;
  const progress = Math.min((step / (totalSteps - 1)) * 100, 100);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));
  const handleAnswer = (answer: string) => {
    setAnswers((prev) => [...prev, answer]);
    handleNext();
  };

  // Shared welcome + final screen content
  const welcomeTitle = 'Ready to start your IT career in the US?';
  const welcomeSubtitle =
    slug === 'basic-lead'
      ? 'Answer 5 quick questions to get your personalized study plan.'
      : 'Answer a few quick questions to get your personalized study plan.';

  const calendlyLink = 'https://calendar.app.google/SbbwwWsVoyuyeLsPA';
  const finalTitle = 'Great!';
  const finalSubtitle = 'Step 2 — book your intro session 👇';
  const finalCTA = 'Book your appointment';

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-black px-4 pt-6 pb-8">
      {/* Progress Bar */}
      {!isFinal && (
        <div className="w-full max-w-xl mx-auto mb-4">
          <ProgressBar progress={progress} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-xl">
          {/* ✅ Welcome */}
          {step === 0 && (
            <WelcomeScreen
              title={welcomeTitle}
              subtitle={welcomeSubtitle}
              onNext={handleNext}
            />
          )}

          {/* ✅ Questions */}
          {step > 0 && step <= quizData.questions.length && (
            <QuestionStep
              question={quizData.questions[step - 1].question}
              options={quizData.questions[step - 1].options}
              currentStep={step}
              totalSteps={quizData.questions.length}
              onSelect={handleAnswer}
              onBack={handleBack}
            />
          )}

          {/* ✅ Lead Form */}
          {step === quizData.questions.length + 1 && (
            <QuizLeadForm
              onNext={handleNext}
              onBack={handleBack}
              answers={answers}
              quizSlug={slug}
            />
          )}

          {/* ✅ Final CTA */}
          {isFinal && (
            <FinalScreen
              calendlyLink={calendlyLink}
              title={finalTitle}
              subtitle={finalSubtitle}
              ctaText={finalCTA}
            />
          )}
        </div>
      </div>

      {/* Spacer */}
      {!isFinal && <div className="h-4" />}
    </div>
  );
}