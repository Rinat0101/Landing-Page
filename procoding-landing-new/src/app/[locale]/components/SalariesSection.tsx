'use client';

import { useTheme } from 'next-themes';

type Props = {
  locale: 'en' | 'ru';
  data: {
    [key: string]: string;
  };
};

export default function SalariesSection({ data, locale }: Props) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const title = locale === 'ru' ? data.salaries_title_ru : data.salaries_title_en;
  const description =
    locale === 'ru' ? data.salaries_description_ru : data.salaries_description_en;

  const salaryItems: { title: string; range: string }[] = [];

  const regex = /^salaries(\d+)_/;

  const grouped: Record<string, { [key: string]: string }> = {};

  // Group salaries by index (1, 2, 3, etc.)
  Object.entries(data).forEach(([key, value]) => {
    const match = key.match(regex);
    if (match) {
      const index = match[1];
      if (!grouped[index]) grouped[index] = {};
      grouped[index][key] = value;
    }
  });

  // Build the salary items and skip empty ones
  Object.values(grouped).forEach((group) => {
    const titleKey = Object.keys(group).find((k) =>
      locale === 'ru' ? k.endsWith('_ru') : k.endsWith('_en')
    );
    const valueKey = Object.keys(group).find((k) => k.endsWith('_value'));

    const title = titleKey ? group[titleKey]?.trim() : '';
    const range = valueKey ? group[valueKey]?.trim() : '';

    // Only add item if both title and value are non-empty
    if (title && range) {
      salaryItems.push({ title, range });
    }
  });

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
          {salaryItems.map((item, i) => (
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