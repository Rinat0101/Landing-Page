// app/[locale]/providers.tsx (remove "use client")
import { ReactNode } from "react";
import { getDictionary } from "@/lib/i118n";
import { TranslationProvider } from "@/lib/TranslationContext";
import { ThemeProvider } from "next-themes";
import InitTheme from "../components/InitTheme";
import Navbar from "./components/Navbar";
import ScrollToTopButton from "../components/ScrollToTopButton";

export default async function Providers({
  children,
  locale,
}: {
  children: ReactNode;
  locale: "en" | "ru";
}) {
  const dictionary = await getDictionary(locale);

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