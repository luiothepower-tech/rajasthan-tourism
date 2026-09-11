import React from 'react';
import { PlannerState, PlannerBudgetBreakdown, DayPlan, RouteSegment } from '../../types/planner';
import { Destination } from '../../types';
import { BUDGET_CONFIG } from '../../data/budgetConfig';

interface PrintableItinerarySummaryProps {
  state: PlannerState;
  destinations: Destination[];
  budget: PlannerBudgetBreakdown;
  dayPlans: DayPlan[];
  routeSegments: RouteSegment[];
  totalDistanceKm: number;
}

export const PrintableItinerarySummary: React.FC<PrintableItinerarySummaryProps> = ({
  state,
  destinations,
  budget,
  dayPlans,
  routeSegments,
  totalDistanceKm,
}) => {
  const formatINR = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  const destNames = state.selectedDestinationIds
    .map((id) => destinations.find((d) => d.id === id)?.name || id)
    .join(' → ');

  return (
    <div className="hidden print:block p-8 bg-white text-stone-900 font-sans space-y-6">
      {/* Print Header */}
      <div className="border-b-2 border-stone-800 pb-4 flex items-end justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest text-stone-500 font-bold block">
            Official Voyage Dossier
          </span>
          <h1 className="font-serif text-3xl font-bold text-stone-950">
            Rajasthan Tourism Custom Journey
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            {state.durationDays}-Day {state.travelStyle} Circuit: {destNames}
          </p>
        </div>
        <div className="text-right text-xs text-stone-500">
          <p>Generated via Rajasthan Tourism Planner</p>
          <p>Travelers: {state.travelers} Pax</p>
        </div>
      </div>

      {/* Specifications Grid */}
      <div className="grid grid-cols-4 gap-4 p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs">
        <div>
          <span className="font-bold text-stone-600 block">Duration</span>
          <span className="text-stone-900 font-semibold">{state.durationDays} Days / {Math.max(1, state.durationDays - 1)} Nights</span>
        </div>
        <div>
          <span className="font-bold text-stone-600 block">Travel Style</span>
          <span className="text-stone-900 font-semibold">{state.travelStyle}</span>
        </div>
        <div>
          <span className="font-bold text-stone-600 block">Accommodation Tier</span>
          <span className="text-stone-900 font-semibold">{BUDGET_CONFIG.accommodation[state.accommodationTier].label}</span>
        </div>
        <div>
          <span className="font-bold text-stone-600 block">Transport Mode</span>
          <span className="text-stone-900 font-semibold">{BUDGET_CONFIG.transport[state.transportTier].label}</span>
        </div>
      </div>

      {/* Route Overview */}
      <div className="space-y-2">
        <h2 className="font-serif text-lg font-bold border-b border-stone-200 pb-1">
          Route & Night Allocations (~{totalDistanceKm} km total overland transit)
        </h2>
        <div className="grid grid-cols-4 gap-2 text-xs">
          {state.selectedDestinationIds.map((id, idx) => {
            const dest = destinations.find((d) => d.id === id);
            const nights = state.nightsPerDestination[id] || 1;
            return (
              <div key={id} className="p-2 border border-stone-200 rounded">
                <span className="font-bold text-stone-500 block">Stop #{idx + 1}</span>
                <span className="font-bold text-stone-900">{dest?.name || id}</span>
                <span className="text-stone-600 block">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Estimated Planning Budget Table */}
      <div className="space-y-2">
        <h2 className="font-serif text-lg font-bold border-b border-stone-200 pb-1">
          Estimated Planning Budget ({state.travelers} Travelers)
        </h2>
        <table className="w-full text-left text-xs border-collapse border border-stone-200">
          <thead>
            <tr className="bg-stone-100">
              <th className="p-2 border border-stone-200">Category</th>
              <th className="p-2 border border-stone-200">Basis</th>
              <th className="p-2 border border-stone-200 text-right">Estimate (INR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-stone-200 font-semibold">Accommodation</td>
              <td className="p-2 border border-stone-200">{budget.roomCount} Rooms × {state.durationDays} Nights ({BUDGET_CONFIG.accommodation[state.accommodationTier].label})</td>
              <td className="p-2 border border-stone-200 text-right">{formatINR(budget.accommodationTotal)}</td>
            </tr>
            <tr>
              <td className="p-2 border border-stone-200 font-semibold">Transport & Transit</td>
              <td className="p-2 border border-stone-200">{BUDGET_CONFIG.transport[state.transportTier].label}</td>
              <td className="p-2 border border-stone-200 text-right">{formatINR(budget.transportTotal)}</td>
            </tr>
            <tr>
              <td className="p-2 border border-stone-200 font-semibold">Food & Regional Dining</td>
              <td className="p-2 border border-stone-200">{BUDGET_CONFIG.food[state.foodTier].label}</td>
              <td className="p-2 border border-stone-200 text-right">{formatINR(budget.foodTotal)}</td>
            </tr>
            <tr>
              <td className="p-2 border border-stone-200 font-semibold">Monument Entries & Experiences</td>
              <td className="p-2 border border-stone-200">Base access passes + selected cultural experiences</td>
              <td className="p-2 border border-stone-200 text-right">{formatINR(budget.experiencesTotal)}</td>
            </tr>
            <tr>
              <td className="p-2 border border-stone-200 font-semibold">Contingency Buffer (8%)</td>
              <td className="p-2 border border-stone-200">Recommended incidental reserves & tipping</td>
              <td className="p-2 border border-stone-200 text-right">{formatINR(budget.miscellaneousTotal)}</td>
            </tr>
            <tr className="bg-stone-100 font-bold">
              <td className="p-2 border border-stone-200" colSpan={2}>
                Total Estimated Planning Budget ({formatINR(budget.perPersonTotal)} per traveler)
              </td>
              <td className="p-2 border border-stone-200 text-right text-base">
                {formatINR(budget.grandTotal)}
              </td>
            </tr>
          </tbody>
        </table>
        <p className="text-[10px] text-stone-500 italic mt-1">
          * Disclaimer: DEMO / ESTIMATED VALUES. {budget.disclaimer} All figures are illustrative planning estimates for itinerary preparation and not live reservation prices.
        </p>
      </div>

      {/* Day-by-Day Outline */}
      <div className="space-y-3 pt-2">
        <h2 className="font-serif text-lg font-bold border-b border-stone-200 pb-1">
          Daily Itinerary Pacing
        </h2>
        <div className="space-y-2 text-xs">
          {dayPlans.map((day) => (
            <div key={day.dayNumber} className="border-b border-stone-100 pb-2">
              <span className="font-bold text-stone-900 block">
                Day {day.dayNumber} — {day.destinationName} ({day.themeTitle})
              </span>
              <div className="grid grid-cols-3 gap-2 text-[11px] text-stone-600 mt-1">
                {day.activities.map((act) => (
                  <div key={act.id}>
                    <span className="font-semibold text-stone-800">[{act.period}]</span> {act.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
