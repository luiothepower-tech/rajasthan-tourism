import React, { useState, useRef, useEffect } from 'react';
import { Landmark } from 'lucide-react';

export type AspectRatio =
  | '16/9'
  | '16/10'
  | '4/3'
  | '1/1'
  | '3/2'
  | '21/9'
  | '16:9'
  | '16:10'
  | '4:3'
  | '1:1'
  | '3:2'
  | '21:9';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  aspectRatio?: AspectRatio;
  focalPoint?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  fallbackSrc?: string;
}

const aspectRatioClasses: Record<AspectRatio, string> = {
  '16/9': 'aspect-[16/9]',
  '16/10': 'aspect-[16/10]',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
  '3/2': 'aspect-[3/2]',
  '21/9': 'aspect-[21/9]',
  '16:9': 'aspect-[16/9]',
  '16:10': 'aspect-[16/10]',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
  '3:2': 'aspect-[3/2]',
  '21:9': 'aspect-[21/9]',
};

const focalPointClasses: Record<string, string> = {
  center: 'object-center',
  top: 'object-top',
  bottom: 'object-bottom',
  left: 'object-left',
  right: 'object-right',
};

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  aspectRatio = '16/9',
  focalPoint = 'center',
  className = '',
  imgClassName = '',
  priority = false,
  fallbackSrc,
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Sync state if src prop changes
  useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  // Check if image is already cached/completed by browser
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [currentSrc]);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setIsLoaded(false);
    } else {
      setHasError(true);
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#F5EFE6] ${aspectRatioClasses[aspectRatio] || 'aspect-[16/9]'} ${className}`.trim()}
    >
      {/* Subtle skeleton shimmer during initial load */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 animate-pulse" />
      )}

      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#F7F2EA] via-[#EFE5D8] to-[#E5D7C5] text-stone-700 border border-[#E0D2BF]">
          <div className="w-10 h-10 rounded-full bg-[#8E432A]/10 flex items-center justify-center mb-2 text-[#8E432A]">
            <Landmark className="w-5 h-5" />
          </div>
          <span className="font-serif text-sm font-semibold text-stone-800 line-clamp-1">
            {alt || 'Rajasthan Heritage'}
          </span>
          <span className="text-[11px] text-stone-500 uppercase tracking-widest mt-0.5">
            Regional Heritage Visual
          </span>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-500 ${focalPointClasses[focalPoint]} ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`.trim()}
        />
      )}
    </div>
  );
};
