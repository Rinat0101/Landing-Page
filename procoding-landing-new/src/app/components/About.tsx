import Image from "next/image";
import AboutCard from "./AboutCard";

export default function AboutSection() {
  return (
    <section className="bg-black py-20 px-6">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">About Our School</h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Education that works. We don’t just give you knowledge — we help you build a career. The whole program is built around real-world tasks and market demands. You learn by doing, not just listening.
        </p>

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
            dark
          />
          <AboutCard
            icon="about_bulb.svg"
            title="Cognitive Learning"
            description="Instructors explain not just the 'how' but also the 'why' for deeper understanding."
            dark
          />
          {/* Image card */}
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