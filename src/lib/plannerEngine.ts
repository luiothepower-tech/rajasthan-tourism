/**
 * Rajasthan Tourism — Planner & Budget Calculation Engine
 * Phase 6: Interactive Engine & Route Optimizer
 */

import {
  PlannerState,
  PlannerBudgetBreakdown,
  RouteSegment,
  DayPlan,
  DailyActivity,
  TravelStyle,
} from '../types/planner';
import { Destination, Experience } from '../types';
import { BUDGET_CONFIG, RAJASTHAN_DISTANCE_MATRIX, PRESET_CIRCUITS } from '../data/budgetConfig';

const STORAGE_KEY = 'rajasthan_planner_state_v1';

/**
 * Returns a sensible, balanced default planner state
 */
export function getDefaultPlannerState(): PlannerState {
  return {
    durationDays: 7,
    travelStyle: 'Royal',
    selectedDestinationIds: ['jaipur', 'jodhpur', 'udaipur'],
    nightsPerDestination: {
      jaipur: 2,
      jodhpur: 2,
      udaipur: 3,
    },
    selectedExperienceIds: ['exp-lake-pichola-boat', 'exp-blue-city-walk'],
    travelers: 2,
    accommodationTier: 'comfortable',
    transportTier: 'private',
    foodTier: 'standard',
    activityTier: 'moderate',
  };
}

const VALID_DEST_IDS = new Set([
  'jaipur',
  'jodhpur',
  'udaipur',
  'jaisalmer',
  'pushkar',
  'chittorgarh',
  'bikaner',
  'mount-abu',
]);

const VALID_ACCOM_TIERS = new Set(['budget', 'comfortable', 'heritage_luxury', 'royal_palace']);
const VALID_TRANS_TIERS = new Set(['shared', 'mixed', 'private']);
const VALID_FOOD_TIERS = new Set(['budget', 'standard', 'fine_dining']);
const VALID_ACT_TIERS = new Set(['light', 'moderate', 'immersive']);
const VALID_STYLES = new Set(['Royal', 'Heritage', 'Desert', 'Spiritual', 'Relaxed']);

/**
 * Loads and defensively sanitizes planner state from localStorage
 */
export function loadPlannerState(): PlannerState {
  if (typeof window === 'undefined') return getDefaultPlannerState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultPlannerState();
    const parsed = JSON.parse(raw);

    if (typeof parsed !== 'object' || parsed === null) {
      return getDefaultPlannerState();
    }

    const defaultState = getDefaultPlannerState();

    // Sanitize destination IDs
    let selectedDestinationIds: string[] = defaultState.selectedDestinationIds;
    if (Array.isArray(parsed.selectedDestinationIds)) {
      const filtered = parsed.selectedDestinationIds.filter(
        (id: unknown): id is string => typeof id === 'string' && VALID_DEST_IDS.has(id)
      );
      if (filtered.length > 0) {
        selectedDestinationIds = filtered;
      }
    }

    // Sanitize duration days
    const durationDays =
      typeof parsed.durationDays === 'number' && !isNaN(parsed.durationDays)
        ? Math.max(2, Math.min(21, Math.round(parsed.durationDays)))
        : defaultState.durationDays;

    // Sanitize travelers
    const travelers =
      typeof parsed.travelers === 'number' && !isNaN(parsed.travelers)
        ? Math.max(1, Math.min(12, Math.round(parsed.travelers)))
        : defaultState.travelers;

    // Sanitize tiers
    const accommodationTier = VALID_ACCOM_TIERS.has(parsed.accommodationTier)
      ? parsed.accommodationTier
      : defaultState.accommodationTier;

    const transportTier = VALID_TRANS_TIERS.has(parsed.transportTier)
      ? parsed.transportTier
      : defaultState.transportTier;

    const foodTier = VALID_FOOD_TIERS.has(parsed.foodTier)
      ? parsed.foodTier
      : defaultState.foodTier;

    const activityTier = VALID_ACT_TIERS.has(parsed.activityTier)
      ? parsed.activityTier
      : defaultState.activityTier;

    const travelStyle = VALID_STYLES.has(parsed.travelStyle)
      ? parsed.travelStyle
      : defaultState.travelStyle;

    // Sanitize experience IDs
    const selectedExperienceIds = Array.isArray(parsed.selectedExperienceIds)
      ? parsed.selectedExperienceIds.filter((id: unknown): id is string => typeof id === 'string')
      : defaultState.selectedExperienceIds;

    // Balance nights
    const nightsPerDestination = balanceNights(
      selectedDestinationIds,
      durationDays,
      typeof parsed.nightsPerDestination === 'object' && parsed.nightsPerDestination !== null
        ? parsed.nightsPerDestination
        : undefined
    );

    return {
      durationDays,
      travelStyle,
      selectedDestinationIds,
      nightsPerDestination,
      selectedExperienceIds,
      travelers,
      accommodationTier,
      transportTier,
      foodTier,
      activityTier,
    };
  } catch (err) {
    console.warn('Could not parse stored planner state, safely resetting to default.', err);
  }
  return getDefaultPlannerState();
}

