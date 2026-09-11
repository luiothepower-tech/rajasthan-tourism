/**
 * Rajasthan Tourism — Festivals & Cultural Calendar Data
 * Phase 1: Foundation Data Architecture
 */

import { Festival } from '../types';
import { VERIFIED_IMAGES } from './imageAssets';

export const FESTIVALS_DATA: Festival[] = [
  {
    id: 'pushkar-camel-fair',
    slug: 'pushkar-camel-fair',
    name: 'Pushkar Camel Fair',
    hindiName: 'पुष्कर ऊँट मेला',
    description: 'One of the world’s largest camel and livestock gatherings, drawing nomadic herders, musicians, and pilgrims to the sacred sand dunes of Pushkar.',
    approximateMonth: 'November (Kartik Purnima)',
    location: 'Pushkar, Rajasthan',
    destinationIds: ['pushkar'],
    image: VERIFIED_IMAGES.festivals.pushkarCamelFair,
    culturalContext: 'Blends ancient Hindu ritual holy dips in Pushkar Lake during the full moon with a massive trade mart for tens of thousands of decorated camels and horses. For the pastoral communities of Rajasthan, this is an annual reunion of trade, matrimony, and spiritual purification.',
    highlights: [
      'Camel beauty contests and traditional shearing patterns',
      'Matka Phod (clay pot breaking) and bridal competitions',
      'Spiritual full moon maha-aarti at the lake ghats',
      'Whirling Kalbelia dance performances under desert stars',
    ],
    majorActivities: [
      'Dawn exploration of the herders’ camps on the outer sand dunes',
      'Observing the intricate fur shearing (gorbandh) adornment competitions',
      'Participating in the evening Maha Aarti at Brahma Ghat with thousands of floating deepas',
      'Nighttime acoustic folk concerts featuring Sarangi, Kamaicha, and Morchang masters',
    ],
    visitorGuide:
      'Arrive 2–3 days BEFORE Kartik Purnima (the official full moon day) if you wish to see the camel trading at its peak, as herders often begin departing once the religious bathing rituals commence. Modest dress covering shoulders and knees is mandatory around the sacred 52 ghats.',
    bestTimeOfDay: 'Sunrise (6:00 AM – 8:30 AM) & Sunset / Twilight Aarti (5:30 PM – 8:00 PM)',
    relatedFestivalIds: ['desert-festival-jaisalmer', 'bikaner-camel-festival'],
  },
  {
    id: 'desert-festival-jaisalmer',
    slug: 'desert-festival-jaisalmer',
    name: 'Jaisalmer Desert Festival',
    hindiName: 'मरु महोत्सव जैसलमेर',
    description: 'An extravaganza of Thar folk culture celebrated amidst the dunes of Sam, showcasing turban-tying competitions, camel polo, and traditional desert ballads.',
    approximateMonth: 'February (Magh Purnima)',
    location: 'Sam Sand Dunes, Jaisalmer',
    destinationIds: ['jaisalmer'],
    image: VERIFIED_IMAGES.festivals.desertFestival,
    culturalContext: 'Commemorates the golden heritage of the Bhati Rajputs and celebrates the resilience and artistry of the desert communities. It transforms the desolate winter dunes of the Thar into a glittering kaleidoscope of scarlet turbans, silver jewellery, and folk ballads.',
    highlights: [
      'Gair and Fire dancers leaping across glowing coals',
      'Mr. Desert (Moustache & Turban) cultural contests',
      'Acoustic concerts by Manganiyar musicians on golden dunes',
      'Grand royal procession from Sonar Qila to Shahid Poonam Singh Stadium',
    ],
    majorActivities: [
      'Shobha Yatra opening royal procession from the Golden Fort to the desert arena',
      'The legendary Turban Tying (Safa) and Longest Moustache competitions',
      'Camel acrobatics, camel races, and camel tug-of-war contests',
      'Full moon night concerts in the Sam Sand Dunes amphitheater',
    ],
    visitorGuide:
      'February in Jaisalmer offers pleasant sunny days (22°C–26°C) but rapid nighttime drops to 8°C–10°C; carry warm layers for evening dune concerts. Pre-book desert camp stays well in advance as accommodations sell out months ahead.',
    bestTimeOfDay: 'Afternoon processions through nightfall (3:00 PM – 10:00 PM)',
    relatedFestivalIds: ['pushkar-camel-fair', 'bikaner-camel-festival'],
  },
  {
    id: 'teej-jaipur',
    slug: 'teej-jaipur',
    name: 'Teej Festival of Jaipur',
    hindiName: 'तीज महोत्सव जयपुर',
    description: 'A vibrant celebration welcoming the arrival of monsoon rains, honoring Goddess Parvati with magnificent royal palanquin processions through the old walled city.',
    approximateMonth: 'July / August (Shravan month)',
    location: 'Walled City, Jaipur',
    destinationIds: ['jaipur'],
    image: VERIFIED_IMAGES.festivals.teejJaipur,
    culturalContext: 'Women dress in auspicious green leheriya saris, adorn hands with intricate henna mehendi, and sing traditional monsoon folk ballads on festive swings. The festival symbolizes the divine reunion of Goddess Parvati (Teej Mata) and Lord Shiva after a century of penance.',
    highlights: [
      'Gilded idol of Goddess Parvati carried in royal palanquin',
      'Procession of decorated royal elephants, camels, and folk troupes',
      'Special sweet feast of freshly fried malai ghevar',
      'Folk performances along Tripoliya Gate to Chaugan Stadium',
    ],
    majorActivities: [
      'Witnessing the grand royal royal palanquin emerge through City Palace’s Tripoliya Gate',
      'Tasting seasonal freshly fried honeycomb Malai Ghevar across Johari Bazaar sweet shops',
      'Observing women singing traditional "Badal ri Malhar" songs on decorated swings hung from banyan trees',
      'Folk dancers performing Kachi Ghodi (dummy horse dance) and Kalbelia on the procession route',
    ],
    visitorGuide:
      'The Department of Tourism sets up a dedicated elevated viewing gallery for domestic and international travelers near the Hind Hotel / Tripoliya Gate. Carry an umbrella or light raincoat since celebrations occur during the peak monsoon downpours.',
    bestTimeOfDay: 'Late Afternoon procession (4:30 PM – 7:30 PM)',
    relatedFestivalIds: ['mewar-festival-udaipur', 'pushkar-camel-fair'],
  },
  {
    id: 'mewar-festival-udaipur',
    slug: 'mewar-festival-udaipur',
    name: 'Mewar Festival of Udaipur',
    hindiName: 'मेवार महोत्सव उदयपुर',
    description: 'Welcoming the advent of spring with colorful royal boat processions, folk songs, and fireworks lighting up the waters of Lake Pichola.',
    approximateMonth: 'March / April (Chaitra month)',
    location: 'Gangaur Ghat, Lake Pichola, Udaipur',
    destinationIds: ['udaipur'],
    image: VERIFIED_IMAGES.festivals.mewarFestival,
    culturalContext: 'Coinciding with Gangaur, the festival celebrates marital bliss, devotion, and the historical legacy of the Sisodia dynasty of Mewar. Women carry beautifully sculpted wooden idols of Isar (Shiva) and Gangaur (Parvati) upon their heads through the cobblestone streets down to the lake ghats.',
    highlights: [
      'Statues of Isar and Gangaur carried to Gangaur Ghat',
      'Flotilla of illuminated royal barges moving across Lake Pichola',
      'Rajasthani musical drama and Ghoomar performances',
      'Midnight fireworks display over the water palaces',
    ],
    majorActivities: [
      'Traditional Shobha Yatra through the Clock Tower area to the edge of Lake Pichola',
      'Ceremonial boat procession where the royal family transports idols aboard gilded ceremonial barges',
      'Dharohar folk dance performances and classical Rajasthani singing at Gangaur Ghat amphitheater',
      'Grand finale fireworks illuminating Jag Mandir and Lake Palace after dusk',
    ],
    visitorGuide:
      'Arrive early at Gangaur Ghat or book a lakefront terrace café along Lal Ghat by 4:00 PM to secure an unobstructed vantage point of the ceremonial barges and evening firework spectacle.',
    bestTimeOfDay: 'Sunset to Night (5:00 PM – 9:30 PM)',
    relatedFestivalIds: ['teej-jaipur', 'pushkar-camel-fair'],
  },
  {
    id: 'bikaner-camel-festival',
    slug: 'bikaner-camel-festival',
    name: 'Bikaner Camel Festival',
    hindiName: 'बीकानेर ऊँट उत्सव',
    description: 'A dedicated tribute to the "Ship of the Desert", highlighting the historic Bikaner Camel Corps against the backdrop of Junagarh Fort.',
    approximateMonth: 'January',
    location: 'Karni Singh Stadium, Bikaner',
    destinationIds: ['bikaner'],
    image: VERIFIED_IMAGES.festivals.bikanerCamelFestival,
    culturalContext: 'Celebrates the historical symbiosis between desert communities and camels, which served in world wars under Maharaja Ganga Singh’s famed Ganga Risala regiment. The festival showcases folk artistry, acrobatic agility, and centuries of desert breeding wisdom.',
    highlights: [
      'Elaborate fur-cutting designs and camel adornment parades',
      'Camel dance competitions set to rhythm of dhol drums',
      'Traditional wrestler bouts and local sweet tasting stalls',
    ],
    majorActivities: [
      'Grand opening parade starting from the terracotta ramparts of Junagarh Fort',
      'Fur-cutting artistry contests, where camels’ thick coats are shaved into intricate geometric tapestry patterns',
      'Camel milking contests and sampling authentic fresh camel milk ice cream and sweets',
      'Evening Fire Dance performed by the Jasnathi sect leaping onto live burning embers',
    ],
    visitorGuide:
      'January is winter in Bikaner; crisp sunshine during the day (20°C) with brisk desert winds in the morning and evening. Combine your visit with a trip to the nearby National Research Centre on Camel (NRCC).',
    bestTimeOfDay: 'Morning parade (9:00 AM – 12:30 PM) & Evening folk events (5:30 PM – 8:30 PM)',
    relatedFestivalIds: ['pushkar-camel-fair', 'desert-festival-jaisalmer'],
  },
];
