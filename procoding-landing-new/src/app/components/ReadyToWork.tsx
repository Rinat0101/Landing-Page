'use client'

import Image from 'next/image'

const steps = [
  {
    id: '01',
    title: 'Ready Junior Web Dev',
    description:
      'Mentors do a final code review and give improvement advice. You get honest feedback on your progress and readiness for real work.',
    icon: '/images/ready_to_work_icon_1.svg',
    bg: 'bg-[#F28237]',
  },
  {
    id: '02',
    title: 'Portfolio',
    description:
      'You’ll build 2–3 projects for your portfolio: responsive websites, web apps, interfaces. The kind of work employers want to see.',
    icon: '/images/ready_to_work_icon_2.svg',
    bg: 'bg-[#1C1C1C]',
  },
  {
    id: '03',
    title: 'Resume',
    description:
      'We help you polish your resume, LinkedIn, and GitHub. You get complete profiles to apply for jobs in the U.S. and worldwide.',
    icon: '/images/ready_to_work_icon_3.svg',
    bg: 'bg-[#1C1C1C]',
  },
]

export default function ReadyToWorkSection() {
  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready for IT Work After the Course
        </h2>
        <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto">
          By the end of the course, you’ll have a full portfolio, polished resume, and skills employers truly value. Our graduates land Junior Web Developer jobs even before or right after graduation — especially in the U.S. job market.
        </p>
        <Image
          src="/images/ready_to_work_main.svg"
          alt="Office team"
          width={1000}
          height={400}
          className="rounded-xl mt-10 w-full"
        />
      </div>

      <div className="max-w-4xl mx-auto mt-10 px-4 flex flex-col gap-2">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-start sm:items-center justify-between gap-6 p-6 sm:p-8 rounded-xl ${step.bg}`}
          >
            {/* Number */}
            <span className="text-white text-3xl font-bold w-[40px] flex-shrink-0 text-left">
              {step.id}
            </span>

            {/* Title + Description container */}
            <div className="flex flex-col sm:flex-row sm:items-center w-full gap-4 sm:gap-20">
              {/* Title */}
              <h3 className="font-bold text-base sm:text-lg w-[160px] flex-shrink-0">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-white/80 w-full sm:w-[350px]">
                {step.description}
              </p>
            </div>

            {/* Icon */}
            <div className="flex-shrink-0 ml-auto">
              <Image
                src={step.icon}
                alt={`${step.title} icon`}
                width={35}
                height={35}
                className="mt-1 sm:mt-0"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}