/**
 * Saves planner state safely to localStorage
 */
export function savePlannerState(state: PlannerState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('Could not persist planner state.', err);
  }
}

/**
 * Clears stored planner state from localStorage and returns fresh default state
 */
export function clearStoredPlannerState(): PlannerState {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn('Could not clear stored planner state.', err);
    }
  }
  const defaultState = getDefaultPlannerState();
  savePlannerState(defaultState);
  return defaultState;
}

/**
 * Automatically allocates nights across selected destinations to match total durationDays
 */
export function balanceNights(
  destinationIds: string[],
  totalDays: number,
  existingNights?: Record<string, number>
): Record<string, number> {
  const count = destinationIds.length;
  if (count === 0) return {};

  const result: Record<string, number> = {};
  const baseNights = Math.floor(totalDays / count);
  let remainder = totalDays % count;

  destinationIds.forEach((id) => {
    // If existing night allocation exists and is reasonable, we respect weighting if possible
    let nights = baseNights;
    if (remainder > 0) {
      nights += 1;
      remainder -= 1;
    }
    result[id] = Math.max(1, nights);
  });

  return result;
}

/**
 * Computes inter-city route segments and distances between consecutive stops
 */
export function computeRouteSegments(
  destinationIds: string[],
  destinations: Destination[]
): {
  segments: RouteSegment[];
  totalDistanceKm: number;
  totalTransitHours: number;
} {
  if (destinationIds.length < 2) {
    return { segments: [], totalDistanceKm: 0, totalTransitHours: 0 };
  }

  const segments: RouteSegment[] = [];
  let totalDistanceKm = 0;
  let totalTransitHours = 0;

  for (let i = 0; i < destinationIds.length - 1; i++) {
    const fromId = destinationIds[i];
    const toId = destinationIds[i + 1];

    const fromDest = destinations.find((d) => d.id === fromId);
    const toDest = destinations.find((d) => d.id === toId);

    const fromName = fromDest ? fromDest.name : fromId;
    const toName = toDest ? toDest.name : toId;

    // Check distance matrix
    const matrixEntry =
      RAJASTHAN_DISTANCE_MATRIX[fromId]?.[toId] ||
      RAJASTHAN_DISTANCE_MATRIX[toId]?.[fromId];

    const distanceKm = matrixEntry ? matrixEntry.distanceKm : 240;
    const approxDurationHours = matrixEntry ? matrixEntry.approxDurationHours : 4.0;
    const recommendedMode = matrixEntry ? matrixEntry.mode : 'Car';

    segments.push({
      fromId,
      toId,
      fromName,
      toName,
      distanceKm,
      approxDurationHours,
      recommendedMode,
    });

    totalDistanceKm += distanceKm;
    totalTransitHours += approxDurationHours;
  }

  return { segments, totalDistanceKm, totalTransitHours };
}

/**
 * Calculates a transparent, parametric budget breakdown
 */
