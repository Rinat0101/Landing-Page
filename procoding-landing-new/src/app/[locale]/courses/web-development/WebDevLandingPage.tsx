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

export default function WebDevLandingPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isLight = resolvedTheme === "light";

  return (
    <main className={`${isLight ? "bg-white" : "bg-black"} transition-colors duration-300`}>
      {/* ✅ Navbar */}
      <Navbar navItems={courseNavItems} />

      <section id="home" className={`${isLight ? "bg-white" : "bg-black"}`}>
        <Hero />
      </section>
      <section id="about2">
        <About />
      </section>
      <section id="companies">
        <Companies />
      </section>
      <section id="salaries">
        <SalariesSection />
      </section>
      <section id="about">
        <PerfectForSection />
      </section>
      <section id="curriculum">
        <Curriculum />
      </section>
      <section id="instructors">
        <OurTeam />
      </section>
      <section id="guarantee" className="scroll-mt-32">
        <Guarantee />
      </section>
      {/* <section id="program">
        <ProgramSteps />
      </section> */}
      <section id="jobs">
        <ReadyToWork />
      </section>
      <section id="plans">
        <Pricing />
      </section>
      <section id="contact">
        <ContactForm />
      </section>
      <section id="faq">
        <Faq />
      </section>
      <div className="mx-8">
        <Footer />
      </div>
    </main>
  );
}