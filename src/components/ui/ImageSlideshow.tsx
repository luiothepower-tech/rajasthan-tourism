import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export interface SlideItem {
  url: string;
  alt?: string;
  title?: string;
  caption?: string;
}

export type SlideInput = string | SlideItem;

export interface ImageSlideshowProps {
  /** Array of image URLs or slide objects */
  slides: SlideInput[];
  /** Auto-cycling interval in milliseconds (default: 5500) */
  autoPlayInterval?: number;
  /** Aspect ratio class or preset */
  aspectRatio?: '16/9' | '4/3' | '21/9' | '3/2' | '1/1' | 'auto';
  /** Additional container classes */
  className?: string;
  /** Whether to show next/previous arrow buttons (default: true) */
  showControls?: boolean;
  /** Whether to show indicator dots (default: true) */
  showIndicators?: boolean;
  /** Whether to display captions when available (default: true) */
  showCaptions?: boolean;
  /** Whether to pause auto-cycling on hover (default: true) */
  pauseOnHover?: boolean;
  /** Eager load first image (default: true) */
  priorityFirst?: boolean;
  /** Callback triggered when slide index changes */
  onSlideChange?: (index: number) => void;
}

const aspectRatioClassMap: Record<string, string> = {
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '21/9': 'aspect-[21/9]',
  '3/2': 'aspect-[3/2]',
  '1/1': 'aspect-square',
  'auto': '',
};

/**
 * Reusable ImageSlideshow component supporting crossfade transitions,
 * auto-cycling, touch swipe navigation, and respecting prefers-reduced-motion.
 */
export const ImageSlideshow: React.FC<ImageSlideshowProps> = ({
  slides,
  autoPlayInterval = 5500,
  aspectRatio = '16/9',
  className = '',
  showControls = true,
  showIndicators = true,
  showCaptions = true,
  pauseOnHover = true,
  priorityFirst = true,
  onSlideChange,
}) => {
  // Normalize slides into standard SlideItem objects
  const normalizedSlides: SlideItem[] = slides.map((item, idx) => {
    if (typeof item === 'string') {
      return { url: item, alt: `Slide ${idx + 1}` };
    }
    return {
      url: item.url,
      alt: item.alt || item.title || `Slide ${idx + 1}`,
      title: item.title,
      caption: item.caption,
    };
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [failedIndices, setFailedIndices] = useState<Set<number>>(new Set());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor user's preference for reduced motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const totalSlides = normalizedSlides.length;
  const currentSlide = normalizedSlides[currentIndex] || normalizedSlides[0];

  // Preload adjacent images
  useEffect(() => {
    if (totalSlides <= 1) return;
    const nextIdx = (currentIndex + 1) % totalSlides;
    const nextSlide = normalizedSlides[nextIdx];
    if (nextSlide && !failedIndices.has(nextIdx)) {
      const img = new Image();
      img.src = nextSlide.url;
    }
  }, [currentIndex, totalSlides, normalizedSlides, failedIndices]);

  // Navigate forward with error skipping
  const goToNext = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => {
      let next = (prev + 1) % totalSlides;
      while (failedIndices.has(next) && failedIndices.size < totalSlides) {
        next = (next + 1) % totalSlides;
        if (next === prev) break;
      }
      onSlideChange?.(next);
      return next;
    });
  }, [totalSlides, failedIndices, onSlideChange]);

  // Navigate backward with error skipping
  const goToPrev = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => {
      let prevIdx = (prev - 1 + totalSlides) % totalSlides;
      while (failedIndices.has(prevIdx) && failedIndices.size < totalSlides) {
        prevIdx = (prevIdx - 1 + totalSlides) % totalSlides;
        if (prevIdx === prev) break;
      }
      onSlideChange?.(prevIdx);
      return prevIdx;
    });
  }, [totalSlides, failedIndices, onSlideChange]);

  // Auto-cycling timer
  useEffect(() => {
    if (isPaused || totalSlides <= 1 || autoPlayInterval <= 0) return;

    const timer = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, totalSlides, autoPlayInterval, goToNext]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Threshold of 40px for swipe gesture
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  // Error handling for missing/broken image assets
  const handleImageError = (index: number) => {
    setFailedIndices((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
    goToNext();
  };

  if (totalSlides === 0) {
    return null;
  }

  const allFailed = failedIndices.size >= totalSlides;
  if (allFailed) {
    return (
      <div
        className={`w-full overflow-hidden bg-stone-900 text-stone-300 rounded-2xl flex flex-col items-center justify-center p-8 text-center border border-stone-800 ${
          aspectRatioClassMap[aspectRatio] || ''
        } ${className}`}
      >
        <Sparkles className="w-6 h-6 text-amber-400 mb-2" />
        <p className="font-serif text-sm text-stone-200">Visual gallery slide unavailable</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image Slideshow"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onFocus={() => pauseOnHover && setIsPaused(true)}
      onBlur={() => pauseOnHover && setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`group relative w-full overflow-hidden rounded-2xl bg-stone-900 select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 shadow-md ${
        aspectRatioClassMap[aspectRatio] || ''
      } ${className}`}
    >
      {/* Slides with Crossfade Transition */}
      <div className="relative w-full h-full">
        {normalizedSlides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          const isFailed = failedIndices.has(idx);
          if (isFailed) return null;

          return (
            <div
              key={`${slide.url}-${idx}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${idx + 1} of ${totalSlides}: ${slide.caption || slide.title || slide.alt}`}
              aria-hidden={!isActive}
              className={`absolute inset-0 w-full h-full ${
                prefersReducedMotion
                  ? isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  : `transition-opacity duration-1000 ease-in-out ${
                      isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`
              }`}
            >
              <img
                src={slide.url}
                alt={slide.alt || `Slide ${idx + 1}`}
                loading={idx === 0 && priorityFirst ? 'eager' : 'lazy'}
                decoding="async"
                referrerPolicy="no-referrer"
                onError={() => handleImageError(idx)}
                className={`w-full h-full object-cover ${
                  !prefersReducedMotion && isActive
                    ? 'transition-transform duration-7000 ease-out scale-103'
                    : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* Caption Overlay */}
      {showCaptions && currentSlide && (currentSlide.title || currentSlide.caption) && (
        <div className="absolute bottom-4 left-4 right-16 z-20 pointer-events-none">
          {currentSlide.title && (
            <span className="inline-block px-2.5 py-0.5 mb-1 rounded-sm bg-black/50 backdrop-blur-md text-[11px] font-semibold text-amber-300 uppercase tracking-wider border border-amber-500/30">
              {currentSlide.title}
            </span>
          )}
          {currentSlide.caption && (
            <p className="font-serif text-sm sm:text-base text-stone-100 font-medium drop-shadow-md line-clamp-1">
              {currentSlide.caption}
            </p>
          )}
        </div>
      )}

      {/* Manual Previous / Next Controls */}
      {showControls && totalSlides > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md text-white flex items-center justify-center opacity-80 hover:opacity-100 transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md text-white flex items-center justify-center opacity-80 hover:opacity-100 transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {showIndicators && totalSlides > 1 && (
        <div
          role="tablist"
          aria-label="Slide Indicators"
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10"
        >
          {normalizedSlides.map((_, idx) => {
            if (failedIndices.has(idx)) return null;
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                  onSlideChange?.(idx);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive ? 'w-6 h-2 bg-amber-400' : 'w-2 h-2 bg-white/50 hover:bg-white/90'
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
