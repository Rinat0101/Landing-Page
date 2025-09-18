'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useTranslation } from '@/lib/TranslationContext';

interface Tab {
  title: string;
  subtitle: string;
  content: string[];
  icons: string[];
}

export default function CurriculumOverview() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tabs: Tab[] = [
    {
      title: t('curriculum.tabs.intro.label'),
      subtitle: t('curriculum.tabs.intro.title'),
      content: t('curriculum.tabs.intro.content').split('.'),
      icons: ['vscode.svg', 'github.svg', 'git.svg', 'html.svg', 'css.svg'],
    },
    {
      title: t('curriculum.tabs.module1.label'),
      subtitle: t('curriculum.tabs.module1.title'),
      content: t('curriculum.tabs.module1.content').split('.'),
      icons: ['html.svg', 'css.svg', 'bootstrap.svg', 'tailwind.svg', 'js.svg'],
    },
    {
      title: t('curriculum.tabs.module2.label'),
      subtitle: t('curriculum.tabs.module2.title'),
      content: t('curriculum.tabs.module2.content').split('.'),
      icons: ['nodejs.svg', 'fetch.svg', 'axios.svg', 'mongodb.svg', 'postman.svg'],
    },
    {
      title: t('curriculum.tabs.module3.label'),
      subtitle: t('curriculum.tabs.module3.title'),
      content: t('curriculum.tabs.module3.content').split('.'),
      icons: ['react.svg', 'js.svg'],
    },
    {
      title: t('curriculum.tabs.module4.label'),
      subtitle: t('curriculum.tabs.module4.title'),
      content: t('curriculum.tabs.module4.content').split('.'),
      icons: ['php.svg', 'ts.svg', 'vue.svg', 'angular.svg', 'figma.svg'],
    },
  ];

  const active = tabs[activeTab];

  return (
    <section
      className={`py-16 transition-colors duration-300 ${
        isLight ? 'bg-white' : 'bg-black'
      }`}
    >
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row gap-10 md:gap-20">
        {/* Left: Card */}
        <div
          className={`rounded-xl p-6 shadow-xl md:w-[56%] w-full flex flex-col gap-6 ${
            isLight ? 'bg-white' : 'bg-[#141414]'
          }`}
          style={{ minHeight: '34rem' }}
        >
          {/* Tabs */}
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`relative text-sm md:text-base font-medium px-3 py-2 transition-all duration-200 ${
                  activeTab === index
                    ? `text-[#D726B3] after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-gradient-to-r after:from-[#D726B3] after:to-[#F28237]`
                    : isLight
                    ? 'text-black hover:text-[#D726B3]'
                    : 'text-white hover:text-[#D726B3]'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Content & Technologies wrapper */}
          <div className="flex flex-col justify-between flex-1 overflow-hidden">
            {/* Content */}
            <div className="mt-4 mx-2 md:mx-4 flex-1">
              <h4
                className={`text-xl md:text-2xl font-semibold mb-5 ${
                  isLight ? 'text-black' : 'text-white'
                }`}
              >
                {active.subtitle}
              </h4>
              <ul className="list-disc pl-6 space-y-4">
                {active.content.map(
                  (sentence, i) =>
                    sentence.trim() && (
                      <li
                        key={i}
                        className={`text-base leading-relaxed ${
                          isLight ? 'text-black/80' : 'text-white/80'
                        }`}
                      >
                        {sentence.trim()}
                      </li>
                    )
                )}
              </ul>
            </div>

            {/* Technologies (pinned bottom on desktop) */}
            <div className="mt-8 mx-2 md:mx-4">
              <h5
                className={`text-lg font-semibold mb-4 ${
                  isLight ? 'text-black' : 'text-white'
                }`}
              >
                Technologies
              </h5>
              <div className="flex flex-wrap gap-3">
                {active.icons.map((icon, i) => (
                  <img
                    key={i}
                    src={`/images/icons/${icon}`}
                    alt={icon}
                    className={`h-8 w-auto ${
                      icon === 'github.svg' && !isLight ? 'invert' : ''
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Title + Subtitle */}
        <div className="md:w-[44%] w-full flex flex-col justify-center text-center md:text-left items-center md:items-start">
          <h3 className={`text-3xl font-bold mb-4 ${isLight ? 'text-black' : 'text-white'}`}>
            {t('curriculum.title')}
          </h3>
          <p
            className={`text-lg leading-relaxed max-w-lg ${
              isLight ? 'text-black/80' : 'text-white/80'
            }`}
          >
            {isMobile
              ? t('curriculum.subtitleShort') || t('curriculum.subtitle')
              : t('curriculum.subtitle')}
          </p>

          {/* 
          // Telegram button (uncomment if needed)
          <button className="mt-4 px-4 py-2 bg-[#0088cc] text-white rounded">
            Join Telegram
          </button>
          */}
        </div>
      </div>
    </section>
  );
}