export function calculatePlannerBudget(
  state: PlannerState,
  routeDistanceKm: number
): PlannerBudgetBreakdown {
  const days = Math.max(1, state.durationDays);
  const travelers = Math.max(1, state.travelers);
  const roomCount = Math.ceil(travelers / 2);

  // 1. Accommodation
  const accomConfig = BUDGET_CONFIG.accommodation[state.accommodationTier] || BUDGET_CONFIG.accommodation.comfortable;
  const roomRate = accomConfig.ratePerRoomPerNight;
  const accommodationTotal = roomRate * roomCount * days;

  // 2. Transport
  let transportTotal = 0;
  let transportRateDaily = 0;
  if (state.transportTier === 'shared') {
    transportRateDaily = BUDGET_CONFIG.transport.shared.ratePerPersonPerDay;
    transportTotal = transportRateDaily * travelers * days;
  } else if (state.transportTier === 'mixed') {
    transportRateDaily = BUDGET_CONFIG.transport.mixed.ratePerDayGroup;
    transportTotal = transportRateDaily * days;
  } else {
    // Private car (default fallback): base rate with slight scale for long routes if over 1,000 km
    transportRateDaily = BUDGET_CONFIG.transport.private.ratePerDayGroup;
    const routeBonus = routeDistanceKm > 1000 ? Math.round((routeDistanceKm - 1000) * 12) : 0;
    transportTotal = transportRateDaily * days + routeBonus;
  }

  // 3. Food
  const foodConfig = BUDGET_CONFIG.food[state.foodTier] || BUDGET_CONFIG.food.standard;
  const foodRate = foodConfig.ratePerPersonPerDay;
  const foodTotal = foodRate * travelers * days;

  // 4. Experiences & Activities
  const activityConfig = BUDGET_CONFIG.activities[state.activityTier] || BUDGET_CONFIG.activities.moderate;
  const activityRate = activityConfig.ratePerPersonPerDay;
  const baseActivitiesTotal = activityRate * travelers * days;

  // Additional selected experiences fee
  let additionalExperiencesCost = 0;
  state.selectedExperienceIds.forEach((expId) => {
    const cost = BUDGET_CONFIG.experienceCostMap[expId] || 1000;
    additionalExperiencesCost += cost * travelers;
  });

  const experiencesTotal = baseActivitiesTotal + additionalExperiencesCost;

  // 5. Miscellaneous buffer (8%)
  const subtotal = accommodationTotal + transportTotal + foodTotal + experiencesTotal;
  const miscellaneousTotal = Math.round(subtotal * BUDGET_CONFIG.miscellaneousBufferPercentage);

  const grandTotal = subtotal + miscellaneousTotal;
  const perPersonTotal = Math.round(grandTotal / travelers);

  // Calculate percentages
  const safeTotal = grandTotal > 0 ? grandTotal : 1;
  const categoryPercentages = {
    accommodation: Math.round((accommodationTotal / safeTotal) * 100),
    transport: Math.round((transportTotal / safeTotal) * 100),
    food: Math.round((foodTotal / safeTotal) * 100),
    experiences: Math.round((experiencesTotal / safeTotal) * 100),
    miscellaneous: Math.round((miscellaneousTotal / safeTotal) * 100),
  };

  return {
    accommodationTotal,
    transportTotal,
    foodTotal,
    experiencesTotal,
    miscellaneousTotal,
    grandTotal,
    perPersonTotal,
    roomCount,
    categoryPercentages,
    ratesApplied: {
      roomRatePerNight: roomRate,
      foodRatePerDay: foodRate,
      transportRateDaily,
      activityRateDaily: activityRate,
      additionalExperiencesCost,
    },
    disclaimer: BUDGET_CONFIG.disclaimerText,
  };
}

/**
 * Generates an illustrative, structured day-by-day itinerary
 */
