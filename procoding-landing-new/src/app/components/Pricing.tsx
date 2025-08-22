'use client'

import { useState } from 'react'
import Image from 'next/image'

const plans = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: '$200 / month',
    oldPrice: '$600 / month',
    icon: null,
    benefits: [
      {
        label: 'Flexible installment payments',
        icon: '/images/payment_icon.svg',
      },
      {
        label: 'Course duration: 6 months',
        icon: '/images/calendar_icon.svg',
      },
      {
        label: 'Access to video lessons and theory',
        icon: '/images/green_check_icon.svg',
      },
      {
        label: 'Homework assignments',
        icon: '/images/green_check_icon.svg',
      },
      {
        label: 'Standard chat support',
        icon: '/images/green_check_icon.svg',
      },
      {
        label: 'Certificate upon course completion',
        icon: '/images/green_check_icon.svg',
      },
      {
        label: 'Individual homework feedback',
        icon: '/images/gray_cancel_icon.svg',
      },
      {
        label: 'Personal mentor and guidance',
        icon: '/images/gray_cancel_icon.svg',
      },
    ],
    additional: '**Only 15 spots left at this price',
    button: 'Get Started',
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: '$400 / month',
    oldPrice: '$800 / month',
    badge: '15% OFF',
    promo: 'Invite a friend and get 1 ticket for the price of 2',
    benefits: [
      {
        label: 'Flexible installment payments',
        icon: '/images/payment_icon.svg',
      },
      {
        label: 'Course duration: 6 months',
        icon: '/images/calendar_icon.svg',
      },
      {
        label: 'Everything in Basic Plan',
        icon: '/images/green_check_icon.svg',
      },
      {
        label: 'Individual homework feedback',
        icon: '/images/green_check_icon.svg',
      },
      {
        label: 'Personal mentor and guidance',
        icon: '/images/green_check_icon.svg',
      },
      {
        label: 'Access to extra modules and projects',
        icon: '/images/green_check_icon.svg',
      },
      {
        label: 'Deep dives in private webinars',
        icon: '/images/green_check_icon.svg',
      },
    ],
    additional: '**Only 7 spots left at this price',
    button: 'Get Started',
  },
]

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState('')

  return (
    <section className="bg-black text-white py-20 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          Flexible Pricing — Learn at Your Own Pace
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
          You choose how and with what level of support you want to learn. Regardless of the plan,
          you’ll get full access to the curriculum and support every step of the way.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-stretch gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => {
          const isActive = selectedPlan === plan.id

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative w-full sm:w-[400px] cursor-pointer rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                isActive
                  ? 'border-[#5A189A] shadow-[0_0_20px_2px_rgba(156,39,176,0.3)]'
                  : 'border-white/10 hover:border-[#5A189A] hover:shadow-[0_0_20px_2px_rgba(156,39,176,0.2)]'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-4 right-4 bg-orange-500 text-xs text-white px-2 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}

              {/* Header */}
              <div>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-2xl font-bold mb-1">{plan.price}</div>
                <div className="text-sm line-through text-red-400 mb-4">{plan.oldPrice}</div>

                {/* Promo (if any) */}
                {plan.promo ? (
                  <div className="bg-orange-500 text-xs font-semibold text-white text-center rounded-md px-3 py-1 mb-4">
                    {plan.promo}
                  </div>
                ) : (
                  <div className="h-[32px] mb-4"></div> // Placeholder for alignment
                )}

                {/* Benefits */}
                <ul className="flex flex-col gap-2 text-sm text-white/90 mb-6">
                  {plan.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Image
                        src={benefit.icon}
                        alt=""
                        width={20}
                        height={20}
                        className="mt-[2px] shrink-0"
                      />
                      <span>{benefit.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom: Availability & Button */}
              <div>
                <p className="text-orange-500 text-xs text-left mb-3">{plan.additional}</p>
                <button
                  className={`w-full py-2 rounded-full text-sm font-bold transition ${
                    isActive
                      ? 'bg-[#A259FF] hover:bg-[#8e3de9]'
                      : 'bg-white text-black hover:bg-gray-200'
                  }`}
                >
                  {plan.button}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}