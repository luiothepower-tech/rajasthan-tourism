/**
 * Rajasthan Tourism — Budget & Circuit Planning Configuration
 * Phase 6: Transparent Planning Estimates
 * 
 * Centralized rate cards and route distance matrix.
 * Note: All rates are illustrative demo estimates for planning purposes.
 */

import { TravelStyle, AccommodationTier, TransportTier, FoodTier, ActivityTier, PresetCircuit } from '../types/planner';

export const BUDGET_CONFIG = {
  currency: 'INR',
  currencySymbol: '₹',

  // Accommodation rates (per room per night)
  accommodation: {
    budget: {
      ratePerRoomPerNight: 1800,
      label: 'Budget Homestay',
      description: 'Authentic heritage guesthouses, clean haveli homestays, and boutique dharamsalas.',
      starRating: '2★ - 3★ equivalent',
    },
    comfortable: {
      ratePerRoomPerNight: 5500,
      label: 'Heritage Haveli',
      description: 'Restored royal havelis, boutique heritage properties, and premier 4★ hotels.',
      starRating: '4★ heritage boutique',
    },
    premium: {
      ratePerRoomPerNight: 22000,
      label: 'Royal Palace Suite',
      description: 'Authentic Maharaja palaces, luxury tented desert pavilions, and 5★ grand hotels.',
      starRating: '5★ Luxury Palace',
    },
  },

  // Transport rates
  transport: {
    shared: {
      ratePerPersonPerDay: 650,
      label: 'Train & Shared Transit',
      description: 'Indian Railways Express (AC 3-Tier/2-Tier) and deluxe state coach connectivity.',
      mode: 'Train / Public',
    },
    mixed: {
      ratePerDayGroup: 1800,
      label: 'Express Train + Cabs',
      description: 'Inter-city express trains paired with local pre-paid cabs and auto-rickshaws in each city.',
      mode: 'Train + Local Taxi',
    },
    private: {
      ratePerDayGroup: 3800,
      label: 'Private Chauffeur Car',
      description: 'Dedicated air-conditioned Sedan/Innova SUV with an experienced desert highway driver.',
      mode: 'Dedicated Chauffeur Car',
    },
  },

  // Food rates (per person per day)
  food: {
    budget: {
      ratePerPersonPerDay: 550,
      label: 'Local Thalis & Street Eats',
      description: 'Traditional Marwari thali houses, famous kachori & mirchi bada stalls, and sweet shops.',
    },
    standard: {
      ratePerPersonPerDay: 1500,
      label: 'Authentic Restaurants',
      description: 'Curated heritage dining rooms, lake-view rooftop cafes, and regional specialty restaurants.',
    },
    premium: {
      ratePerPersonPerDay: 3800,
      label: 'Royal Palace Feasts',
      description: 'Fine-dining royal thals, palace courtyard candlelit dinners, and private culinary tastings.',
    },
  },

  // Activities & Monuments base rates (per person per day)
  activities: {
    low: {
      ratePerPersonPerDay: 400,
      label: 'Self-Guided & Monuments',
      description: 'Standard fort & palace entry tickets with audio guides and self-paced walking.',
    },
    moderate: {
      ratePerPersonPerDay: 1200,
      label: 'Guided Tours & Entry',
      description: 'Entry fees, palace museum passes, boat cruises, and certified local monument guides.',
    },
    high: {
      ratePerPersonPerDay: 2600,
      label: 'VIP & Immersive Culture',
      description: 'Private heritage historians, artisan workshops, cultural shows, and desert excursions.',
    },
  },

  // Additional experience specific pricing (per traveler)
  experienceCostMap: {
    'exp-thar-stargaze': 3200,
    'exp-lake-pichola-boat': 850,
    'exp-blue-city-walk': 950,
    'exp-block-print-workshop': 1500,
    'exp-stepwell-geometry': 800,
    'exp-royal-culinary-feast': 2400,
  } as Record<string, number>,

  // Miscellaneous buffer percentage (for tipping, local handicrafts, hydration, tolls)
  miscellaneousBufferPercentage: 0.08,

  disclaimerText:
    'Figures are illustrative estimates for planning purposes and may vary by season, peak festival dates, and specific booking selections.',
};

