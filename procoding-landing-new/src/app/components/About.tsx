'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import AboutCard from './AboutCard';
import SectionTitle from '../components/shared/SectionTitle';

export default function AboutSection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section
      className={`py-20 px-6 transition-colors duration-300 ${
        isLight ? 'bg-white' : 'bg-black'
      }`}
    >
      <div className="max-w-screen-xl mx-auto text-center">
        {/* Section Title */}
        <SectionTitle
          title="About Our School"
          subtitle="Education that works. We don’t just give you knowledge — we help you build a career. The whole program is built around real-world tasks and market demands. You learn by doing, not just listening."
          className={isLight ? 'text-black' : 'text-white'}
        />

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <AboutCard
            icon="about_laptop.svg"
            title="Practical Learning"
            description="Hands-on sessions to build skills and identify knowledge gaps."
          />
          <AboutCard
            icon="about_book.svg"
            title="Constructive Learning"
            description="Individual support and extra resources for ambitious students."
          />
          <AboutCard
            icon="about_people.svg"
            title="Student Support"
            description="Mentors and teachers help solve problems and keep you motivated."
          />
          <AboutCard
            icon="about_bulb.svg"
            title="Cognitive Learning"
            description="Instructors explain not just the 'how' but also the 'why' for deeper understanding."
          />
          {/* Image Card */}
          <div className="rounded-2xl overflow-hidden h-full w-full">
            <Image
              src="/images/about_view.svg"
              alt="City View"
              width={600}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}