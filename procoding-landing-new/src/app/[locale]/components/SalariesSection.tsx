'use client';

import { useTheme } from 'next-themes';

type Props = {
  locale: 'en' | 'ru';
  data: {
    salaries_title_en: string;
    salaries_title_ru: string;
    salaries_description_en: string;
    salaries_description_ru: string;
    salaries_junior_en: string;
    salaries_junior_ru: string;
    salaries_mid_en: string;
    salaries_mid_ru: string;
    salaries_senior_en: string;
    salaries_senior_ru: string;
    salaries_lead_en: string;
    salaries_lead_ru: string;
  };
};

export default function SalariesSection({ data, locale }: Props) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const title =
    locale === 'ru' ? data.salaries_title_ru : data.salaries_title_en;

  const description =
    locale === 'ru'
      ? data.salaries_description_ru
      : data.salaries_description_en;

  const salaries = [
    {
      title:
        locale === 'ru'
          ? data.salaries_junior_ru
          : data.salaries_junior_en,
      range: '$60 000 – 90 000',
    },
    {
      title:
        locale === 'ru' ? data.salaries_mid_ru : data.salaries_mid_en,
      range: '$90 000 – 130 000',
    },
    {
      title:
        locale === 'ru'
          ? data.salaries_senior_ru
          : data.salaries_senior_en,
      range: '$120 000 – 180 000',
    },
    {
      title:
        locale === 'ru' ? data.salaries_lead_ru : data.salaries_lead_en,
      range: '$160 000 – 250 000+',
    },
  ];

  return (
    <section
      className={`py-16 transition-colors duration-300 ${
        isLight ? 'bg-white' : 'bg-black'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <h3
          className={`text-4xl font-bold mb-4 ${
            isLight ? 'text-black' : 'text-white'
          }`}
        >
          {title}
        </h3>
        <p
          className={`max-w-3xl mx-auto mb-12 ${
            isLight ? 'text-black' : 'text-white'
          }`}
        >
          {description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {salaries.map((item, i) => (
            <div
              key={i}
              className={`rounded-xl p-6 shadow-xl h-full flex flex-col justify-between text-left ${
                isLight ? 'bg-white text-black' : 'bg-[#141414] text-white'
              }`}
            >
              <div className="min-h-[56px] flex items-start mb-4">
                <h4 className="text-lg font-semibold">{item.title}</h4>
              </div>
              <p className="text-xl font-bold text-[#D726B3] mt-auto">
                {item.range}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}