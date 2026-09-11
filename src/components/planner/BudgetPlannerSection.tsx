import React from 'react';
import {
  PlannerBudgetBreakdown,
  AccommodationTier,
  TransportTier,
  FoodTier,
  ActivityTier,
} from '../../types/planner';
import { BUDGET_CONFIG } from '../../data/budgetConfig';
import {
  Users,
  Calendar,
  Building,
  Car,
  Utensils,
  Ticket,
  ShieldAlert,
  Info,
  ChevronRight,
  Sparkles,
  PieChart,
  Plus,
  Minus,
  Check,
  Coins,
  CreditCard,
  Layers,
} from 'lucide-react';
import { ResetTripButton } from './ResetTripButton';

export interface BudgetPlannerSectionProps {
  travelers: number;
  durationDays: number;
  accommodationTier: AccommodationTier;
  transportTier: TransportTier;
  foodTier?: FoodTier;
  activityTier?: ActivityTier;
  budgetBreakdown: PlannerBudgetBreakdown;
  onTravelersChange: (count: number) => void;
  onDurationChange?: (days: number) => void;
  onDaysChange?: (days: number) => void;
  onAccommodationChange: (tier: AccommodationTier) => void;
  onTransportChange: (tier: TransportTier) => void;
  onFoodChange?: (tier: FoodTier) => void;
  onActivityChange?: (tier: ActivityTier) => void;
  onReset?: () => void;
  className?: string;
}

const TRAVELER_PRESETS = [
  { count: 1, label: 'Solo', tag: '1 Pax' },
  { count: 2, label: 'Couple', tag: '2 Pax' },
  { count: 4, label: 'Family', tag: '4 Pax' },
  { count: 6, label: 'Group', tag: '6 Pax' },
];

const DURATION_PRESETS = [3, 5, 7, 10, 14];

/**
 * Localized Indian currency formatter
 * Correctly formats Indian Rupee values with lakh/crore commas (e.g. ₹1,24,500)
 */
export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

