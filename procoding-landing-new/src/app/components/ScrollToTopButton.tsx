'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme(); // gets the current theme safely

  useEffect(() => {
    setMounted(true);
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!mounted) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full
        border border-neutral-900 dark:border-[#F4EBFF]
        flex items-center justify-center
        transition-all duration-300
        bg-transparent
        hover:bg-black/10 dark:hover:bg-white/10
        hover:scale-105
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      {resolvedTheme === 'dark' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 266.77"
          width="20"
          height="20"
          fill="white"
        >
          <path d="M493.12 263.55c4.3 4.28 11.3 4.3 15.62.05 4.33-4.26 4.35-11.19.05-15.47L263.83 3.22c-4.3-4.27-11.3-4.3-15.63-.04L3.21 248.13c-4.3 4.28-4.28 11.21.05 15.47 4.32 4.25 11.32 4.23 15.62-.05L255.99 26.48l237.13 237.07z"/>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 266.77"
          width="20"
          height="20"
          fill="black"
        >
          <path d="M493.12 263.55c4.3 4.28 11.3 4.3 15.62.05 4.33-4.26 4.35-11.19.05-15.47L263.83 3.22c-4.3-4.27-11.3-4.3-15.63-.04L3.21 248.13c-4.3 4.28-4.28 11.21.05 15.47 4.32 4.25 11.32 4.23 15.62-.05L255.99 26.48l237.13 237.07z"/>
        </svg>
      )}
    </button>
  );
}