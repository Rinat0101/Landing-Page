import { getDictionary } from '@/lib/i118n';
import { TranslationProvider } from '@/lib/TranslationContext';
import HomeClient from './HomeClient';

export default async function Page({ params }: { params: { locale: 'en' | 'ru' } }) {
  const dictionary = await getDictionary(params.locale);

  return (
    <TranslationProvider dictionary={dictionary} locale={params.locale}>
      <HomeClient />
    </TranslationProvider>
  );
}