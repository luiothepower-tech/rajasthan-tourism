import React, { ReactNode } from 'react';
import { Link } from '../../lib/router';
import { ButtonVariant, ButtonSize } from './Button';

interface LinkButtonProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  id?: string;
  ariaLabel?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#B85D38] text-white hover:bg-[#9E4A2A] active:bg-[#843B20] border border-transparent shadow-xs',
  secondary: 'bg-[#F5EFE6] text-stone-900 hover:bg-[#E7DFD5] active:bg-[#D6C9B9] border border-[#E7DFD5]',
  outline: 'bg-transparent text-stone-800 hover:bg-stone-100 active:bg-stone-200 border border-stone-300',
  ghost: 'bg-transparent text-stone-700 hover:bg-stone-100/60 active:bg-stone-200/60 border border-transparent',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-xs px-3 py-1.5 min-h-[36px] gap-1.5',
  md: 'text-sm px-4 py-2 min-h-[44px] gap-2',
  lg: 'text-base px-6 py-3 min-h-[48px] gap-2.5',
};

export const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'right',
  className = '',
  id,
  ariaLabel,
}) => {
  return (
    <Link
      href={href}
      id={id}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center font-medium rounded-lg transition-colors select-none text-decoration-none
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B85D38] focus-visible:ring-offset-2
        ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span className="whitespace-nowrap">{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </Link>
  );
};
