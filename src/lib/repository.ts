/**
 * Rajasthan Tourism — Repository & Data Access Layer
 * Phase 1: Foundation Data Architecture
 * 
 * Provides a decoupled abstraction between UI components and underlying data sources.
 * In Phase 1, data is queried synchronously from typed local records.
 * In future phases, this layer can be switched to REST, GraphQL, or a headless CMS
 * without changing component-level consumer code.
 */

import { DESTINATIONS_DATA } from '../data/destinations';
import { EXPERIENCES_DATA } from '../data/experiences';
import { CUISINES_DATA } from '../data/cuisines';
import { FESTIVALS_DATA } from '../data/festivals';
import { ITINERARIES_DATA } from '../data/itineraries';
import { CULTURAL_INSIGHTS_DATA } from '../data/culturalInsights';
import {
  Destination,
  Experience,
  Food,
  Festival,
  Itinerary,
  CultureInsightItem,
  MapMarkerData,
  RegionCategory,
  BudgetEstimateParams,
  BudgetBreakdown,
} from '../types';

/**
 * Hydrates a destination with related foods, experiences, and festivals.
 */
function hydrateDestination(dest: Destination): Destination {
  return {
    ...dest,
    experiences: EXPERIENCES_DATA.filter((exp) => exp.destinationIds.includes(dest.id)),
    foods: CUISINES_DATA.filter((food) => food.destinationIds.includes(dest.id)),
    festivals: FESTIVALS_DATA.filter((fest) => fest.destinationIds.includes(dest.id)),
  };
}

