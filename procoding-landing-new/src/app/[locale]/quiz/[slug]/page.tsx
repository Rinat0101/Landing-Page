// 'use client';

// import { useEffect, useState } from 'react';
// import WelcomeScreen from '../web-development/components/WelcomeScreen';
// import QuestionStep from '../web-development/components/QuestionStep';
// import QuizLeadForm from '../web-development/components/QuizLeadForm';
// import FinalScreen from '../web-development/components/FinalScreen';
// import quizData from '../web-development/components/quizData';

// export default function WebDevQuizPage() {
//   const [step, setStep] = useState(0);
//   const [answers, setAnswers] = useState<string[]>([]);

//   // ✅ Force body background to white
//   useEffect(() => {
//     const prev = document.body.style.backgroundColor;
//     document.body.style.backgroundColor = '#ffffff';
//     return () => {
//       document.body.style.backgroundColor = prev;
//     };
//   }, []);

//   const totalSteps = 1 + quizData.questions.length + 1 + 1;
//   const isFinal = step === totalSteps - 1;
//   const progress = Math.min((step / (totalSteps - 1)) * 100, 100);

//   const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
//   const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));
//   const handleAnswer = (answer: string) => {
//     setAnswers((prev) => [...prev, answer]);
//     handleNext();
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-between bg-white text-black px-4 pt-6 pb-8">
//       {/* Progress Bar */}
//       {!isFinal && (
//         <div className="w-full max-w-xl mx-auto mb-2">
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//         </div>
//       )}

//       {/* Main content */}
//       <div className="flex-grow flex items-center justify-center">
//         <div className="w-full max-w-xl">
//           {step === 0 && <WelcomeScreen onNext={handleNext} />}
//           {step > 0 && step <= quizData.questions.length && (
//             <QuestionStep
//               question={quizData.questions[step - 1].question}
//               options={quizData.questions[step - 1].options}
//               currentStep={step}
//               totalSteps={quizData.questions.length}
//               onSelect={handleAnswer}
//               onBack={handleBack}
//             />
//           )}
//           {step === quizData.questions.length + 1 && (
//             <QuizLeadForm onNext={handleNext} onBack={handleBack} answers={answers} quizSlug="web-development" />
//           )}
//           {isFinal && (
//             <FinalScreen calendlyLink="https://calendar.app.google/SbbwwWsVoyuyeLsPA" />
//           )}
//         </div>
//       </div>

//       {/* Optional spacer for bottom padding */}
//       {!isFinal && <div className="h-4" />}
//     </div>
//   );
// }

'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SharedQuizLayout from './components/SharedQuizLayout';
import ConversionBoostQuiz from './components/ConversionBoostQuiz';

const validSlugs = ['basic-lead', 'qualification', 'conversion-boost'];

export default function QuizPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [isValidSlug, setIsValidSlug] = useState<boolean | null>(null);

  useEffect(() => {
    if (!slug || !validSlugs.includes(slug as string)) {
      router.push('/404');
    } else {
      setIsValidSlug(true);
    }
  }, [slug, router]);

  if (isValidSlug === null) {
    return null;
  }

  if (slug === 'conversion-boost') {
    return <ConversionBoostQuiz />;
  }

  return <SharedQuizLayout slug={slug as 'basic-lead' | 'qualification'} />;
}