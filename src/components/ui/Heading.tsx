import React, { ReactNode } from 'react';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingVariant = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps {
  level?: HeadingLevel;
  variant?: HeadingVariant;
  serif?: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
}

const variantStyles: Record<HeadingVariant, string> = {
  display: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1]',
  h1: 'text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.15]',
  h2: 'text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-[1.2]',
  h3: 'text-xl sm:text-2xl font-medium leading-[1.3]',
  h4: 'text-lg sm:text-xl font-semibold leading-[1.35]',
  h5: 'text-base sm:text-lg font-semibold leading-[1.4]',
  h6: 'text-sm sm:text-base font-semibold uppercase tracking-wider',
};

export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  variant,
  serif = true,
  children,
  className = '',
  id,
}) => {
  const Component = `h${level}` as React.ElementType;
  const activeVariant = variant || (`h${level}` as HeadingVariant);
  const fontClass = serif ? 'font-serif' : 'font-sans';

  return (
    <Component
      id={id}
      className={`${variantStyles[activeVariant]} ${fontClass} text-stone-900 ${className}`.trim()}
    >
      {children}
    </Component>
  );
};
