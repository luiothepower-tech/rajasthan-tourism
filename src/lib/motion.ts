/**
 * Rajasthan Tourism — Motion Foundation
 * Phase 1: Foundation Architecture
 * 
 * Defines standard easing curves, duration tokens, and reduced-motion-safe variants.
 * Complex animations are deferred to Phase 7. CSS transitions are preferred for basic interactions.
 */

export const MOTION_DURATIONS = {
  instant: 0.1,
  fast: 0.2,
  base: 0.35,
  gentle: 0.5,
  cinematic: 0.8,
} as const;

export const MOTION_EASINGS = {
  easeOutQuart: [0.25, 1, 0.5, 1] as const,
  easeInOutCubic: [0.65, 0, 0.35, 1] as const,
  gentleSpring: { type: 'spring', stiffness: 260, damping: 20 } as const,
} as const;

/**
 * Standard page transition variant respecting user motion preferences
 */
export const pageFadeVariants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.base,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: MOTION_DURATIONS.fast,
    },
  },
};

/**
 * Checks if user prefers reduced motion (client-side)
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
