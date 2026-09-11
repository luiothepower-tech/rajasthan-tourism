import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Info, X, Shield, Sparkles } from 'lucide-react';

export interface GallerySlide {
  url: string;
  altText: string;
  caption?: string;
  title?: string;
  source?: string;
  license?: string;
  attributionText?: string;
}

export interface ImageGallerySlideshowProps {
  slides: GallerySlide[];
  autoPlayInterval?: number; // default 6500ms
  aspectRatio?: '16/9' | '4/3' | '21/9' | '3/2' | '1/1';
  className?: string;
  showControls?: boolean;
  showIndicators?: boolean;
  showThumbnails?: boolean;
  showAttribution?: boolean;
  priorityFirst?: boolean;
  onSlideChange?: (index: number) => void;
}

const aspectRatioClassMap: Record<string, string> = {
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '21/9': 'aspect-[21/9]',
  '3/2': 'aspect-[3/2]',
  '1/1': 'aspect-square',
};

export const ImageGallerySlideshow: React.FC<ImageGallerySlideshowProps> = ({
  slides,
  autoPlayInterval = 6500,
  aspectRatio = '16/9',
  className = '',
  showControls = true,
  showIndicators = true,
  showThumbnails = false,
  showAttribution = true,
  priorityFirst = true,
  onSlideChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [failedIndices, setFailedIndices] = useState<Set<number>>(new Set());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Detect user preference for reduced motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Filter out completely failed images if possible
  const validSlides = slides.filter((_, idx) => !failedIndices.has(idx));
  const effectiveLength = slides.length;
  const currentSlide = slides[currentIndex] || slides[0];

  // Preload next image slide
  useEffect(() => {
    if (effectiveLength <= 1) return;
    const nextIdx = (currentIndex + 1) % effectiveLength;
    const nextSlide = slides[nextIdx];
    if (nextSlide && !failedIndices.has(nextIdx)) {
      const img = new Image();
      img.src = nextSlide.url;
    }
  }, [currentIndex, effectiveLength, slides, failedIndices]);

  // Safe navigation handlers
  const goToNext = useCallback(() => {
    if (effectiveLength <= 1) return;
    setCurrentIndex((prev) => {
      let next = (prev + 1) % effectiveLength;
      // Skip failed indices
      while (failedIndices.has(next) && failedIndices.size < effectiveLength) {
        next = (next + 1) % effectiveLength;
        if (next === prev) break;
      }
      onSlideChange?.(next);
      return next;
    });
  }, [effectiveLength, failedIndices, onSlideChange]);

  const goToPrev = useCallback(() => {
    if (effectiveLength <= 1) return;
    setCurrentIndex((prev) => {
      let prevIdx = (prev - 1 + effectiveLength) % effectiveLength;
      while (failedIndices.has(prevIdx) && failedIndices.size < effectiveLength) {
        prevIdx = (prevIdx - 1 + effectiveLength) % effectiveLength;
        if (prevIdx === prev) break;
      }
      onSlideChange?.(prevIdx);
      return prevIdx;
    });
  }, [effectiveLength, failedIndices, onSlideChange]);

  // Autoplay timer with pause-on-hover/interaction
  useEffect(() => {
    if (isPaused || effectiveLength <= 1 || isCreditModalOpen) return;

    const timer = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, effectiveLength, autoPlayInterval, goToNext, isCreditModalOpen]);

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

    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  const handleImageError = (index: number) => {
    console.warn(`[Slideshow] Image at index ${index} failed to load: ${slides[index]?.url}`);
    setFailedIndices((prev) => {
      const updated = new Set(prev);
      updated.add(index);
      return updated;
    });
    // Immediately attempt next slide
    goToNext();
  };

  // Fallback if all slides fail
  if (validSlides.length === 0 && slides.length > 0) {
    return (
      <div
        className={`w-full overflow-hidden bg-[#241B15] text-[#FAF7F2] rounded-2xl flex flex-col items-center justify-center p-8 text-center border border-stone-800 ${
          aspectRatioClassMap[aspectRatio] || 'aspect-[16/9]'
        } ${className}`}
      >
        <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
          <Sparkles className="w-6 h-6" />
        </div>
        <p className="font-serif text-lg font-bold text-amber-200">
          {slides[0]?.caption || 'Rajasthan Heritage Visual'}
        </p>
        <p className="text-xs text-stone-400 mt-1 max-w-sm">
          Verified cultural archival slide is currently loading or undergoing license validation.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Rajasthan Cultural Image Gallery"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`group relative w-full overflow-hidden rounded-2xl bg-[#1C1917] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 select-none shadow-md ${
        aspectRatioClassMap[aspectRatio] || 'aspect-[16/9]'
      } ${className}`}
    >
      {/* Slides Container with Crossfade */}
      <div className="relative w-full h-full">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          const isFailed = failedIndices.has(idx);
          if (isFailed) return null;

          return (
            <div
              key={`${slide.url}-${idx}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${idx + 1} of ${slides.length}: ${slide.caption || slide.altText}`}
              aria-hidden={!isActive}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.url}
                alt={slide.altText}
                loading={idx === 0 && priorityFirst ? 'eager' : 'lazy'}
                decoding="async"
                referrerPolicy="no-referrer"
                onError={() => handleImageError(idx)}
                className={`w-full h-full object-cover transition-transform duration-7000 ease-out ${
                  isActive && !prefersReducedMotion ? 'scale-103' : 'scale-100'
                }`}
              />
              {/* Subtle gradient vignette to preserve legibility and contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* Slide Caption & Title Overlay */}
      {currentSlide && (
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

      {/* Manual Previous/Next Controls */}
      {showControls && effectiveLength > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center opacity-80 hover:opacity-100 transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
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
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center opacity-80 hover:opacity-100 transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Attribution & Legal Licensing Info Trigger */}
      {showAttribution && currentSlide && (
        <div className="absolute top-3 right-3 z-20">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsCreditModalOpen(!isCreditModalOpen);
            }}
            aria-label="View photo source and license attribution"
            className="px-2.5 py-1 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md text-stone-300 hover:text-white text-[11px] font-medium flex items-center gap-1.5 transition-colors border border-white/20 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Asset Info</span>
          </button>

          {/* Popover Card */}
          {isCreditModalOpen && (
            <div
              className="absolute right-0 top-8 w-72 p-3.5 rounded-xl bg-stone-900/95 backdrop-blur-md text-stone-200 border border-stone-700 shadow-2xl z-30 animate-fade-in text-xs space-y-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-1.5 border-b border-stone-800">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Asset Licensing Record</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreditModalOpen(false)}
                  className="p-1 hover:text-white rounded-sm"
                  aria-label="Close attribution dialog"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-stone-400">Subject</p>
                <p className="text-stone-100 font-medium">
                  {currentSlide.caption || currentSlide.title || currentSlide.altText}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-stone-400">Source</p>
                <p className="text-stone-300">
                  {currentSlide.source || 'Rajasthan Explorer Verified Archive'}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase font-bold text-stone-400">License Status</p>
                <p className="text-stone-300">
                  {currentSlide.license || 'Project Educational / Learning Use'}
                </p>
              </div>

              <p className="text-[10px] text-stone-400 pt-1 border-t border-stone-800 leading-normal">
                Independent learning project. Human license verification is recommended before commercial reuse.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Indicators / Dots */}
      {showIndicators && effectiveLength > 1 && (
        <div
          role="tablist"
          aria-label="Slide Selection"
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10"
        >
          {slides.map((_, idx) => {
            if (failedIndices.has(idx)) return null;
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Jump to slide ${idx + 1}`}
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

      {/* Optional Thumbnail Strip for Detail Views */}
      {showThumbnails && effectiveLength > 1 && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 p-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 max-w-[80%] overflow-x-auto">
          {slides.map((slide, idx) => {
            if (failedIndices.has(idx)) return null;
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                  onSlideChange?.(idx);
                }}
                aria-label={`Select angle ${idx + 1}: ${slide.caption || slide.title || ''}`}
                className={`relative w-10 h-7 rounded-sm overflow-hidden border transition-all cursor-pointer ${
                  isActive ? 'border-amber-400 ring-1 ring-amber-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={slide.url}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
