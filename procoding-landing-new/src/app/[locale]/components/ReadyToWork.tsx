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
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const updateScreen = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    updateScreen();
    window.addEventListener('resize', updateScreen);
    return () => window.removeEventListener('resize', updateScreen);
  }, []);

  useEffect(() => {
    if (!isSmallScreen) return;

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
  }, [isSmallScreen]);

  const steps = [
    {
      id: '01',
      title: t('readyWork.steps.0.title'),
      description: t('readyWork.steps.0.description'),
      icon: '/images/ready_to_work_icon_1.svg',
    },
    {
      id: '02',
      title: t('readyWork.steps.1.title'),
      description: t('readyWork.steps.1.description'),
      icon: '/images/ready_to_work_icon_2.svg',
    },
    {
      id: '03',
      title: t('readyWork.steps.2.title'),
      description: t('readyWork.steps.2.description'),
      icon: '/images/ready_to_work_icon_3.svg',
    },
  ];

  return (
    <section className={`py-20 transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          {t('readyWork.title')}
        </h2>
        <p className={`text-sm sm:text-base max-w-2xl mx-auto ${isDark ? 'text-white/70' : 'text-black/80'}`}>
          {t('readyWork.description')}
        </p>
        <Image
          src="/images/ready_to_work_main.svg"
          alt="Office team"
          width={1000}
          height={400}
          className="rounded-xl mt-10 w-full"
        />
      </div>

      <div className="max-w-4xl mx-auto mt-10 px-4 flex flex-col gap-3">
        {steps.map((step, index) => {
          const isActive = isSmallScreen ? activeIndex === index : index === 0;

          const cardBg = isActive
            ? 'bg-[#F28237]'
            : isDark
              ? 'bg-[#1C1C1C]'
              : 'bg-[#F4F1FB]';

          const textColor = isActive
            ? isDark
              ? 'text-black'
              : 'text-white'
            : isDark
              ? 'text-white/80'
              : 'text-black/70';

          const iconColor = isActive ? '#ffffff' : (isDark ? '#ffffff' : '#F28237');

          return (
            <div
              key={step.id}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 p-6 sm:p-8 rounded-xl transition-all duration-300 ${cardBg}`}
            >
              <div className="flex-shrink-0">
                <span className={`text-3xl font-bold w-[40px] block text-left ${textColor}`}>
                  {step.id}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 flex-1">
                <h3 className={`font-bold text-base sm:text-lg min-w-[140px] sm:min-w-[180px] sm:max-w-[180px] ${textColor}`}>
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
                  style={{ filter: iconColor === '#ffffff' ? 'brightness(0) invert(1)' : 'none' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}