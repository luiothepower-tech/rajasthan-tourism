/**
 * Rajasthan Tourism — Cultural Traditions & Heritage Insights Data
 * Curated authentic traditions, folk customs, architectural symbolism,
 * proverbs, and traveler etiquette across Rajasthan and its royal hubs.
 */

import { VERIFIED_IMAGES } from './imageAssets';

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

export const CULTURAL_INSIGHTS_DATA: CultureInsightItem[] = [
  {
    id: 'padharo-mhare-des',
    slug: 'padharo-mhare-des',
    title: 'Padharo Mhare Des: The Sacred Law of Hospitality',
    hindiTitle: 'पधारो म्हारे देस',
    category: 'Customs & Hospitality',
    destinationIds: ['all', 'jaipur', 'jodhpur', 'udaipur', 'jaisalmer', 'bikaner'],
    image: VERIFIED_IMAGES.udaipur.cityPalaceLake,
    relatedCultureIds: ['safa-pagri-turban', 'drought-culinary-genius'],
    quickFact:
      'In traditional Rajasthani households, rejecting hospitality or refusing water/buttermilk offered at the threshold was historically considered a spiritual ill-omen.',
    culturalStory:
      'Derived from the ancient Mand folk ballad composed centuries ago, "Padharo Mhare Des" (Welcome to My Land) represents the foundational Rajasthani worldview of Atithi Devo Bhava ("The guest is God incarnate"). Despite harsh desert scarcity, Rajput and Marwari ethos mandated that an incoming traveler must receive shade, cooling water, and food before being asked their identity or business.',
    symbolism:
      'Welcoming guests with folded hands ("Khamma Ghani" in Marwar/Mewar), a kumkum tilak on the forehead, and a garland of marigolds signifies wishing life-force and divine grace upon the visitor.',
    travelerEtiquette:
      'Accepting a glass of water or chai when offered by a local host is a deep sign of respect. Respond with a warm "Khamma Ghani" or "Dhanyawad" (thank you).',
    proverbOrIdiom: {
      original: 'अतिथि देवो भव — पाहुणा री मनुहार सबसे बड़ी।',
      transliteration: 'Pahuna ri manuhaar sabse badi.',
      meaning: 'Honoring and accommodating the guest is the highest virtue above all rituals.',
    },
    tags: ['Etiquette', 'Greeting', 'Hospitality', 'Marwar', 'Mewar'],
  },
  {
    id: 'safa-pagri-turban',
    slug: 'safa-pagri-turban',
    title: 'The Safa & Pagri: Geography and Honor Worn on the Head',
    hindiTitle: 'साफ़ा एवं पाग',
    category: 'Attire & Safa Heritage',
    destinationIds: ['all', 'jodhpur', 'jaipur', 'bikaner', 'jaisalmer', 'udaipur'],
    image: VERIFIED_IMAGES.festivals.desertFestival,
    relatedCultureIds: ['bandhani-leheriya-dye', 'padharo-mhare-des'],
    quickFact:
      'A traditional Rajasthani turban stretches between 9 and 18 meters in length, tied without pins using distinct regional folds that instantly identify a man’s home district and clan.',
    culturalStory:
      'In Rajasthan, a man\'s pagri (or safa) was historically more than headgear—it was a portable identity card, a cushion for head-loads, an emergency rope for desert stepwells, and a shield against sunstroke. Jodhpur is famed for the stately "Rajputana Safa" with a soaring plume, Jaipur for the festive five-colored "Pancharanga", while Bikaner favors the compact, sharply angled phenta.',
    symbolism:
      'Turban colors shift with seasons and life milestones: saffron or red during weddings and victories, bright yellow (Basanti) for spring, deep pink during Teej, and understated white or khaki during periods of communal mourning.',
    travelerEtiquette:
      'Never touch, step over, or play with a local elder’s turban lying on a cot. If invited to tie a ceremonial safa during a cultural reception, wear it proudly until the ceremony concludes.',
    proverbOrIdiom: {
      original: 'पाग बची तो लाख बची।',
      transliteration: 'Paag bachi to laakh bachi.',
      meaning: 'If honor (the turban) is preserved, everything of value is saved.',
    },
    tags: ['Turban', 'Rajput', 'Attire', 'Jodhpur', 'Jaipur'],
  },
  {
    id: 'baoris-water-sanctuary',
    slug: 'baoris-water-sanctuary',
    title: 'Baoris & Kunds: Sacred Geometry of Desert Water',
    hindiTitle: 'बावड़ी एवं कुण्ड',
    category: 'Sacred Water & Architecture',
    destinationIds: ['jaipur', 'bikaner', 'jodhpur', 'all'],
    image: VERIFIED_IMAGES.jaipur.pannaMeenaKund,
    relatedCultureIds: ['jharokha-and-jali', 'pushkar-brahma-lake'],
    quickFact:
      'The stepwells of Rajasthan (such as Panna Meena Kund in Amer) feature mathematical criss-crossing steps designed so visitors descend on one side and ascend on another without colliding.',
    culturalStory:
      'In the arid kingdoms where rainfall was a precious divine blessing, building a public stepwell (baori) was deemed spiritually superior to erecting a temple. These subterranean architectural marvels dropped 5 to 10 stories into the earth, creating cool subterranean microclimates (often 5–7°C cooler than the surface). Baoris served as community gathering havens where desert women socialized, performed rituals, and sang monsoon hymns away from searing midday heat.',
    symbolism:
      'Carvings of Lord Vishnu in reclining posture (Sheshashayi) or Varuna (god of waters) were carved into stepwell niches, reminding communities that water is sacred and never to be polluted.',
    travelerEtiquette:
      'Stepwells are historic heritage and sacred monuments. Never discard plastic bottles or trash down the steps, and maintain silence when entering stepwell water basins.',
    proverbOrIdiom: {
      original: 'जल है तो कल है — पानी री एक-एक बूँद घी बराबर।',
      transliteration: 'Paani ri ek-ek boond ghee barabar.',
      meaning: 'In the desert, every drop of water is as precious as pure clarified butter.',
    },
    tags: ['Stepwell', 'Architecture', 'Water', 'Jaipur', 'Amer'],
  },
  {
    id: 'ghoomar-sacred-dance',
    slug: 'ghoomar-sacred-dance',
    title: 'Ghoomar: The Royal Dance of Veiled Pirouettes',
    hindiTitle: 'घूमर नृत्य',
    category: 'Folk Rhythms & Performance',
    destinationIds: ['all', 'udaipur', 'jaipur', 'jodhpur', 'chittorgarh'],
    image: VERIFIED_IMAGES.udaipur.bagoreKiHaveli,
    relatedCultureIds: ['kathputli-string-puppets', 'bandhani-leheriya-dye'],
    quickFact:
      'Originally performed by Bhil tribal women to worship goddess Saraswati, Ghoomar was adopted by Rajput royal courts where women danced exclusively inside the palace zenana courtyards.',
    culturalStory:
      'The name Ghoomar derives from "ghoomna" (to swirl or pirouette). Dancers wear a billowing 80-kali (80-pleated) ghagra skirt that flares in radiant circular waves with each synchronized step. Accompanied by dholak, nagada, and shehnai, the dance features elegant hand claps and subtle footwork, with women veiled under translucent odhnis maintaining royal modesty and supreme poise.',
    symbolism:
      'The continuous circular swirling represents the eternal cosmic cycle of life and seasons, celebrated especially during the Gangaur festival to bless marital harmony.',
    travelerEtiquette:
      'When watching cultural performances in historic havelis (such as Bagore Ki Haveli in Udaipur), avoid flash photography that might disorient performers executing rapid spinning footwork.',
    proverbOrIdiom: {
      original: 'म्हारी घूमर छे नखराली ए माँ, घूमर रमता मैं तो जावाँ।',
      transliteration: 'Mhari ghoomar che nakhrali ae maa.',
      meaning: 'My graceful Ghoomar is playful and proud; I lose myself completely in its rhythm.',
    },
    tags: ['Dance', 'Folk', 'Music', 'Gangaur', 'Udaipur'],
  },
  {
    id: 'blue-city-indigo',
    slug: 'blue-city-indigo',
    title: 'The Indigo Wash of Marwar: Architecture Born of Sun & Soil',
    hindiTitle: 'नील की नगरी — जोधपुर',
    category: 'Sacred Water & Architecture',
    destinationIds: ['jodhpur'],
    image: VERIFIED_IMAGES.jodhpur.mehrangarhBlueCity,
    relatedCultureIds: ['safa-pagri-turban', 'jharokha-and-jali'],
    quickFact:
      'Jodhpur’s iconic indigo hue was originally derived from natural indigo plants mixed with copper sulphate (neela thotha) and limestone, which naturally repel desert termites and mosquitos.',
    culturalStory:
      'Wander beneath the mighty cliff of Mehrangarh Fort and you find Navchokiya and Brahmpuri—ancient quarters washed in radiant ocean-blue. While initially designated for Brahmin priests, the practice spread throughout the fortified city because limestone and indigo reflect harsh desert sunlight, keeping home interiors remarkably cool during blistering 45°C summers.',
    symbolism:
      'The blue hue invokes Lord Shiva (Neelkanth), offering spiritual protection, calmness, and thermal relief against the unforgiving Thar sun.',
    travelerEtiquette:
      'The blue quarters are residential living neighborhoods. Walk respectfully through narrow alleys, ask polite permission before photographing local residents sitting on thresholds, and avoid making loud noises at dusk.',
    proverbOrIdiom: {
      original: 'मारवाड़ री माटी, नीलो रंग अर मीठी बोली।',
      transliteration: 'Marwar ri maati, neelo rang ar meethi boli.',
      meaning: 'The soil of Marwar, the cooling blue wash, and the sweet tone of its people.',
    },
    tags: ['Jodhpur', 'Indigo', 'Architecture', 'Mehrangarh'],
  },
  {
    id: 'drought-culinary-genius',
    slug: 'drought-culinary-genius',
    title: 'Ker Sangri & Lentil Alchemy: Culinary Triumph Over Aridity',
    hindiTitle: 'केर सांगरी एवं मरुधरा स्वाद',
    category: 'Culinary Traditions & Preservation',
    destinationIds: ['all', 'bikaner', 'jaisalmer', 'jodhpur'],
    image: VERIFIED_IMAGES.cuisines.kerSangri,
    relatedCultureIds: ['padharo-mhare-des', 'bikaneri-haveli-sandstone'],
    quickFact:
      'Ker (wild desert capers) and Sangri (slender bean pods from the sacred Khejri tree) can survive severe drought and sustain desert communities when all green vegetation withers.',
    culturalStory:
      'Rajasthani cuisine was forged by war, desert trade caravans, and water scarcity. Royal cooks and nomadic desert folk avoided using scarce drinking water for food preparation, relying instead on clarified butter (ghee), buttermilk, and milk. Foods were formulated to keep for weeks without refrigeration—spiced with red Mathania chillies, amchoor (dry mango powder), and hing (asafoetida) to aid desert digestion.',
    symbolism:
      'The Khejri tree (Prosopis cineraria) is considered sacred across Rajasthan, historically protected by the Bishnoi community with their lives as the lifeline of desert flora and fauna.',
    travelerEtiquette:
      'Rajasthani food is traditionally eaten with the right hand. If served a traditional thali, take small portions first, as dishes are rich with spices and pure ghee.',
    proverbOrIdiom: {
      original: 'दाल बाटी चूरमा, म्हारो राजस्थान सूरमा।',
      transliteration: 'Dal Baati Churma, mharo Rajasthan soorma.',
      meaning: 'Fuel of heroes—Dal Baati Churma powers the brave warriors of Rajasthan.',
    },
    tags: ['Food', 'Bikaner', 'Jaisalmer', 'Desert', 'Khejri'],
  },
  {
    id: 'kathputli-string-puppets',
    slug: 'kathputli-string-puppets',
    title: 'Kathputli: Thousand-Year-Old Oral History on Strings',
    hindiTitle: 'काठपुतली परम्परा',
    category: 'Folk Rhythms & Performance',
    destinationIds: ['all', 'jaipur', 'udaipur', 'jodhpur'],
    image: VERIFIED_IMAGES.jaipur.amerFort,
    relatedCultureIds: ['ghoomar-sacred-dance', 'bandhani-leheriya-dye'],
    quickFact:
      'The lead puppeteer communicates using a tiny bamboo-reed whistle called a "boli", which produces high-pitched squeaks translated in song by the drummer (dholak player).',
    culturalStory:
      'Carved from soft mango wood and dressed in shimmering discarded bandhani fabrics, Kathputlis (wood-dolls) originated among the nomadic Bhat community over a thousand years ago. In an era without printed books or radios, puppeteers traveled between feudal courts dramatizing historic battles, royal romances, and the valor of Amar Singh Rathore of Nagaur.',
    symbolism:
      'The marionette strings symbolize the divine cosmic puppeteer guiding human destiny, reminding kings and commoners alike of humility and justice.',
    travelerEtiquette:
      'Support traditional puppeteers by purchasing authentic handcrafted puppets directly from artisan cooperatives rather than mass-manufactured plastic reproductions.',
    proverbOrIdiom: {
      original: 'काठ री पुतली, डोरी री माया।',
      transliteration: 'Kaath ri putli, dori ri maaya.',
      meaning: 'A doll of carved wood, brought to life solely by the unseen thread of mastercraft.',
    },
    tags: ['Puppetry', 'Folk Art', 'Storytelling', 'Jaipur'],
  },
  {
    id: 'jharokha-and-jali',
    slug: 'jharokha-and-jali',
    title: 'The Jharokha & Jali: The Geometry of Purdah & Passive Cooling',
    hindiTitle: 'झरोखा एवं जालीदार वास्तुकला',
    category: 'Sacred Water & Architecture',
    destinationIds: ['jaipur', 'jaisalmer', 'bikaner', 'udaipur'],
    image: VERIFIED_IMAGES.jaipur.hawaMahal,
    relatedCultureIds: ['bikaneri-haveli-sandstone', 'dilwara-marble-virtuosity'],
    quickFact:
      'The 953 stone casements of Jaipur’s Hawa Mahal work on the Venturi effect: hot desert air accelerates through tiny perforations, naturally dropping in temperature to cool interior corridors.',
    culturalStory:
      'In royal Rajput palaces, social customs required noblewomen to observe purdah (seclusion from public gaze). Royal architects turned this societal restriction into one of the world\'s greatest architectural triumphs. Hand-chiseled sandstone lattices (*jalis*) allowed queens and princesses to observe court proceedings, festive bazaars, and religious processions in complete anonymity while enjoying cross-breeze air conditioning.',
    symbolism:
      'The screen represents the delicate boundary between public duty and private contemplation, transforming stone into lace-like filigree.',
    travelerEtiquette:
      'Refrain from leaning against fragile heritage sandstone lattices or carving names onto palace parapets; these centuries-old filigrees are irreplaceable treasures.',
    tags: ['Architecture', 'Hawa Mahal', 'Jaisalmer', 'Jaipur', 'Bikaner'],
  },
  {
    id: 'jauhar-and-saka-code',
    slug: 'jauhar-and-saka-code',
    title: 'The Code of Chittor: Jauhar, Saka & Inviolable Honor',
    hindiTitle: 'जौहर एवं साका — त्याग री पराकाष्ठा',
    category: 'Warrior Codes & Sacred Lore',
    destinationIds: ['chittorgarh', 'udaipur'],
    image: VERIFIED_IMAGES.chittorgarh.fortWalls,
    relatedCultureIds: ['safa-pagri-turban', 'padharo-mhare-des'],
    quickFact:
      'When defeat was imminent against sieges at Chittorgarh, the warriors committed "Saka" (charging into battle in saffron robes until death), while women performed "Jauhar" (self-immolation) to preserve honor.',
    culturalStory:
      'No fortress in India carries a deeper spiritual weight than the 700-acre citadel of Chittorgarh. The legendary Rani Padmini and Rani Karnavati led thousands of women into the sacred fire pit rather than submitting to invading armies. In the Rajput chivalric code, the sacrifice of Chittor was viewed not as defeat, but as the supreme defiance of earthly submission in defense of spiritual sovereignty.',
    symbolism:
      'The saffron robe (kesariya) symbolizes the flame of the sun and eternal martyrdom, signifying that liberty and spiritual dignity transcend physical existence.',
    travelerEtiquette:
      'The Jauhar Kund grounds in Chittorgarh are consecrated memorial sites. Maintain solemnity, speak quietly, and refrain from running or playing music in the memorial areas.',
    proverbOrIdiom: {
      original: 'रण में जूझ मरे सूरमा, अमर करे कुल नाम।',
      transliteration: 'Ran mein joojh mare soorma, amar kare kul naam.',
      meaning: 'The warrior who falls valiantly on the battlefield immortalizes the clan forever.',
    },
    tags: ['Chittorgarh', 'History', 'Rajput', 'Courage'],
  },
  {
    id: 'pushkar-brahma-lake',
    slug: 'pushkar-brahma-lake',
    title: 'The Lotus Petal of Brahma: 52 Ghats & Sacred Pilgrimage',
    hindiTitle: 'ब्रह्मा जी री नगरी — पुष्कर सरोवर',
    category: 'Sacred Water & Architecture',
    destinationIds: ['pushkar'],
    image: VERIFIED_IMAGES.pushkar.holyLake,
    relatedCultureIds: ['baoris-water-sanctuary', 'dilwara-marble-virtuosity'],
    quickFact:
      'Pushkar is home to one of the only active consecrated temples dedicated to Lord Brahma in the entire world, situated on a lake formed where Brahma dropped a sacred lotus flower.',
    culturalStory:
      'According to the Padma Purana, Lord Brahma sought an earthly realm to perform a Mahayajna (great Vedic sacrifice). He dropped a blue lotus petal from the heavens, which struck the valley among the Aravalli hills, causing subterranean sweet water to spring forth in three holy pools. Around the central Sarovar, 52 heritage ghats were built by various royal houses of Rajasthan for spiritual cleansing and sunset deep-daan (floating earthen oil lamps).',
    symbolism:
      'The floating lotus represents immaculate purity rising unblemished from muddy waters, reminding pilgrims to cultivate detachment amidst worldly illusions.',
    travelerEtiquette:
      'Strict sanctity is observed in Pushkar: remove footwear before stepping onto the red stone steps of the ghats. Pushkar is strictly vegetarian and alcohol-free. Beware of touts offering "Pushkar passport" red threads for steep fees.',
    proverbOrIdiom: {
      original: 'तीर्थ राज पुष्कर — जहाँ सब पाप धुल जावे।',
      transliteration: 'Teerth Raj Pushkar, jahan sab paap dhul jaave.',
      meaning: 'Pushkar, King of Pilgrimages, where sacred waters grant tranquility to the soul.',
    },
    tags: ['Pushkar', 'Brahma', 'Spiritual', 'Pilgrimage'],
  },
  {
    id: 'bandhani-leheriya-dye',
    slug: 'bandhani-leheriya-dye',
    title: 'Bandhani & Leheriya: The Sacred Ripple of Monsoon Winds',
    hindiTitle: 'बंधेज एवं लहरिया',
    category: 'Artisan Crafts & Adornment',
    destinationIds: ['jaipur', 'jodhpur', 'bikaner', 'all'],
    image: VERIFIED_IMAGES.jaipur.blockPrinting,
    relatedCultureIds: ['silver-lac-adornments', 'ghoomar-sacred-dance'],
    quickFact:
      'A master Bandhani artisan can pinch and tie up to 10,000 microscopic knots with fine thread on a single sari before dipping it into natural indigo, madder, or turmeric dye baths.',
    culturalStory:
      'The word Bandhani comes from Sanskrit "bandh" (to tie). In the monochromatic desert landscape of sand and stone, bright textile dyeing became an emotional necessity. Leheriya (from "leher", meaning wave) produces diagonal ripple patterns mirroring water currents. Worn particularly by women during the monsoon festival of Teej, a green and crimson Leheriya dupatta symbolizes happiness, verdant crops, and marital devotion.',
    symbolism:
      'Yellow (Piliya) is gifted to new mothers celebrating fertility; red and crimson are bridal; while multi-colored mothra checks symbolize communal prosperity.',
    travelerEtiquette:
      'When shopping for authentic tie-dye in Jaipur or Jodhpur bazaars, look for slight variations in the knot-dots—imperfections are the hallmark of genuine hand-tied craftsmanship.',
    tags: ['Craft', 'Textile', 'Teej', 'Jaipur', 'Jodhpur'],
  },
  {
    id: 'silver-lac-adornments',
    slug: 'silver-lac-adornments',
    title: 'Silver & Lac: A Woman’s Sovereign Mobile Treasury',
    hindiTitle: 'लाख की चूड़ियाँ एवं चांदी के आभूषण',
    category: 'Artisan Crafts & Adornment',
    destinationIds: ['jaipur', 'jodhpur', 'jaisalmer', 'bikaner'],
    image: VERIFIED_IMAGES.jodhpur.jaswantThada,
    relatedCultureIds: ['bandhani-leheriya-dye', 'safa-pagri-turban'],
    quickFact:
      'Lac bangles are crafted by heating natural resin secreted by Kerria lacca insects onto wooden spools, adorned with mirrors and stones without any toxic synthetic glues.',
    culturalStory:
      'In centuries past, when banking institutions did not exist and desert clans lived nomadically, a woman\'s silver jewelry represented her private sovereign capital (Stridhan), protected by custom from family debts. Tribal women wear heavy silver Haslis (rigid neck collars), Pajebs (chiming anklets to deter desert snakes), and Borla (a bell-shaped forehead pendant symbolizing the third eye of wisdom). Jaipur\'s Maniharon ka Rasta remains the historic epicenter of lac jewelry craft.',
    symbolism:
      'The chiming sound of silver anklets (ghunghroo) is believed to bring positive domestic energy (Lakshmi) into the household and signal a gracious presence.',
    travelerEtiquette:
      'Watch lac bangle makers at work in Jaipur\'s old quarter; heating the resin over charcoal embers is an endangered heritage craft that deserves patronage.',
    tags: ['Jewelry', 'Bangles', 'Silver', 'Craft', 'Jaipur'],
  },
  {
    id: 'dilwara-marble-virtuosity',
    slug: 'dilwara-marble-virtuosity',
    title: 'Dilwara Marble Virtuosity: Stone Carved as Delicate as Silk',
    hindiTitle: 'दिलवाड़ा जैन मंदिर — संगमरमर का चमत्कार',
    category: 'Sacred Water & Architecture',
    destinationIds: ['mount-abu'],
    image: VERIFIED_IMAGES.mountAbu.dilwaraTemple,
    relatedCultureIds: ['bikaneri-haveli-sandstone', 'jharokha-and-jali'],
    quickFact:
      'The 11th–13th century Dilwara Jain temples on Mount Abu were carved with such astonishing delicacy that translucent marble ceilings resemble filigree lace, carved by rubbing stone dust with thread.',
    culturalStory:
      'Built by Jain ministers Vimal Shah and Vastupala-Tejpal high amidst the forested Aravalli sanctuary of Mount Abu, Dilwara was designed with an unassuming plain exterior to conceal the jaw-dropping virtuosity within from raiding armies. Intricately carved lotus pendants appear to float weightlessly from dome ceilings, demonstrating the Jain principle that ultimate devotion transforms the hardest earthly stone into feather-light devotion.',
    symbolism:
      'Pure white Makrana marble represents Ahimsa (non-violence) and the untainted purity of the soul liberated from worldly attachments.',
    travelerEtiquette:
      'Dilwara is an active, deeply revered Jain shrine. Strict guidelines apply: no leather items (belts, wallets, bags), no photography inside temple sanctums, and shoulders and knees must be respectfully covered.',
    tags: ['Mount Abu', 'Jain', 'Marble', 'Architecture', 'Spiritual'],
  },
  {
    id: 'bikaneri-haveli-sandstone',
    slug: 'bikaneri-haveli-sandstone',
    title: 'Rampuria Havelis: The Red Sandstone Splendor of Bikaner',
    hindiTitle: 'बीकानेर की रामपुरिया हवेलियाँ',
    category: 'Sacred Water & Architecture',
    destinationIds: ['bikaner'],
    image: VERIFIED_IMAGES.bikaner.rampuriaHavelis,
    relatedCultureIds: ['jharokha-and-jali', 'drought-culinary-genius'],
    quickFact:
      'Bikaner’s Dulmera red sandstone was carved by master artisans called "Ustas", who seamlessly blended Rajput, Mughal, and Victorian Baroque motifs on single haveli facades.',
    culturalStory:
      'During the 18th and 19th centuries, wealthy Marwari Oswal Jain merchant families amassed fortune along the Silk and caravan trade routes. To celebrate their homecoming to the desert oasis of Bikaner, they commissioned opulent havelis with hundreds of intricately carved jharokhas, gilded ceilings, and cool subterranean basements that housed treasures and spice ledgers.',
    symbolism:
      'The carved lotus buds, peacocks, and floral arabesques on facades symbolized auspicious welcome and business prosperity (Shubh-Laabh).',
    travelerEtiquette:
      'Walk unhurriedly through the narrow heritage lanes of old Bikaner on foot or via electric rickshaw; large vehicles cannot navigate these preserved medieval corridors.',
    tags: ['Bikaner', 'Havelis', 'Sandstone', 'Heritage'],
  },
];
