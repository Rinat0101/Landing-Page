'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { useTranslation } from '@/lib/TranslationContext';

export default function ReadyToWorkSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { t } = useTranslation();

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const steps = [
    {
      id: '01',
      title: t('school.programStructure.steps.0.title'),
      text: t('school.programStructure.steps.0.text'),
      icon: '/images/icons_school/rocket.svg',
    },
    {
      id: '02',
      title: t('school.programStructure.steps.1.title'),
      text: t('school.programStructure.steps.1.text'),
      icon: '/images/icons_school/laptop.svg',
    },
    {
      id: '03',
      title: t('school.programStructure.steps.2.title'),
      text: t('school.programStructure.steps.2.text'),
      icon: '/images/icons_school/magnifing_glass.svg',
    },
    {
      id: '04',
      title: t('school.programStructure.steps.3.title'),
      text: t('school.programStructure.steps.3.text'),
      icon: '/images/icons_school/hand.svg',
    },
    {
      id: '05',
      title: t('school.programStructure.steps.4.title'),
      text: t('school.programStructure.steps.4.text'),
      icon: '/images/icons_school/stats.svg',
    },
    {
      id: '06',
      title: t('school.programStructure.steps.5.title'),
      text: t('school.programStructure.steps.5.text'),
      icon: '/images/icons_school/hat.svg',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.6 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section
      className={`py-20 px-6 transition-colors duration-300 ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className="max-w-5xl mx-auto sm:px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">
          {t('school.programStructure.heading')}
        </h2>
        <p className="sm:text-base max-w-2xl mx-auto">
          {t('school.programStructure.subheading')}
        </p>

        <Image
          src="/images/school/HowDoesItWork.webp"
          alt="How ProCoding Bootcamp Works"
          width={1000}
          height={400}
          className="rounded-xl mt-10 w-full"
        />
      </div>

      <div className="max-w-5xl mx-auto mt-10 px-4 flex flex-col gap-3">
        {steps.map((step, index) => {
          const isActive = activeIndex === index;

          const cardBg = isActive
            ? 'bg-[#A943D5]'
            : isDark
            ? 'bg-[#1C1C1C]'
            : 'bg-[#F4F1FB]';

          const textColor = isActive
            ? 'text-white'
            : isDark
            ? 'text-white'
            : 'text-black';

          const iconColor = isActive ? '#ffffff' : '#7B4EFF';

          return (
            <div
              key={step.id}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 p-6 sm:p-8 rounded-xl transition-all duration-300 ${cardBg}`}
            >
              <div className="flex-shrink-0">
                <span
                  className={`text-3xl font-bold w-[40px] block text-left ${textColor}`}
                >
                  {step.id}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 flex-1">
                <h3
                  className={`font-bold text-base sm:text-lg min-w-[140px] sm:min-w-[180px] sm:max-w-[180px] ${textColor}`}
                >
                  {step.title}
                </h3>
                <p className={`text-sm sm:text-base flex-1 ${textColor}`}>
                  {step.text}
                </p>
              </div>

              <div className="flex-shrink-0 self-start sm:self-center w-[48px] h-[48px]">
                <Image
                  src={step.icon}
                  alt={`${step.title} icon`}
                  width={48}
                  height={48}
                  className="w-full h-full"
                  style={{
                    filter:
                      iconColor === '#ffffff'
                        ? 'brightness(0) invert(1)'
                        : 'none',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}