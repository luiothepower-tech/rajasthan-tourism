import React, { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  variant?: 'default' | 'surface' | 'sandstone' | 'terracotta-subtle';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  id?: string;
  ariaLabel?: string;
}

const variantClasses = {
  default: 'bg-transparent',
  surface: 'bg-white',
  sandstone: 'bg-[#F5EFE6]',
  'terracotta-subtle': 'bg-[#FAF2EE]',
};

const paddingClasses = {
  none: '',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16 lg:py-20',
  lg: 'py-16 md:py-24 lg:py-32',
  xl: 'py-20 md:py-32 lg:py-40',
};

export const Section: React.FC<SectionProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  id,
  ariaLabel,
}) => {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`relative w-full ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`.trim()}
    >
      {children}
    </section>
  );
};
