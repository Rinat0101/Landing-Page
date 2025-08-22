'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ContactForm() {
  const [preferredMethod, setPreferredMethod] = useState<'telegram' | 'email'>('email');

  return (
    <section className="relative py-20 px-4 flex justify-center bg-transparent">
      <div className="relative w-full max-w-3xl bg-black border border-black rounded-3xl px-8 py-10">
        {/* Dragon positioned absolutely */}
        <div className="absolute -right-20 bottom-0 hidden md:block">
          <Image
            src="/images/dragon_pointing.svg"
            alt="ProCoding Dragon"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>

        {/* Form content */}
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-4 leading-tight">
          Contact Us
        </h2>
        <p className="text-white/80 mb-8">
          Fill out the form and we’ll reach out to help with questions, choosing a course,
          and explaining how the program works.
        </p>

        <form className="space-y-5">
          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-[#0f0f0f] border border-white/20 text-white px-4 py-3 rounded-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Contact Method */}
          <div>
            <p className="text-white mb-2">Preferred contact method</p>
            <div className="flex gap-4">
              {/* Telegram Button */}
              <button
                type="button"
                onClick={() => setPreferredMethod('telegram')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${
                  preferredMethod === 'telegram'
                    ? 'bg-white text-black'
                    : 'bg-[#0f0f0f] border-white/20 text-white'
                }`}
              >
                <Image
                  src="/images/telegram_icon.svg"
                  alt="Telegram"
                  width={20}
                  height={20}
                  style={{
                    filter: preferredMethod === 'telegram' ? 'invert(1)' : 'invert(0)',
                  }}
                />
                Telegram
              </button>

              {/* Email Button */}
              <button
                type="button"
                onClick={() => setPreferredMethod('email')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${
                  preferredMethod === 'email'
                    ? 'bg-white text-black'
                    : 'bg-[#0f0f0f] border-white/20 text-white'
                }`}
              >
                <Image
                  src="/images/email_icon.svg"
                  alt="Email"
                  width={20}
                  height={20}
                  style={{
                    filter: preferredMethod === 'email' ? 'invert(0)' : 'invert(1)',
                  }}
                />
                Email
              </button>
            </div>
          </div>

          {/* Dynamic Contact Field */}
          <input
            type={preferredMethod === 'email' ? 'email' : 'text'}
            placeholder={preferredMethod === 'email' ? 'Email' : 'Telegram username'}
            className="w-full bg-[#0f0f0f] border border-white/20 text-white px-4 py-3 rounded-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Question Field */}
          <textarea
            placeholder="Your question"
            className="w-full bg-[#0f0f0f] border border-white/20 text-white px-4 py-3 rounded-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={4}
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