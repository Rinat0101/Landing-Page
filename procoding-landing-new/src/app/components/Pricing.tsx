"use client";

import { useState } from "react";
import { useTheme } from "next-themes";

const CardIcon = ({ isDark }: { isDark: boolean }) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M8.75 2.5H6.25C3.89298 2.5 2.71447 2.5 1.98223 3.23223C1.45502 3.75945 1.3074 4.51801 1.26607 5.78125H13.7339C13.6926 4.51801 13.545 3.75945 13.0178 3.23223C12.2855 2.5 11.107 2.5 8.75 2.5Z" fill={isDark ? "white" : "#F28237"} />
    <path d="M6.25 12.5H8.75C11.107 12.5 12.2855 12.5 13.0178 11.7678C13.75 11.0355 13.75 9.85702 13.75 7.5C13.75 7.22379 13.75 6.96377 13.7488 6.71875H1.25118C1.25 6.96377 1.25 7.22379 1.25 7.5C1.25 9.85702 1.25 11.0355 1.98223 11.7678C2.71447 12.5 3.89298 12.5 6.25 12.5Z" fill={isDark ? "white" : "#F28237"} />
    <path fillRule="evenodd" clipRule="evenodd" d="M3.28125 10C3.28125 9.74112 3.49112 9.53125 3.75 9.53125H6.25C6.50888 9.53125 6.71875 9.74112 6.71875 10C6.71875 10.2589 6.50888 10.4688 6.25 10.4688H3.75C3.49112 10.4688 3.28125 10.2589 3.28125 10Z" fill="#0A0A0A" />
    <path fillRule="evenodd" clipRule="evenodd" d="M7.34375 10C7.34375 9.74112 7.55362 9.53125 7.8125 9.53125H8.75C9.00888 9.53125 9.21875 9.74112 9.21875 10C9.21875 10.2589 9.00888 10.4688 8.75 10.4688H7.8125C7.55362 10.4688 7.34375 10.2589 7.34375 10Z" fill="#0A0A0A" />
  </svg>
);

const CalendarIcon = ({ isDark }: { isDark: boolean }) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M4.84375 1.5625C4.84375 1.30362 4.63388 1.09375 4.375 1.09375C4.11612 1.09375 3.90625 1.30362 3.90625 1.5625V2.54954C3.00667 2.62157 2.41611 2.79836 1.98223 3.23223C1.54836 3.66611 1.37157 4.25667 1.29954 5.15625H13.7005C13.6284 4.25667 13.4516 3.66611 13.0178 3.23223C12.5839 2.79836 11.9933 2.62157 11.0938 2.54954V1.5625C11.0938 1.30362 10.8839 1.09375 10.625 1.09375C10.3661 1.09375 10.1563 1.30362 10.1563 1.5625V2.50806C9.74046 2.5 9.2744 2.5 8.75 2.5H6.25C5.7256 2.5 5.25954 2.5 4.84375 2.50806V1.5625Z" fill={isDark ? "white" : "#F28237"} />
    <path fillRule="evenodd" clipRule="evenodd" d="M13.75 7.5V8.75C13.75 11.107 13.75 12.2855 13.0178 13.0178C12.2855 13.75 11.107 13.75 8.75 13.75H6.25C3.89298 13.75 2.71447 13.75 1.98223 13.0178C1.25 12.2855 1.25 11.107 1.25 8.75V7.5C1.25 6.9756 1.25 6.50954 1.25806 6.09375H13.7419C13.75 6.50954 13.75 6.9756 13.75 7.5ZM10.3125 11.25C10.8303 11.25 11.25 10.8303 11.25 10.3125C11.25 9.79473 10.8303 9.375 10.3125 9.375C9.79473 9.375 9.375 9.79473 9.375 10.3125C9.375 10.8303 9.79473 11.25 10.3125 11.25Z" fill={isDark ? "white" : "#F28237"} />
  </svg>
);

