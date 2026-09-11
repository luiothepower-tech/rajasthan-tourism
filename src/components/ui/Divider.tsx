import React from 'react';

interface DividerProps {
  className?: string;
  subtle?: boolean;
}

export const Divider: React.FC<DividerProps> = ({
  className = '',
  subtle = false,
}) => {
  return (
    <div
      role="separator"
      className={`w-full my-6 sm:my-8 border-t ${
        subtle ? 'border-stone-200/60' : 'border-[#E7DFD5]'
      } ${className}`.trim()}
    />
  );
};
