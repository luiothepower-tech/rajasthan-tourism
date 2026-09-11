import React from 'react';
import { RouteSegment } from '../../types/planner';
import { Destination, Experience } from '../../types';
import { Navigation, Car, Train, Clock, MapPin, Sparkles, Compass } from 'lucide-react';

interface RouteTimelineVisualizerProps {
  destinationIds: string[];
  destinations: Destination[];
  nightsPerDestination: Record<string, number>;
  selectedExperiences: Experience[];
  routeSegments: RouteSegment[];
  totalDistanceKm: number;
  totalTransitHours: number;
}

export const RouteTimelineVisualizer: React.FC<RouteTimelineVisualizerProps> = ({
  destinationIds,
  destinations,
  nightsPerDestination,
  selectedExperiences,
  routeSegments,
  totalDistanceKm,
  totalTransitHours,
}) => {
  if (destinationIds.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 shadow-sm space-y-6">
      {/* Route Header Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E7DFD5] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B85D38]">
            <Navigation className="w-3.5 h-3.5" />
            <span>Overland Corridor Visualization</span>
          </div>
          <h4 className="font-serif text-xl font-bold text-stone-900 mt-1">
            Planned Journey Route
          </h4>
        </div>

        {destinationIds.length >= 2 && (
          <div className="flex items-center gap-3 text-xs bg-[#FAF7F2] px-3.5 py-2 rounded-xl border border-[#E7DFD5]">
            <div className="flex items-center gap-1.5 text-stone-700 font-semibold">
              <Compass className="w-4 h-4 text-[#B85D38]" />
              <span>Route Distance:</span>
              <span className="text-[#843B20] font-bold">~{totalDistanceKm} km</span>
            </div>
            <span className="text-stone-300">|</span>
            <div className="flex items-center gap-1.5 text-stone-700 font-semibold">
              <Clock className="w-4 h-4 text-[#B85D38]" />
              <span>Inter-City Transit:</span>
              <span className="text-[#843B20] font-bold">~{totalTransitHours.toFixed(1)} hrs</span>
            </div>
          </div>
        )}
      </div>

      {/* Visual Timeline Path */}
      <div className="relative pl-2 sm:pl-4 space-y-6">
        {destinationIds.map((destId, index) => {
          const dest = destinations.find((d) => d.id === destId);
          if (!dest) return null;

          const nights = nightsPerDestination[destId] || 1;
          const segment = routeSegments[index];
          const matchedExps = selectedExperiences.filter((e) =>
            e.destinationIds.includes(destId)
          );

          return (
            <div key={dest.id} className="relative">
              {/* Destination Stop Node */}
              <div className="flex items-start gap-4">
                {/* Node Dot / Stop Number */}
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#843B20] text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white ring-2 ring-[#B85D38]/30 shrink-0 z-10">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </div>

                  {/* Connecting Line to next stop */}
                  {index < destinationIds.length - 1 && (
                    <div className="w-0.5 bg-gradient-to-b from-[#B85D38] via-stone-300 to-[#B85D38] my-1 h-24 sm:h-28" />
                  )}
                </div>

                {/* Stop Card Details */}
                <div className="flex-1 bg-[#FAF7F2] border border-[#E7DFD5] rounded-xl p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-serif text-lg font-bold text-stone-900">
                          {dest.name}
                        </h5>
                        <span className="text-xs text-stone-500 font-medium">
                          ({dest.moniker})
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#B85D38]" />
                        <span>{dest.region} Region</span>
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-md border border-[#E7DFD5] text-xs font-bold text-[#843B20] self-start">
                      <span>{nights} {nights === 1 ? 'Night' : 'Nights'} Stay</span>
                    </div>
                  </div>

                  {/* Highlights preview */}
                  <div className="text-xs text-stone-600 line-clamp-2">
                    {dest.shortDescription}
                  </div>

                  {/* Selected Experiences in this city */}
                  {matchedExps.length > 0 && (
                    <div className="pt-2 border-t border-[#E7DFD5]/80 flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-semibold text-stone-500 flex items-center gap-1 mr-1">
                        <Sparkles className="w-3 h-3 text-[#B85D38]" />
                        Selected Experiences:
                      </span>
                      {matchedExps.map((exp) => (
                        <span
                          key={exp.id}
                          className="px-2.5 py-0.5 bg-[#F9EBE5] text-[#843B20] text-[11px] font-medium rounded-full border border-[#F3D4C7]"
                        >
                          {exp.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* In-Between Route Segment Badge (Transit Info) */}
              {segment && (
                <div className="ml-12 sm:ml-14 my-[-18px] z-20 relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E7DFD5] text-stone-600 text-xs rounded-full shadow-xs">
                    {segment.recommendedMode === 'Train' ? (
                      <Train className="w-3.5 h-3.5 text-[#2A4B6B]" />
                    ) : (
                      <Car className="w-3.5 h-3.5 text-[#B85D38]" />
                    )}
                    <span className="font-semibold text-stone-800">
                      {segment.fromName} → {segment.toName}:
                    </span>
                    <span>~{segment.distanceKm} km</span>
                    <span className="text-stone-300">•</span>
                    <span>~{segment.approxDurationHours} hrs by {segment.recommendedMode}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Approximate Disclaimer Footnote */}
      <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E7DFD5] text-[11px] text-stone-500 flex items-start gap-2">
        <span className="font-bold text-stone-700 shrink-0">Route Notice:</span>
        <span>
          Distances and transit durations are approximate planning estimates based on established National & State Highway corridors and Indian Railways schedules. Actual transit speeds depend on weather and vehicle type.
        </span>
      </div>
    </div>
  );
};
