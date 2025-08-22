'use client';

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
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Our Team</h2>
        <p className="max-w-3xl mx-auto text-gray-300 mb-12">
          Our mentors are experienced developers and experts with backgrounds in top tech companies.
          They don't just teach — they share real-world experience and help students master in-demand skills.
        </p>

        <div className="grid md:grid-cols-3 gap-3">
          {instructors.map((instructor, index) => (
            <InstructorCard
              key={index}
              name={instructor.name}
              role={instructor.role}
              description={instructor.description}
              image={instructor.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}