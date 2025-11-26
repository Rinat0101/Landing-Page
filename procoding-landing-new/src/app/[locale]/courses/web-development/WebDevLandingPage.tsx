"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import Hero from "@/app/[locale]/components/Hero";
import PerfectForSection from "@/app/[locale]/components/PerfectFor";
import Guarantee from "@/app/[locale]/components/Guarantee";
import About from "@/app/[locale]/components/About";
import Curriculum from "@/app/[locale]/components/Curriculum";
// import ProgramSteps from "@/app/[locale]/components/ProgramSteps";
import Pricing from "@/app/[locale]/components/Pricing";
import OurTeam from "@/app/[locale]/components/OurTeam";
import Companies from "@/app/[locale]/components/Companies";
import Faq from "@/app/[locale]/components/Faq";
import ContactForm from "@/app/[locale]/components/ContactForm";
import Footer from "@/app/[locale]/components/Footer";
import ReadyToWork from "@/app/[locale]/components/ReadyToWork";
import SalariesSection from "@/app/[locale]/components/SalariesSection";

import Navbar from "@/app/[locale]/components/Navbar";
import { courseNavItems } from "@/app/[locale]/components/navItems";

type Props = {
  course: any;
  locale: string;
};

export default function WebDevLandingPage({ course, locale }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isLight = resolvedTheme === "light";
  const heroData = course?.acf;

  return (
    <main
      className={`${
        isLight ? "bg-white" : "bg-black"
      } transition-colors duration-300`}
    >
      <Navbar navItems={courseNavItems} />

      <section id="home" className={`${isLight ? "bg-white" : "bg-black"}`}>
        <Hero data={heroData} locale={locale} />
      </section>
      <section id="about2">
        <About data={heroData} locale={locale} />
      </section>
      <section id="companies">
        <Companies data={heroData} />
      </section>
      <section id="salaries">
        <SalariesSection data={heroData} />
      </section>
      <section id="about">
        <PerfectForSection data={heroData} locale={locale} />
      </section>
      <section id="curriculum">
        <Curriculum data={heroData} locale={locale} />
      </section>
      <section id="instructors">
        <OurTeam data={heroData} locale={locale}/>
      </section>
      <section id="guarantee" className="scroll-mt-32">
        <Guarantee data={heroData} locale={locale} />
      </section>
      {/* <section id="program">
        <ProgramSteps />
      </section> */}
      <section id="jobs">
        <ReadyToWork data={heroData} locale={locale} />
      </section>
      <section id="plans">
        <Pricing data={heroData} locale={locale} />
      </section>
      <section id="contact">
        <ContactForm data={heroData} locale={locale} />
      </section>
      <section id="faq">
        <Faq data={heroData} locale={locale} />
      </section>
      <div className="mx-8">
        <Footer data={heroData} locale={locale} />
      </div>
    </main>
  );
}
