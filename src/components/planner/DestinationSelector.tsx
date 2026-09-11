import React from 'react';
import { Destination } from '../../types';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import { Check, Plus, Minus, MapPin, Clock, Tag } from 'lucide-react';

interface DestinationSelectorProps {
  destinations: Destination[];
  selectedDestinationIds: string[];
  onToggleDestination: (destinationId: string) => void;
}

export const DestinationSelector: React.FC<DestinationSelectorProps> = ({
  destinations,
  selectedDestinationIds,
  onToggleDestination,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#B85D38] text-white flex items-center justify-center text-xs font-bold">
              3
            </span>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Select Your Destinations
            </h3>
          </div>
          <p className="text-sm text-stone-600 mt-1">
            Pick from Rajasthan’s 8 curated royal cities. Click to add or remove from your journey route.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 bg-[#FAF7F2] px-3 py-1.5 rounded-lg border border-[#E7DFD5]">
          <span>Selected:</span>
          <span className="text-[#B85D38] font-bold">
            {selectedDestinationIds.length} of {destinations.length} Cities
          </span>
        </div>
      </div>

      {/* Grid of 8 destinations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {destinations.map((dest) => {
          const isSelected = selectedDestinationIds.includes(dest.id);
          const stopIndex = selectedDestinationIds.indexOf(dest.id);

          return (
            <div
              key={dest.id}
              className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col bg-white ${
                isSelected
                  ? 'border-[#B85D38] ring-2 ring-[#B85D38]/20 shadow-md translate-y-[-2px]'
                  : 'border-[#E7DFD5] hover:border-stone-400 hover:shadow-sm'
              }`}
            >
              {/* Card Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <ResponsiveImage
                  src={dest.heroImage}
                  alt={dest.name}
                  aspectRatio="16:9"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Region & Duration Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-black/60 text-white backdrop-blur-md">
                    {dest.region}
                  </span>

                  {isSelected && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#B85D38] text-white shadow-md flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[3]" />
                      Stop #{stopIndex + 1}
                    </span>
                  )}
                </div>

                {/* Destination Name Overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                  <h4 className="font-serif text-lg font-bold leading-tight drop-shadow-sm">
                    {dest.name}
                  </h4>
                  <p className="text-[11px] text-stone-200 truncate drop-shadow-sm">
                    {dest.moniker}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#B85D38]" />
                    <span>Recommended: {dest.recommendedDuration}</span>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {dest.shortDescription}
                  </p>

                  {/* Highlights Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {dest.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-[#FAF7F2] text-stone-600 text-[10px] rounded border border-[#E7DFD5]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Add / Remove Action Button */}
                <button
                  type="button"
                  onClick={() => onToggleDestination(dest.id)}
                  aria-label={
                    isSelected
                      ? `Remove ${dest.name} from itinerary`
                      : `Add ${dest.name} to itinerary`
                  }
                  className={`w-full min-h-[44px] py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                    isSelected
                      ? 'bg-[#F9EBE5] text-[#843B20] border-[#F3D4C7] hover:bg-[#F3D4C7]'
                      : 'bg-[#B85D38] text-white border-[#B85D38] hover:bg-[#9E4A2A] shadow-sm'
                  } focus-visible:ring-2 focus-visible:ring-[#B85D38]`}
                >
                  {isSelected ? (
                    <>
                      <Minus className="w-3.5 h-3.5" />
                      <span>Remove from Route</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Itinerary</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
