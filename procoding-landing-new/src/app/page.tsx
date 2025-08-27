'use client';

import { useTheme } from 'next-themes';
import Hero from './components/Hero';
import Guarantee from './components/Guarantee';
import About from './components/About';
import ProgramSteps from './components/ProgramSteps';
import Pricing from './components/Pricing';
import OurTeam from './components/OurTeam';
import Faq from './components/Faq';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ReadyToWork from './components/ReadyToWork';

export default function Home() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <main className={`${isLight ? 'bg-white' : 'bg-black'} transition-colors duration-300`}>
      <section id="home" className={`${isLight ? 'bg-white' : 'bg-black'}`}>
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="instructors">
        <OurTeam />
      </section>
      <section id="guarantee" className="scroll-mt-32">
        <Guarantee />
      </section>
      <section id="program">
        <ProgramSteps />
      </section>
      <section id="jobs">
        <ReadyToWork />
      </section>
      <section id="plans">
        <Pricing />
      </section>
      <section id="reviews">
        <Faq />
      </section>
      <section id="contact">
        <ContactForm />
      </section>
      <div className="mx-8">
        <Footer />
      </div>
    </main>
  );
}