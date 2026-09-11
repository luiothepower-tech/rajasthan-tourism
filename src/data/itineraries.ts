/**
 * Rajasthan Tourism — Pre-Built Circuit Itineraries
 * Phase 1: Foundation Data Architecture
 */

import { Itinerary } from '../types';

export const ITINERARIES_DATA: Itinerary[] = [
  {
    id: 'itin-royal-triangle',
    slug: 'royal-triangle-heritage',
    title: 'The Royal Triangle: Heritage & Palaces',
    tagline: 'Jaipur, Jodhpur & Udaipur across 7 majestic days',
    description: 'The quintessential introduction to Rajasthan, linking the planned pink stone grandeur of Jaipur, the towering blue fortress of Jodhpur, and the romantic lake reflections of Udaipur.',
    destinationIds: ['jaipur', 'jodhpur', 'udaipur'],
    durationDays: 7,
    theme: 'Royal Heritage',
    estimatedBudget: {
      budgetTier: 'midRange',
      estimatedCostINR: 42000,
    },
    highlights: [
      'Amer Fort mirror hall & Jaipur stone observatories',
      'Mehrangarh cliff ramparts & walking through blue alleys',
      'Lake Pichola sunset royal boat cruise',
      'Stepwells of Toorji ka Jhalra and Panna Meena',
    ],
    dayPlans: [
      {
        dayNumber: 1,
        title: 'Arrival in Jaipur & Walled City Exploration',
        description: 'Check in to heritage haveli, evening visit to Hawa Mahal facade and Johari Bazaar.',
        destinationId: 'jaipur',
        highlights: ['Hawa Mahal', 'Bazaars'],
      },
      {
        dayNumber: 2,
        title: 'Amer Fort & Astronomical Wonders',
        description: 'Morning ascent to Amer Fort, afternoon at Jantar Mantar and City Palace.',
        destinationId: 'jaipur',
        highlights: ['Amer Fort', 'Jantar Mantar'],
      },
      {
        dayNumber: 3,
        title: 'Overland to Jodhpur via Pushkar',
        description: 'Scenic transit past the sacred lake and Brahma temple of Pushkar to the Sun City.',
        destinationId: 'pushkar',
        highlights: ['Pushkar Lake'],
      },
      {
        dayNumber: 4,
        title: 'Mehrangarh Citadel & Blue City Walk',
        description: 'Explore the impregnable battlements of Mehrangarh, Jaswant Thada cenotaph, and Toorji stepwell.',
        destinationId: 'jodhpur',
        highlights: ['Mehrangarh Fort', 'Toorji Stepwell'],
      },
      {
        dayNumber: 5,
        title: 'Scenic Transit to Udaipur via Ranakpur',
        description: 'Drive through the Aravalli hills, marveling at the 1,444 carved marble pillars of Ranakpur.',
        destinationId: 'udaipur',
        highlights: ['Aravalli Hills'],
      },
      {
        dayNumber: 6,
        title: 'City Palace of Mewar & Lake Pichola',
        description: 'Full day exploring the lakeside royal quarters and an evening boat cruise.',
        destinationId: 'udaipur',
        highlights: ['City Palace', 'Lake Pichola'],
      },
      {
        dayNumber: 7,
        title: 'Ghats, Monsoon Palace & Departure',
        description: 'Morning walk around Gangaur Ghat and panoramic farewell from Sajjangarh hilltop.',
        destinationId: 'udaipur',
        highlights: ['Monsoon Palace'],
      },
    ],
  },
  {
    id: 'itin-desert-odyssey',
    slug: 'thar-desert-odyssey',
    title: 'The Great Thar Desert Odyssey',
    tagline: 'Jodhpur, Jaisalmer & Bikaner across 6 golden days',
    description: 'An adventurous route traversing deep into the great Thar Desert, visiting living golden sandstone fortresses, shifting sand dunes, and ancient camel caravan outposts.',
    destinationIds: ['jodhpur', 'jaisalmer', 'bikaner'],
    durationDays: 6,
    theme: 'Desert Frontier',
    estimatedBudget: {
      budgetTier: 'midRange',
      estimatedCostINR: 36000,
    },
    highlights: [
      'Sonar Qila living fort exploration',
      'Overnight stargazing camp amidst Sam Sand Dunes',
      'Undefeated Junagarh Fort in Bikaner',
      'Savouring authentic Ker Sangri and Bikaneri Bhujia',
    ],
    dayPlans: [
      {
        dayNumber: 1,
        title: 'Arrival in Jodhpur',
        description: 'Discover the blue quarters and Mehrangarh fort battlements.',
        destinationId: 'jodhpur',
        highlights: ['Mehrangarh Fort'],
      },
      {
        dayNumber: 2,
        title: 'Journey to the Golden City of Jaisalmer',
        description: 'Drive westward into the Thar, reaching Jaisalmer in time for sunset over Gadisar Lake.',
        destinationId: 'jaisalmer',
        highlights: ['Gadisar Lake'],
      },
      {
        dayNumber: 3,
        title: 'Sonar Qila Fort & Thar Dunes Camp',
        description: 'Morning walk through Patwon ki Haveli and Sonar Qila; afternoon camel trek into Sam dunes.',
        destinationId: 'jaisalmer',
        highlights: ['Living Fort', 'Sam Dunes'],
      },
      {
        dayNumber: 4,
        title: 'Desert Sunrise & Overland to Bikaner',
        description: 'Witness golden dawn over the dunes, then journey north to the desert bastion of Bikaner.',
        destinationId: 'bikaner',
        highlights: ['Thar Sunrise'],
      },
      {
        dayNumber: 5,
        title: 'Junagarh Fort & Rampuria Havelis',
        description: 'Tour the opulent painted halls of Junagarh and the red sandstone carved havelis.',
        destinationId: 'bikaner',
        highlights: ['Junagarh Fort', 'Rampuria Havelis'],
      },
      {
        dayNumber: 6,
        title: 'Culinary Bazaars & Departure',
        description: 'Sample authentic sweets and bhujia at Kote Gate before onward connections.',
        destinationId: 'bikaner',
        highlights: ['Culinary Bazaars'],
      },
    ],
  },
];
