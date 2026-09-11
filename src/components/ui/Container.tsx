import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer';
  id?: string;
}

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[1400px]',
  full: 'max-w-full',
};

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  className = '',
  as: Component = 'div',
  id,
}) => {
  return (
    <Component
      id={id}
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`.trim()}
    >
      {children}
    </Component>
  );
};
