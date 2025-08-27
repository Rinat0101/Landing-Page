'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

const steps = [
  {
    id: '01',
    title: 'Ready Junior Web Dev',
    description:
      'Mentors do a final code review and give improvement advice. You get honest feedback on your progress and readiness for real work.',
    icon: '/images/ready_to_work_icon_1.svg',
  },
  {
    id: '02',
    title: 'Portfolio',
    description:
      'You’ll build 2–3 projects for your portfolio: responsive websites, web apps, interfaces. The kind of work employers want to see.',
    icon: '/images/ready_to_work_icon_2.svg',
  },
  {
    id: '03',
    title: 'Resume',
    description:
      'We help you polish your resume, LinkedIn, and GitHub. You get complete profiles to apply for jobs in the U.S. and worldwide.',
    icon: '/images/ready_to_work_icon_3.svg',
  },
];

export default function ReadyToWorkSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { theme } = useTheme();

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

  const isDark = theme === 'dark';

  return (
    <section className={`py-20 transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready for IT Work After the Course
        </h2>
        <p className={`text-sm sm:text-base max-w-2xl mx-auto ${isDark ? 'text-white/70' : 'text-black/80'}`}>
          By the end of the course, you’ll have a full portfolio, polished resume, and skills employers truly value.
          Our graduates land Junior Web Developer jobs even before or right after graduation — especially in the U.S. job market.
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
              {/* Number */}
              <div className="flex-shrink-0">
                <span className={`text-3xl font-bold w-[40px] block text-left ${textColor}`}>
                  {step.id}
                </span>
              </div>

              {/* Title + Description */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 flex-1">
                <h3 className={`font-bold text-base sm:text-lg min-w-[140px] sm:min-w-[180px] sm:max-w-[180px] ${textColor}`}>
                  {step.title}
                </h3>
                <p className={`text-sm sm:text-base flex-1 ${textColor}`}>
                  {step.description}
                </p>
              </div>

              {/* Icon with overridden color */}
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