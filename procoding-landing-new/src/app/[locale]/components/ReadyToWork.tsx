'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

type Step = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

type ReadyToWorkProps = {
  data: Record<string, string | undefined>;
  locale: 'en' | 'ru';
};

export default function ReadyToWorkSection({ data, locale }: ReadyToWorkProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const stepIcons = [
    '/images/ready_to_work_icon_3.svg',
    '/images/icons/portfolio.svg',
    '/images/icons/cv.svg',
    '/images/ready_to_work_icon_1.svg',
    '/images/ready_to_work_icon_2.svg',
    '/images/ready_to_work_icon_3.svg',
    '/images/ready_to_work_icon_1.svg',
    '/images/ready_to_work_icon_2.svg',
  ];

  const steps: Step[] = Array.from({ length: 8 }).map((_, i) => {
    const stepNum = i + 1;
    const titleKey = `readywork_step${stepNum}_title_${locale}`;
    const descriptionKey = `readywork_step${stepNum}_description_${locale}`;

    const fallbackTitleKey = `readywork_step${stepNum}_title`;
    const fallbackDescriptionKey = `readywork_step${stepNum}_description`;

    const title = data[titleKey] || data[fallbackTitleKey] || '';
    const description = data[descriptionKey] || data[fallbackDescriptionKey] || '';

    return {
      id: stepNum.toString().padStart(2, '0'),
      title,
      description,
      icon: stepIcons[i],
    };
  }).filter((step) => step.title && step.description);

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

  const localizedTitle = data[`readywork_title_${locale}`] || data.readywork_title || '';
  const localizedDescription = data[`readywork_description_${locale}`] || data.readywork_description || '';

  return (
    <section
      className={`py-20 transition-colors duration-300 ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">{localizedTitle}</h2>
        <p className="text-base max-w-2xl mx-auto">{localizedDescription}</p>

        <Image
          src="/images/Rectangle 13.webp"
          alt="Office team"
          width={1000}
          height={400}
          className="rounded-xl mt-10 w-full"
        />
      </div>

      <div className="max-w-5xl mx-auto mt-10 px-4 flex flex-col gap-3">
        {steps.map((step, index) => {
          const isActive = activeIndex === index;

          const cardBg = isActive
            ? 'bg-[#F28237]'
            : isDark
            ? 'bg-[#1C1C1C]'
            : 'bg-[#F4F1FB]';

          const textColor = isActive
            ? 'text-white'
            : isDark
            ? 'text-white'
            : 'text-black';

          const iconColor = isActive ? '#ffffff' : '#F28237';

          return (
            <div
              key={step.id}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 p-6 sm:p-8 rounded-xl transition-all duration-300 ${cardBg}`}
            >
              <div className="flex-shrink-0">
                <span className={`text-3xl font-bold w-[40px] block ${textColor}`}>
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
                  {step.description}
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