import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from '../../lib/router';
import { tourismRepository } from '../../lib/repository';
import {
  Search,
  X,
  Compass,
  Utensils,
  Sparkles,
  Calendar,
  MapPin,
  ArrowRight,
  CornerDownLeft,
  Command,
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export type SearchCategory = 'all' | 'destination' | 'food' | 'experience' | 'festival';

export interface SearchResultItem {
  id: string;
  type: 'destination' | 'food' | 'experience' | 'festival';
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  targetUrl: string;
  badge: string;
  badgeVariant: 'terracotta' | 'saffron' | 'indigo' | 'sandstone';
  keywords: string[];
}

const POPULAR_SEARCHES = [
  { label: 'Jaipur Pink City', type: 'destination' as const, query: 'Jaipur' },
  { label: 'Dal Baati Churma', type: 'food' as const, query: 'Dal Baati' },
  { label: 'Udaipur Lake Palace', type: 'destination' as const, query: 'Udaipur' },
  { label: 'Thar Desert Safari', type: 'experience' as const, query: 'Desert' },
  { label: 'Ghevar Sweet', type: 'food' as const, query: 'Ghevar' },
  { label: 'Pushkar Camel Fair', type: 'festival' as const, query: 'Pushkar' },
  { label: 'Jaisalmer Golden Fort', type: 'destination' as const, query: 'Jaisalmer' },
];

export interface GlobalSearchProps {
  variant?: 'default' | 'drawer';
  onOpen?: () => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({
  variant = 'default',
  onOpen,
}) => {
  const { navigate } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Build searchable index from repository
  const searchIndex = useMemo<SearchResultItem[]>(() => {
    const items: SearchResultItem[] = [];

    // 1. Destinations
    const destinations = tourismRepository.getAllDestinations();
    for (const d of destinations) {
      const attractionNames = d.attractions.map((a) => a.name).join(' ');
      items.push({
        id: `dest-${d.id}`,
        type: 'destination',
        title: d.name,
        subtitle: `${d.moniker} • ${d.region} Region`,
        description: d.description,
        image: d.heroImage,
        targetUrl: `/destinations/${d.slug}`,
        badge: 'Destination',
        badgeVariant: 'terracotta',
        keywords: [
          d.name,
          d.moniker,
          d.region,
          d.bestTimeToVisit.idealMonths,
          d.bestTimeToVisit.season,
          attractionNames,
          ...d.tags,
        ],
      });
    }

    // 2. Cuisines / Food
    const foods = tourismRepository.getAllFoods();
    for (const f of foods) {
      items.push({
        id: `food-${f.id}`,
        type: 'food',
        title: f.name,
        subtitle: `${f.category} • ${f.region} Flavor`,
        description: f.description,
        image: f.image,
        targetUrl: `/food#${f.id}`,
        badge: 'Culinary Heritage',
        badgeVariant: 'saffron',
        keywords: [
          f.name,
          f.hindiName || '',
          f.category,
          f.region,
          f.tasteProfile,
          f.culturalStory,
        ],
      });
    }

    // 3. Experiences
    const experiences = tourismRepository.getAllExperiences();
    for (const exp of experiences) {
      items.push({
        id: `exp-${exp.id}`,
        type: 'experience',
        title: exp.title,
        subtitle: `${exp.category} • ${exp.duration}`,
        description: exp.description,
        image: exp.image,
        targetUrl: `/experiences#${exp.id}`,
        badge: 'Experience',
        badgeVariant: 'indigo',
        keywords: [
          exp.title,
          exp.category,
          exp.duration,
          ...exp.tags,
          ...exp.destinationIds,
        ],
      });
    }

    // 4. Festivals
    const festivals = tourismRepository.getAllFestivals();
    for (const fest of festivals) {
      items.push({
        id: `fest-${fest.id}`,
        type: 'festival',
        title: fest.name,
        subtitle: `${fest.approximateMonth} • ${fest.location}`,
        description: fest.description,
        image: fest.image,
        targetUrl: `/festivals#${fest.id}`,
        badge: 'Festival',
        badgeVariant: 'sandstone',
        keywords: [
          fest.name,
          fest.hindiName || '',
          fest.approximateMonth,
          fest.location,
          fest.culturalContext,
        ],
      });
    }

    return items;
  }, []);

  // Filtered results based on search query and category
  const filteredResults = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return [];

    return searchIndex.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.type !== activeCategory) {
        return false;
      }

      // Keyword and text matching
      const titleMatch = item.title.toLowerCase().includes(cleanQuery);
      const subtitleMatch = item.subtitle.toLowerCase().includes(cleanQuery);
      const descMatch = item.description.toLowerCase().includes(cleanQuery);
      const keywordsMatch = item.keywords.some((k) =>
        k.toLowerCase().includes(cleanQuery)
      );

      return titleMatch || subtitleMatch || descMatch || keywordsMatch;
    });
  }, [query, activeCategory, searchIndex]);

  // Reset selected index when filtered results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults]);

  // Global keyboard shortcut: Cmd+K or Ctrl+K or "/" to toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Navigate to target item
  const handleSelect = useCallback(
    (item: SearchResultItem) => {
      setIsOpen(false);
      setQuery('');

      if (item.targetUrl.includes('#')) {
        const [path, hash] = item.targetUrl.split('#');
        navigate(path);
        // Scroll to target element with smooth animation and highlight
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('ring-2', 'ring-[#B85D38]', 'ring-offset-2');
            setTimeout(() => {
              el.classList.remove('ring-2', 'ring-[#B85D38]', 'ring-offset-2');
            }, 2500);
          }
        }, 300);
      } else {
        navigate(item.targetUrl);
      }
    },
    [navigate]
  );

  // Keyboard navigation within list
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filteredResults.length ? (prev + 1) % filteredResults.length : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filteredResults.length
          ? (prev - 1 + filteredResults.length) % filteredResults.length
          : 0
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelect(filteredResults[selectedIndex]);
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.querySelector(
        `[data-search-index="${selectedIndex}"]`
      ) as HTMLElement | null;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  // Get icon for item type
  const getTypeIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'destination':
        return <Compass className="w-4 h-4 text-[#B85D38]" />;
      case 'food':
        return <Utensils className="w-4 h-4 text-[#D97706]" />;
      case 'experience':
        return <Sparkles className="w-4 h-4 text-[#4338CA]" />;
      case 'festival':
        return <Calendar className="w-4 h-4 text-[#B45309]" />;
    }
  };

  return (
    <>
      {variant === 'drawer' ? (
        /* Full-width Search Trigger for Mobile Navigation Drawer */
        <button
          type="button"
          onClick={() => {
            if (onOpen) onOpen();
            setIsOpen(true);
          }}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-[#E7DFD5] text-stone-600 hover:text-stone-900 hover:border-[#B85D38]/50 transition-all text-xs font-medium cursor-pointer shadow-2xs group"
          aria-label="Search destinations, food, culture"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-[#B85D38]" />
            <span className="text-stone-700">Search destinations, food, culture...</span>
          </div>
          <kbd className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-stone-500 bg-[#FAF7F2] border border-[#E7DFD5] rounded">
            ⌘K
          </kbd>
        </button>
      ) : (
        <>
          {/* Search Trigger Button in Header (Desktop) */}
          <button
            type="button"
            onClick={() => {
              if (onOpen) onOpen();
              setIsOpen(true);
            }}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-100/90 hover:bg-[#F5EFE6] border border-[#E7DFD5] text-stone-600 hover:text-stone-900 transition-all text-xs font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B85D38] shadow-2xs group"
            aria-label="Open global search (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#B85D38] transition-colors" />
            <span className="hidden lg:inline text-stone-500 group-hover:text-stone-700">
              Search destinations, food, culture...
            </span>
            <span className="inline lg:hidden text-stone-500">Search...</span>
            <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-stone-500 bg-white border border-[#E7DFD5] rounded shadow-2xs">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </button>

          {/* Search Icon Trigger for Mobile Header */}
          <button
            type="button"
            onClick={() => {
              if (onOpen) onOpen();
              setIsOpen(true);
            }}
            className="md:hidden p-2 text-stone-700 hover:text-[#B85D38] hover:bg-[#F5EFE6] rounded-md transition-colors cursor-pointer"
            aria-label="Search Rajasthan"
          >
            <Search className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Global Search Command Palette Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Global Travel Search"
          className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 md:p-12 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-[#FAF7F2] rounded-2xl border border-[#E7DFD5] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-stone-900 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Search Input Bar */}
            <div className="p-4 border-b border-[#E7DFD5] bg-white flex items-center gap-3">
              <Search className="w-5 h-5 text-[#B85D38] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                maxLength={60}
                value={query}
                onChange={(e) => {
                  // Defensive sanitization: limit length and remove dangerous script/tag characters
                  const sanitized = e.target.value.slice(0, 60).replace(/[<>{}\\]/g, '');
                  setQuery(sanitized);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Search destinations, dishes, royal forts, safaris..."
                className="w-full bg-transparent text-stone-900 placeholder-stone-400 text-sm sm:text-base focus:outline-none"
                aria-label="Search query"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-stone-400 hover:text-stone-700 rounded-md transition-colors cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="hidden sm:inline-flex px-2 py-1 text-xs font-mono text-stone-500 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-md transition-colors cursor-pointer"
                aria-label="Close search"
              >
                ESC
              </button>
            </div>

            {/* Category Filter Chips */}
            <div className="px-4 py-2.5 bg-[#F5EFE6] border-b border-[#E7DFD5] flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none">
              {(
                [
                  { id: 'all', label: 'All Echoes' },
                  { id: 'destination', label: 'Destinations' },
                  { id: 'food', label: 'Food & Cuisine' },
                  { id: 'experience', label: 'Experiences' },
                  { id: 'festival', label: 'Festivals' },
                ] as const
              ).map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#B85D38] text-white shadow-2xs'
                        : 'bg-white/80 text-stone-700 hover:bg-white border border-[#E7DFD5]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Content Results or Suggestions */}
            <div
              ref={resultsContainerRef}
              className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 divide-y divide-stone-100"
            >
              {/* If Query is empty: Show Popular Suggestions & Explorer Prompts */}
              {!query.trim() && (
                <div className="py-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase font-bold tracking-widest text-stone-500">
                      Popular Royal Inquiries
                    </span>
                    <span className="text-[11px] text-stone-400">
                      Press <kbd className="font-mono bg-stone-100 px-1 py-0.5 rounded">↑</kbd>{' '}
                      <kbd className="font-mono bg-stone-100 px-1 py-0.5 rounded">↓</kbd> to navigate
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((pop) => (
                      <button
                        key={pop.label}
                        type="button"
                        onClick={() => setQuery(pop.query)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#F5EFE6] border border-[#E7DFD5] text-xs font-medium text-stone-700 hover:text-[#B85D38] transition-all cursor-pointer shadow-2xs"
                      >
                        {pop.type === 'destination' && <Compass className="w-3.5 h-3.5 text-[#B85D38]" />}
                        {pop.type === 'food' && <Utensils className="w-3.5 h-3.5 text-[#D97706]" />}
                        {pop.type === 'experience' && <Sparkles className="w-3.5 h-3.5 text-[#4338CA]" />}
                        {pop.type === 'festival' && <Calendar className="w-3.5 h-3.5 text-[#B45309]" />}
                        <span>{pop.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-stone-200/60">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div
                        onClick={() => {
                          setIsOpen(false);
                          navigate('/destinations');
                        }}
                        className="p-3 bg-white rounded-xl border border-[#E7DFD5] hover:border-[#B85D38]/50 transition-all cursor-pointer group shadow-2xs"
                      >
                        <div className="flex items-center gap-2 text-xs font-semibold text-stone-900 group-hover:text-[#B85D38]">
                          <MapPin className="w-4 h-4 text-[#B85D38]" />
                          <span>8 Royal Realms</span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                          From Thar desert dunes to Mewar lake palaces.
                        </p>
                      </div>

                      <div
                        onClick={() => {
                          setIsOpen(false);
                          navigate('/food');
                        }}
                        className="p-3 bg-white rounded-xl border border-[#E7DFD5] hover:border-[#D97706]/50 transition-all cursor-pointer group shadow-2xs"
                      >
                        <div className="flex items-center gap-2 text-xs font-semibold text-stone-900 group-hover:text-[#D97706]">
                          <Utensils className="w-4 h-4 text-[#D97706]" />
                          <span>Culinary Legacy</span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                          Dal Baati Churma, Ghevar, Laal Maas & street delicacies.
                        </p>
                      </div>

                      <div
                        onClick={() => {
                          setIsOpen(false);
                          navigate('/planner');
                        }}
                        className="p-3 bg-white rounded-xl border border-[#E7DFD5] hover:border-[#B85D38]/50 transition-all cursor-pointer group shadow-2xs"
                      >
                        <div className="flex items-center gap-2 text-xs font-semibold text-stone-900 group-hover:text-[#B85D38]">
                          <Calendar className="w-4 h-4 text-[#B85D38]" />
                          <span>Trip Planner</span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                          Interactive circuit builder with dynamic budget tiers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* If Query is active and yields results */}
              {query.trim() && filteredResults.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between px-1 pb-1">
                    <span className="text-[11px] uppercase font-bold tracking-widest text-stone-500">
                      Discovered {filteredResults.length} Result{filteredResults.length > 1 ? 's' : ''}
                    </span>
                    <span className="text-[11px] text-stone-400">
                      Jump with <kbd className="font-mono bg-stone-100 px-1 py-0.5 rounded">Enter ↵</kbd>
                    </span>
                  </div>

                  {filteredResults.map((item, index) => {
                    const isSelected = selectedIndex === index;
                    return (
                      <div
                        key={item.id}
                        data-search-index={index}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`p-3 rounded-xl transition-all cursor-pointer flex items-start gap-3.5 group ${
                          isSelected
                            ? 'bg-white border border-[#B85D38]/40 shadow-xs translate-x-0.5'
                            : 'bg-white/60 hover:bg-white border border-transparent hover:border-[#E7DFD5]'
                        }`}
                      >
                        {/* Image Thumbnail or Category Icon */}
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-stone-200 border border-stone-200 relative flex items-center justify-center">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          ) : (
                            getTypeIcon(item.type)
                          )}
                        </div>

                        {/* Text Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-semibold text-stone-900 group-hover:text-[#B85D38] transition-colors truncate">
                              {item.title}
                            </h3>
                            <Badge variant={item.badgeVariant} size="sm">
                              {item.badge}
                            </Badge>
                          </div>
                          <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">
                            {item.subtitle}
                          </p>
                          <p className="text-xs text-stone-600 mt-1 line-clamp-2 font-light">
                            {item.description}
                          </p>
                        </div>

                        {/* Jump Action Indicator */}
                        <div className="shrink-0 flex items-center self-center text-stone-400 group-hover:text-[#B85D38] transition-colors">
                          <CornerDownLeft className="w-4 h-4 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity" />
                          <ArrowRight className="w-4 h-4 sm:hidden" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* If Query has No Results */}
              {query.trim() && filteredResults.length === 0 && (
                <div className="py-12 px-4 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#F9EBE5] text-[#B85D38] mx-auto flex items-center justify-center shadow-2xs">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    No royal annals found for &ldquo;{query}&rdquo;
                  </h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                    Try searching for classic destinations like &ldquo;Jaipur&rdquo;, authentic foods like &ldquo;Kachori&rdquo;, or experiences like &ldquo;Desert Safari&rdquo;.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-200 text-stone-800 hover:bg-stone-300 transition-colors cursor-pointer"
                    >
                      Reset Query
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer Bar */}
            <div className="px-4 py-2.5 bg-white border-t border-[#E7DFD5] flex items-center justify-between text-[11px] text-stone-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="font-mono bg-stone-100 px-1 py-0.5 rounded border border-stone-200">↑</kbd>
                  <kbd className="font-mono bg-stone-100 px-1 py-0.5 rounded border border-stone-200">↓</kbd>
                  <span>to navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="font-mono bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200">Enter</kbd>
                  <span>to select</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="font-mono bg-stone-100 px-1 py-0.5 rounded border border-stone-200">Esc</kbd>
                  <span>to exit</span>
                </span>
              </div>
              <span className="hidden sm:inline text-stone-400 font-serif italic">
                Rajasthan Royal Annals
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