export function generateDailyItinerary(
  state: PlannerState,
  destinations: Destination[],
  allExperiences: Experience[]
): DayPlan[] {
  const { selectedDestinationIds, durationDays, nightsPerDestination } = state;
  if (selectedDestinationIds.length === 0) return [];

  const dayPlans: DayPlan[] = [];
  let currentDay = 1;

  selectedDestinationIds.forEach((destId, destIndex) => {
    const dest = destinations.find((d) => d.id === destId);
    if (!dest) return;

    // Nights in this destination
    const nights = nightsPerDestination[destId] || 1;
    const destExperiences = allExperiences.filter(
      (exp) =>
        exp.destinationIds.includes(destId) &&
        state.selectedExperienceIds.includes(exp.id)
    );

    for (let night = 1; night <= nights && currentDay <= durationDays; night++) {
      const isFirstDayInCity = night === 1;
      const isTransitDay = destIndex > 0 && isFirstDayInCity;

      const activities: DailyActivity[] = [];
      const attractions = dest.attractions || [];

      // Morning Activity
      if (isTransitDay) {
        activities.push({
          id: `act-${currentDay}-morn`,
          period: 'Morning',
          title: `Inter-city Transit to ${dest.name}`,
          description: `Scenic departure through the rural Aravalli landscape and arrival in ${dest.name}. Check-in and refreshment at your heritage quarters.`,
          category: 'Heritage',
        });
      } else {
        const topAttraction = attractions[0];
        activities.push({
          id: `act-${currentDay}-morn`,
          period: 'Morning',
          title: topAttraction ? `${topAttraction.name} & Monument Exploration` : 'Morning Heritage Walk',
          description: topAttraction
            ? topAttraction.description.slice(0, 140) + '...'
            : `Discover the monumental stone architecture and early morning vistas of ${dest.name}.`,
          category: 'Palace',
          attractionOrExperienceName: topAttraction?.name,
        });
      }

      // Afternoon Activity
      const secondAttraction = attractions[1] || attractions[0];
      activities.push({
        id: `act-${currentDay}-aft`,
        period: 'Afternoon',
        title: secondAttraction ? `${secondAttraction.name} & Stepwells` : 'Local Crafts & Haveli Quarters',
        description: secondAttraction
          ? secondAttraction.description.slice(0, 140) + '...'
          : `Explore local courtyards, stone carvings, and shaded haveli alleys with regional sweet delicacies.`,
        category: 'Heritage',
        attractionOrExperienceName: secondAttraction?.name,
      });

      // Evening Activity
      // Check if user selected a custom experience matching this city
      const matchedExp = destExperiences[night - 1];
      if (matchedExp) {
        activities.push({
          id: `act-${currentDay}-eve`,
          period: 'Evening',
          title: matchedExp.title,
          description: matchedExp.description,
          category: 'Experience',
          attractionOrExperienceName: matchedExp.title,
        });
      } else {
        activities.push({
          id: `act-${currentDay}-eve`,
          period: 'Evening',
          title: `${dest.name} Sunset Vistas & Authentic Cuisine`,
          description: `Evening golden hour views over lakes or bastions, followed by an authentic Rajasthani dinner featuring regional specialties.`,
          category: 'Culinary',
        });
      }

      dayPlans.push({
        dayNumber: currentDay,
        destinationId: dest.id,
        destinationName: dest.name,
        themeTitle: `Day ${currentDay}: ${dest.name} — ${isFirstDayInCity ? 'Grand Arrival & Palaces' : 'Living Culture & Artisans'}`,
        daySummary: `Explore ${dest.name} highlights with focused heritage discovery, authentic meals, and evening twilight views.`,
        activities,
      });

      currentDay++;
    }
  });

  // Safety: If durationDays exceeds the sum of nights due to state edge cases, fill remaining days
  const lastDest = destinations.find((d) => d.id === selectedDestinationIds[selectedDestinationIds.length - 1]);
  while (currentDay <= durationDays && lastDest) {
    dayPlans.push({
      dayNumber: currentDay,
      destinationId: lastDest.id,
      destinationName: lastDest.name,
      themeTitle: `Day ${currentDay}: ${lastDest.name} — Leisure & Cultural Immersion`,
      daySummary: `Savor unhurried exploration of local bazaars, heritage artisan havelis, and sunset vistas in ${lastDest.name}.`,
      activities: [
        {
          id: `act-${currentDay}-morn`,
          period: 'Morning',
          title: 'Artisan Quarters & Morning Bazaars',
          description: `Stroll through traditional craft markets, viewing gemstone cutters, block printers, and brass craftsmen at work.`,
          category: 'Heritage',
        },
        {
          id: `act-${currentDay}-aft`,
          period: 'Afternoon',
          title: 'Culinary Sampling & Leisure Haveli Visits',
          description: `Enjoy authentic midday snacks, traditional chai, and shaded courtyards in historic haveli quarters.`,
          category: 'Culinary',
        },
        {
          id: `act-${currentDay}-eve`,
          period: 'Evening',
          title: 'Twilight Reflections & Farewell Dinner',
          description: `Golden hour panoramic viewpoints followed by a celebratory Rajasthani thali dinner.`,
          category: 'Culinary',
        },
      ],
    });
    currentDay++;
  }

  return dayPlans;
}

/**
 * Generates a clean, shareable plain-text summary suitable for copying to clipboard
 */
export function generateItinerarySummaryText(
  state: PlannerState,
  destinations: Destination[],
  budget: PlannerBudgetBreakdown
): string {
  const destNames = state.selectedDestinationIds
    .map((id) => destinations.find((d) => d.id === id)?.name || id)
    .join(' → ');

  return `
========================================
RAJASTHAN TOURISM — CUSTOM ITINERARY
========================================
Trip Title: ${state.durationDays}-Day ${state.travelStyle} Odyssey
Route: ${destNames}
Duration: ${state.durationDays} Days | Travelers: ${state.travelers} Pax

STYLE & TIERS:
- Travel Style: ${state.travelStyle}
- Lodging: ${(BUDGET_CONFIG.accommodation[state.accommodationTier] || BUDGET_CONFIG.accommodation.comfortable).label}
- Transport: ${(BUDGET_CONFIG.transport[state.transportTier] || BUDGET_CONFIG.transport.private).label}
- Dining: ${(BUDGET_CONFIG.food[state.foodTier] || BUDGET_CONFIG.food.standard).label}
- Activities: ${(BUDGET_CONFIG.activities[state.activityTier] || BUDGET_CONFIG.activities.moderate).label}

ESTIMATED PLANNING BUDGET:
- Total Estimated Budget: ₹${budget.grandTotal.toLocaleString('en-IN')}
- Per Person Estimate: ₹${budget.perPersonTotal.toLocaleString('en-IN')}
- Accommodation (${budget.roomCount} Rooms): ₹${budget.accommodationTotal.toLocaleString('en-IN')}
- Transport: ₹${budget.transportTotal.toLocaleString('en-IN')}
- Dining: ₹${budget.foodTotal.toLocaleString('en-IN')}
- Experiences & Monument Passes: ₹${budget.experiencesTotal.toLocaleString('en-IN')}
- Miscellaneous Buffer (8%): ₹${budget.miscellaneousTotal.toLocaleString('en-IN')}

*Disclaimer: ${budget.disclaimer}
Built on Rajasthan Tourism Planner
========================================
`.trim();
}