/**
 * Inter-city travel distance & transit matrix across all 8 featured destinations
 */
export const RAJASTHAN_DISTANCE_MATRIX: Record<
  string,
  Record<string, { distanceKm: number; approxDurationHours: number; mode: 'Car' | 'Train' | 'Bus' }>
> = {
  jaipur: {
    pushkar: { distanceKm: 145, approxDurationHours: 2.5, mode: 'Car' },
    jodhpur: { distanceKm: 335, approxDurationHours: 5.0, mode: 'Train' },
    udaipur: { distanceKm: 395, approxDurationHours: 6.5, mode: 'Train' },
    jaisalmer: { distanceKm: 560, approxDurationHours: 9.0, mode: 'Train' },
    bikaner: { distanceKm: 335, approxDurationHours: 5.5, mode: 'Train' },
    chittorgarh: { distanceKm: 310, approxDurationHours: 5.0, mode: 'Car' },
    'mount-abu': { distanceKm: 490, approxDurationHours: 8.0, mode: 'Train' },
  },
  pushkar: {
    jaipur: { distanceKm: 145, approxDurationHours: 2.5, mode: 'Car' },
    jodhpur: { distanceKm: 190, approxDurationHours: 3.5, mode: 'Car' },
    udaipur: { distanceKm: 280, approxDurationHours: 5.0, mode: 'Car' },
    bikaner: { distanceKm: 250, approxDurationHours: 4.5, mode: 'Car' },
    chittorgarh: { distanceKm: 215, approxDurationHours: 4.0, mode: 'Car' },
    jaisalmer: { distanceKm: 450, approxDurationHours: 7.5, mode: 'Car' },
    'mount-abu': { distanceKm: 380, approxDurationHours: 6.5, mode: 'Car' },
  },
  jodhpur: {
    jaipur: { distanceKm: 335, approxDurationHours: 5.0, mode: 'Train' },
    pushkar: { distanceKm: 190, approxDurationHours: 3.5, mode: 'Car' },
    jaisalmer: { distanceKm: 285, approxDurationHours: 4.5, mode: 'Train' },
    udaipur: { distanceKm: 255, approxDurationHours: 5.0, mode: 'Car' },
    bikaner: { distanceKm: 250, approxDurationHours: 4.5, mode: 'Train' },
    'mount-abu': { distanceKm: 260, approxDurationHours: 4.5, mode: 'Car' },
    chittorgarh: { distanceKm: 320, approxDurationHours: 5.5, mode: 'Car' },
  },
  jaisalmer: {
    jodhpur: { distanceKm: 285, approxDurationHours: 4.5, mode: 'Train' },
    bikaner: { distanceKm: 330, approxDurationHours: 5.5, mode: 'Car' },
    jaipur: { distanceKm: 560, approxDurationHours: 9.0, mode: 'Train' },
    pushkar: { distanceKm: 450, approxDurationHours: 7.5, mode: 'Car' },
    udaipur: { distanceKm: 490, approxDurationHours: 8.5, mode: 'Car' },
    chittorgarh: { distanceKm: 540, approxDurationHours: 9.0, mode: 'Car' },
    'mount-abu': { distanceKm: 440, approxDurationHours: 7.5, mode: 'Car' },
  },
  udaipur: {
    chittorgarh: { distanceKm: 115, approxDurationHours: 2.0, mode: 'Car' },
    'mount-abu': { distanceKm: 165, approxDurationHours: 3.5, mode: 'Car' },
    jodhpur: { distanceKm: 255, approxDurationHours: 5.0, mode: 'Car' },
    pushkar: { distanceKm: 280, approxDurationHours: 5.0, mode: 'Car' },
    jaipur: { distanceKm: 395, approxDurationHours: 6.5, mode: 'Train' },
    bikaner: { distanceKm: 490, approxDurationHours: 8.5, mode: 'Car' },
    jaisalmer: { distanceKm: 490, approxDurationHours: 8.5, mode: 'Car' },
  },
  chittorgarh: {
    udaipur: { distanceKm: 115, approxDurationHours: 2.0, mode: 'Car' },
    jaipur: { distanceKm: 310, approxDurationHours: 5.0, mode: 'Car' },
    pushkar: { distanceKm: 215, approxDurationHours: 4.0, mode: 'Car' },
    jodhpur: { distanceKm: 320, approxDurationHours: 5.5, mode: 'Car' },
    'mount-abu': { distanceKm: 280, approxDurationHours: 5.0, mode: 'Car' },
    bikaner: { distanceKm: 420, approxDurationHours: 7.0, mode: 'Train' },
    jaisalmer: { distanceKm: 540, approxDurationHours: 9.0, mode: 'Car' },
  },
  bikaner: {
    jodhpur: { distanceKm: 250, approxDurationHours: 4.5, mode: 'Train' },
    jaisalmer: { distanceKm: 330, approxDurationHours: 5.5, mode: 'Car' },
    jaipur: { distanceKm: 335, approxDurationHours: 5.5, mode: 'Train' },
    pushkar: { distanceKm: 250, approxDurationHours: 4.5, mode: 'Car' },
    udaipur: { distanceKm: 490, approxDurationHours: 8.5, mode: 'Car' },
    chittorgarh: { distanceKm: 420, approxDurationHours: 7.0, mode: 'Train' },
    'mount-abu': { distanceKm: 510, approxDurationHours: 8.5, mode: 'Train' },
  },
  'mount-abu': {
    udaipur: { distanceKm: 165, approxDurationHours: 3.5, mode: 'Car' },
    jodhpur: { distanceKm: 260, approxDurationHours: 4.5, mode: 'Car' },
    chittorgarh: { distanceKm: 280, approxDurationHours: 5.0, mode: 'Car' },
    pushkar: { distanceKm: 380, approxDurationHours: 6.5, mode: 'Car' },
    jaipur: { distanceKm: 490, approxDurationHours: 8.0, mode: 'Train' },
    bikaner: { distanceKm: 510, approxDurationHours: 8.5, mode: 'Train' },
    jaisalmer: { distanceKm: 440, approxDurationHours: 7.5, mode: 'Car' },
  },
};

