import React, { useState } from 'react';
import { DayPlan } from '../../types/planner';
import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Sunrise,
  Sun,
  Sunset,
  Sparkles,
  MapPin,
  Compass,
} from 'lucide-react';

interface DailyItineraryViewProps {
  dayPlans: DayPlan[];
}

export const DailyItineraryView: React.FC<DailyItineraryViewProps> = ({ dayPlans }) => {
  const [expandedDayNumbers, setExpandedDayNumbers] = useState<number[]>([1, 2]);

  const toggleDay = (dayNum: number) => {
    setExpandedDayNumbers((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  const expandAll = () => {
    setExpandedDayNumbers(dayPlans.map((d) => d.dayNumber));
  };

  const collapseAll = () => {
    setExpandedDayNumbers([]);
  };

  if (dayPlans.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#B85D38] text-white flex items-center justify-center text-xs font-bold">
              4
            </span>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Daily Itinerary Breakdown
            </h3>
          </div>
          <p className="text-sm text-stone-600 mt-1">
            Carefully curated pacing across morning explorations, cultural afternoons, and evening sunsets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="px-3 py-1.5 bg-white border border-[#E7DFD5] hover:border-[#B85D38] text-stone-700 text-xs font-semibold rounded-lg shadow-xs"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="px-3 py-1.5 bg-white border border-[#E7DFD5] hover:border-[#B85D38] text-stone-700 text-xs font-semibold rounded-lg shadow-xs"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Days Stack */}
      <div className="space-y-4">
        {dayPlans.map((day) => {
          const isExpanded = expandedDayNumbers.includes(day.dayNumber);

          return (
            <div
              key={day.dayNumber}
              className="bg-white border border-[#E7DFD5] rounded-2xl overflow-hidden shadow-xs transition-all hover:border-stone-400"
            >
              {/* Day Header Accordion Toggle */}
              <button
                type="button"
                onClick={() => toggleDay(day.dayNumber)}
                aria-expanded={isExpanded}
                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left bg-gradient-to-r from-white to-[#FAF7F2] hover:bg-stone-50 transition-colors focus-visible:ring-2 focus-visible:ring-[#B85D38]"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#F9EBE5] text-[#843B20] flex flex-col items-center justify-center font-bold shrink-0 border border-[#F3D4C7]">
                    <span className="text-[10px] uppercase tracking-wider text-stone-500">Day</span>
                    <span className="text-sm leading-none">
                      {day.dayNumber < 10 ? `0${day.dayNumber}` : day.dayNumber}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900 truncate">
                        {day.themeTitle}
                      </h4>
                      <span className="px-2 py-0.5 bg-white border border-[#E7DFD5] text-[10px] font-bold text-[#B85D38] rounded-md shrink-0">
                        {day.destinationName}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 truncate mt-0.5">
                      {day.daySummary}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 p-1 rounded-lg text-stone-400">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-stone-700" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-stone-700" />
                  )}
                </div>
              </button>

              {/* Day Activities Expansion Content */}
              {isExpanded && (
                <div className="p-5 border-t border-[#E7DFD5] bg-[#FAF7F2]/50 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {day.activities.map((act) => {
                      return (
                        <div
                          key={act.id}
                          className="bg-white p-4 rounded-xl border border-[#E7DFD5] space-y-2.5 flex flex-col justify-between shadow-2xs"
                        >
                          <div className="space-y-2">
                            {/* Time Period Tag */}
                            <div className="flex items-center justify-between">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                  act.period === 'Morning'
                                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                    : act.period === 'Afternoon'
                                    ? 'bg-orange-50 text-orange-800 border border-orange-200'
                                    : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                                }`}
                              >
                                {act.period === 'Morning' && <Sunrise className="w-3 h-3" />}
                                {act.period === 'Afternoon' && <Sun className="w-3 h-3" />}
                                {act.period === 'Evening' && <Sunset className="w-3 h-3" />}
                                <span>{act.period}</span>
                              </span>

                              <span className="text-[10px] text-stone-400 font-semibold">
                                {act.category}
                              </span>
                            </div>

                            <h5 className="font-serif font-bold text-stone-900 text-sm leading-snug">
                              {act.title}
                            </h5>

                            <p className="text-xs text-stone-600 leading-relaxed">
                              {act.description}
                            </p>
                          </div>

                          {act.attractionOrExperienceName && (
                            <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-[#B85D38] font-medium">
                              <Sparkles className="w-3 h-3 shrink-0" />
                              <span className="truncate">{act.attractionOrExperienceName}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Daily Plan Note */}
      <div className="text-center py-2">
        <p className="text-xs text-stone-500 italic">
          * Illustrative pacing model based on recommended opening hours, desert heat management, and optimal sunset viewpoints.
        </p>
      </div>
    </div>
  );
};
