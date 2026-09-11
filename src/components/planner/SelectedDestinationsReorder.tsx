import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Destination } from '../../types';
import {
  ChevronUp,
  ChevronDown,
  X,
  GripVertical,
  Moon,
  Plus,
  Minus,
  MapPin,
  AlertCircle,
} from 'lucide-react';

interface SelectedDestinationsReorderProps {
  destinations: Destination[];
  selectedDestinationIds: string[];
  nightsPerDestination: Record<string, number>;
  totalDays: number;
  onReorder: (newOrder: string[]) => void;
  onRemove: (destinationId: string) => void;
  onUpdateNights: (destinationId: string, nights: number) => void;
  onQuickAdd: (destinationId: string) => void;
}

export const SelectedDestinationsReorder: React.FC<SelectedDestinationsReorderProps> = ({
  destinations,
  selectedDestinationIds,
  nightsPerDestination,
  totalDays,
  onReorder,
  onRemove,
  onUpdateNights,
  onQuickAdd,
}) => {
  const moveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...selectedDestinationIds];
    const temp = newOrder[index - 1];
    newOrder[index - 1] = newOrder[index];
    newOrder[index] = temp;
    onReorder(newOrder);
  };

  const moveDown = (index: number) => {
    if (index >= selectedDestinationIds.length - 1) return;
    const newOrder = [...selectedDestinationIds];
    const temp = newOrder[index + 1];
    newOrder[index + 1] = newOrder[index];
    newOrder[index] = temp;
    onReorder(newOrder);
  };

  const totalAssignedNights = Object.values(nightsPerDestination).reduce(
    (acc: number, val: number) => acc + val,
    0
  );

  // Empty state handling
  if (selectedDestinationIds.length === 0) {
    return (
      <div className="bg-[#FAF7F2] border-2 border-dashed border-[#D6C9B9] rounded-2xl p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#F9EBE5] text-[#B85D38] flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="max-w-md mx-auto space-y-1">
          <h4 className="font-serif text-lg font-bold text-stone-900">
            No Destinations in Your Route Yet
          </h4>
          <p className="text-xs text-stone-600">
            Select at least one destination from above to begin routing, allocating nights, and generating your custom travel itinerary.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => onQuickAdd('jaipur')}
            className="px-3 py-1.5 bg-white border border-[#E7DFD5] hover:border-[#B85D38] text-xs font-semibold rounded-lg text-stone-700 shadow-sm"
          >
            + Add Jaipur
          </button>
          <button
            type="button"
            onClick={() => onQuickAdd('udaipur')}
            className="px-3 py-1.5 bg-white border border-[#E7DFD5] hover:border-[#B85D38] text-xs font-semibold rounded-lg text-stone-700 shadow-sm"
          >
            + Add Udaipur
          </button>
          <button
            type="button"
            onClick={() => onQuickAdd('jodhpur')}
            className="px-3 py-1.5 bg-white border border-[#E7DFD5] hover:border-[#B85D38] text-xs font-semibold rounded-lg text-stone-700 shadow-sm"
          >
            + Add Jodhpur
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-1">
          <h4 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
            <span>Route Sequence & Night Allocations</span>
          </h4>
          <p className="text-xs text-stone-500">
            Reorder stops with the arrows to reshape your overland journey. Adjust nights spent in each city.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 bg-white px-3 py-1.5 rounded-lg border border-[#E7DFD5]">
          <Moon className="w-3.5 h-3.5 text-[#B85D38]" />
          <span>Allocated Nights:</span>
          <span
            className={`font-bold ${
              totalAssignedNights > totalDays ? 'text-amber-700' : 'text-stone-900'
            }`}
          >
            {totalAssignedNights} of {totalDays} Days
          </span>
        </div>
      </div>

      {/* Selected Reorderable List */}
      <div className="space-y-2.5">
        <AnimatePresence initial={false}>
          {selectedDestinationIds.map((destId, index) => {
            const dest = destinations.find((d) => d.id === destId);
            if (!dest) return null;

            const nights = nightsPerDestination[destId] || 1;
            const isFirst = index === 0;
            const isLast = index === selectedDestinationIds.length - 1;

            return (
              <motion.div
                key={dest.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-[#E7DFD5] rounded-xl p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-stone-400 transition-colors"
              >
                {/* Left: Stop Index & City Info */}
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center justify-center w-8 h-8 rounded-lg bg-[#F9EBE5] text-[#B85D38] font-bold text-xs shrink-0 border border-[#F3D4C7]">
                    #{index + 1}
                  </div>

                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-stone-200">
                    <img
                      src={dest.heroImage}
                      alt={dest.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h5 className="font-serif font-bold text-stone-900 text-base leading-tight">
                      {dest.name}
                    </h5>
                    <p className="text-[11px] text-stone-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#B85D38]" />
                      <span>{dest.region} Region</span>
                      <span className="text-stone-300">•</span>
                      <span>{dest.attractions.length} Key Monuments</span>
                    </p>
                  </div>
                </div>

                {/* Right: Night Counter Stepper + Up/Down Reorder + Remove */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E7DFD5]">
                  {/* Nights Allocation Stepper */}
                  <div className="flex items-center gap-1.5 bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#E7DFD5]">
                    <span className="text-[11px] font-semibold text-stone-600 mr-1 flex items-center gap-1">
                      <Moon className="w-3 h-3 text-[#B85D38]" />
                      Nights:
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateNights(destId, Math.max(1, nights - 1))}
                      disabled={nights <= 1}
                      aria-label={`Decrease nights in ${dest.name}`}
                      className="w-7 h-7 flex items-center justify-center rounded bg-white border border-stone-300 text-stone-700 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-bold text-xs text-stone-900">
                      {nights}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateNights(destId, nights + 1)}
                      aria-label={`Increase nights in ${dest.name}`}
                      className="w-7 h-7 flex items-center justify-center rounded bg-white border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Reorder Up / Down Controls */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveUp(index)}
                      disabled={isFirst}
                      aria-label={`Move ${dest.name} earlier in route`}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-[#E7DFD5] hover:border-[#B85D38] hover:bg-[#FAF7F2] text-stone-600 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => moveDown(index)}
                      disabled={isLast}
                      aria-label={`Move ${dest.name} later in route`}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-[#E7DFD5] hover:border-[#B85D38] hover:bg-[#FAF7F2] text-stone-600 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => onRemove(destId)}
                    aria-label={`Remove ${dest.name} from trip`}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
