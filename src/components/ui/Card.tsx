import React, { ReactNode } from 'react';
import { motion, useReducedMotion, type Variants, type HTMLMotionProps } from 'motion/react';

export interface CardProps {
  children: ReactNode;
  interactive?: boolean;
  hoverLift?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'white' | 'sandstone' | 'outlined' | 'hover-lift';
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  id?: string;
  role?: string;
  tabIndex?: number;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-labelledby'?: string;
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const variantClasses = {
  white: 'bg-white border-[#E7DFD5]',
  sandstone: 'bg-[#F5EFE6] border-[#D6C9B9]',
  outlined: 'bg-transparent border-[#E7DFD5]',
  'hover-lift': 'bg-white border-[#E7DFD5]',
};

export const cardHoverLiftVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 1px 3px 0 rgba(36, 27, 21, 0.06), 0 1px 2px -1px rgba(36, 27, 21, 0.04)',
    transition: {
      type: 'spring',
      stiffness: 420,
      damping: 26,
      mass: 0.8,
    },
  },
  hover: {
    y: -6,
    scale: 1.018,
    boxShadow: '0 20px 25px -5px rgba(36, 27, 21, 0.12), 0 8px 10px -6px rgba(36, 27, 21, 0.08)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 22,
      mass: 0.8,
    },
  },
  tap: {
    y: -1,
    scale: 0.992,
    boxShadow: '0 4px 6px -1px rgba(36, 27, 21, 0.08)',
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30,
    },
  },
};

const reducedMotionHoverLiftVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 1px 3px 0 rgba(36, 27, 21, 0.06)',
    transition: { duration: 0 },
  },
  hover: {
    y: 0,
    scale: 1,
    boxShadow: '0 4px 8px -1px rgba(36, 27, 21, 0.1)',
    transition: { duration: 0.15 },
  },
  tap: {
    y: 0,
    scale: 1,
    transition: { duration: 0 },
  },
};

export const Card: React.FC<CardProps> = ({
  children,
  interactive = false,
  hoverLift = false,
  padding = 'md',
  variant = 'white',
  className = '',
  onClick,
  id,
  ...restProps
}) => {
  const shouldReduceMotion = useReducedMotion();
  const isHoverLift = variant === 'hover-lift' || hoverLift;

  // Base styling classes
  const baseClasses = `rounded-xl border overflow-hidden ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`.trim();

  if (isHoverLift) {
    return (
      <motion.div
        id={id}
        onClick={onClick}
        initial="rest"
        animate="rest"
        whileHover={shouldReduceMotion ? 'hover' : 'hover'}
        whileTap={shouldReduceMotion ? undefined : 'tap'}
        variants={shouldReduceMotion ? reducedMotionHoverLiftVariants : cardHoverLiftVariants}
        className={`${baseClasses} transform-gpu will-change-transform cursor-pointer hover:border-[#B85D38]/60 transition-colors duration-200`}
        {...restProps}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      id={id}
      onClick={onClick}
      className={`${baseClasses} transition-all duration-200 ${
        interactive
          ? 'cursor-pointer hover:border-[#B85D38]/50 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0'
          : 'shadow-xs'
      }`.trim()}
      {...restProps}
    >
      {children}
    </div>
  );
};

