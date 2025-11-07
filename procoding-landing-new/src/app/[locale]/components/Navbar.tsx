'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/TranslationContext';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';

type Section = {
  key: string;
  href: string;
  icon?: string;
};

type NavbarProps = {
  navItems?: Section[];
};

export default function Navbar({ navItems = [] }: NavbarProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, locale } = useTranslation();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (menuOpen) setIsVisible(true);
    else {
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 200;
      let current = '';
  
      for (let i = 0; i < navItems.length; i++) {
        const { href } = navItems[i];
        const section = document.querySelector(href);
        if (!section) continue;
  
        const top = section.getBoundingClientRect().top + window.scrollY;
        const bottom = top + section.offsetHeight;
  
        if (scrollY + threshold >= top && scrollY + threshold < bottom) {
          current = href;
          break;
        }
  
        if (
          i === navItems.length - 1 &&
          window.innerHeight + scrollY >= document.body.offsetHeight - 10
        ) {
          current = href;
        }
      }
      if (
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 10
      ) {
        const lastItem = navItems[navItems.length - 1];
        if (lastItem?.href) {
          setActiveSection(lastItem.href);
        }
        return;
      }
  
      setActiveSection(current);
    };
  
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!mounted || pathname.includes('/quiz/')) return null;

  const isDark = resolvedTheme === 'dark';
  const themeIcon = isDark ? '/images/theme_btn_dark.svg' : '/images/theme_btn_light.svg';

  const handleLanguageChange = (newLocale: string) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${locale}`, `/${newLocale}`);
    window.location.assign(newPath);
  };

  const desktopItems = navItems.filter(item => !item.icon);
  const mobileItems = navItems.filter(item => item.icon);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isDark
          ? 'bg-black'
          : isScrolled
          ? 'bg-white/70 backdrop-blur-md'
          : 'bg-white'
      }`}
    >
      <nav className="flex w-full justify-between items-center px-6 py-4 max-w-screen-xl mx-auto">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 z-50">
          <Image src="/images/logo.svg" alt="ProCoding Logo" width={36} height={36} priority />
          <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-black'}`}>ProCoding</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden custom-md:flex gap-6 text-sm font-medium items-center">
          {desktopItems.map(({ key, href }) => (
            <li key={href}>
              <a
                href={href}
                className={`transition-colors underline-offset-4 ${
                  activeSection === href
                    ? 'text-[#D726B3]'
                    : isDark
                    ? 'text-white hover:text-[#D726B3]'
                    : 'text-black hover:text-[#D726B3]'
                }`}
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-4 z-50">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            <Image src={themeIcon} alt="Theme Toggle" width={70} height={60} />
          </button>

          {/* Language Switcher (desktop) */}
          <div className="hidden custom-md:flex items-center gap-4 h-12">
            <LanguageSwitcher
              locale={locale}
              handleLanguageChange={handleLanguageChange}
              isDark={isDark}
            />
          </div>

          {/* Apply button (desktop) */}
          <div className="hidden custom-md:flex">
            <a
              href="#contact"
              className="bg-[#A943D5] hover:opacity-90 text-white py-2 px-4 rounded-full text-sm font-semibold transition whitespace-nowrap"
            >
              {t('nav.apply') || 'Apply'}
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button onClick={() => setMenuOpen(true)} className="custom-md:hidden">
            <Image
              src="/images/menu_icon.svg"
              alt="Menu"
              width={28}
              height={28}
              style={{
                filter: isDark ? 'invert(0)' : 'invert(1)',
                transition: 'filter 0.3s ease',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isVisible && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/80"
            onClick={() => setMenuOpen(false)}
          />
          <div
            className={`fixed top-0 right-0 w-full h-screen z-50 px-8 pt-10 overflow-y-auto transition-transform duration-300 ${
              menuOpen ? 'translate-x-0' : 'translate-x-full'
            } ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6"
              aria-label="Close menu"
            >
              <Image
                src="/images/close_icon.svg"
                alt="Close"
                width={28}
                height={28}
                style={{
                  filter: isDark ? 'invert(0)' : 'invert(1)',
                  transition: 'filter 0.3s ease',
                }}
              />
            </button>

            {/* Mobile nav items */}
            {mobileItems.map(({ key, href, icon }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-semibold transition flex items-center gap-4 mt-6 ${
                  activeSection === href
                    ? 'text-[#D726B3]'
                    : isDark
                    ? 'text-white hover:text-[#D726B3]'
                    : 'text-black hover:text-[#D726B3]'
                }`}
              >
                <Image
                  src={icon!}
                  alt={`${key} icon`}
                  width={24}
                  height={24}
                  style={{
                    filter: isDark ? 'invert(0)' : 'invert(1)',
                    transition: 'filter 0.3s ease',
                  }}
                />
                {t(key)}
              </a>
            ))}

            {/* Apply button */}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="bg-[#9333ea] text-white py-2 px-6 rounded-full text-2xl font-semibold hover:opacity-90 transition mt-6 inline-block"
            >
              {t('nav.apply') || 'Apply'}
            </a>

            {/* Language switcher */}
            <div className="mt-6">
              <LanguageSwitcher
                locale={locale}
                handleLanguageChange={handleLanguageChange}
                isDark={isDark}
              />
            </div>
          </div>
        </>
      )}
    </header>
  );
}