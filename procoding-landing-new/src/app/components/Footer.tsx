"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const iconClass = `w-5 h-5 transition duration-300 ${isDark ? "" : "invert"}`;
  const socialIconBox = `
    w-10 h-10
    bg-white
    rounded-xl
    flex items-center justify-center
    transition hover:scale-105
    shadow-sm
  `;

  return (
    <footer
      className={`w-full px-4 sm:px-6 md:px-12 py-10 rounded-t-4xl transition-colors duration-300 ${
        isDark ? "bg-[#0f0f0f] text-white" : "bg-[#f3f2ff] text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10 md:grid md:grid-cols-3 lg:grid-cols-5">
        {/* Logo & Social */}
        <div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo.svg"
                alt="ProCoding logo"
                width={24}
                height={24}
                priority
              />
              <span className="font-semibold text-lg">ProCoding</span>
            </div>
            <p
              className={`mb-4 text-sm ${
                isDark ? "text-white/80" : "text-black/70"
              }`}
            >
              Our social media
            </p>
            <div className="flex gap-3">
              {[
                { src: "/images/fb_icon.svg", alt: "Facebook" },
                { src: "/images/twitter_icon.svg", alt: "Twitter" },
                { src: "/images/linkedin_icon.svg", alt: "LinkedIn" },
                { src: "/images/instagram_icon.svg", alt: "Instagram" },
              ].map(({ src, alt }) => (
                <a
                  key={alt}
                  href="#"
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition hover:scale-105 shadow-sm ${
                    isDark ? "bg-[#0A0A0A]" : "bg-white"
                  }`}
                >
                  <Image src={src} alt={alt} width={16} height={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Documents */}
        <div>
          <h3 className="font-semibold mb-2 text-base">Documents</h3>
          <ul
            className={`space-y-1 text-sm ${
              isDark ? "text-white/70" : "text-black/70"
            }`}
          >
            <li>
              <a href="#">User Agreement</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Cookies Policy</a>
            </li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <h3 className="font-semibold mb-2 text-base">Our Address</h3>
          <div
            className={`flex items-start gap-2 text-sm ${
              isDark ? "text-white/70" : "text-black/70"
            }`}
          >
            <Image
              src="/images/location_icon.svg"
              alt="Location"
              width={20}
              height={20}
              className={iconClass}
            />
            <p>
              14 Pushkina St., Apt 27,
              <br />
              Yekaterinburg, 620014
            </p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-2 text-base">Contact</h3>
          <div
            className={`flex items-center gap-2 text-sm mb-2 ${
              isDark ? "text-white/70" : "text-black/70"
            }`}
          >
            <Image
              src="/images/email_icon.svg"
              alt="Email"
              width={20}
              height={20}
              className={iconClass}
            />
            <span>pochta@gmail.com</span>
          </div>
          <div
            className={`flex items-center gap-2 text-sm ${
              isDark ? "text-white/70" : "text-black/70"
            }`}
          >
            <Image
              src="/images/telegram_icon.svg"
              alt="Telegram"
              width={20}
              height={20}
              className={iconClass}
            />
            <span>@daurfast</span>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-2 text-base">Newsletter</h3>
          <input
            type="email"
            placeholder="Your email"
            className={`w-full px-4 py-2 rounded-xl text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${
              isDark
                ? "bg-[#0a0a0a] text-white/70 border border-white/20 placeholder-white/50"
                : "bg-white text-black border border-black/10 placeholder-black/40"
            }`}
          />
          <button
            type="submit"
            className="w-full bg-[#a855f7] hover:bg-[#9333ea] text-white font-semibold py-2 rounded-full transition duration-200 text-sm"
          >
            Submit Request
          </button>
        </div>
      </div>

      {/* Divider */}
      <div
        className={`mt-10 text-center text-sm px-4 sm:px-6 ${
          isDark ? "text-white/50" : "text-black/50"
        }`}
      >
        © Coost 2025 | All rights reserved
      </div>
    </footer>
  );
}