/**
 * Pre-defined curated circuits that users can instantly load
 */
export const PRESET_CIRCUITS: PresetCircuit[] = [
  {
    id: 'circuit-royal-triangle',
    name: 'The Royal Triangle',
    durationDays: 7,
    travelStyle: 'Royal',
    destinationIds: ['jaipur', 'jodhpur', 'udaipur'],
    description: 'The premier classic circuit linking the Pink City, the Blue Citadel, and the City of Lakes.',
  },
  {
    id: 'circuit-desert-forts',
    name: 'Desert Citadels & Caravans',
    durationDays: 8,
    travelStyle: 'Desert',
    destinationIds: ['jaipur', 'bikaner', 'jaisalmer', 'jodhpur'],
    description: 'Venture deep into Thar dunes, living golden fortress ramparts, and camel country.',
  },
  {
    id: 'circuit-heritage-lakes',
    name: 'Mewar Heritage & Hill Retreat',
    durationDays: 6,
    travelStyle: 'Heritage',
    destinationIds: ['jaipur', 'pushkar', 'chittorgarh', 'udaipur'],
    description: 'Explore holy lakes, monumental hill forts, and serene Aravalli palace shores.',
  },
  {
    id: 'circuit-romantic-slow',
    name: 'Slow Travel & Mountain Breeze',
    durationDays: 7,
    travelStyle: 'Slow Travel',
    destinationIds: ['udaipur', 'chittorgarh', 'mount-abu'],
    description: 'Gentle pacing across Southern Rajasthan with marble temples, misty hills, and lake breezes.',
  },
];
