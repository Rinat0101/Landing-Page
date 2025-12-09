// app/[locale]/page.tsx
import { getDictionary } from "@/lib/i118n";
import { getAllCourses } from "@/lib/api";
import { TranslationProvider } from "@/lib/TranslationContext";
import HomeClient from "./HomeClient";

export default async function Page({ params }: { params: { locale: "en" | "ru" } }) {
  const dictionary = await getDictionary(params.locale);
  const courses = await getAllCourses();

  return (
    <TranslationProvider dictionary={dictionary} locale={params.locale}>
      <HomeClient courses={courses} locale={params.locale} />
    </TranslationProvider>
  );
}