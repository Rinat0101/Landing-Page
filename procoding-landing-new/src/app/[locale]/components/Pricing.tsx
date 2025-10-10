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
      description: t("pricing.basic.description"),
      price: t("pricing.basic.price"),
      oldPrice: t("pricing.basic.oldPrice"),
      benefits: basicBenefits,
      additional: t("pricing.basic.spotsLeft"),
      button: t("pricing.getStarted"),
    },
    {
      id: "premium",
      name: t("pricing.premium.name"),
      description: t("pricing.premium.description"),
      price: t("pricing.premium.price"),
      oldPrice: t("pricing.premium.oldPrice"),
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
        <h2 className="text-4xl font-bold mb-4">{t("pricing.title")}</h2>
        <p
          className={`max-w-2xl mx-auto text-sm sm:text-base ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {t("pricing.description")}
        </p>

        {/* 🟣 Start Date & Schedule Card */}
        <div
          className={`mt-6 max-w-md mx-auto text-sm rounded-xl border px-6 py-5 shadow-md sm:text-base ${
            isDark
              ? "bg-[#1a1a1a] border-white/10 text-white"
              : "bg-[#F4F1FB] border-gray-200 text-black"
          }`}
        >
          <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
            <Image
              src="/images/calendar_icon.svg"
              alt="Calendar icon"
              width={20}
              height={20}
              className={`inline-block`}
            />
            Starting December 1
          </h3>
          <p className="text-center mb-1 font-medium">6 months duration</p>
          <ul className="text-center space-y-1 text-sm sm:text-base">
            <li> Tuesday & Thursday – 6:00 PM to 9:00 PM</li>
            <li> Saturday – 10:00 AM to 4:00 PM</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-stretch gap-6 max-w-5xl mx-auto">
        {sortedPlans.map((plan) => {
          const isActive = selectedPlan === plan?.id;
          if (!plan) return null;

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`group relative w-full sm:w-[400px] md:w-[60%] cursor-pointer rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between
                ${
                  isActive
                    ? "border-[#D726B3] shadow-[0_0_20px_2px_rgba(156,39,176,0.6)]"
                    : "border-black/10 hover:shadow-[0_0_20px_2px_rgba(156,39,176,0.6)]"
                }
                ${isDark ? "bg-[#141414] border-white/10" : "bg-white"}`}
            >
              <div>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p
                  className={`text-sm mb-4 ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  {plan.description}
                </p>

                <div
                  className={`text-4xl font-bold mb-1 transition-colors duration-300 ${
                    isActive ? "text-[#D726B3]" : ""
                  }`}
                >
                  {plan.oldPrice}
                </div>
                <div
                  className={`text-sm mb-4 ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  {plan.price}
                </div>

                <ul
                  className={`flex flex-col gap-2 text-sm mb-6 ${
                    isDark ? "text-white" : "text-black"
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
                <p className="text-[#D726B3] text-xs text-left mb-3">
                  {plan.additional}
                </p>
                <a
                  href="#contact"
                  className={`block text-center w-full py-2 rounded-full text-md font-bold border transition
                  ${
                    isActive
                      ? "bg-purple-600 text-white border-transparent"
                      : isDark
                      ? "bg-white text-black border-white/10"
                      : "bg-white text-[#5A189A] border-[#5A189A]"
                  }`}
                >
                  {plan.button}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
