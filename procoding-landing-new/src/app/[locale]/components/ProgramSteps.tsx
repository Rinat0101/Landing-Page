'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useTranslation } from '@/lib/TranslationContext';

export default function LearningSteps() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { t } = useTranslation();

  const steps = [
    {
      icon: '/images/steps_icon_1.svg',
      title: t('steps.list.0.title'),
      description: t('steps.list.0.description'),
      align: 'right',
      color: 'bg-[#E017CD]',
    },
    {
      icon: '/images/steps_icon_2.svg',
      title: t('steps.list.1.title'),
      description: t('steps.list.1.description'),
      align: 'left',
      color: 'bg-[#00E2DF]',
    },
    {
      icon: '/images/steps_icon_3.svg',
      title: t('steps.list.2.title'),
      description: t('steps.list.2.description'),
      align: 'right',
      color: 'bg-[#F28237]',
    },
    {
      icon: '/images/steps_icon_4.svg',
      title: t('steps.list.3.title'),
      description: t('steps.list.3.description'),
      align: 'left',
      color: 'bg-[#A06BFF]',
    },
  ];

  return (
    <section
      className={`${
        isLight ? 'bg-white text-black' : 'bg-black text-white'
      } py-20 relative transition-colors duration-300`}
    >
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          {t('steps.title')}
        </h2>
        <p
          className={`text-sm sm:text-base ${
            isLight ? 'text-black/70' : 'text-white/80'
          } max-w-xl mx-auto`}
        >
          {t('steps.description')}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative mt-16 flex flex-col items-center gap-16 px-4">
        {/* Timeline line (desktop only) */}
        <div className="hidden lg:block absolute top-0 h-full w-1 bg-white/10" />

        {/* Steps */}
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="relative w-full max-w-5xl flex items-center justify-center lg:px-20"
          >
            {/* Desktop: Alternating layout */}
            <div className="hidden lg:flex w-full items-center justify-center relative">
              {/* Icon in center */}
              <div
                className={`z-10 shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${step.color}`}
              >
                <Image
                  src={step.icon}
                  alt={step.title}
                  width={28}
                  height={28}
                />
              </div>

              {/* Text box left/right */}
              <div
                className={`absolute ${
                  step.align === 'right'
                    ? 'left-36 text-right'
                    : 'right-36 text-left'
                } max-w-[240px]`}
              >
                <h3 className="font-bold text-lg">{step.title}</h3>
                <p
                  className={`${
                    isLight ? 'text-black/70' : 'text-white/80'
                  } text-sm`}
                >
                  {step.description}
                </p>
              </div>
            </div>

            {/* Mobile: vertical layout */}
            <div className="lg:hidden flex w-full max-w-xl mx-auto gap-4 items-start">
              <div
                className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${step.color}`}
              >
                <Image
                  src={step.icon}
                  alt={step.title}
                  width={24}
                  height={24}
                />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-bold text-base sm:text-lg">
                  {step.title}
                </h3>
                <p
                  className={`${
                    isLight ? 'text-black/70' : 'text-white/80'
                  } text-sm sm:text-base`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}