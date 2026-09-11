/**
 * Rajasthan Tourism — Authentic Culinary Heritage Data
 * Phase 1: Foundation Data Architecture
 */

import { Food } from '../types';
import { VERIFIED_IMAGES } from './imageAssets';

export const CUISINES_DATA: Food[] = [
  {
    id: 'dal-baati-churma',
    slug: 'dal-baati-churma',
    name: 'Dal Baati Churma',
    hindiName: 'दाल बाटी चूरमा',
    description: 'The definitive culinary emblem of Rajasthan: roasted hard wheat rolls (baatis) drenched in fragrant desi ghee, served with five-lentil spicy dal and coarse sweetened crushed wheat churma.',
    image: VERIFIED_IMAGES.cuisines.dalBaatiChurma,
    region: 'Marwar',
    category: 'Main Course',
    destinationIds: ['jaipur', 'jodhpur', 'udaipur', 'bikaner'],
    tasteProfile: 'Rich, earthy, savory with a warm sweet textural counterpoint.',
    culturalStory: 'Originating during ancient Rajput campaigns when warriors buried dough balls under hot desert sand before leaving for battle, finding them perfectly baked upon their return. Over the centuries, Mewar and Marwar royal kitchens refined the accompaniment into a royal trifecta of Panchmel Dal and jaggery-infused churma.',
    keyIngredients: [
      'Whole wheat flour (atta)',
      'Pure clarified desi cow ghee',
      'Panchmel Dal (moong, chana, toor, urad, masoor lentils)',
      'Jaggery / raw cane sugar and green cardamom',
      'Asafoetida (hing), cumin, and Mathania red chilli powder',
    ],
    servingRitual:
      'Traditionally served on a brass royal thali. The baati is crushed by hand, submerged entirely in piping-hot melted ghee, paired with dal, a dollop of sweet churma, spicy garlic chutney (lahsun ki chutney), and fresh buttermilk (chaas).',
    visitorExperience:
      'Available across traditional dining halls and royal heritage restaurants throughout Jaipur (LMB, Chokhi Dhani), Jodhpur (Gypsy Thali), and Udaipur (Traditional Khama Ghani Restaurant). Pair it with cooling buttermilk.',
    relatedDishIds: ['ker-sangri', 'pyaaz-kachori', 'ghevar'],
  },
  {
    id: 'ker-sangri',
    slug: 'ker-sangri',
    name: 'Ker Sangri',
    hindiName: 'केर सांगरी',
    description: 'A gourmet desert specialty cooked with wild caper berries (ker) and wild desert climbing beans (sangri) sautéed in mustard oil with dry red chillies, amchur, and raisins.',
    image: VERIFIED_IMAGES.cuisines.kerSangri,
    region: 'Thar',
    category: 'Main Course',
    destinationIds: ['jaisalmer', 'bikaner', 'jodhpur'],
    tasteProfile: 'Tangy, spicy, dry berry tartness with deeply earthy undertones.',
    culturalStory: 'A masterclass in desert survival: both ker and sangri flourish in extreme drought conditions and can be sun-dried and stored for years without spoiling. Marwari caravan traders carried dried ker and sangri across Thar trade routes, rehydrating them with buttermilk when water was unobtainable.',
    keyIngredients: [
      'Wild dried Ker caper berries',
      'Slender dried Sangri bean pods (from the Khejri tree)',
      'Cold-pressed mustard oil',
      'Whole dried red chillies and fenugreek seeds',
      'Amchur (dried green mango powder) and dry seedless raisins',
    ],
    servingRitual:
      'Best eaten lukewarm or room temperature paired with thick Bajra Roti (pearl millet flatbread) slathered with white unsalted country butter and raw onions.',
    visitorExperience:
      'Most authentic in the desert oases of Jaisalmer, Bikaner, and Jodhpur. Ask for "Khejri Sangri ki Sabzi" in local Marwari heritage establishments.',
    relatedDishIds: ['dal-baati-churma', 'bikaneri-bhujia', 'mirchi-bada'],
  },
  {
    id: 'laal-maas',
    slug: 'laal-maas',
    name: 'Laal Maas',
    hindiName: 'लाल मांस',
    description: 'A fiery royal meat curry slow-cooked with tender mutton in an aromatic paste of indigenous Mathania red chillies, garlic, curd, and whole warm spices.',
    image: VERIFIED_IMAGES.cuisines.laalMaas,
    region: 'Mewar',
    category: 'Main Course',
    destinationIds: ['jaipur', 'jodhpur', 'udaipur'],
    tasteProfile: 'Intensely fiery, smoky, complex garlic and whole-spice depth.',
    culturalStory: 'Developed by royal hunting parties (Shikar) to cook freshly caught wild game with abundant Mathania chillies, which masked strong gamey flavors in arid terrain. A live charcoal ember with cloves and ghee (dhungar technique) was often introduced to impart a hypnotic woodsmoke aroma.',
    keyIngredients: [
      'Tender goat/mutton pieces with bone',
      'Authentic sun-dried Mathania red chillies soaked and ground to a paste',
      'Mustard oil and pure desi ghee',
      'Thick whisked hung curd',
      'Crushed garlic, cloves, black cardamom, and cinnamon bark',
    ],
    servingRitual:
      'Served steaming in a copper bowl with smoky charcoal undertones, accompanied by bajre ki roti, roomali roti, or fragrant jeera rice.',
    visitorExperience:
      'Look for heritage palaces in Udaipur and Jaipur where chefs still use genuine Mathania chillies rather than commercial red food coloring.',
    relatedDishIds: ['dal-baati-churma', 'ker-sangri'],
  },
  {
    id: 'ghevar',
    slug: 'ghevar',
    name: 'Ghevar',
    hindiName: 'घेवर',
    description: 'A disc-shaped honeycomb sweet crafted from refined flour, fried in pure ghee until crispy and porous, then dipped in saffron syrup and topped with thick malai and silver leaf (varak).',
    image: VERIFIED_IMAGES.cuisines.ghevar,
    region: 'Dhundhar',
    category: 'Sweet / Mithai',
    destinationIds: ['jaipur', 'bikaner'],
    tasteProfile: 'Airy, crispy, honeycomb crunch soaked in cardamom and saffron cream.',
    culturalStory: 'Traditionally associated with the Teej festival and monsoon rains, when increased moisture in the air creates the ideal texture for honeycomb crystallization. Brothers historically gift boxes of freshly made Malai Ghevar to married sisters during Teej and Raksha Bandhan.',
    keyIngredients: [
      'Refined flour (maida)',
      'Pure clarified desi ghee',
      'Saffron (kesar) infused sugar syrup',
      'Thick reduced milk cream (Rabri / Malai)',
      'Slivered pistachios, almonds, and edible silver leaf (varak)',
    ],
    servingRitual:
      'Enjoyed chilled or at room temperature, cut into wedges like a cake so the rabri layer and crispy honeycomb interact in every bite.',
    visitorExperience:
      'During July to September (monsoon season), Jaipur sweet shops like LMB (Johari Bazaar) and Rawat Mishthan Bhandar display towering pyramids of freshly made Ghevar.',
    relatedDishIds: ['dal-baati-churma', 'pyaaz-kachori'],
  },
  {
    id: 'mirchi-bada',
    slug: 'mirchi-bada',
    name: 'Jodhpur Mirchi Bada',
    hindiName: 'जोधपुरी मिर्ची बड़ा',
    description: 'Plump mild Bhavnagri green chillies slit open and stuffed with a spiced potato and cumin mash, battered in gram flour (besan) and deep-fried until blistered golden.',
    image: VERIFIED_IMAGES.cuisines.mirchiBada,
    region: 'Marwar',
    category: 'Snack & Street Food',
    destinationIds: ['jodhpur'],
    tasteProfile: 'Crunchy exterior yielding to comforting spiced potato and warming pepper sweetness.',
    culturalStory: 'The quintessential morning ritual in Jodhpur, enjoyed with piping hot sweet masala chai around the Clock Tower market. Jodhpur residents consume over 100,000 mirchi badas every single morning before midday.',
    keyIngredients: [
      'Large Bhavnagri mild green peppers',
      'Boiled potatoes mashed with roasted cumin, hing, and amchur',
      'Spiced chickpea flour (besan) batter',
      'Mustard oil for deep frying',
      'Served with green coriander chutney and sweet saunth tamarind sauce',
    ],
    servingRitual:
      'Served piping hot directly out of the bubbling kadhai, sliced in half diagonally, accompanied by sweet clay-cup (kulhad) chai.',
    visitorExperience:
      'Head to Shahi Samosa and Surya Namkeen near Ghanta Ghar (Clock Tower) in Jodhpur from 7:00 AM onwards for the authentic morning crunch.',
    relatedDishIds: ['pyaaz-kachori', 'bikaneri-bhujia'],
  },
  {
    id: 'pyaaz-kachori',
    slug: 'pyaaz-kachori',
    name: 'Jaipuri Pyaaz Kachori',
    hindiName: 'जयपुरी प्याज कचौरी',
    description: 'Flaky, layered deep-fried golden pastry shells generously stuffed with a steaming, aromatic filling of caramelized onions, fennel, and coarse coriander masala.',
    image: VERIFIED_IMAGES.cuisines.pyaazKachori,
    region: 'Dhundhar',
    category: 'Snack & Street Food',
    destinationIds: ['jaipur'],
    tasteProfile: 'Flaky crisp shell giving way to savory sweet caramelized onion and fennel punch.',
    culturalStory: 'Invented in the royal bazaars of Jaipur, perfected by multi-generational halwais and served with sharp tamarind and mint chutneys. The flaky pastry owes its distinct texture to "moyen" (warm ghee kneaded patiently into flour).',
    keyIngredients: [
      'Coarsely chopped red onions slow-cooked with fennel seeds',
      'Crushed coriander seeds, ginger, and green chillies',
      'Refined flour crust with carom seeds (ajwain)',
      'Ghee and cold-pressed oil',
      'Dry mango powder (amchur) and garam masala',
    ],
    servingRitual:
      'The top of the kachori is cracked open with a spoon, filled with sweet tamarind saunth and spicy mint-coriander chutney, eaten immediately.',
    visitorExperience:
      'Rawat Mishthan Bhandar on Station Road in Jaipur is the undisputed temple of Pyaaz Kachori, frying tens of thousands daily since the 1960s.',
    relatedDishIds: ['mirchi-bada', 'ghevar', 'dal-baati-churma'],
  },
  {
    id: 'bikaneri-bhujia',
    slug: 'bikaneri-bhujia',
    name: 'Bikaneri Bhujia',
    hindiName: 'बीकानेरी भुजिया',
    description: 'Crispy fried snack strings crafted from ground moth bean flour, besan, black pepper, and desert spices with a distinct GI (Geographical Indication) status.',
    image: VERIFIED_IMAGES.cuisines.bikaneriBhujia,
    region: 'Bikaner',
    category: 'Snack & Street Food',
    destinationIds: ['bikaner'],
    tasteProfile: 'Crunchy, peppery, savory with distinct moth bean earthiness.',
    culturalStory: 'First prepared in 1877 during the reign of Maharaja Shri Dungar Singh in Bikaner, celebrated globally for its unmatched crispness attributed to dry desert air and local water salinity.',
    keyIngredients: [
      'Ground desert moth bean flour (moth dal)',
      'Gram flour (chana besan)',
      'Freshly crushed black peppercorns (kali mirch)',
      'Cloves, cardamom, and desert rock salt',
      'Groundnut oil for crisp frying',
    ],
    servingRitual:
      'Eaten by the handful alongside evening chai, or sprinkled atop poha, curd, and vegetable curries for textural crunch.',
    visitorExperience:
      'Visit the historic Bhujia Bazaar inside Bikaner old walled city. Watch master artisans press the dough through giant brass perforated ladles directly into enormous cauldrons.',
    relatedDishIds: ['ker-sangri', 'mirchi-bada'],
  },
];
