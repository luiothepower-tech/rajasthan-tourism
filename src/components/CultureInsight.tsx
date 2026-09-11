/**
 * CultureInsight — Reusable Rajasthani Traditions & Heritage Quick-Facts Modal
 * Displays authentic living customs, regional etiquette, attire symbolism,
 * and architectural lore.
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  BookOpen,
  Search,
  Shuffle,
  Check,
  Copy,
  Info,
  ShieldCheck,
  Compass,
  Layers,
  MapPin,
} from 'lucide-react';
import {
  CULTURAL_INSIGHTS_DATA,
  CultureInsightItem,
  CultureInsightCategory,
} from '../data/culturalInsights';

export interface CultureInsightProps {
  isOpen: boolean;
  onClose: () => void;
  destinationId?: string;
  destinationName?: string;
  initialTraditionId?: string;
}

const CATEGORIES: { label: string; value: CultureInsightCategory | 'All' }[] = [
  { label: 'All Traditions', value: 'All' },
  { label: 'Customs & Hospitality', value: 'Customs & Hospitality' },
  { label: 'Attire & Safa', value: 'Attire & Safa Heritage' },
  { label: 'Sacred Water & Architecture', value: 'Sacred Water & Architecture' },
  { label: 'Folk Rhythms & Arts', value: 'Folk Rhythms & Performance' },
  { label: 'Desert Cuisine', value: 'Culinary Traditions & Preservation' },
  { label: 'Artisan Crafts', value: 'Artisan Crafts & Adornment' },
  { label: 'Warrior Codes', value: 'Warrior Codes & Sacred Lore' },
];

export const CultureInsight: React.FC<CultureInsightProps> = ({
  isOpen,
  onClose,
  destinationId,
  destinationName,
  initialTraditionId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CultureInsightCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyDestination, setOnlyDestination] = useState(Boolean(destinationId));
  const [activeSpotlightIndex, setActiveSpotlightIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync onlyDestination filter when destinationId changes
  useEffect(() => {
    if (destinationId) {
      setOnlyDestination(true);
    } else {
      setOnlyDestination(false);
    }
  }, [destinationId]);

  // Lock body scroll when modal is open and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Clear toast after timeout
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Filter items based on active criteria
  const filteredInsights = useMemo(() => {
    return CULTURAL_INSIGHTS_DATA.filter((item) => {
      // Destination filter
      if (onlyDestination && destinationId) {
        const matchesDest =
          item.destinationIds.includes(destinationId.toLowerCase()) ||
          item.destinationIds.includes('all');
        if (!matchesDest) return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesHindi = item.hindiTitle.toLowerCase().includes(query);
        const matchesFact = item.quickFact.toLowerCase().includes(query);
        const matchesStory = item.culturalStory.toLowerCase().includes(query);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(query));
        return matchesTitle || matchesHindi || matchesFact || matchesStory || matchesTags;
      }

      return true;
    });
  }, [destinationId, onlyDestination, selectedCategory, searchQuery]);

  // Spotlight quick fact selection
  const currentSpotlight = useMemo(() => {
    if (filteredInsights.length === 0) {
      return CULTURAL_INSIGHTS_DATA[0];
    }
    const idx = activeSpotlightIndex % filteredInsights.length;
    return filteredInsights[idx];
  }, [filteredInsights, activeSpotlightIndex]);

  const shuffleSpotlight = useCallback(() => {
    if (filteredInsights.length <= 1) return;
    setActiveSpotlightIndex((prev) => (prev + 1) % filteredInsights.length);
  }, [filteredInsights.length]);

  const handleCopyInsight = (item: CultureInsightItem) => {
    const textToCopy = `✨ ${item.title} (${item.hindiTitle})\n\n💡 Quick Fact: ${item.quickFact}\n\n📜 Cultural Context: ${item.culturalStory}\n\n🙏 Traveler Etiquette: ${item.travelerEtiquette}\n\n— Rajasthan Tourism Cultural Chronicle`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopiedId(item.id);
          setToastMessage(`Copied "${item.title}" quick-fact to clipboard!`);
          setTimeout(() => setCopiedId(null), 2500);
        })
        .catch(() => {
          setToastMessage('Could not copy to clipboard. Please copy manually.');
        });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="culture-insight-modal-root"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="culture-insight-modal-title"
        >
          {/* Backdrop Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.12 }}
            className="relative w-full max-w-4xl max-h-[92vh] bg-[#FAF7F2] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E7DFD5] z-10 flex flex-col overflow-hidden text-stone-900"
          >
            {/* Header with Royal Rajasthani Banner */}
            <div className="relative bg-[#241B15] text-[#FAF7F2] px-5 sm:px-8 py-5 sm:py-6 border-b border-[#3D2E24] shrink-0">
              {/* Subtle ornamental arch background */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#D97706 1px, transparent 1px)`,
                  backgroundSize: '16px 16px',
                }}
              />

              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#B85D38] text-white tracking-wide">
                      <Sparkles className="w-3.5 h-3.5" />
                      Living Heritage
                    </span>
                    <span className="text-xs font-serif text-amber-300">
                      राजस्थानी परम्परा एवं संस्कृति
                    </span>
                  </div>

                  <h2
                    id="culture-insight-modal-title"
                    className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF7F2]"
                  >
                    Rajasthani Cultural Insights
                  </h2>

                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    Living customs, attire codes, architectural symbolism, and authentic traveler
                    etiquette for respectful exploration.
                  </p>
                </div>

                {/* Close Button */}
                <button
                  id="close-culture-insight-modal"
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white transition-colors shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-label="Close cultural insights modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scope Switcher & Search Bar */}
              <div className="relative z-10 mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Destination Filter Toggle */}
                {destinationId && (
                  <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-xl border border-white/10 shrink-0 text-xs">
                    <button
                      type="button"
                      onClick={() => setOnlyDestination(true)}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                        onlyDestination
                          ? 'bg-[#B85D38] text-white shadow-xs'
                          : 'text-stone-300 hover:text-white'
                      }`}
                    >
                      {destinationName || destinationId} Focused
                    </button>
                    <button
                      type="button"
                      onClick={() => setOnlyDestination(false)}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                        !onlyDestination
                          ? 'bg-[#B85D38] text-white shadow-xs'
                          : 'text-stone-300 hover:text-white'
                      }`}
                    >
                      All Rajasthan
                    </button>
                  </div>
                )}

                {/* Search Box */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search traditions, turbans, proverbs, or customs..."
                    className="w-full pl-9 pr-8 py-1.5 bg-stone-900/80 border border-white/15 rounded-xl text-xs text-white placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Filter Category Pills */}
            <div className="px-5 sm:px-8 py-2.5 bg-[#F4EFE6] border-b border-[#E7DFD5] overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                <Layers className="w-3 h-3" />
                Category:
              </span>
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#241B15] text-[#FAF7F2] shadow-xs'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border border-[#E7DFD5]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1">
              {/* Quick Fact Spotlight ("Did You Know?" banner) */}
              {currentSpotlight && (
                <div className="bg-gradient-to-br from-[#FFFDF9] to-[#F7EFE3] rounded-2xl border border-[#D97706]/30 p-4 sm:p-5 shadow-xs relative overflow-hidden">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-amber-500/15 text-amber-800">
                        <BookOpen className="w-4 h-4" />
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                        Did You Know? • Cultural Spotlight
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={shuffleSpotlight}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-stone-700 text-xs font-medium border border-stone-200 transition-colors shadow-2xs"
                      title="Show another quick fact"
                    >
                      <Shuffle className="w-3.5 h-3.5 text-amber-700" />
                      <span>Shuffle Trivia</span>
                    </button>
                  </div>

                  <p className="font-serif text-base sm:text-lg text-stone-900 font-bold leading-snug">
                    "{currentSpotlight.quickFact}"
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-xs text-stone-600 flex-wrap">
                    <span className="font-semibold text-[#B85D38]">
                      Tradition: {currentSpotlight.title}
                    </span>
                    <span>•</span>
                    <span className="text-stone-500">{currentSpotlight.category}</span>
                  </div>
                </div>
              )}

              {/* Results Count & Current Filter Label */}
              <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                <span>
                  Displaying{' '}
                  <strong className="text-stone-900">{filteredInsights.length}</strong> cultural
                  tradition{filteredInsights.length === 1 ? '' : 's'}
                  {destinationName && onlyDestination ? ` for ${destinationName}` : ''}
                </span>
                {(searchQuery || selectedCategory !== 'All' || onlyDestination) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setOnlyDestination(false);
                    }}
                    className="text-[#B85D38] hover:underline font-semibold"
                  >
                    Reset all filters
                  </button>
                )}
              </div>

              {/* Grid of Traditions */}
              {filteredInsights.length === 0 ? (
                <div className="text-center py-12 px-4 bg-white rounded-2xl border border-dashed border-stone-300">
                  <Compass className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                  <h4 className="font-serif text-lg font-bold text-stone-800">
                    No matching traditions found
                  </h4>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
                    Try clearing your search query or selecting "All Traditions" to explore the full
                    Rajasthani cultural repository.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setOnlyDestination(false);
                    }}
                    className="mt-4 px-4 py-1.5 rounded-lg bg-[#241B15] text-white text-xs font-semibold hover:bg-stone-800"
                  >
                    Show All Traditions
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5">
                  {filteredInsights.map((item) => {
                    const isCopied = copiedId === item.id;
                    const isHighlighted = initialTraditionId === item.id;

                    return (
                      <div
                        key={item.id}
                        id={`tradition-${item.id}`}
                        className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all shadow-xs ${
                          isHighlighted
                            ? 'border-amber-500 ring-2 ring-amber-400/20'
                            : 'border-[#E7DFD5] hover:border-stone-400'
                        }`}
                      >
                        {/* Header: Category Badge + Hindi Title + Copy Button */}
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#FAF7F2] text-[#B85D38] border border-[#E7DFD5]">
                                {item.category}
                              </span>
                              <span className="font-serif text-base text-amber-800 font-medium">
                                {item.hindiTitle}
                              </span>
                            </div>
                            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
                              {item.title}
                            </h3>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleCopyInsight(item)}
                            className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-all shrink-0 ${
                              isCopied
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                : 'bg-[#FAF7F2] hover:bg-stone-100 border-[#E7DFD5] text-stone-600'
                            }`}
                            title="Copy tradition summary to clipboard"
                            aria-label={`Copy ${item.title}`}
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="hidden sm:inline font-semibold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Share</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Quick Fact Callout Box */}
                        <div className="p-3.5 bg-amber-50/70 border-l-4 border-amber-500 rounded-r-xl mb-4">
                          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                            <Info className="w-3.5 h-3.5 text-amber-700" />
                            <span>Quick Fact</span>
                          </div>
                          <p className="text-xs sm:text-sm font-medium text-stone-800 leading-relaxed">
                            {item.quickFact}
                          </p>
                        </div>

                        {/* Traditional Proverb or Ballad Quote */}
                        {item.proverbOrIdiom && (
                          <div className="p-3.5 bg-[#FAF7F2] border border-[#E7DFD5] rounded-xl mb-4">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block mb-1">
                              Traditional Proverb & Folk Ballad:
                            </span>
                            <p className="font-serif text-base text-stone-900 font-bold mb-1">
                              "{item.proverbOrIdiom.original}"
                            </p>
                            <p className="text-xs italic text-stone-600 mb-1">
                              Transliteration: {item.proverbOrIdiom.transliteration}
                            </p>
                            <p className="text-xs text-stone-700 font-medium">
                              Meaning: {item.proverbOrIdiom.meaning}
                            </p>
                          </div>
                        )}

                        {/* Cultural Story & Context */}
                        <div className="space-y-2 mb-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
                          <p>{item.culturalStory}</p>
                        </div>

                        {/* Deep Symbolism & Meaning */}
                        <div className="text-xs text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-200/80 mb-4">
                          <strong className="text-stone-900 block mb-1">
                            Symbolism & Philosophical Depth:
                          </strong>
                          <span>{item.symbolism}</span>
                        </div>

                        {/* Traveler Etiquette Guidance */}
                        <div className="flex items-start gap-2.5 p-3.5 bg-emerald-50/70 border border-emerald-200/70 rounded-xl text-xs text-emerald-950">
                          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-emerald-900 block mb-0.5">
                              Traveler Etiquette & Cultural Do's:
                            </span>
                            <span className="text-emerald-900/90 leading-relaxed">
                              {item.travelerEtiquette}
                            </span>
                          </div>
                        </div>

                        {/* Tags & Linked Regions */}
                        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2 flex-wrap text-xs text-stone-500">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[11px] text-stone-400">Themes:</span>
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 bg-stone-100 text-stone-600 rounded text-[10px] font-medium"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-1 text-[11px] text-stone-400">
                            <MapPin className="w-3 h-3 text-[#B85D38]" />
                            <span>
                              {item.destinationIds.includes('all')
                                ? 'Statewide Rajasthan'
                                : item.destinationIds.map((d) => d.toUpperCase()).join(' • ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Notice & Quick Action */}
            <div className="px-5 sm:px-8 py-3.5 bg-white border-t border-[#E7DFD5] flex items-center justify-between gap-3 text-xs text-stone-600 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B85D38]" />
                <span className="hidden sm:inline">
                  Respect local customs • Preserve heritage monuments • Support traditional artisans
                </span>
                <span className="sm:hidden">Authentic Rajasthani Heritage</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-[#241B15] text-[#FAF7F2] font-semibold hover:bg-stone-800 transition-colors"
              >
                Close Insights
              </button>
            </div>
          </motion.div>

          {/* Floating Toast Notification */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-60 px-4 py-2.5 bg-stone-900 text-white text-xs rounded-xl shadow-xl flex items-center gap-2 border border-stone-700"
              >
                <Check className="w-4 h-4 text-amber-400" />
                <span>{toastMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};
