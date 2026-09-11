/**
 * Rajasthan Tourism — Core TypeScript Domain Models
 * Phase 1: Foundation & Data Architecture
 */

export type RegionCategory =
  | 'Dhundhar'    // Jaipur, Amer, Dausa
  | 'Mewar'       // Udaipur, Chittorgarh, Kumbhalgarh
  | 'Marwar'      // Jodhpur, Mandore
  | 'Thar'        // Jaisalmer, Barmer
  | 'Shekhawati'  // Mandawa, Nawalgarh
  | 'Hadoti'      // Kota, Bundi, Jhalawar
  | 'Bikaner'     // Bikaner, Deshnoke
  | 'Sirohi';     // Mount Abu

export type TravelSeason = 'Winter (Peak)' | 'Monsoon (Lush)' | 'Summer (Shoulder)';

export type BudgetTier = 'budget' | 'midRange' | 'luxury';

export interface GeoCoordinates {
  lat: number;
  lng: number;
  /** Normalized SVG map coordinates for the custom vector map canvas (viewBox 0 0 800 650) */
  svgX: number;
  svgY: number;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  focalPoint?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  caption?: string;
}

export interface Attraction {
  id: string;
  name: string;
  hindiName?: string;
  description: string;
  image: string;
  category: 'Fort' | 'Palace' | 'Stepwell' | 'Temple' | 'Bazaar' | 'Museum' | 'Lake' | 'Nature';
  location: string;
  timings?: string;
  recommendedDuration?: string;
  architecturalStyle?: string;
  builtYear?: string;
  bestVisitingTime?: string;
  entryFee?: string;
  editorialTip?: string;
  highlights?: string[];
}

export interface Experience {
  id: string;
  slug?: string;
  title: string;
  hindiTitle?: string;
  description: string;
  image: string;
  destinationIds: string[];
  category: 'Heritage' | 'Desert' | 'Culinary' | 'Art & Craft' | 'Wildlife' | 'Spiritual';
  duration: string;
  tags: string[];
  locationSummary?: string;
  bestSeason?: string;
  whatToExpect?: string[];
  practicalTips?: string[];
  relatedExperienceIds?: string[];
}

export interface Food {
  id: string;
  slug?: string;
  name: string;
  hindiName?: string;
  description: string;
  image: string;
  region: RegionCategory;
  category: 'Main Course' | 'Snack & Street Food' | 'Sweet / Mithai' | 'Bread & Accompaniment';
  destinationIds: string[];
  tasteProfile: string;
  culturalStory: string;
  keyIngredients?: string[];
  servingRitual?: string;
  visitorExperience?: string;
  relatedDishIds?: string[];
}

export interface Festival {
  id: string;
  slug?: string;
  name: string;
  hindiName?: string;
  description: string;
  approximateMonth: string;
  location: string;
  destinationIds: string[];
  image: string;
  culturalContext: string;
  highlights: string[];
  majorActivities?: string[];
  visitorGuide?: string;
  bestTimeOfDay?: string;
  relatedFestivalIds?: string[];
}

export type CultureInsightCategory =
  | 'Customs & Hospitality'
  | 'Attire & Safa Heritage'
  | 'Sacred Water & Architecture'
  | 'Folk Rhythms & Performance'
  | 'Culinary Traditions & Preservation'
  | 'Artisan Crafts & Adornment'
  | 'Warrior Codes & Sacred Lore';

export interface CultureInsightItem {
  id: string;
  slug?: string;
  title: string;
  hindiTitle: string;
  category: CultureInsightCategory;
  destinationIds: string[]; // Destination IDs or 'all'
  quickFact: string;
  culturalStory: string;
  symbolism: string;
  travelerEtiquette: string;
  image: string;
  proverbOrIdiom?: {
    original: string;
    transliteration: string;
    meaning: string;
  };
  tags: string[];
  relatedCultureIds?: string[];
}

export interface NearbyDestinationLink {
  destinationId: string;
  destinationName: string;
  distanceKm: number;
  approxDurationHours: number;
  mode: 'Car' | 'Train' | 'Bus';
}

export interface TravelInformation {
  nearestAirport: string;
  railConnectivity: string;
  roadConnectivity: string;
  localTransport: string[];
  travelTips: string[];
}

export interface DestinationBudget {
  dailyEstimatedINR: {
    budget: number;
    midRange: number;
    luxury: number;
  };
  disclaimer: string;
}

export interface BestTimeToVisit {
  idealMonths: string;
  summary: string;
  season: TravelSeason;
  temperatureRange: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  hindiName?: string;
  moniker: string; // e.g. "The Pink City", "The City of Lakes"
  shortDescription: string;
  description: string;
  region: RegionCategory;
  coordinates: GeoCoordinates;
  heroImage: string;
  gallery: GalleryImage[];
  highlights: string[];
  attractions: Attraction[];
  experiences: Experience[];
  foods: Food[];
  festivals: Festival[];
  bestTimeToVisit: BestTimeToVisit;
  recommendedDuration: string;
  estimatedBudget: DestinationBudget;
  nearbyDestinations: NearbyDestinationLink[];
  travelInformation: TravelInformation;
  tags: string[];
}

export interface ItineraryDayPlan {
  dayNumber: number;
  title: string;
  description: string;
  destinationId: string;
  highlights: string[];
}

export interface Itinerary {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  destinationIds: string[];
  durationDays: number;
  theme: 'Royal Heritage' | 'Desert Frontier' | 'Lakes & Palaces' | 'Comprehensive Grand Tour';
  estimatedBudget: {
    budgetTier: BudgetTier;
    estimatedCostINR: number;
  };
  dayPlans: ItineraryDayPlan[];
  highlights: string[];
}

/** Map Marker Presentation Model for interactive spatial components */
export interface MapMarkerData {
  id: string;
  slug: string;
  name: string;
  moniker: string;
  region: RegionCategory;
  svgX: number;
  svgY: number;
  attractionCount: number;
  heroImage: string;
}

/** Parameter shape for demo budget estimations */
export interface BudgetEstimateParams {
  days: number;
  travelers: number;
  tier: BudgetTier;
  includePrivateCar?: boolean;
}

export interface BudgetBreakdown {
  accommodationTotal: number;
  foodTotal: number;
  transportTotal: number;
  activitiesTotal: number;
  grandTotal: number;
  perPersonTotal: number;
  tier: BudgetTier;
  disclaimer: string;
}
