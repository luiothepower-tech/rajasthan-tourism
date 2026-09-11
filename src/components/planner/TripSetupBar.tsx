import React from 'react';
import {
  Clock,
  Compass,
  Landmark,
  Crown,
  Sun,
  Palette,
  Utensils,
  Trees,
  Footprints,
  Flame,
} from 'lucide-react';
import { TravelStyle } from '../../types/planner';

interface TripSetupBarProps {
  durationDays: number;
  onDurationChange: (days: number) => void;
  travelStyle: TravelStyle;
  onTravelStyleChange: (style: TravelStyle) => void;
}

const DURATION_PRESETS = [2, 3, 5, 7, 10, 14];

const TRAVEL_STYLES: {
  id: TravelStyle;
  label: string;
  icon: React.ReactNode;
  subtitle: string;
}[] = [
  {
    id: 'Royal',
    label: 'Royal',
    icon: <Crown className="w-4 h-4" />,
    subtitle: 'Palace suites, vintage cars & courtyard dinners',
  },
  {
    id: 'Heritage',
    label: 'Heritage',
    icon: <Landmark className="w-4 h-4" />,
    subtitle: 'Medieval forts, stepwells & architectural history',
  },
  {
    id: 'Desert',
    label: 'Desert',
    icon: <Sun className="w-4 h-4" />,
    subtitle: 'Thar sand dunes, camel safaris & campfire folk song',
  },
  {
    id: 'Culture',
    label: 'Culture',
    icon: <Palette className="w-4 h-4" />,
    subtitle: 'Block-print artisans, perfume alleys & vibrant bazaars',
  },
  {
    id: 'Food',
    label: 'Food',
    icon: <Utensils className="w-4 h-4" />,
    subtitle: 'Royal thals, spicy mirchi badas & sweet ghevar trails',
  },
  {
    id: 'Nature',
    label: 'Nature',
    icon: <Trees className="w-4 h-4" />,
    subtitle: 'Aravalli mountain ridges, quiet lakes & hill stations',
  },
  {
    id: 'Adventure',
    label: 'Adventure',
    icon: <Flame className="w-4 h-4" />,
    subtitle: 'Dune expeditions, desert night trails & fort treks',
  },
  {
    id: 'Slow Travel',
    label: 'Slow Travel',
    icon: <Footprints className="w-4 h-4" />,
    subtitle: 'Unrushed haveli stays, artisan talks & sunset ghats',
  },
];

export const TripSetupBar: React.FC<TripSetupBarProps> = ({
  durationDays,
  onDurationChange,
  travelStyle,
  onTravelStyleChange,
}) => {
  return (
    <section className="w-full bg-white border-b border-[#E7DFD5] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Step 1: Trip Duration */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#B85D38] text-white flex items-center justify-center text-xs font-bold">
                1
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                Choose Trip Duration
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-500">Active Duration:</span>
              <span className="px-3 py-1 bg-[#F9EBE5] text-[#B85D38] font-bold text-sm rounded-md border border-[#F3D4C7]">
                {durationDays} Days / {Math.max(1, durationDays - 1)} Nights
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Quick Duration Preset Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {DURATION_PRESETS.map((days) => {
                const isSelected = durationDays === days;
                return (
                  <button
                    key={days}
                    type="button"
                    onClick={() => onDurationChange(days)}
                    aria-pressed={isSelected}
                    className={`min-h-[44px] px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all border ${
                      isSelected
                        ? 'bg-[#B85D38] text-white border-[#B85D38] shadow-sm'
                        : 'bg-white text-stone-700 border-[#E7DFD5] hover:border-[#B85D38] hover:bg-stone-50'
                    } focus-visible:ring-2 focus-visible:ring-[#B85D38]`}
                  >
                    {days} Days
                  </button>
                );
              })}
            </div>

            {/* Custom Range Slider for Granular Days */}
            <div className="flex-1 max-w-md bg-[#FAF7F2] p-3 rounded-lg border border-[#E7DFD5] flex items-center gap-4">
              <Clock className="w-4 h-4 text-stone-400 shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-stone-600">
                  <span>Custom Duration</span>
                  <span className="text-[#B85D38]">{durationDays} Days</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={21}
                  value={durationDays}
                  onChange={(e) => onDurationChange(Number(e.target.value))}
                  aria-label="Custom duration in days"
                  className="w-full accent-[#B85D38] cursor-pointer h-2 bg-stone-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-stone-400">
                  <span>2d (Weekend)</span>
                  <span>7d (Classic)</span>
                  <span>21d (Grand Odyssey)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Travel Style */}
        <div className="space-y-4 pt-4 border-t border-[#E7DFD5]/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#B85D38] text-white flex items-center justify-center text-xs font-bold">
                2
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                Select Travel Style
              </h2>
            </div>
            <span className="text-xs text-stone-500">
              Adapts recommended pacing, highlight experiences & lodging suggestions
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {TRAVEL_STYLES.map((style) => {
              const isSelected = travelStyle === style.id;
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => onTravelStyleChange(style.id)}
                  aria-pressed={isSelected}
                  className={`min-h-[72px] p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    isSelected
                      ? 'bg-[#F9EBE5] border-[#B85D38] ring-2 ring-[#B85D38]/30 shadow-sm'
                      : 'bg-white border-[#E7DFD5] hover:border-stone-400 hover:bg-[#FAF7F2]'
                  } focus-visible:ring-2 focus-visible:ring-[#B85D38]`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`p-1.5 rounded-lg ${
                        isSelected
                          ? 'bg-[#B85D38] text-white'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {style.icon}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#B85D38]" />
                    )}
                  </div>
                  <div>
                    <h4
                      className={`text-xs font-bold truncate mt-2 ${
                        isSelected ? 'text-[#843B20]' : 'text-stone-900'
                      }`}
                    >
                      {style.label}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
