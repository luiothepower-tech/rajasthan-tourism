import React, { ReactNode } from 'react';

type TextVariant = 'lead' | 'body' | 'body-small' | 'caption' | 'metadata' | 'number';

interface TextProps {
  variant?: TextVariant;
  as?: 'p' | 'span' | 'div' | 'label';
  color?: 'primary' | 'secondary' | 'muted' | 'terracotta' | 'white';
  children: ReactNode;
  className?: string;
  id?: string;
}

const variantStyles: Record<TextVariant, string> = {
  lead: 'text-lg sm:text-xl font-normal leading-relaxed',
  body: 'text-base font-normal leading-relaxed',
  'body-small': 'text-sm font-normal leading-normal',
  caption: 'text-xs font-normal leading-normal tracking-wide',
  metadata: 'text-xs font-medium uppercase tracking-widest',
  number: 'font-mono text-base font-semibold tabular-nums',
};

const colorStyles: Record<string, string> = {
  primary: 'text-stone-900',
  secondary: 'text-stone-600',
  muted: 'text-stone-500',
  terracotta: 'text-[#B85D38]',
  white: 'text-white',
};

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  as: Component = 'p',
  color = 'secondary',
  children,
  className = '',
  id,
}) => {
  return (
    <Component
      id={id}
      className={`${variantStyles[variant]} ${colorStyles[color]} ${className}`.trim()}
    >
      {children}
    </Component>
  );
};
