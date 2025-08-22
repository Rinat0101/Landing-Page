'use client';

import { usePathname, useRouter } from 'next/navigation';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
];

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (newLocale: string) => {
    if (pathname) {
      const segments = pathname.split('/');
      segments[1] = newLocale;
      router.push(segments.join('/'));
    }
  };

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => switchTo(lang.code)}
          className={`text-sm px-2 py-1 border-b-2 transition ${
            lang.code === currentLocale
              ? 'border-[#D726B3] text-[#D726B3] font-bold'
              : 'border-transparent hover:border-[#D726B3] hover:text-[#D726B3]'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}