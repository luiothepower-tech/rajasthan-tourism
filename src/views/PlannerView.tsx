import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { tourismRepository } from '../lib/repository';
import {
  PlannerState,
  TravelStyle,
  AccommodationTier,
  TransportTier,
  FoodTier,
  ActivityTier,
  PresetCircuit,
} from '../types/planner';
import {
  loadPlannerState,
  savePlannerState,
  getDefaultPlannerState,
  balanceNights,
  computeRouteSegments,
  calculatePlannerBudget,
  generateDailyItinerary,
  generateItinerarySummaryText,
} from '../lib/plannerEngine';

import { PlannerHeader } from '../components/planner/PlannerHeader';
import { TripSetupBar } from '../components/planner/TripSetupBar';
import { DestinationSelector } from '../components/planner/DestinationSelector';
import { SelectedDestinationsReorder } from '../components/planner/SelectedDestinationsReorder';
import { RouteTimelineVisualizer } from '../components/planner/RouteTimelineVisualizer';
import { DailyItineraryView } from '../components/planner/DailyItineraryView';
import { ExperiencePicker } from '../components/planner/ExperiencePicker';
import { BudgetPlannerSection } from '../components/planner/BudgetPlannerSection';
import { ItineraryToast } from '../components/planner/ItineraryToast';
import { PrintableItinerarySummary } from '../components/planner/PrintableItinerarySummary';