const plans = [
  {
    id: "basic",
    name: "Basic Plan",
    price: "$200 / month",
    oldPrice: "$600 / month",
    promo: null,
    benefits: [
      { label: "Flexible installment payments", icon: "card" },
      { label: "Course duration: 6 months", icon: "calendar" },
      { label: "Access to video lessons and theory", icon: "/images/green_check_icon.svg" },
      { label: "Homework assignments", icon: "/images/green_check_icon.svg" },
      { label: "Standard chat support", icon: "/images/green_check_icon.svg" },
      { label: "Certificate upon course completion", icon: "/images/green_check_icon.svg" },
      { label: "Individual homework feedback", icon: "/images/gray_cancel_icon.svg" },
      { label: "Personal mentor and guidance", icon: "/images/gray_cancel_icon.svg" },
    ],
    additional: "**Only 15 spots left at this price",
    button: "Get Started",
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: "$400 / month",
    oldPrice: "$800 / month",
    badge: "15% OFF",
    promo: "Invite a friend and get 1 ticket for the price of 2",
    benefits: [
      { label: "Flexible installment payments", icon: "card" },
      { label: "Course duration: 6 months", icon: "calendar" },
      { label: "Everything in Basic Plan", icon: "/images/green_check_icon.svg" },
      { label: "Individual homework feedback", icon: "/images/green_check_icon.svg" },
      { label: "Personal mentor and guidance", icon: "/images/green_check_icon.svg" },
      { label: "Access to extra modules and projects", icon: "/images/green_check_icon.svg" },
      { label: "Deep dives in private webinars", icon: "/images/green_check_icon.svg" },
    ],
    additional: "**Only 7 spots left at this price",
    button: "Get Started",
  },
];

const sortedPlans = [
  plans.find((p) => p.id === "premium"),
  plans.find((p) => p.id === "basic"),
];

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className={`py-20 px-4 transition-colors duration-300 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">Flexible Pricing — Learn at Your Own Pace</h2>
        <p className={`max-w-2xl mx-auto text-sm sm:text-base ${isDark ? "text-white/80" : "text-black/70"}`}>
          You choose how and with what level of support you want to learn. Regardless of the plan, you’ll get full access to the curriculum and support every step of the way.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-stretch gap-6 max-w-5xl mx-auto">
        {sortedPlans.map((plan) => {
          const isActive = selectedPlan === plan?.id;
          if (!plan) return null;

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative w-full sm:w-[400px] cursor-pointer rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                isActive
                  ? "border-[#5A189A] shadow-[0_0_20px_2px_rgba(156,39,176,0.3)]"
                  : isDark
                  ? "border-white/10 hover:border-[#5A189A] hover:shadow-[0_0_20px_2px_rgba(156,39,176,0.2)]"
                  : "border-black/10 hover:border-[#5A189A] hover:shadow-[0_0_20px_2px_rgba(156,39,176,0.1)]"
              } ${isDark ? "bg-[#141414]" : "bg-[#F3F2FF]"}`}
            >
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

                {plan.promo ? (
                  <div className="bg-orange-500 text-xs font-semibold text-white text-center rounded-md px-3 py-1 mb-4">
                    {plan.promo}
                  </div>
                ) : (
                  <div className="h-[32px] mb-4"></div>
                )}

                {/* Benefits */}
                <ul className={`flex flex-col gap-2 text-sm mb-6 ${isDark ? "text-white/90" : "text-black/90"}`}>
                  {plan.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {benefit.icon === "card" ? (
                        <CardIcon isDark={isDark} />
                      ) : benefit.icon === "calendar" ? (
                        <CalendarIcon isDark={isDark} />
                      ) : (
                        <img src={benefit.icon} alt="" width={20} height={20} className="mt-[2px] shrink-0" />
                      )}
                      <span>{benefit.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom */}
              <div>
                <p className="text-orange-500 text-xs text-left mb-3">{plan.additional}</p>
                <button
                  className={`w-full py-2 rounded-full text-sm font-bold transition border ${
                    isActive
                      ? "bg-[#A259FF] hover:bg-[#8e3de9] text-white border-transparent"
                      : isDark
                      ? "bg-white text-black hover:bg-gray-100 border-white/10"
                      : "bg-white text-[#5A189A] hover:bg-gray-50 border-[#5A189A]"
                  }`}
                >
                  {plan.button}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}