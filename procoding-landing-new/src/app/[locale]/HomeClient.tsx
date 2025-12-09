"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Main from "./components/school/Main";
import AboutSchool from "./components/school/AboutSchool";
// import ProgramSteps from "./components/ProgramSteps";
import OurTeam from "./components/school/SchoolTeam";
import Faq from "./components/school/Faq_school";
import ContactForm from "./components/school/ContactForm";
import Footer from "./components/school/Footer";
import HowItWorks from "./components/school/HowItWorks";
import CoursesList from "./components/school/CoursesList";
import Reviews from "./components/school/Reviews";
import Navbar from "./components/Navbar";
import { schoolSections } from "./components/navItems";

type Props = {
  courses: any[]; // you can replace `any[]` with a Course[] type later
  locale: string;
};

export default function HomePage({ courses, locale }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isLight = resolvedTheme === "light";

  return (
    <main
      className={`${
        isLight ? "bg-white" : "bg-black"
      } transition-colors duration-300`}
    >
      <Navbar navItems={schoolSections} />

      <section id="home" className={`${isLight ? "bg-white" : "bg-black"}`}>
        <Main />
      </section>

      <section id="about2">
        <AboutSchool />
      </section>

      <section id="courses">
        {/* ✅ Pass dynamic data to CoursesList */}
        <CoursesList courses={courses} locale={locale} />
      </section>

      <section id="jobs">
        <HowItWorks />
      </section>

      <section id="instructors">
        <OurTeam />
      </section>

      <section id="reviews">
        <Reviews />
      </section>

      {/* <section id="program">
        <ProgramSteps />
      </section> */}

      <section id="contact">
        <ContactForm />
      </section>

      <section id="faq_school">
        <Faq />
      </section>

      <div className="mx-8">
        <Footer />
      </div>
    </main>
  );
}