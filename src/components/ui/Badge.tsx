import React, { ReactNode } from 'react';

export type BadgeVariant = 'terracotta' | 'sandstone' | 'indigo' | 'crimson' | 'saffron' | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

const variantClasses: Record<BadgeVariant, string> = {
  terracotta: 'bg-[#F9EBE5] text-[#9E4A2A] border-[#F3D4C7]',
  sandstone: 'bg-[#F5EFE6] text-stone-800 border-[#E7DFD5]',
  indigo: 'bg-[#EBF2F7] text-[#1D344B] border-[#D1E0EC]',
  crimson: 'bg-[#FDF2F2] text-[#842222] border-[#F8D7D7]',
  saffron: 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]',
  neutral: 'bg-stone-100 text-stone-700 border-stone-200',
};

const sizeClasses = {
  sm: 'text-[11px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'sandstone',
  size = 'md',
  children,
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border tracking-wide uppercase whitespace-nowrap ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
    >
      {children}
    </span>
  );
};
