import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { RotateCcw, Check, AlertTriangle } from 'lucide-react';

export interface ResetTripButtonProps {
  onReset: () => void;
  label?: string;
  variant?: 'toolbar' | 'inline' | 'compact';
  confirmFirst?: boolean;
  className?: string;
}

/**
 * ResetTripButton
 * Clears itinerary destinations and budget parameters to sensible defaults.
 * Provides smooth interactive animations respecting user reduced-motion preferences.
 */
export const ResetTripButton: React.FC<ResetTripButtonProps> = ({
  onReset,
  label = 'Reset Trip',
  variant = 'toolbar',
  confirmFirst = false,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [isRotating, setIsRotating] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirmFirst && !showConfirm) {
      setShowConfirm(true);
      return;
    }

    setShowConfirm(false);
    if (!shouldReduceMotion) {
      setIsRotating(true);
    }
    onReset();
  };

  const handleCancelConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 p-1 bg-[#F9EBE5] border border-[#B85D38]/30 rounded-xl text-xs font-semibold ${className}`}
        role="alertdialog"
        aria-label="Confirm resetting trip to defaults"
      >
        <span className="text-[#843B20] px-2 flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5 text-[#B85D38]" />
          <span>Reset to defaults?</span>
        </span>
        <button
          type="button"
          onClick={handleClick}
          className="px-2.5 py-1.5 bg-[#B85D38] hover:bg-[#9E4A2A] text-white rounded-lg text-xs font-bold transition-colors shadow-2xs focus-visible:ring-2 focus-visible:ring-[#B85D38]"
        >
          Confirm
        </button>
        <button
          type="button"
          onClick={handleCancelConfirm}
          className="px-2.5 py-1.5 bg-white hover:bg-stone-100 text-stone-600 rounded-lg text-xs font-medium border border-stone-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    );
  }

  // Visual variants
  let buttonClasses = '';
  if (variant === 'toolbar') {
    buttonClasses =
      'inline-flex items-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs sm:text-sm font-semibold rounded-xl border border-stone-200 transition-colors focus-visible:ring-2 focus-visible:ring-[#B85D38] min-h-[44px]';
  } else if (variant === 'compact') {
    buttonClasses =
      'inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF7F2] hover:bg-stone-100 text-stone-600 hover:text-stone-900 text-xs font-medium rounded-lg border border-[#E7DFD5] transition-colors focus-visible:ring-2 focus-visible:ring-[#B85D38] min-h-[36px]';
  } else {
    // inline
    buttonClasses =
      'inline-flex items-center gap-2 px-3 py-2 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-lg border border-[#E7DFD5] transition-colors focus-visible:ring-2 focus-visible:ring-[#B85D38] shadow-2xs min-h-[40px]';
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
      transition={{ duration: 0.15 }}
      aria-label="Reset trip to default settings"
      className={`${buttonClasses} ${className} group cursor-pointer`}
    >
      <motion.span
        className="inline-flex items-center justify-center shrink-0"
        animate={
          shouldReduceMotion
            ? undefined
            : isRotating
            ? { rotate: 360 }
            : { rotate: 0 }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.45, ease: [0.25, 1, 0.5, 1] }
        }
        onAnimationComplete={() => setIsRotating(false)}
      >
        <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-500 group-hover:text-stone-700 transition-colors" />
      </motion.span>
      <span>{label}</span>
    </motion.button>
  );
};