export const PlannerView: React.FC = () => {
  // 1. Core Planner State
  const [plannerState, setPlannerState] = useState<PlannerState>(() => loadPlannerState());
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Synchronize SEO Meta Tags
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Itinerary & Budget Planner | Rajasthan Tourism';

    const metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content') || '';
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Design your custom Rajasthan voyage with interactive route sequencing, day-by-day pacing, and educational planning budget breakdowns.'
      );
    }

    return () => {
      document.title = originalTitle;
      if (metaDescription) {
        metaDescription.setAttribute('content', originalDescription);
      }
    };
  }, []);

  // Persist State Changes
  useEffect(() => {
    savePlannerState(plannerState);
  }, [plannerState]);

  // Support direct deep linking to Budget Calculator
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('budget')) {
        setTimeout(() => {
          const el = document.getElementById('budget-calculator');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 200);
      }
    }
  }, []);

  // Query Curated Repositories
  const allDestinations = useMemo(() => tourismRepository.getAllDestinations(), []);
  const allExperiences = useMemo(() => tourismRepository.getAllExperiences(), []);

  // Compute Route Metrics
  const { segments: routeSegments, totalDistanceKm, totalTransitHours } = useMemo(
    () => computeRouteSegments(plannerState.selectedDestinationIds, allDestinations),
    [plannerState.selectedDestinationIds, allDestinations]
  );

  // Compute Parametric Budget
  const budgetBreakdown = useMemo(
    () => calculatePlannerBudget(plannerState, totalDistanceKm),
    [plannerState, totalDistanceKm]
  );

  // Generate Daily Itinerary
  const dayPlans = useMemo(
    () => generateDailyItinerary(plannerState, allDestinations, allExperiences),
    [plannerState, allDestinations, allExperiences]
  );

  // Match selected experiences objects
  const selectedExperiences = useMemo(
    () => allExperiences.filter((e) => plannerState.selectedExperienceIds.includes(e.id)),
    [allExperiences, plannerState.selectedExperienceIds]
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // State Handlers
  const handleDurationChange = (days: number) => {
    const boundedDays = Math.max(2, Math.min(21, days));
    setPlannerState((prev) => {
      const balanced = balanceNights(prev.selectedDestinationIds, boundedDays, prev.nightsPerDestination);
      return {
        ...prev,
        durationDays: boundedDays,
        nightsPerDestination: balanced,
      };
    });
  };

  const handleTravelStyleChange = (style: TravelStyle) => {
    setPlannerState((prev) => ({
      ...prev,
      travelStyle: style,
    }));
  };

  const handleToggleDestination = (destId: string) => {
    setPlannerState((prev) => {
      const isAlreadySelected = prev.selectedDestinationIds.includes(destId);
      const newIds = isAlreadySelected
        ? prev.selectedDestinationIds.filter((id) => id !== destId)
        : [...prev.selectedDestinationIds, destId];

      const balancedNights = balanceNights(newIds, prev.durationDays, prev.nightsPerDestination);

      return {
        ...prev,
        selectedDestinationIds: newIds,
        nightsPerDestination: balancedNights,
      };
    });
  };

  const handleReorderDestinations = (newOrder: string[]) => {
    setPlannerState((prev) => ({
      ...prev,
      selectedDestinationIds: newOrder,
    }));
  };

  const handleUpdateNights = (destId: string, nights: number) => {
    setPlannerState((prev) => ({
      ...prev,
      nightsPerDestination: {
        ...prev.nightsPerDestination,
        [destId]: Math.max(1, nights),
      },
    }));
  };

  const handleToggleExperience = (expId: string) => {
    setPlannerState((prev) => {
      const isSelected = prev.selectedExperienceIds.includes(expId);
      return {
        ...prev,
        selectedExperienceIds: isSelected
          ? prev.selectedExperienceIds.filter((id) => id !== expId)
          : [...prev.selectedExperienceIds, expId],
      };
    });
  };

  const handleTravelersChange = (count: number) => {
    setPlannerState((prev) => ({
      ...prev,
      travelers: Math.max(1, Math.min(12, count)),
    }));
  };

  const handleAccommodationChange = (tier: AccommodationTier) => {
    setPlannerState((prev) => ({
      ...prev,
      accommodationTier: tier,
    }));
  };

  const handleTransportChange = (tier: TransportTier) => {
    setPlannerState((prev) => ({
      ...prev,
      transportTier: tier,
    }));
  };

  const handleFoodChange = (tier: FoodTier) => {
    setPlannerState((prev) => ({
      ...prev,
      foodTier: tier,
    }));
  };

  const handleActivityChange = (tier: ActivityTier) => {
    setPlannerState((prev) => ({
      ...prev,
      activityTier: tier,
    }));
  };

  const handleSelectPreset = (preset: PresetCircuit) => {
    const balancedNights = balanceNights(preset.destinationIds, preset.durationDays);
    setPlannerState((prev) => ({
      ...prev,
      durationDays: preset.durationDays,
      travelStyle: preset.travelStyle,
      selectedDestinationIds: preset.destinationIds,
      nightsPerDestination: balancedNights,
    }));
    showToast(`Loaded preset circuit: "${preset.name}"`);
  };

  const handleReset = () => {
    const defaultState = getDefaultPlannerState();
    setPlannerState(defaultState);
    showToast('Reset itinerary to classic Royal Heritage circuit');
  };

  const handleCopySummary = async () => {
    const summaryText = generateItinerarySummaryText(
      plannerState,
      allDestinations,
      budgetBreakdown
    );

    try {
      if (navigator?.clipboard) {
        await navigator.clipboard.writeText(summaryText);
        setCopied(true);
        showToast('Itinerary and budget summary copied to clipboard!');
        setTimeout(() => setCopied(false), 2500);
      } else {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = summaryText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        showToast('Itinerary and budget summary copied to clipboard!');
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      console.error('Failed to copy', err);
      showToast('Could not copy to clipboard. Please use Print/Save instead.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen text-stone-900 pb-24">
      {/* Printable Output for physical print & PDF generation */}
      <PrintableItinerarySummary
        state={plannerState}
        destinations={allDestinations}
        budget={budgetBreakdown}
        dayPlans={dayPlans}
        routeSegments={routeSegments}
        totalDistanceKm={totalDistanceKm}
      />

      {/* Screen Interactive UI (hidden when printing) */}
      <div className="print:hidden space-y-10">
        {/* Header & Preset Circuits */}
        <PlannerHeader
          onReset={handleReset}
          onCopySummary={handleCopySummary}
          onPrint={handlePrint}
          onSelectPreset={handleSelectPreset}
          copied={copied}
        />

        {/* Duration & Travel Style Control Bar */}
        <TripSetupBar
          durationDays={plannerState.durationDays}
          onDurationChange={handleDurationChange}
          travelStyle={plannerState.travelStyle}
          onTravelStyleChange={handleTravelStyleChange}
        />

        {/* Main Content Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section 1: Destination Selection */}
          <DestinationSelector
            destinations={allDestinations}
            selectedDestinationIds={plannerState.selectedDestinationIds}
            onToggleDestination={handleToggleDestination}
          />

          {/* Section 2: Reorder Stops & Allocate Nights */}
          <SelectedDestinationsReorder
            destinations={allDestinations}
            selectedDestinationIds={plannerState.selectedDestinationIds}
            nightsPerDestination={plannerState.nightsPerDestination}
            totalDays={plannerState.durationDays}
            onReorder={handleReorderDestinations}
            onRemove={handleToggleDestination}
            onUpdateNights={handleUpdateNights}
            onQuickAdd={handleToggleDestination}
          />

          {/* Section 3: Visual Route & Timeline Path */}
          {plannerState.selectedDestinationIds.length > 0 && (
            <RouteTimelineVisualizer
              destinationIds={plannerState.selectedDestinationIds}
              destinations={allDestinations}
              nightsPerDestination={plannerState.nightsPerDestination}
              selectedExperiences={selectedExperiences}
              routeSegments={routeSegments}
              totalDistanceKm={totalDistanceKm}
              totalTransitHours={totalTransitHours}
            />
          )}

          {/* Section 4: Day-by-Day Itinerary */}
          {dayPlans.length > 0 && (
            <DailyItineraryView dayPlans={dayPlans} />
          )}

          {/* Section 5: Experience Selection */}
          <ExperiencePicker
            experiences={allExperiences}
            selectedExperienceIds={plannerState.selectedExperienceIds}
            selectedDestinationIds={plannerState.selectedDestinationIds}
            onToggleExperience={handleToggleExperience}
          />

          {/* Section 6: Interactive Budget Planner */}
          <div id="budget-calculator" className="scroll-mt-8">
            <BudgetPlannerSection
              travelers={plannerState.travelers}
              durationDays={plannerState.durationDays}
              accommodationTier={plannerState.accommodationTier}
              transportTier={plannerState.transportTier}
              foodTier={plannerState.foodTier}
              activityTier={plannerState.activityTier}
              budgetBreakdown={budgetBreakdown}
              onTravelersChange={handleTravelersChange}
              onDurationChange={handleDurationChange}
              onDaysChange={handleDurationChange}
              onAccommodationChange={handleAccommodationChange}
              onTransportChange={handleTransportChange}
              onFoodChange={handleFoodChange}
              onActivityChange={handleActivityChange}
            />
          </div>
        </div>
      </div>

      {/* Floating Sticky Bottom Bar for Instant Overview & Mobile Usability */}
      <div className="print:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E7DFD5] py-3 px-4 sm:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-500 block">
                Estimated Planning Total
              </span>
              <span className="font-serif text-lg sm:text-2xl font-bold text-[#843B20]">
                ₹{budgetBreakdown.grandTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="hidden sm:block h-8 w-px bg-stone-200" />

            <div className="hidden sm:block">
              <span className="text-xs text-stone-500 block">
                {plannerState.durationDays} Days • {plannerState.travelers} Pax • {plannerState.selectedDestinationIds.length} Cities
              </span>
              <span className="text-xs font-semibold text-stone-800">
                ₹{budgetBreakdown.perPersonTotal.toLocaleString('en-IN')} / person
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#budget-calculator"
              className="px-3 sm:px-4 py-2 bg-[#FAF7F2] border border-[#E7DFD5] hover:border-[#B85D38] text-stone-700 text-xs font-semibold rounded-lg transition-colors"
            >
              View Breakdown
            </a>

            <button
              type="button"
              onClick={handleCopySummary}
              className="px-3 sm:px-4 py-2 bg-[#B85D38] hover:bg-[#9E4A2A] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
            >
              {copied ? 'Copied!' : 'Copy Plan'}
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Toast Notification */}
      <ItineraryToast message={toastMessage} />
    </div>
  );
};
