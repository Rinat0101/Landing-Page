'use client'

import Image from 'next/image'

const steps = [
  {
    icon: '/images/steps_icon_1.svg',
    title: '1. Intro Stage',
    description: 'Getting to know the platform, installing software, and basics.',
    align: 'right',
    color: 'bg-[#E017CD]'
  },
  {
    icon: '/images/steps_icon_2.svg',
    title: '2. Theory',
    description: 'HTML, CSS, JS, algorithms, Git, core tech.',
    align: 'left',
    color: 'bg-[#00E2DF]'
  },
  {
    icon: '/images/steps_icon_3.svg',
    title: '3. Portfolio',
    description: 'Real projects, teamwork, hands-on tasks.',
    align: 'right',
    color: 'bg-[#F28237]'
  },
  {
    icon: '/images/steps_icon_4.svg',
    title: '4. Job Prep',
    description: 'Soft skills, LinkedIn, CV, mock interviews.',
    align: 'left',
    color: 'bg-[#A06BFF]'
  },
]

export default function LearningSteps() {
  return (
    <section className="py-20 bg-black text-white relative">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">How the Learning Works</h2>
        <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
          The course is built step-by-step — from simple to complex. First you get the base,
          then reinforce it with practice, build your portfolio, and finally hit the job market with full support.
        </p>
      </div>

      <div className="relative mt-16 flex flex-col items-center gap-20">
        {/* Transparent vertical line */}
        <div className="absolute top-0 h-full w-1 bg-white/10"></div>

        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`relative flex items-center justify-center w-full max-w-4xl`}
          >
            {/* Icon circle */}
            <div className={`z-10 shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${step.color}`}>
              <Image src={step.icon} alt={`Step ${idx + 1}`} width={28} height={28} />
            </div>

            {/* Text block */}
            <div className={`absolute ${step.align === 'right' ? 'left-40 text-right' : 'right-40 text-left'} max-w-[220px]`}>
              <h3 className="font-bold text-lg">{step.title}</h3>
              <p className="text-sm text-white/80">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}