export const BudgetPlannerSection: React.FC<BudgetPlannerSectionProps> = ({
  travelers,
  durationDays,
  accommodationTier,
  transportTier,
  foodTier = 'standard',
  activityTier = 'moderate',
  budgetBreakdown,
  onTravelersChange,
  onDurationChange,
  onDaysChange,
  onAccommodationChange,
  onTransportChange,
  onFoodChange,
  onActivityChange,
  onReset,
  className = '',
}) => {
  const handleDaysUpdate = (days: number) => {
    const clamped = Math.max(2, Math.min(21, days));
    if (onDurationChange) onDurationChange(clamped);
    if (onDaysChange) onDaysChange(clamped);
  };

  const handleTravelersUpdate = (count: number) => {
    const clamped = Math.max(1, Math.min(12, count));
    onTravelersChange(clamped);
  };

  const perDayPerPerson =
    travelers > 0 && durationDays > 0
      ? Math.round(budgetBreakdown.grandTotal / (travelers * durationDays))
      : 0;

  return (
    <section
      id="budget-planner"
      aria-labelledby="budget-planner-heading"
      className={`bg-white border border-[#E7DFD5] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm space-y-8 ${className}`}
    >
      {/* 1. Header & Live Cost Metric Cards */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#E7DFD5] pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F9EBE5] rounded-full text-xs font-bold uppercase tracking-wider text-[#B85D38] border border-[#F3D4C7]">
            <PieChart className="w-3.5 h-3.5" />
            <span>Interactive Cost Architect</span>
          </div>
          <h3
            id="budget-planner-heading"
            className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight"
          >
            Premium Budget Planner
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <p className="text-sm text-stone-600 max-w-2xl leading-relaxed">
              Configure travelers, voyage duration, accommodation class, and transit style to calculate transparent, real-time trip cost estimates formatted in Indian Rupees.
            </p>
            {onReset && (
              <div className="shrink-0">
                <ResetTripButton
                  onReset={onReset}
                  variant="compact"
                  label="Reset Trip"
                />
              </div>
            )}
          </div>
        </div>

        {/* Live Estimation Hero Card */}
        <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#E7DFD5] shadow-xs flex flex-wrap sm:flex-nowrap items-center gap-6 shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-stone-500 text-xs font-semibold uppercase tracking-wider">
              <Coins className="w-3.5 h-3.5 text-[#B85D38]" />
              <span>Estimated Total ({durationDays}d • {travelers} pax)</span>
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#843B20] mt-1 tracking-tight">
              {formatINR(budgetBreakdown.grandTotal)}
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Includes lodging, transit, food & reserves
            </p>
          </div>

          <div className="hidden sm:block h-12 w-px bg-[#D6C9B9]" />

          <div className="space-y-1">
            <span className="text-stone-500 text-xs font-semibold uppercase tracking-wider block">
              Per Traveler
            </span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-stone-800 block">
              {formatINR(budgetBreakdown.perPersonTotal)}
            </span>
            <span className="text-[11px] font-medium text-stone-500 block">
              ~{formatINR(perDayPerPerson)} / day
            </span>
          </div>
        </div>
      </div>

      {/* 2. Core Interactive Parameter Controls */}
      <div className="space-y-8">
        {/* Row A: Travelers & Days Controls (Key Inputs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* A1: Travelers Interactive Control */}
          <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E7DFD5] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#B85D38] text-white flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <label className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#B85D38]" />
                  <span>Number of Travelers</span>
                </label>
              </div>

              {/* Stepper Control */}
              <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-[#E7DFD5]">
                <button
                  type="button"
                  onClick={() => handleTravelersUpdate(travelers - 1)}
                  disabled={travelers <= 1}
                  aria-label="Decrease travelers"
                  className="w-8 h-8 rounded-md flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-bold text-sm text-stone-900">
                  {travelers}
                </span>
                <button
                  type="button"
                  onClick={() => handleTravelersUpdate(travelers + 1)}
                  disabled={travelers >= 12}
                  aria-label="Increase travelers"
                  className="w-8 h-8 rounded-md flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="grid grid-cols-4 gap-2">
              {TRAVELER_PRESETS.map((preset) => {
                const isSelected = travelers === preset.count;
                return (
                  <button
                    key={preset.count}
                    type="button"
                    onClick={() => handleTravelersUpdate(preset.count)}
                    aria-pressed={isSelected}
                    className={`min-h-[44px] py-2 px-2 rounded-xl text-xs font-semibold flex flex-col items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-[#B85D38] text-white border-[#B85D38] shadow-xs'
                        : 'bg-white text-stone-700 border-[#E7DFD5] hover:bg-stone-50 hover:border-stone-400'
                    } focus-visible:ring-2 focus-visible:ring-[#B85D38]`}
                  >
                    <span>{preset.label}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-stone-400'}`}>
                      {preset.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] text-stone-600 flex items-center justify-between pt-1">
              <span>Room allocation basis:</span>
              <span className="font-bold text-[#843B20]">
                {budgetBreakdown.roomCount} Double-Occupancy Room(s)
              </span>
            </div>
          </div>

          {/* A2: Days Interactive Control */}
          <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E7DFD5] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#B85D38] text-white flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <label className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#B85D38]" />
                  <span>Trip Duration (Days)</span>
                </label>
              </div>

              {/* Stepper Control */}
              <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-[#E7DFD5]">
                <button
                  type="button"
                  onClick={() => handleDaysUpdate(durationDays - 1)}
                  disabled={durationDays <= 2}
                  aria-label="Decrease trip days"
                  className="w-8 h-8 rounded-md flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center font-bold text-sm text-stone-900">
                  {durationDays}d
                </span>
                <button
                  type="button"
                  onClick={() => handleDaysUpdate(durationDays + 1)}
                  disabled={durationDays >= 21}
                  aria-label="Increase trip days"
                  className="w-8 h-8 rounded-md flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Days Preset Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {DURATION_PRESETS.map((days) => {
                const isSelected = durationDays === days;
                return (
                  <button
                    key={days}
                    type="button"
                    onClick={() => handleDaysUpdate(days)}
                    aria-pressed={isSelected}
                    className={`min-h-[44px] flex-1 min-w-[54px] py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-[#B85D38] text-white border-[#B85D38] shadow-xs'
                        : 'bg-white text-stone-700 border-[#E7DFD5] hover:bg-stone-50 hover:border-stone-400'
                    } focus-visible:ring-2 focus-visible:ring-[#B85D38]`}
                  >
                    {days} Days
                  </button>
                );
              })}
            </div>

            {/* Range Slider */}
            <div className="space-y-1 pt-1">
              <input
                type="range"
                min={2}
                max={21}
                value={durationDays}
                onChange={(e) => handleDaysUpdate(Number(e.target.value))}
                aria-label="Trip duration slider in days"
                className="w-full accent-[#B85D38] cursor-pointer h-2 bg-stone-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-400">
                <span>2 Days (Weekend)</span>
                <span>7 Days (Classic)</span>
                <span>21 Days (Grand Tour)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row B: Accommodation Tier (Interactive Cards) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#B85D38] text-white flex items-center justify-center text-xs font-bold">
                3
              </span>
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-[#B85D38]" />
                <span>Accommodation Grade</span>
              </h4>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              Basis: {budgetBreakdown.roomCount} room(s) × {durationDays} nights
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['budget', 'comfortable', 'premium'] as AccommodationTier[]).map((tier) => {
              const info = BUDGET_CONFIG.accommodation[tier];
              const isSelected = accommodationTier === tier;
              const subtotalForTier =
                info.ratePerRoomPerNight * budgetBreakdown.roomCount * durationDays;

              return (
                <button
                  key={tier}
                  type="button"
                  onClick={() => onAccommodationChange(tier)}
                  aria-pressed={isSelected}
                  className={`p-5 rounded-2xl text-left border transition-all flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-[#F9EBE5] border-[#B85D38] ring-2 ring-[#B85D38]/30 shadow-sm'
                      : 'bg-white border-[#E7DFD5] hover:border-stone-400 hover:bg-[#FAF7F2]'
                  } focus-visible:ring-2 focus-visible:ring-[#B85D38]`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-700">
                        {info.starRating}
                      </span>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-[#B85D38] text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>

                    <h5 className="font-serif text-lg font-bold text-stone-900">
                      {info.label}
                    </h5>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {info.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E7DFD5] flex items-end justify-between">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                        Rate per Night
                      </span>
                      <span className="font-bold text-sm text-stone-900">
                        {formatINR(info.ratePerRoomPerNight)}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                        Est. Lodging
                      </span>
                      <span className="font-serif font-bold text-base text-[#843B20]">
                        {formatINR(subtotalForTier)}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row C: Transport Style (Interactive Cards) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#B85D38] text-white flex items-center justify-center text-xs font-bold">
                4
              </span>
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                <Car className="w-4 h-4 text-[#B85D38]" />
                <span>Transport & Highway Mobility</span>
              </h4>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              Basis: {durationDays} days connectivity
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['shared', 'mixed', 'private'] as TransportTier[]).map((tier) => {
              const isSelected = transportTier === tier;
              let mode = '';
              let label = '';
              let description = '';
              let rateLabel = '';
              let estSubtotal = 0;

              if (tier === 'shared') {
                const conf = BUDGET_CONFIG.transport.shared;
                mode = conf.mode;
                label = conf.label;
                description = conf.description;
                rateLabel = `${formatINR(conf.ratePerPersonPerDay)}/pax/day`;
                estSubtotal = conf.ratePerPersonPerDay * travelers * durationDays;
              } else if (tier === 'mixed') {
                const conf = BUDGET_CONFIG.transport.mixed;
                mode = conf.mode;
                label = conf.label;
                description = conf.description;
                rateLabel = `${formatINR(conf.ratePerDayGroup)}/vehicle/day`;
                estSubtotal = conf.ratePerDayGroup * durationDays;
              } else {
                const conf = BUDGET_CONFIG.transport.private;
                mode = conf.mode;
                label = conf.label;
                description = conf.description;
                rateLabel = `${formatINR(conf.ratePerDayGroup)}/vehicle/day`;
                estSubtotal = conf.ratePerDayGroup * durationDays;
              }

              return (
                <button
                  key={tier}
                  type="button"
                  onClick={() => onTransportChange(tier)}
                  aria-pressed={isSelected}
                  className={`p-5 rounded-2xl text-left border transition-all flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-[#F9EBE5] border-[#B85D38] ring-2 ring-[#B85D38]/30 shadow-sm'
                      : 'bg-white border-[#E7DFD5] hover:border-stone-400 hover:bg-[#FAF7F2]'
                  } focus-visible:ring-2 focus-visible:ring-[#B85D38]`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-700">
                        {mode}
                      </span>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-[#B85D38] text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>

                    <h5 className="font-serif text-lg font-bold text-stone-900">
                      {label}
                    </h5>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E7DFD5] flex items-end justify-between">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                        Cost Model
                      </span>
                      <span className="font-semibold text-xs text-stone-800">
                        {rateLabel}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                        Est. Transit
                      </span>
                      <span className="font-serif font-bold text-base text-[#843B20]">
                        {formatINR(estSubtotal)}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row D: Regional Dining & Activity Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Dining */}
          {onFoodChange && (
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E7DFD5] space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#B85D38] text-white flex items-center justify-center text-xs font-bold">
                  5
                </span>
                <label className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-[#B85D38]" />
                  <span>Culinary & Food Style</span>
                </label>
              </div>

              <div className="space-y-1.5">
                {(['budget', 'standard', 'premium'] as FoodTier[]).map((tier) => {
                  const info = BUDGET_CONFIG.food[tier];
                  const isSelected = foodTier === tier;
                  return (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => onFoodChange(tier)}
                      aria-pressed={isSelected}
                      className={`w-full min-h-[44px] py-2 px-3 rounded-xl text-left border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-white border-[#B85D38] ring-1 ring-[#B85D38] shadow-2xs'
                          : 'bg-white/80 border-[#E7DFD5] hover:border-stone-400'
                      } focus-visible:ring-2 focus-visible:ring-[#B85D38]`}
                    >
                      <div>
                        <span className="text-xs font-bold text-stone-900 block">
                          {info.label}
                        </span>
                        <span className="text-[10px] text-stone-500">
                          ~{formatINR(info.ratePerPersonPerDay)} / day / traveler
                        </span>
                      </div>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#B85D38]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Activities */}
          {onActivityChange && (
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E7DFD5] space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#B85D38] text-white flex items-center justify-center text-xs font-bold">
                  6
                </span>
                <label className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                  <Ticket className="w-4 h-4 text-[#B85D38]" />
                  <span>Monuments & Activities Grade</span>
                </label>
              </div>

              <div className="space-y-1.5">
                {(['low', 'moderate', 'high'] as ActivityTier[]).map((tier) => {
                  const info = BUDGET_CONFIG.activities[tier];
                  const isSelected = activityTier === tier;
                  return (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => onActivityChange(tier)}
                      aria-pressed={isSelected}
                      className={`w-full min-h-[44px] py-2 px-3 rounded-xl text-left border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-white border-[#B85D38] ring-1 ring-[#B85D38] shadow-2xs'
                          : 'bg-white/80 border-[#E7DFD5] hover:border-stone-400'
                      } focus-visible:ring-2 focus-visible:ring-[#B85D38]`}
                    >
                      <div>
                        <span className="text-xs font-bold text-stone-900 block">
                          {info.label}
                        </span>
                        <span className="text-[10px] text-stone-500">
                          ~{formatINR(info.ratePerPersonPerDay)} / day / traveler
                        </span>
                      </div>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#B85D38]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Visual Proportional Breakdown Bar */}
      <div className="space-y-3 pt-6 border-t border-[#E7DFD5]">
        <div className="flex items-center justify-between text-xs font-bold text-stone-700">
          <span>Proportional Category Breakdown</span>
          <span className="text-stone-500 font-normal">
            Calculated across all planning categories
          </span>
        </div>

        {/* Multi-segmented color bar */}
        <div className="w-full h-3 rounded-full overflow-hidden flex bg-stone-200">
          <div
            style={{ width: `${budgetBreakdown.categoryPercentages.accommodation}%` }}
            className="bg-[#843B20] transition-all duration-500"
            title={`Lodging: ${budgetBreakdown.categoryPercentages.accommodation}%`}
          />
          <div
            style={{ width: `${budgetBreakdown.categoryPercentages.transport}%` }}
            className="bg-[#2A4B6B] transition-all duration-500"
            title={`Transport: ${budgetBreakdown.categoryPercentages.transport}%`}
          />
          <div
            style={{ width: `${budgetBreakdown.categoryPercentages.food}%` }}
            className="bg-[#B45309] transition-all duration-500"
            title={`Food: ${budgetBreakdown.categoryPercentages.food}%`}
          />
          <div
            style={{ width: `${budgetBreakdown.categoryPercentages.experiences}%` }}
            className="bg-emerald-700 transition-all duration-500"
            title={`Experiences: ${budgetBreakdown.categoryPercentages.experiences}%`}
          />
          <div
            style={{ width: `${budgetBreakdown.categoryPercentages.miscellaneous}%` }}
            className="bg-stone-500 transition-all duration-500"
            title={`Contingency Buffer: ${budgetBreakdown.categoryPercentages.miscellaneous}%`}
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-[11px] text-stone-600 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#843B20]" />
            <span>Lodging ({budgetBreakdown.categoryPercentages.accommodation}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2A4B6B]" />
            <span>Transport ({budgetBreakdown.categoryPercentages.transport}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />
            <span>Dining ({budgetBreakdown.categoryPercentages.food}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
            <span>Experiences ({budgetBreakdown.categoryPercentages.experiences}%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-500" />
            <span>Misc Buffer ({budgetBreakdown.categoryPercentages.miscellaneous}%)</span>
          </div>
        </div>
      </div>

      {/* 4. Itemized Calculation Breakdown Table */}
      <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#E7DFD5] space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#B85D38]" />
            <span>Itemized Formula Breakdown</span>
          </h4>
          <span className="text-[11px] text-stone-500">
            All values in Indian Rupees (INR)
          </span>
        </div>

        <div className="divide-y divide-[#E7DFD5] text-xs">
          {/* Accommodation Line */}
          <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <span className="font-semibold text-stone-900 text-sm">
                Accommodation ({budgetBreakdown.roomCount} room(s) × {durationDays} nights)
              </span>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {BUDGET_CONFIG.accommodation[accommodationTier].label} ({BUDGET_CONFIG.accommodation[accommodationTier].starRating}) @ {formatINR(budgetBreakdown.ratesApplied.roomRatePerNight)} per room/night
              </p>
            </div>
            <span className="font-bold text-sm text-stone-900 self-start sm:self-auto">
              {formatINR(budgetBreakdown.accommodationTotal)}
            </span>
          </div>

          {/* Transport Line */}
          <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <span className="font-semibold text-stone-900 text-sm">
                Transit & Highway Mobility ({durationDays} days)
              </span>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {BUDGET_CONFIG.transport[transportTier].label} • {BUDGET_CONFIG.transport[transportTier].mode}
              </p>
            </div>
            <span className="font-bold text-sm text-stone-900 self-start sm:self-auto">
              {formatINR(budgetBreakdown.transportTotal)}
            </span>
          </div>

          {/* Dining Line */}
          <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <span className="font-semibold text-stone-900 text-sm">
                Meals & Regional Gastronomy ({travelers} travelers × {durationDays} days)
              </span>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {BUDGET_CONFIG.food[foodTier].label} @ {formatINR(budgetBreakdown.ratesApplied.foodRatePerDay)} / traveler / day
              </p>
            </div>
            <span className="font-bold text-sm text-stone-900 self-start sm:self-auto">
              {formatINR(budgetBreakdown.foodTotal)}
            </span>
          </div>

          {/* Experiences Line */}
          <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <span className="font-semibold text-stone-900 text-sm">
                Monument Entry & Curated Experiences
              </span>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Base heritage passes + special selected cultural excursions for {travelers} traveler(s)
              </p>
            </div>
            <span className="font-bold text-sm text-stone-900 self-start sm:self-auto">
              {formatINR(budgetBreakdown.experiencesTotal)}
            </span>
          </div>

          {/* Contingency Line */}
          <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <span className="font-semibold text-stone-900 text-sm">
                Contingency & Incidentals Buffer (8%)
              </span>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Reserves for guide tipping, local artisan handicrafts, hydration & local auto-rickshaws
              </p>
            </div>
            <span className="font-bold text-sm text-stone-900 self-start sm:self-auto">
              {formatINR(budgetBreakdown.miscellaneousTotal)}
            </span>
          </div>
        </div>

        {/* Grand Total Summary Callout */}
        <div className="pt-4 border-t-2 border-[#D6C9B9] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-sm sm:text-base font-bold text-stone-900">
              Total Estimated Planning Budget:
            </span>
            <span className="text-xs text-stone-500 block">
              Equates to {formatINR(budgetBreakdown.perPersonTotal)} per traveler for {travelers} pax across {durationDays} days
            </span>
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-[#843B20]">
            {formatINR(budgetBreakdown.grandTotal)}
          </span>
        </div>
      </div>

      {/* 5. Mandatory Disclaimer Box */}
      <div className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-[#B85D38] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h5 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
            DEMO / ESTIMATED VALUES — NOT LIVE BOOKING PRICES
          </h5>
          <p className="text-xs text-stone-600 leading-relaxed">
            All figures shown above are strictly <strong>DEMO / ESTIMATED VALUES</strong> calculated for educational planning and orientation purposes. {budgetBreakdown.disclaimer} Figures may vary according to travel season, hotel inventory, fuel fluctuations, local taxes (GST), and seasonal festive surcharges upon actual reservation.
          </p>
        </div>
      </div>
    </section>
  );
};

// Export alias for flexible imports
export const PremiumBudgetPlanner = BudgetPlannerSection;
