import React, { useState } from 'react';
import { useRouter, Link } from '../../lib/router';
import { tourismRepository } from '../../lib/repository';
import { MapMarkerData } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import { MapPin, Compass, ArrowRight, List, Eye } from 'lucide-react';

interface MapFoundationProps {
  onSelectDestination?: (slug: string) => void;
  className?: string;
  id?: string;
}

export const MapFoundation: React.FC<MapFoundationProps> = ({
  onSelectDestination,
  className = '',
  id,
}) => {
  const { navigate } = useRouter();
  const markers = tourismRepository.getMapMarkers();
  const [activeMarker, setActiveMarker] = useState<MapMarkerData | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  const handleMarkerClick = (marker: MapMarkerData) => {
    if (onSelectDestination) {
      onSelectDestination(marker.slug);
    } else {
      navigate(`/destinations/${marker.slug}`);
    }
  };

  return (
    <div id={id} className={`w-full ${className}`}>
      {/* Top Controls: Mode Switcher & Accessibility Alternative */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#B85D38]" />
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-900">
              Rajasthan Spatial Navigator
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Explore 8 core royal regions. Select a landmark pin to inspect its cultural dossier.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-[#F5EFE6] p-1 rounded-lg border border-[#E7DFD5]">
          <button
            type="button"
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'map'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
            aria-pressed={viewMode === 'map'}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Interactive Map</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
            aria-pressed={viewMode === 'list'}
          >
            <List className="w-3.5 h-3.5" />
            <span>Accessible List</span>
          </button>
        </div>
      </div>

      {/* View Mode 1: Interactive SVG Vector Map Canvas */}
      {viewMode === 'map' ? (
        <div className="relative w-full rounded-2xl bg-[#F5EFE6] border border-[#E7DFD5] p-4 sm:p-8 overflow-hidden shadow-xs">
          {/* Subtle desert grid background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#B85D38 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative w-full max-w-4xl mx-auto aspect-[800/650]">
            <svg
              viewBox="0 0 800 650"
              className="w-full h-full select-none"
              role="img"
              aria-label="Stylized vector map of Rajasthan showcasing 8 cultural destinations"
            >
              {/* Stylized Rajasthan Boundary Contour */}
              <path
                d="M 280 60 
                   L 460 70 
                   L 590 120 
                   L 680 200 
                   L 620 310 
                   L 660 410 
                   L 580 520 
                   L 480 610 
                   L 330 630 
                   L 260 560 
                   L 140 450 
                   L 80 340 
                   L 110 210 
                   Z"
                fill="#FAF7F2"
                stroke="#D6C9B9"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="transition-all"
              />

              {/* Major Aravalli Range Indicative Ridge */}
              <path
                d="M 290 600 Q 420 400 540 180"
                fill="none"
                stroke="#BCAC98"
                strokeWidth="2"
                strokeDasharray="2 3"
                opacity="0.6"
              />

              {/* Geographic Region Label Accents */}
              <text x="210" y="240" fill="#BCAC98" fontSize="13" letterSpacing="4" fontFamily="sans-serif">
                THAR DESERT
              </text>
              <text x="490" y="550" fill="#BCAC98" fontSize="13" letterSpacing="4" fontFamily="sans-serif">
                MEWAR
              </text>
              <text x="350" y="380" fill="#BCAC98" fontSize="13" letterSpacing="4" fontFamily="sans-serif">
                MARWAR
              </text>
              <text x="560" y="240" fill="#BCAC98" fontSize="13" letterSpacing="4" fontFamily="sans-serif">
                DHUNDHAR
              </text>

              {/* Destination Interactive Pins */}
              {markers.map((marker) => {
                const isHovered = activeMarker?.id === marker.id;
                return (
                  <g
                    key={marker.id}
                    transform={`translate(${marker.svgX}, ${marker.svgY})`}
                    className="cursor-pointer group"
                    onClick={() => handleMarkerClick(marker)}
                    onMouseEnter={() => setActiveMarker(marker)}
                    onMouseLeave={() => setActiveMarker(null)}
                    onFocus={() => setActiveMarker(marker)}
                    onBlur={() => setActiveMarker(null)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Destination pin: ${marker.name}, ${marker.moniker}`}
                  >
                    {/* Pulsing beacon wave on active */}
                    {isHovered && (
                      <circle
                        r="20"
                        fill="#B85D38"
                        opacity="0.2"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer marker pin shadow */}
                    <circle
                      r="12"
                      fill={isHovered ? '#843B20' : '#B85D38'}
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      className="transition-transform duration-200 group-hover:scale-125"
                    />

                    {/* Pin Center Core */}
                    <circle r="4" fill="#FFFFFF" />

                    {/* Text Label next to Pin */}
                    <text
                      x="16"
                      y="5"
                      className={`text-[12px] font-sans font-semibold tracking-wide select-none transition-all ${
                        isHovered
                          ? 'fill-stone-900 font-bold underline'
                          : 'fill-stone-800'
                      }`}
                    >
                      {marker.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hover / Active Marker Preview Dossier Card */}
            {activeMarker && (
              <div
                className="absolute z-20 pointer-events-auto transition-all duration-200"
                style={{
                  left: `min(calc(${(activeMarker.svgX / 800) * 100}% + 16px), 70%)`,
                  top: `min(calc(${(activeMarker.svgY / 650) * 100}% - 40px), 70%)`,
                }}
              >
                <div className="w-64 bg-white rounded-xl shadow-xl border border-[#E7DFD5] p-3 text-left">
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-2.5 bg-stone-100">
                    <ResponsiveImage
                      src={activeMarker.heroImage}
                      alt={activeMarker.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 z-10">
                      <Badge variant="terracotta" size="sm">
                        {activeMarker.region}
                      </Badge>
                    </div>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                    {activeMarker.name}
                  </h4>
                  <p className="text-xs text-[#B85D38] font-medium mt-0.5">
                    {activeMarker.moniker}
                  </p>

                  <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span>{activeMarker.attractionCount} signature monuments</span>
                    <span className="text-[#B85D38] font-semibold flex items-center gap-1">
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-[#E7DFD5] flex flex-wrap items-center justify-between text-xs text-stone-500">
            <span>Normalized coordinate architecture (viewBox 0 0 800 650)</span>
            <span>Click any marker to inspect destination dossier</span>
          </div>
        </div>
      ) : (
        /* View Mode 2: Accessible Destination List Alternative */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {markers.map((marker) => (
            <Card
              key={marker.id}
              interactive
              padding="sm"
              onClick={() => handleMarkerClick(marker)}
              className="flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="aspect-video rounded-lg overflow-hidden bg-stone-100">
                  <ResponsiveImage
                    src={marker.heroImage}
                    alt={marker.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="sandstone" size="sm">
                    {marker.region}
                  </Badge>
                  <span className="text-xs text-stone-500">
                    {marker.attractionCount} landmarks
                  </span>
                </div>
                <h4 className="font-serif text-lg font-semibold text-stone-900">
                  {marker.name}
                </h4>
                <p className="text-xs text-[#B85D38] font-medium">
                  {marker.moniker}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-[#B85D38] font-semibold">
                <span>View Dossier</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
