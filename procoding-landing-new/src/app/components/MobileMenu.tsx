'use client';

import { useState } from 'react';
import Image from 'next/image';

const navItems = [
  { label: 'Home', href: '#home', icon: 'home_icon.svg' },
  { label: 'About', href: '#about', icon: 'about_cup_icon.svg' },
  { label: 'Instructors', href: '#instructors', icon: 'about_people.svg' },
  { label: 'Program', href: '#program', icon: 'programm_icon.svg' },
  { label: 'Pricing', href: '#plans', icon: 'pricing_bag_icon.svg' },
  { label: 'Contact', href: '#contact', icon: 'email_icon.svg' },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Menu Icon */}
      <button
        onClick={handleToggle}
        className="md:hidden p-2 z-50 relative"
        aria-label="Open menu"
      >
        <Image
          src="/images/menu_icon.svg"
          alt="Menu icon"
          width={24}
          height={24}
        />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black/60 z-40"
        />
      )}

      {/* Slide-in Menu Panel */}
      <div
        className={`fixed top-[72px] right-0 h-[calc(100vh-72px)] w-3/4 max-w-xs bg-[#0f0f0f] text-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6">
          {navItems.map(({ label, href, icon }) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className="flex items-center gap-3 text-lg font-medium hover:text-[#F28237] transition"
            >
              <Image
                src={`/images/${icon}`}
                alt={`${label} icon`}
                width={20}
                height={20}
              />
              {label}
            </a>
          ))}

          {/* Telegram Button */}
          <a
            href="https://t.me/procoding"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-6 bg-[#a855f7] text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition text-center"
          >
            Telegram
          </a>
        </div>
      </div>
    </>
  );
}