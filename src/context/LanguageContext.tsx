import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';

export type Language = 'en' | 'hi';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  isHindi: boolean;
}

const STORAGE_KEY = 'rajasthan_explorer_lang';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Brand & Header
    'brand.title': 'Rajasthan',
    'brand.subtitle': 'Tourism Experience',
    'brand.tagline': 'Royal Heritage Experience',
    'nav.destinations': 'Destinations',
    'nav.experiences': 'Experiences',
    'nav.food': 'Culinary Heritage',
    'nav.festivals': 'Festivals',
    'nav.travelGuide': 'Travel Guide',
    'nav.planner': 'Plan Itinerary',
    'nav.home': 'Home Experience',
    'nav.exploreRajasthan': 'Explore Royal Rajasthan',
    'nav.search': 'Search',
    'nav.searchPlaceholder': 'Search destinations, food, culture...',
    'nav.searchAria': 'Search Rajasthan destinations, food, culture',
    'nav.skipToContent': 'Skip to main content',

    // Language switcher
    'lang.current': 'English',
    'lang.switch': 'Switch to Hindi (हिन्दी)',
    'lang.toggleAria': 'Toggle language between English and Hindi',

    // Hero Section
    'hero.greeting': 'पधारो म्हारे देश',
    'hero.welcome': 'Welcome to the Royal Realm',
    'hero.soundscapeOn': 'Soundscape: On',
    'hero.ambientAudio': 'Ambient Audio',
    'hero.exploreDossier': 'Explore Dossier',
    'hero.craftItinerary': 'Craft Itinerary',
    'hero.searchPlaceholder': 'Search fortresses, lake palaces, desert safaris, foods...',
    'hero.clearSearch': 'Clear search',
    'hero.jumpTo': 'Jump to',

    // Hero Slides Content
    'hero.slide.jaipur.title': 'Echoes of Terracotta & Astronomical Wonders',
    'hero.slide.jaipur.desc': 'The geometric royal capital planned by Maharajas and bathed in warm terracotta pink, framed by the wind-swept honeycomb facade of Hawa Mahal.',
    'hero.slide.jaipur.moniker': 'The Pink City',
    'hero.slide.udaipur.title': 'White Marble Palaces upon Shimmering Waters',
    'hero.slide.udaipur.desc': 'Surrounded by the ancient Aravalli ridges, floating water palaces mirror the twilight skies of Lake Pichola in an unbroken four-century Mewar legacy.',
    'hero.slide.udaipur.moniker': 'The City of Lakes',
    'hero.slide.jodhpur.title': 'Cobalt Blue Alleys under the Colossus of Mehrangarh',
    'hero.slide.jodhpur.desc': 'A magnificent sea of indigo rooftops beneath the impregnable sandstone fortress that overlooks the golden threshold of the Thar.',
    'hero.slide.jodhpur.moniker': 'The Blue City',
    'hero.slide.jaisalmer.title': 'The Living Golden Citadel Amidst Singing Dunes',
    'hero.slide.jaisalmer.desc': 'Yellow sandstone battlements rising like a mirage from the Thar, where families, artists, and havelis still reside inside a 12th-century fortress.',
    'hero.slide.jaisalmer.moniker': 'The Golden City',

    // Destination Discovery
    'dest.curatedEpicenters': 'Curated Epicenters',
    'dest.verifiedDossiers': 'Verified Photographic Dossiers',
    'dest.headline': 'The Eight Royal Realms of Rajasthan',
    'dest.subheadline': 'Each destination preserves distinct architectural traditions, dialect, and culinary secrets. Filter by historic region to begin your discovery.',
    'dest.viewAll': 'View All 8 Dossiers',
    'dest.quickPreview': 'Quick Preview',
    'dest.fullDossier': 'Full Dossier',
    'dest.highlights': 'Highlights',
    'dest.recommendedDuration': 'Duration',
    'dest.filterAll': 'All Regions (8)',
    'dest.filterDhundhar': 'Dhundhar (Jaipur)',
    'dest.filterMewar': 'Mewar (Udaipur & Chittor)',
    'dest.filterMarwar': 'Marwar (Jodhpur & Pushkar)',
    'dest.filterThar': 'Thar Desert (Jaisalmer)',
    'dest.filterBikaner': 'Bikaner (Caravan Hub)',
    'dest.filterSirohi': 'Sirohi (Mount Abu)',

    // Global Search Modal
    'search.modalTitle': 'Search Rajasthan Heritage',
    'search.inputPlaceholder': 'Search destinations, royal forts, Rajasthani dishes, festivals...',
    'search.categoryAll': 'All Records',
    'search.categoryDest': 'Destinations',
    'search.categoryFood': 'Culinary',
    'search.categoryExp': 'Experiences',
    'search.categoryFest': 'Festivals',
    'search.popularSearches': 'Popular Searches',
    'search.noResults': 'No matching cultural records found',
    'search.escHint': 'ESC to close',
    'search.navigateHint': 'to navigate',
    'search.selectHint': 'to select',

    // Personality Filter
    'personality.badge': 'Curated Perspectives',
    'personality.title': 'Find Rajasthan Through Your Travel Lens',
    'personality.subtitle': 'Filter experiences and destinations curated to your travel passion and seasonal comfort.',

    // Footer
    'footer.about': 'An editorial travel chronicle and interactive spatial exploration of India’s most storied desert state. Crafted to discover the living heritage, colossal fortresses, and culinary soul of Rajputana.',
    'footer.independent': 'Independent Cultural Heritage & Travel Chronicle',
    'footer.destinationsTitle': 'Destinations',
    'footer.cultureTitle': 'Culture & Living Arts',
    'footer.planningTitle': 'Trip Crafting',
    'footer.legalTitle': 'Transparency & Legal',
    'footer.viewAllDest': 'View All 8 Destinations →',
    'footer.safariLink': 'Thar Stargazing & Safaris',
    'footer.foodLink': 'Dal Baati & Desert Gastronomy',
    'footer.festivalsLink': 'Pushkar Fair & Camel Festivals',
    'footer.guideLink': 'Seasonal Weather & Etiquette',
    'footer.itineraryLink': 'Itinerary Builder',
    'footer.budgetLink': 'Budget Estimator',
    'footer.mapLink': 'Interactive Map',
    'footer.privacyLink': 'Privacy Policy',
    'footer.termsLink': 'Terms of Use',
    'footer.assetLink': 'Asset & Licensing Directory',
    'footer.disclaimer': 'Independent Educational Project: Rajasthan Explorer is an independent educational/travel project and is not affiliated with or endorsed by the Government of Rajasthan or Rajasthan Tourism. Budget figures and schedules represent educational simulation models.',
    'footer.designedWith': 'Designed with',
    'footer.forHeritage': 'for Rajasthan cultural heritage',

    // Common Buttons & Actions
    'action.back': 'Back',
    'action.close': 'Close',
    'action.explore': 'Explore',
    'action.viewDetails': 'View Details',
    'action.reset': 'Reset',
    'action.apply': 'Apply',
  },
  hi: {
    // Brand & Header
    'brand.title': 'राजस्थान',
    'brand.subtitle': 'पर्यटन अनुभव',
    'brand.tagline': 'शाही सांस्कृतिक धरोहर',
    'nav.destinations': 'प्रमुख गंतव्य',
    'nav.experiences': 'अनुभव',
    'nav.food': 'खानपान धरोहर',
    'nav.festivals': 'उत्सव एवं मेले',
    'nav.travelGuide': 'यात्रा गाइड',
    'nav.planner': 'यात्रा योजना',
    'nav.home': 'मुख्य पृष्ठ',
    'nav.exploreRajasthan': 'शाही राजस्थान की खोज',
    'nav.search': 'खोजें',
    'nav.searchPlaceholder': 'गंतव्य, खानपान, संस्कृति खोजें...',
    'nav.searchAria': 'राजस्थान के गंतव्य, खानपान और संस्कृति खोजें',
    'nav.skipToContent': 'सीधे मुख्य सामग्री पर जाएं',

    // Language switcher
    'lang.current': 'हिन्दी',
    'lang.switch': 'Switch to English',
    'lang.toggleAria': 'अंग्रेज़ी और हिन्दी के बीच भाषा बदलें',

    // Hero Section
    'hero.greeting': 'पधारो म्हारे देश',
    'hero.welcome': 'राजपूताना की पावन भूमि में स्वागत है',
    'hero.soundscapeOn': 'ध्वनि अनुभव: चालू',
    'hero.ambientAudio': 'वातावरण संगीत',
    'hero.exploreDossier': 'विवरण देखें',
    'hero.craftItinerary': 'योजना बनाएं',
    'hero.searchPlaceholder': 'किले, झील महल, मरुस्थल सफारी, पारंपरिक व्यंजन खोजें...',
    'hero.clearSearch': 'खोज हटाएं',
    'hero.jumpTo': 'सीधे जाएं',

    // Hero Slides Content
    'hero.slide.jaipur.title': 'गुलाबी आभा और खगोलीय कला का अनुपम संगम',
    'hero.slide.jaipur.desc': 'महाराजाओं द्वारा नियोजित ज्यामितीय राजधानी, हवा महल के 953 झरोखों से गूंजती मरुधरा की अमर गाथाएं।',
    'hero.slide.jaipur.moniker': 'गुलाबी नगरी',
    'hero.slide.udaipur.title': 'झिलमिलाती झीलों पर श्वेत संगमरमरी प्रासाद',
    'hero.slide.udaipur.desc': 'अरावली की प्राचीन पहाड़ियों से घिरा, पिछोला झील पर तैरता जलमहल और चार शताब्दियों की अटूट मेवाड़ विरासत।',
    'hero.slide.udaipur.moniker': 'झीलों की नगरी',
    'hero.slide.jodhpur.title': 'मेहरानगढ़ के साये में नीली गलियों का सम्मोहन',
    'hero.slide.jodhpur.desc': 'थार के प्रवेश द्वार पर अभेद्य बलुआ पत्थर का विशाल दुर्ग और नीचे फैला गहरे नीले मकानों का अनुपम दृश्य।',
    'hero.slide.jodhpur.moniker': 'नीली नगरी',
    'hero.slide.jaisalmer.title': 'सुनहरे टीलों के बीच जीवंत स्वर्ण दुर्ग',
    'hero.slide.jaisalmer.desc': 'थार के तपते मरुस्थल में किसी स्वप्न सा उभरता पीला बलुआ पत्थर का दुर्ग, जहां आज भी 12वीं सदी से जीवन धड़कता है।',
    'hero.slide.jaisalmer.moniker': 'स्वर्ण नगरी',

    // Destination Discovery
    'dest.curatedEpicenters': 'प्रमुख ऐतिहासिक केंद्र',
    'dest.verifiedDossiers': 'सत्यापित सांस्कृतिक दस्तावेज',
    'dest.headline': 'राजस्थान के आठ शाही अंचल',
    'dest.subheadline': 'प्रत्येक अंचल अपनी अद्वितीय स्थापत्य कला, बोली और खानपान को संजोए हुए है। अपनी खोज आरंभ करने के लिए क्षेत्र चुनें।',
    'dest.viewAll': 'सभी 8 गंतव्य देखें',
    'dest.quickPreview': 'त्वरित झलक',
    'dest.fullDossier': 'विस्तृत विवरण',
    'dest.highlights': 'प्रमुख आकर्षण',
    'dest.recommendedDuration': 'अनुशंसित समय',
    'dest.filterAll': 'सभी अंचल (8)',
    'dest.filterDhundhar': 'ढूंढाड़ (जयपुर)',
    'dest.filterMewar': 'मेवाड़ (उदयपुर एवं चित्तौड़)',
    'dest.filterMarwar': 'मारवाड़ (जोधपुर एवं पुष्कर)',
    'dest.filterThar': 'थार मरुस्थल (जैसलमेर)',
    'dest.filterBikaner': 'बीकानेर (काफिला मार्ग)',
    'dest.filterSirohi': 'सिरोही (माउंट आबू)',

    // Global Search Modal
    'search.modalTitle': 'राजस्थान धरोहर खोजें',
    'search.inputPlaceholder': 'गंतव्य, शाही दुर्ग, राजस्थानी व्यंजन, लोक उत्सव खोजें...',
    'search.categoryAll': 'समस्त सामग्री',
    'search.categoryDest': 'गंतव्य',
    'search.categoryFood': 'खानपान',
    'search.categoryExp': 'अनुभव',
    'search.categoryFest': 'उत्सव',
    'search.popularSearches': 'लोकप्रिय खोजें',
    'search.noResults': 'कोई सांस्कृतिक परिणाम नहीं मिला',
    'search.escHint': 'बंद करने हेतु ESC',
    'search.navigateHint': 'आगे-पीछे जाने हेतु',
    'search.selectHint': 'चयन करने हेतु',

    // Personality Filter
    'personality.badge': 'विशेष दृष्टिकोण',
    'personality.title': 'अपनी रुचि के अनुसार राजस्थान को जानें',
    'personality.subtitle': 'अपनी यात्रा की पसंद और मौसम के अनुसार तैयार किए गए अनुभव और स्थान चुनें।',

    // Footer
    'footer.about': 'भारत के सबसे ऐतिहासिक मरुस्थली राज्य की सांस्कृतिक यात्रा और संवादात्मक भौगोलिक खोज। राजपूताना की सजीव विरासत, विशाल दुर्गों और खानपान की आत्मा को जानने के लिए समर्पित।',
    'footer.independent': 'स्वतंत्र सांस्कृतिक धरोहर एवं यात्रा संकलन',
    'footer.destinationsTitle': 'प्रमुख गंतव्य',
    'footer.cultureTitle': 'संस्कृति एवं लोक कलाएं',
    'footer.planningTitle': 'यात्रा निर्माण',
    'footer.legalTitle': 'पारदर्शिता एवं नियम',
    'footer.viewAllDest': 'सभी 8 गंतव्य देखें →',
    'footer.safariLink': 'थार रात्रि सफारी एवं तारे दर्शन',
    'footer.foodLink': 'दाल बाटी चूरमा एवं मरुधरा स्वाद',
    'footer.festivalsLink': 'पुष्कर मेला एवं ऊंट उत्सव',
    'footer.guideLink': 'मौसम चक्र एवं शिष्टाचार',
    'footer.itineraryLink': 'यात्रा कार्यक्रम निर्माता',
    'footer.budgetLink': 'लागत आकलन कैलकुलेटर',
    'footer.mapLink': 'संवादात्मक नक्शा',
    'footer.privacyLink': 'गोपनीयता नीति',
    'footer.termsLink': 'नियम एवं शर्तें',
    'footer.assetLink': 'चित्र एवं लाइसेंस सूची',
    'footer.disclaimer': 'स्वतंत्र शैक्षणिक परियोजना: राजस्थान एक्सप्लोरर एक स्वतंत्र शैक्षणिक व यात्रा परियोजना है। इसका राजस्थान सरकार अथवा राजस्थान पर्यटन विभाग से कोई प्रत्यक्ष संबंध या अनुमोदन नहीं है। सभी लागत और समय अनुमान शैक्षणिक सिमुलेशन मॉडल हैं।',
    'footer.designedWith': 'सप्रेम निर्मित',
    'footer.forHeritage': 'राजस्थान की सांस्कृतिक धरोहर के लिए',

    // Common Buttons & Actions
    'action.back': 'पीछे जाएं',
    'action.close': 'बंद करें',
    'action.explore': 'खोजें',
    'action.viewDetails': 'विवरण देखें',
    'action.reset': 'रीसेट',
    'action.apply': 'लागू करें',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'hi' || saved === 'en') {
        return saved;
      }
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: string, fallback?: string): string => {
    const dict = TRANSLATIONS[language];
    if (dict && dict[key]) {
      return dict[key];
    }
    const enDict = TRANSLATIONS.en;
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return fallback || key;
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      isHindi: language === 'hi',
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
