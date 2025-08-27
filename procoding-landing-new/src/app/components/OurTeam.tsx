'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useTheme } from 'next-themes';
import InstructorCard from './InstructorCard';

const instructors = [
  {
    name: 'Kate',
    role: 'Methodologist',
    description:
      'Instructors explain not just the "how" but also the "why" to foster deeper understanding and critical thinking.',
    image: '/images/teacher_1.svg',
  },
  {
    name: 'Anastasia',
    role: 'Course Expert',
    description:
      'Instructors explain not just the "how" but also the "why" to foster deeper understanding and critical thinking.',
    image: '/images/teacher_2.svg',
  },
  {
    name: 'Konstantin',
    role: 'AQA Teacher',
    description:
      'Instructors explain not just the "how" but also the "why" to foster deeper understanding and critical thinking.',
    image: '/images/teacher_3.svg',
  },
];

export default function OurTeam() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section className={`py-20 transition-colors duration-300 ${isLight ? 'bg-white text-black' : 'bg-black text-white'}`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Our Team
        </h2>
        <p className={`max-w-3xl mx-auto mb-12 ${isLight ? 'text-[#555]' : 'text-gray-300'}`}>
          Our mentors are experienced developers and experts with backgrounds in top tech companies.
          They don't just teach — they share real-world experience and help students master in-demand skills.
        </p>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {instructors.map((instructor, index) => (
            <InstructorCard key={index} {...instructor} />
          ))}
        </div>

        {/* Mobile Swiper */}
        <div className="block md:hidden relative">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active',
            }}
            className="!pb-12"
          >
            {instructors.map((instructor, index) => (
              <SwiperSlide key={index}>
                <InstructorCard {...instructor} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Dots container */}
          <div className="swiper-pagination !bottom-0 mt-4 flex justify-center" />
        </div>
      </div>
    </section>
  );
}