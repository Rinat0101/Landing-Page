import { getDictionary } from "@/lib/i118n";
import { TranslationProvider } from "@/lib/TranslationContext";
import WebDevLandingPage from "./WebDevLandingPage";

export default async function Page({ params }: { params: { locale: "en" | "ru" } }) {
  const dictionary = await getDictionary(params.locale);

  return (
    <TranslationProvider dictionary={dictionary} locale={params.locale}>
      <WebDevLandingPage />
    </TranslationProvider>
  );
}