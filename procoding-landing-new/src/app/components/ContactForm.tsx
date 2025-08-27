"use client";

import Image from "next/image";
import { useState } from "react";
import { useTheme } from "next-themes";

export default function ContactForm() {
  const [preferredMethod, setPreferredMethod] = useState<"telegram" | "email">("email");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="relative py-20 px-4 flex justify-center transition-colors duration-300">
      <div
        className={`relative w-full max-w-3xl rounded-3xl px-8 py-10 border transition-colors duration-300 ${
          isDark
            ? "bg-black border-white/10 text-white"
            : "bg-white border-black/10 text-black"
        }`}
      >
        {/* Dragon */}
        <div className="absolute -right-20 bottom-0 hidden lg:block">
          <Image
            src="/images/dragon_pointing.svg"
            alt="ProCoding Dragon"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>

        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          Contact Us
        </h2>
        <p className={`${isDark ? "text-white/80" : "text-black/70"} mb-8`}>
          Fill out the form and we’ll reach out to help with questions, choosing a course,
          and explaining how the program works.
        </p>

        {/* Form */}
        <form className="space-y-5">
          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            className={`w-full px-4 py-3 rounded-xl placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300 ${
              isDark
                ? "bg-[#0f0f0f] border border-white/20 text-white placeholder-white/50"
                : "bg-[#f3f2ff] border border-black/10 text-black placeholder-black/40"
            }`}
          />

          {/* Contact Method */}
          <div>
            <p className="mb-2 text-sm font-medium">Preferred contact method</p>
            <div className="flex gap-4">
              {/* Telegram Button */}
              <button
                type="button"
                onClick={() => setPreferredMethod("telegram")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${
                  preferredMethod === "telegram"
                    ? "bg-[#5A189A] text-white border-transparent"
                    : isDark
                    ? "bg-[#0f0f0f] text-white border-white/20"
                    : "bg-[#f3f2ff] text-black border-black/10"
                }`}
              >
                <Image
                  src="/images/telegram_icon.svg"
                  alt="Telegram"
                  width={20}
                  height={20}
                  style={{
                    filter:
                      preferredMethod === "telegram"
                        ? "invert(0)"
                        : isDark
                        ? "invert(0)"
                        : "invert(1)",
                  }}
                />
                Telegram
              </button>

              {/* Email Button */}
              <button
                type="button"
                onClick={() => setPreferredMethod("email")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${
                  preferredMethod === "email"
                    ? "bg-[#5A189A] text-white border-transparent"
                    : isDark
                    ? "bg-[#0f0f0f] text-white border-black/20"
                    : "bg-[#f3f2ff] text-black border-white/10"
                }`}
              >
                <Image
                  src="/images/email_icon.svg"
                  alt="Email"
                  width={20}
                  height={20}
                  style={{
                    filter:
                      preferredMethod === "email"
                        ? "invert(0)"
                        : isDark
                        ? "invert(0)"
                        : "invert(1)",
                  }}
                />
                Email
              </button>
            </div>
          </div>

          {/* Dynamic Contact Field */}
          <input
            type={preferredMethod === "email" ? "email" : "text"}
            placeholder={preferredMethod === "email" ? "Email" : "Telegram username"}
            className={`w-full px-4 py-3 rounded-xl placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300 ${
              isDark
                ? "bg-[#0f0f0f] border border-white/20 text-white placeholder-white/50"
                : "bg-[#f3f2ff] border border-black/10 text-black placeholder-black/40"
            }`}
          />

          {/* Question Field */}
          <textarea
            placeholder="Your question"
            rows={4}
            className={`w-full px-4 py-3 rounded-xl placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300 ${
              isDark
                ? "bg-[#0f0f0f] border border-white/20 text-white placeholder-white/50"
                : "bg-[#f3f2ff] border border-black/10 text-black placeholder-black/40"
            }`}
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#a855f7] hover:bg-[#9333ea] text-white font-semibold py-3 rounded-full transition duration-200"
          >
            Submit Request
          </button>
        </form>
      </div>
    </section>
  );
}