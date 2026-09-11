/**
 * Rajasthan Tourism — Planner & Budget Domain Models
 * Phase 6: Interactive Itinerary & Budget Planner
 */

export type TravelStyle =
  | 'Heritage'
  | 'Royal'
  | 'Desert'
  | 'Culture'
  | 'Food'
  | 'Nature'
  | 'Adventure'
  | 'Slow Travel';

export type AccommodationTier = 'budget' | 'comfortable' | 'premium';
export type TransportTier = 'shared' | 'mixed' | 'private';
export type FoodTier = 'budget' | 'standard' | 'premium';
export type ActivityTier = 'low' | 'moderate' | 'high';

export interface PlannerState {
  durationDays: number;
  travelStyle: TravelStyle;
  selectedDestinationIds: string[];
  nightsPerDestination: Record<string, number>;
  selectedExperienceIds: string[];
  travelers: number;
  accommodationTier: AccommodationTier;
  transportTier: TransportTier;
  foodTier: FoodTier;
  activityTier: ActivityTier;
}

export interface RouteSegment {
  fromId: string;
  toId: string;
  fromName: string;
  toName: string;
  distanceKm: number;
  approxDurationHours: number;
  recommendedMode: 'Car' | 'Train' | 'Bus';
}

export interface DailyActivity {
  id: string;
  period: 'Morning' | 'Afternoon' | 'Evening';
  title: string;
  description: string;
  category: 'Heritage' | 'Palace' | 'Culture' | 'Culinary' | 'Nature' | 'Bazaar' | 'Experience';
  attractionOrExperienceName?: string;
}

export interface DayPlan {
  dayNumber: number;
  destinationId: string;
  destinationName: string;
  themeTitle: string;
  activities: DailyActivity[];
  daySummary: string;
}

export interface PlannerBudgetBreakdown {
  accommodationTotal: number;
  foodTotal: number;
  transportTotal: number;
  experiencesTotal: number;
  miscellaneousTotal: number;
  grandTotal: number;
  perPersonTotal: number;
  roomCount: number;
  categoryPercentages: {
    accommodation: number;
    food: number;
    transport: number;
    experiences: number;
    miscellaneous: number;
  };
  ratesApplied: {
    roomRatePerNight: number;
    foodRatePerDay: number;
    transportRateDaily: number;
    activityRateDaily: number;
    additionalExperiencesCost: number;
  };
  disclaimer: string;
}

export interface PresetCircuit {
  id: string;
  name: string;
  durationDays: number;
  travelStyle: TravelStyle;
  destinationIds: string[];
  description: string;
}
