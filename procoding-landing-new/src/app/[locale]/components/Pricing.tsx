"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useTranslation } from "@/lib/TranslationContext";

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const { theme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === "dark";

  const basicBenefits = [
    t("pricing.basic.benefits.0"),
    t("pricing.basic.benefits.1"),
    t("pricing.basic.benefits.2"),
    t("pricing.basic.benefits.3"),
    t("pricing.basic.benefits.4"),
    t("pricing.basic.benefits.5"),
    t("pricing.basic.benefits.6"),
    t("pricing.basic.benefits.7"),
  ];

  const premiumAll = [
    t("pricing.premium.benefits.1"),
    t("pricing.premium.benefits.2"),
    t("pricing.premium.benefits.3"),
    t("pricing.premium.benefits.4"),
    t("pricing.premium.benefits.5"),
    t("pricing.premium.benefits.6"),
    t("pricing.premium.benefits.7"),
    t("pricing.premium.benefits.8"),
    t("pricing.premium.benefits.9"),
    t("pricing.premium.benefits.10"),
    t("pricing.premium.benefits.11"),
    t("pricing.premium.benefits.12"),
    t("pricing.premium.benefits.13"),
  ];

  const premiumBenefits = premiumAll.filter(
    (benefit) => !basicBenefits.includes(benefit)
  );

  const plans = [
    {
      id: "basic",
      name: t("pricing.basic.name"),
      description:
        "Perfect for self-driven and motivated students. Includes everything you need to complete the course and start a career in tech:",
      price: t("pricing.basic.price"), // monthly
      oldPrice: t("pricing.basic.oldPrice"), // full
      benefits: basicBenefits,
      additional: t("pricing.basic.spotsLeft"),
      button: t("pricing.getStarted"),
    },
    {
      id: "premium",
      name: t("pricing.premium.name"),
      description:
        "The ultimate package for those who want full support throughout the career transition. Includes everything from the Basic Plan, plus:",
      price: t("pricing.premium.price"), // monthly
      oldPrice: t("pricing.premium.oldPrice"), // full
      benefits: premiumBenefits,
      additional: t("pricing.premium.spotsLeft"),
      button: t("pricing.getStarted"),
    },
  ];

  const sortedPlans = [
    plans.find((p) => p.id === "premium"),
    plans.find((p) => p.id === "basic"),
  ];

  return (
    <section
      className={`py-20 px-4 transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          {t("pricing.title")}
        </h2>
        <p
          className={`max-w-2xl mx-auto text-sm sm:text-base ${
            isDark ? "text-white/80" : "text-black/70"
          }`}
        >
          {t("pricing.description")}
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
              className={`relative w-full sm:w-[400px] md:w-[60%] cursor-pointer rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                isActive
                  ? "border-[#5A189A] shadow-[0_0_20px_2px_rgba(156,39,176,0.3)]"
                  : isDark
                  ? "border-white/10 hover:border-[#5A189A] hover:shadow-[0_0_20px_2px_rgba(156,39,176,0.2)]"
                  : "border-black/10 hover:border-[#5A189A] hover:shadow-[0_0_20px_2px_rgba(156,39,176,0.1)]"
              } ${isDark ? "bg-[#141414]" : "bg-[#F3F2FF]"}`}
            >
              <div>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p
                  className={`text-sm mb-4 ${
                    isDark ? "text-white/80" : "text-black/70"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="text-3xl font-bold mb-1">{plan.oldPrice}</div>
                <div className="text-sm text-gray-400 mb-4">{plan.price}</div>

                <ul
                  className={`flex flex-col gap-2 text-sm mb-6 ${
                    isDark ? "text-white/90" : "text-black/90"
                  }`}
                >
                  {plan.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Image
                        src="/images/green_check_icon.svg"
                        alt="check"
                        width={16}
                        height={16}
                        className="mt-[3px]"
                      />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-purple-500 text-xs text-left mb-3">
                  {plan.additional}
                </p>
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