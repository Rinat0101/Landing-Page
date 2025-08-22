"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-6 py-16 max-w-screen-xl mx-auto">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
          Master <br />
          programming <br /> from scratch in 6 months
        </h1>

        {/* Description */}
        <p className="text-white/80 text-lg mt-6 max-w-lg">
          Our program is built so you apply knowledge right away. You’ll get
          support from mentors, real-world projects, and land your first job
          during the course.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <Link
            href="#contact"
            className="bg-[#a855f7] text-white px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition"
          >
            Contact Us
          </Link>
          <Link
            href="#consultation"
            className="border border-white text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-white hover:text-black transition"
          >
            Get a Free Consultation
          </Link>
        </div>

        {/* Icons + Text */}
        <div className="flex items-center gap-4 mt-6">
          <img
            src="/images/project_icon_1.svg"
            alt="Portfolio Icons"
            className="w-[140px] h-auto"
          />
          <p className="text-white/70 text-sm sm:text-base leading-tight">
            3 real portfolio projects <br /> during the course
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2">
        <Image
          src="/images/main_img.svg"
          alt="Hero Image"
          width={600}
          height={600}
          className="w-full h-auto"
          priority
        />
      </div>
    </section>
  );
}
