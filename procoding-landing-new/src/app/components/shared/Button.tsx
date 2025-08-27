import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  target?: '_blank' | '_self';
  className?: string;
  children: ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

export default function Button({
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    href,
    target = '_self',
    className = '',
    children,
    type = 'button',
    onClick,
  }: ButtonProps) {
    let classes = 'inline-flex items-center justify-center font-medium rounded-full transition-all focus:outline-none ';
  
    // Size classes
    if (size === 'sm') {
      classes += 'text-sm px-3 py-1.5 ';
    } else if (size === 'lg') {
      classes += 'text-lg px-6 py-3 ';
    } else {
      classes += 'text-base px-4 py-2 ';
    }
  
    // Variant classes (only apply if no manual style passed via `className`)
    if (!className && variant === 'secondary') {
      classes += 'bg-[#a855f7] text-white hover:bg-[#9333ea] ';
    } else if (!className && variant === 'outline') {
      classes += 'border border-white text-white bg-transparent hover:bg-white hover:text-black ';
    } else if (!className && variant === 'ghost') {
      classes += 'text-white bg-transparent hover:underline ';
    } else if (!className) {
      classes += 'bg-[#D726B3] text-white hover:opacity-90 ';
    }
  
    // Always add className at the end to override everything
    classes += className;
  
    const iconContent =
      icon && iconPosition === 'left' ? (
        <>
          <span className="mr-2">{icon}</span>
          {children}
        </>
      ) : icon ? (
        <>
          {children}
          <span className="ml-2">{icon}</span>
        </>
      ) : (
        children
      );
  
    return href ? (
      <Link href={href} target={target} className={classes}>
        {iconContent}
      </Link>
    ) : (
      <button type={type} className={classes} onClick={onClick}>
        {iconContent}
      </button>
    );
  }