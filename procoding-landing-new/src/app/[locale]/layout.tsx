// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import Providers from "./providers";
import Navbar from "./components/Navbar";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "ProCoding Landing",
  description: "The official ProCoding bootcamp landing page",
};

// ✅ Fix: mark params as Promise, make layout async
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: "en" | "ru" }>;
}) {
  const { locale } = await params; // ✅ await params before usage

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${openSans.variable} font-sans bg-white text-black dark:bg-black dark:text-white`}
      >
        {/* 🟣 Meta (Facebook) Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1416499497144626');
            fbq('track', 'PageView');
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1416499497144626&ev=PageView&noscript=1"
            alt="facebook-pixel"
          />
        </noscript>

        {/* 🟡 Yandex Metrica */}
        <Script id="yandex-metrica" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],
              k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=104605015', 'ym');

            ym(104605015, 'init', {
              ssr: true,
              webvisor: true,
              clickmap: true,
              ecommerce: "dataLayer",
              accurateTrackBounce: true,
              trackLinks: true
            });
          `}
        </Script>

        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/104605015"
              style={{ position: "absolute", left: "-9999px" }}
              alt="yandex-metrica"
            />
          </div>
        </noscript>

        {/* 🧠 Main content */}
        <Providers locale={locale}>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}