export const tourismRepository = {
  /**
   * Retrieves all curated destinations across Rajasthan
   */
  getAllDestinations(): Destination[] {
    return DESTINATIONS_DATA.map(hydrateDestination);
  },

  /**
   * Retrieves a single destination by its URL slug
   */
  getDestinationBySlug(slug: string): Destination | undefined {
    const found = DESTINATIONS_DATA.find(
      (d) => d.slug.toLowerCase() === slug.toLowerCase()
    );
    return found ? hydrateDestination(found) : undefined;
  },

  /**
   * Retrieves a single destination by its unique ID
   */
  getDestinationById(id: string): Destination | undefined {
    const found = DESTINATIONS_DATA.find((d) => d.id === id);
    return found ? hydrateDestination(found) : undefined;
  },

  /**
   * Filters destinations by geographic/cultural region
   */
  getDestinationsByRegion(region: RegionCategory): Destination[] {
    return DESTINATIONS_DATA.filter((d) => d.region === region).map(hydrateDestination);
  },

  /**
   * Retrieves lightweight marker representations for the interactive map
   */
  getMapMarkers(): MapMarkerData[] {
    return DESTINATIONS_DATA.map((d) => ({
      id: d.id,
      slug: d.slug,
      name: d.name,
      moniker: d.moniker,
      region: d.region,
      svgX: d.coordinates.svgX,
      svgY: d.coordinates.svgY,
      attractionCount: d.attractions.length,
      heroImage: d.heroImage,
    }));
  },

  /**
   * Retrieves all curated cultural experiences
   */
  getAllExperiences(): Experience[] {
    return EXPERIENCES_DATA;
  },

  /**
   * Retrieves a single experience by ID or slug
   */
  getExperienceById(idOrSlug: string): Experience | undefined {
    const clean = idOrSlug.toLowerCase().trim();
    const aliasMap: Record<string, string> = {
      'desert-safari': 'exp-thar-stargaze',
      'thar-stargazing': 'exp-thar-stargaze',
      'thar-stargaze': 'exp-thar-stargaze',
      'lake-pichola-boat': 'exp-lake-pichola-boat',
      'pichola-boat': 'exp-lake-pichola-boat',
      'blue-city-walk': 'exp-blue-city-walk',
      'block-print-workshop': 'exp-block-print-workshop',
      'stepwell-geometry': 'exp-stepwell-geometry',
      'royal-culinary-feast': 'exp-royal-culinary-feast',
    };
    const target = aliasMap[clean] || clean;
    return EXPERIENCES_DATA.find(
      (exp) =>
        exp.id.toLowerCase() === target ||
        (exp.slug && exp.slug.toLowerCase() === target) ||
        exp.id.toLowerCase() === `exp-${target}`
    );
  },

  /**
   * Retrieves experiences specific to a destination ID
   */
  getExperiencesByDestination(destinationId: string): Experience[] {
    return EXPERIENCES_DATA.filter((exp) => exp.destinationIds.includes(destinationId));
  },

  /**
   * Retrieves all regional culinary dishes
   */
  getAllFoods(): Food[] {
    return CUISINES_DATA;
  },

  /**
   * Retrieves a single food item by ID or slug
   */
  getFoodById(idOrSlug: string): Food | undefined {
    const clean = idOrSlug.toLowerCase().trim();
    return CUISINES_DATA.find(
      (f) => f.id.toLowerCase() === clean || (f.slug && f.slug.toLowerCase() === clean)
    );
  },

  /**
   * Retrieves culinary dishes for a given destination ID
   */
  getFoodsByDestination(destinationId: string): Food[] {
    return CUISINES_DATA.filter((f) => f.destinationIds.includes(destinationId));
  },

  /**
   * Retrieves all annual cultural festivals
   */
  getAllFestivals(): Festival[] {
    return FESTIVALS_DATA;
  },

  /**
   * Retrieves a single festival by ID or slug
   */
  getFestivalById(idOrSlug: string): Festival | undefined {
    const clean = idOrSlug.toLowerCase().trim();
    const aliasMap: Record<string, string> = {
      'pushkar-fair': 'pushkar-camel-fair',
      'desert-festival': 'desert-festival-jaisalmer',
      'teej': 'teej-jaipur',
      'mewar-festival': 'mewar-festival-udaipur',
      'bikaner-camel': 'bikaner-camel-festival',
    };
    const target = aliasMap[clean] || clean;
    return FESTIVALS_DATA.find(
      (fest) =>
        fest.id.toLowerCase() === target ||
        (fest.slug && fest.slug.toLowerCase() === target)
    );
  },

  /**
   * Retrieves festivals hosted in a specific destination
   */
  getFestivalsByDestination(destinationId: string): Festival[] {
    return FESTIVALS_DATA.filter((fest) => fest.destinationIds.includes(destinationId));
  },

  /**
   * Retrieves all cultural insight items
   */
  getAllCultureInsights(): CultureInsightItem[] {
    return CULTURAL_INSIGHTS_DATA;
  },

  /**
   * Retrieves a single cultural insight by ID or slug
   */
  getCultureInsightById(idOrSlug: string): CultureInsightItem | undefined {
    const clean = idOrSlug.toLowerCase().trim();
    const aliasMap: Record<string, string> = {
      ghoomar: 'ghoomar-sacred-dance',
      turban: 'safa-pagri-turban',
      safa: 'safa-pagri-turban',
      stepwells: 'baoris-water-sanctuary',
      baori: 'baoris-water-sanctuary',
      'blue-city': 'blue-city-indigo',
      kathputli: 'kathputli-string-puppets',
      bandhani: 'bandhani-leheriya-dye',
      hospitality: 'padharo-mhare-des',
    };
    const target = aliasMap[clean] || clean;
    return CULTURAL_INSIGHTS_DATA.find(
      (c) =>
        c.id.toLowerCase() === target ||
        (c.slug && c.slug.toLowerCase() === target)
    );
  },

  /**
   * Retrieves cultural insights relating to a specific destination
   */
  getCultureInsightsByDestination(destinationId: string): CultureInsightItem[] {
    return CULTURAL_INSIGHTS_DATA.filter(
      (c) => c.destinationIds.includes('all') || c.destinationIds.includes(destinationId)
    );
  },

  /**
   * Retrieves pre-built thematic travel circuits
   */
  getAllItineraries(): Itinerary[] {
    return ITINERARIES_DATA;
  },

  /**
   * Parametric budget estimation calculation engine
   */
  calculateEstimatedBudget(params: BudgetEstimateParams): BudgetBreakdown {
    const days = Math.max(1, params.days);
    const travelers = Math.max(1, params.travelers);
    const tier = params.tier;

    // Daily base rates per room/traveler in INR
    const rates = {
      budget: { stayPerNight: 1600, foodPerPerson: 600, transitDaily: 800, activitiesPerPerson: 400 },
      midRange: { stayPerNight: 5200, foodPerPerson: 1600, transitDaily: 2200, activitiesPerPerson: 1000 },
      luxury: { stayPerNight: 20000, foodPerPerson: 4500, transitDaily: 5000, activitiesPerPerson: 2500 },
    }[tier];

    // Estimate 2 travelers per room
    const roomsNeeded = Math.ceil(travelers / 2);
    const accommodationTotal = rates.stayPerNight * roomsNeeded * days;
    const foodTotal = rates.foodPerPerson * travelers * days;
    const transportTotal = (params.includePrivateCar ? rates.transitDaily * 1.5 : rates.transitDaily) * days;
    const activitiesTotal = rates.activitiesPerPerson * travelers * days;

    const grandTotal = accommodationTotal + foodTotal + transportTotal + activitiesTotal;
    const perPersonTotal = Math.round(grandTotal / travelers);

    return {
      accommodationTotal,
      foodTotal,
      transportTotal,
      activitiesTotal,
      grandTotal,
      perPersonTotal,
      tier,
      disclaimer: 'Calculated as educational guidance based on typical Rajasthan lodging and transport averages. Actual live tariffs vary by season and booking dates.',
    };
  },
};
