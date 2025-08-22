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
  // Base classes
  let classes = 'inline-flex items-center justify-center font-medium rounded-full transition-all focus:outline-none ';

  // Size classes
  if (size === 'sm') {
    classes += 'text-sm px-3 py-1.5 ';
  } else if (size === 'lg') {
    classes += 'text-lg px-6 py-3 ';
  } else {
    classes += 'text-base px-4 py-2 ';
  }

  // Variant classes
  if (variant === 'secondary') {
    classes += 'bg-[#a855f7] text-white hover:bg-[#9333ea] ';
  } else if (variant === 'outline') {
    classes += 'border border-white text-white bg-transparent hover:bg-white hover:text-black ';
  } else if (variant === 'ghost') {
    classes += 'text-white bg-transparent hover:underline ';
  } else {
    classes += 'bg-[#D726B3] text-white hover:opacity-90 ';
  }

  // Additional custom class
  classes += className;

  // Icon placement
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

  // Link or button
  if (href) {
    return (
      <Link href={href} target={target} className={classes}>
        {iconContent}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {iconContent}
    </button>
  );
}