import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "../globals.css";

import Providers from "./providers";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "ProCoding Landing",
  description: "The official ProCoding bootcamp landing page",
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: "en" | "ru" };
}) {
  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${openSans.variable} font-sans bg-white text-black dark:bg-black dark:text-white`}
      >
        <Providers locale={params.locale}>
          {children}
        </Providers>
      </body>
    </html>
  );
}