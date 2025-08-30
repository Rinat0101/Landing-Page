'use client';

import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import { TranslationProvider } from '@/lib/TranslationContext';
import InitTheme from '../components/InitTheme';
import Navbar from './components/Navbar';

export default function Providers({
  children,
  dictionary,
  locale,
}: {
  children: React.ReactNode;
  dictionary: Record<string, any>;
  locale: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <InitTheme />
      <TranslationProvider dictionary={dictionary} locale={locale}>
        <Navbar />
        <main className="pt-16">{children}</main>
      </TranslationProvider>
    </ThemeProvider>
  );
}