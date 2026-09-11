import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  Compass,
  MapPin,
  Sparkles,
  Ticket,
  Eye,
  X,
  Maximize2,
  Calendar,
  Layers,
  LayoutGrid,
  Columns2,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { Attraction } from '../types';
import { ResponsiveImage } from './ui/ResponsiveImage';
import { Badge } from './ui/Badge';
import { Heading } from './ui/Heading';
import { Text } from './ui/Text';

interface AttractionsEditorialSectionProps {
  destinationName: string;
  destinationHindiName?: string;
  attractions: Attraction[];
}

export const AttractionsEditorialSection: React.FC<AttractionsEditorialSectionProps> = ({
  destinationName,
  destinationHindiName,
  attractions,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [layoutMode, setLayoutMode] = useState<'magazine' | 'grid'>('magazine');
  const [inspectedAttraction, setInspectedAttraction] = useState<Attraction | null>(null);
  const [activeTapId, setActiveTapId] = useState<string | null>(null);
  const [savedAttractions, setSavedAttractions] = useState<string[]>([]);

  // Distinct categories available in this destination
  const categories = ['all', ...Array.from(new Set(attractions.map((a) => a.category)))];

  const filteredAttractions = selectedCategory === 'all'
    ? attractions
    : attractions.filter((a) => a.category === selectedCategory);

  const toggleSaveAttraction = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedAttractions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCardClick = (attraction: Attraction) => {
    // If mobile tap, first toggle active state or open dossier
    if (activeTapId === attraction.id) {
      setInspectedAttraction(attraction);
    } else {
      setActiveTapId(attraction.id);
    }
  };

  return (
    <section id="signature-attractions-section" className="py-16 md:py-24 bg-[#FAF7F2] border-b border-[#E7DFD5] relative overflow-hidden">
      {/* Subtle architectural background motifs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F3ECE1] rounded-full blur-3xl -mr-20 -mt-20 opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F4EDE2] rounded-full blur-3xl -ml-20 -mb-20 opacity-60 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#F9EBE5] text-[#9E4A2A] border border-[#F3D4C7]">
                <Sparkles className="w-3.5 h-3.5 text-[#B85D38]" />
                Architectural Monoliths & Citadels
              </span>
              {destinationHindiName && (
                <span className="font-serif text-sm text-stone-500 tracking-wide font-normal">
                  {destinationHindiName} के दर्शनीय स्थल
                </span>
              )}
            </div>

            <Heading level={2} variant="h2" className="text-stone-900 font-serif tracking-tight">
              Signature Attractions of {destinationName}
            </Heading>

            <Text color="secondary" className="text-base text-stone-600 leading-relaxed">
              Living stone chronicles: fortified hill-crests, labyrinthine royal palaces, and ancient hydrological marvels that define Rajasthan’s enduring genius.
            </Text>
          </div>

          {/* Controls: Filter & Layout Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter Pills */}
            <div className="flex items-center bg-white/80 backdrop-blur-sm p-1 rounded-xl border border-stone-200/80 shadow-xs overflow-x-auto max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`filter-attraction-${cat}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#9E4A2A] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  {cat === 'all' ? 'All Heritage' : cat}
                </button>
              ))}
            </div>

            {/* Layout Mode Toggle */}
            <div className="hidden sm:flex items-center bg-white/80 backdrop-blur-sm p-1 rounded-xl border border-stone-200/80 shadow-xs">
              <button
                id="layout-magazine-mode"
                onClick={() => setLayoutMode('magazine')}
                title="Magazine Editorial Layout"
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  layoutMode === 'magazine'
                    ? 'bg-[#1C1917] text-white'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Columns2 className="w-4 h-4" />
              </button>
              <button
                id="layout-grid-mode"
                onClick={() => setLayoutMode('grid')}
                title="Curator Grid Layout"
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  layoutMode === 'grid'
                    ? 'bg-[#1C1917] text-white'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Attractions Presentation */}
        {layoutMode === 'magazine' && filteredAttractions.length >= 2 ? (
          /* Editorial Magazine Layout: Featured Hero + Architectural Companion Cards */
          <div className="space-y-8">
            {/* Primary Featured Monument Spotlight */}
            {filteredAttractions[0] && (
              <div
                id={`featured-attraction-${filteredAttractions[0].id}`}
                onClick={() => setInspectedAttraction(filteredAttractions[0])}
                className="group relative rounded-2xl md:rounded-3xl overflow-hidden bg-stone-900 border border-stone-800/80 shadow-xl cursor-pointer transition-all duration-500 hover:shadow-2xl hover:border-amber-500/40"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] md:min-h-[520px]">
                  {/* Cinematic Image Canvas */}
                  <div className="lg:col-span-7 relative overflow-hidden h-72 sm:h-96 lg:h-full">
                    <ResponsiveImage
                      src={filteredAttractions[0].image}
                      alt={filteredAttractions[0].name}
                      className="w-full h-full object-cover transform transition-transform duration-1000 ease-out group-hover:scale-108"
                    />
                    {/* Multi-layered cinematic gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-stone-950/30 lg:to-stone-950" />

                    {/* Top Floating Badges */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/90 text-stone-950 shadow-md backdrop-blur-md">
                        Key Landmark
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/60 text-stone-200 border border-white/20 backdrop-blur-md">
                        {filteredAttractions[0].category}
                      </span>
                    </div>

                    {/* Quick Expand Button */}
                    <button
                      id={`inspect-monument-btn-${filteredAttractions[0].id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectedAttraction(filteredAttractions[0]);
                      }}
                      className="absolute bottom-4 right-4 z-10 px-3.5 py-2 rounded-xl bg-black/60 hover:bg-black/90 text-white text-xs font-medium border border-white/20 backdrop-blur-md flex items-center gap-1.5 transition-all group-hover:bg-amber-500 group-hover:text-stone-950 group-hover:border-amber-400 shadow-lg"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Examine Dossier</span>
                    </button>
                  </div>

                  {/* Editorial Text & Architectural Dossier Panel */}
                  <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-stone-950 text-stone-100 relative z-10">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-stone-400">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-400" />
                          {filteredAttractions[0].location}
                        </span>
                        {filteredAttractions[0].hindiName && (
                          <span className="font-serif text-amber-300 text-sm tracking-wide">
                            {filteredAttractions[0].hindiName}
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight group-hover:text-amber-200 transition-colors">
                        {filteredAttractions[0].name}
                      </h3>

                      <p className="text-stone-300 text-sm sm:text-base leading-relaxed line-clamp-3 lg:line-clamp-4">
                        {filteredAttractions[0].description}
                      </p>

                      {/* Editorial Insight Tip */}
                      {filteredAttractions[0].editorialTip && (
                        <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 text-xs text-amber-200/90 flex items-start gap-2.5">
                          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <p className="leading-snug">
                            <span className="font-semibold text-amber-300">Curator Tip: </span>
                            {filteredAttractions[0].editorialTip}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Key Architectural Specs Grid */}
                    <div className="mt-6 pt-6 border-t border-stone-800 grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-stone-500 uppercase tracking-wider block text-[10px]">
                          Architectural Style
                        </span>
                        <span className="font-medium text-stone-200 mt-0.5 block truncate">
                          {filteredAttractions[0].architecturalStyle || 'Classical Rajput Architecture'}
                        </span>
                      </div>

                      <div>
                        <span className="text-stone-500 uppercase tracking-wider block text-[10px]">
                          Construction Era
                        </span>
                        <span className="font-medium text-stone-200 mt-0.5 block truncate">
                          {filteredAttractions[0].builtYear || 'Historical Rajputana Period'}
                        </span>
                      </div>

                      <div>
                        <span className="text-stone-500 uppercase tracking-wider block text-[10px]">
                          Recommended Time
                        </span>
                        <span className="font-medium text-stone-200 mt-0.5 block flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-400" />
                          {filteredAttractions[0].recommendedDuration || '2 - 3 Hours'}
                        </span>
                      </div>

                      <div>
                        <span className="text-stone-500 uppercase tracking-wider block text-[10px]">
                          Visiting Hours
                        </span>
                        <span className="font-medium text-stone-200 mt-0.5 block truncate">
                          {filteredAttractions[0].timings || 'Daylight Hours'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Companion Heritage Cards (Remaining attractions in filtered list) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {filteredAttractions.slice(1).map((attraction) => (
                <div
                  key={attraction.id}
                  id={`companion-attraction-${attraction.id}`}
                  onClick={() => handleCardClick(attraction)}
                  className={`group relative rounded-2xl overflow-hidden bg-white border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                    activeTapId === attraction.id ? 'ring-2 ring-[#9E4A2A]' : ''
                  }`}
                >
                  {/* Visual Photographic Section with Cinematic Zoom & Gradient Scrim */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                    <ResponsiveImage
                      src={attraction.image}
                      alt={attraction.name}
                      className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Smooth overlay gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                      <Badge variant="sandstone" size="sm" className="bg-black/60 text-amber-300 border-white/20 backdrop-blur-md font-semibold">
                        {attraction.category}
                      </Badge>
                      <button
                        onClick={(e) => toggleSaveAttraction(attraction.id, e)}
                        title={savedAttractions.includes(attraction.id) ? 'Saved' : 'Save Attraction'}
                        className={`p-2 rounded-full backdrop-blur-md transition-all ${
                          savedAttractions.includes(attraction.id)
                            ? 'bg-[#9E4A2A] text-white'
                            : 'bg-black/40 text-stone-200 hover:bg-black/70'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10">
                      <div className="flex items-center justify-between text-xs text-stone-300 mb-1">
                        <span className="flex items-center gap-1 truncate max-w-[65%]">
                          <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                          {attraction.location}
                        </span>
                        {attraction.hindiName && (
                          <span className="font-serif text-amber-300 font-normal">
                            {attraction.hindiName}
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-sm group-hover:text-amber-200 transition-colors">
                        {attraction.name}
                      </h4>
                    </div>
                  </div>

                  {/* Body Specs */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2">
                      {attraction.description}
                    </p>

                    {attraction.editorialTip && (
                      <div className="p-3 rounded-lg bg-[#FAF5EE] border border-[#EFE5D5] text-[11px] text-stone-700 leading-snug flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#B85D38] shrink-0 mt-0.5" />
                        <p>
                          <span className="font-medium text-stone-900">Curator Tip: </span>
                          {attraction.editorialTip}
                        </p>
                      </div>
                    )}

                    {/* Metadata Footer */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        {attraction.recommendedDuration || '1.5 Hours'}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setInspectedAttraction(attraction);
                        }}
                        className="text-xs font-semibold text-[#9E4A2A] hover:text-[#7A361C] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>View Details</span>
                        <Maximize2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* High-Craft Curator Grid Layout (Used for grid toggle or single filter) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredAttractions.map((attraction) => (
              <div
                key={attraction.id}
                id={`grid-attraction-${attraction.id}`}
                onClick={() => handleCardClick(attraction)}
                className={`group relative rounded-2xl overflow-hidden bg-white border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col justify-between ${
                  activeTapId === attraction.id ? 'ring-2 ring-[#9E4A2A]' : ''
                }`}
              >
                {/* Cinematic Image Canvas with Overlay */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                  <ResponsiveImage
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent transition-opacity duration-300" />

                  {/* Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <Badge variant="sandstone" size="sm" className="bg-black/60 text-amber-300 border-white/20 backdrop-blur-md font-semibold">
                      {attraction.category}
                    </Badge>
                    <button
                      onClick={(e) => toggleSaveAttraction(attraction.id, e)}
                      title={savedAttractions.includes(attraction.id) ? 'Saved' : 'Save Attraction'}
                      className={`p-2 rounded-full backdrop-blur-md transition-all ${
                        savedAttractions.includes(attraction.id)
                          ? 'bg-[#9E4A2A] text-white'
                          : 'bg-black/40 text-stone-200 hover:bg-black/70'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Title & Location Overlay */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10">
                    <div className="flex items-center justify-between text-xs text-stone-300 mb-1">
                      <span className="flex items-center gap-1 truncate max-w-[70%]">
                        <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                        {attraction.location}
                      </span>
                      {attraction.hindiName && (
                        <span className="font-serif text-amber-300 text-xs">
                          {attraction.hindiName}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-white tracking-tight drop-shadow-sm group-hover:text-amber-200 transition-colors">
                      {attraction.name}
                    </h3>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {attraction.description}
                  </p>

                  {/* Built Era & Architectural Style pill */}
                  {(attraction.architecturalStyle || attraction.builtYear) && (
                    <div className="space-y-1.5 py-2 px-3 rounded-lg bg-stone-50 border border-stone-200/60 text-[11px] text-stone-700">
                      {attraction.architecturalStyle && (
                        <div className="flex items-center justify-between">
                          <span className="text-stone-500">Style:</span>
                          <span className="font-medium truncate max-w-[70%]">{attraction.architecturalStyle}</span>
                        </div>
                      )}
                      {attraction.builtYear && (
                        <div className="flex items-center justify-between">
                          <span className="text-stone-500">Era:</span>
                          <span className="font-medium truncate max-w-[70%]">{attraction.builtYear}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Footer Timings & Action */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span className="truncate max-w-[60%]">{attraction.timings}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectedAttraction(attraction);
                      }}
                      className="font-semibold text-[#9E4A2A] hover:text-[#7A361C] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Explore</span>
                      <Maximize2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty Filter State */}
        {filteredAttractions.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
            <Compass className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <p className="font-serif text-lg text-stone-800">No monuments found in this category</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-3 px-4 py-2 bg-[#9E4A2A] text-white rounded-lg text-xs font-semibold"
            >
              Reset to All Heritage
            </button>
          </div>
        )}
      </div>

      {/* Cinematic Architectural Dossier Modal Dialog */}
      <AnimatePresence>
        {inspectedAttraction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop Scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInspectedAttraction(null)}
              className="fixed inset-0 bg-stone-950/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-300 z-10 flex flex-col"
            >
              {/* Close Button */}
              <button
                id="close-dossier-btn"
                onClick={() => setInspectedAttraction(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md transition-colors"
                aria-label="Close Dossier"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Cinematic Header Image */}
              <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-stone-900">
                <ResponsiveImage
                  src={inspectedAttraction.image}
                  alt={inspectedAttraction.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-4 sm:right-8 z-10 text-white">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-400 text-stone-950">
                      {inspectedAttraction.category}
                    </span>
                    {inspectedAttraction.hindiName && (
                      <span className="font-serif text-amber-200 text-sm">
                        {inspectedAttraction.hindiName}
                      </span>
                    )}
                    <span className="text-xs text-stone-300 flex items-center gap-1 ml-auto">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {inspectedAttraction.location}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                    {inspectedAttraction.name}
                  </h3>
                </div>
              </div>

              {/* Content Specifications */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Description */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                    Architectural & Cultural Narrative
                  </h4>
                  <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                    {inspectedAttraction.description}
                  </p>
                </div>

                {/* Curator Insider Insight */}
                {inspectedAttraction.editorialTip && (
                  <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-amber-900 block mb-0.5">
                        Architectural Dossier Note & Insider Tip:
                      </span>
                      <p className="text-amber-900/90 leading-relaxed">
                        {inspectedAttraction.editorialTip}
                      </p>
                    </div>
                  </div>
                )}

                {/* Detailed Specifications Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-3">
                    <Layers className="w-4 h-4 text-[#9E4A2A] shrink-0 mt-1" />
                    <div>
                      <span className="text-[11px] text-stone-500 uppercase tracking-wider block">
                        Architectural Style
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-stone-900">
                        {inspectedAttraction.architecturalStyle || 'Classical Rajputana Stonecraft'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-[#9E4A2A] shrink-0 mt-1" />
                    <div>
                      <span className="text-[11px] text-stone-500 uppercase tracking-wider block">
                        Patron & Era
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-stone-900">
                        {inspectedAttraction.builtYear || 'Historical Rajput Heritage'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#9E4A2A] shrink-0 mt-1" />
                    <div>
                      <span className="text-[11px] text-stone-500 uppercase tracking-wider block">
                        Operating Hours & Recommended Stay
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-stone-900 block">
                        {inspectedAttraction.timings || 'Daylight Hours'}
                      </span>
                      <span className="text-[11px] text-stone-500">
                        Est. Duration: {inspectedAttraction.recommendedDuration || '2 Hours'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-3">
                    <Ticket className="w-4 h-4 text-[#9E4A2A] shrink-0 mt-1" />
                    <div>
                      <span className="text-[11px] text-stone-500 uppercase tracking-wider block">
                        Entry Tariffs & Best Visiting Hour
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-stone-900 block">
                        {inspectedAttraction.entryFee || 'Standard Monument Ticket'}
                      </span>
                      {inspectedAttraction.bestVisitingTime && (
                        <span className="text-[11px] text-amber-700">
                          Optimal: {inspectedAttraction.bestVisitingTime}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
                  <button
                    onClick={() => toggleSaveAttraction(inspectedAttraction.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                      savedAttractions.includes(inspectedAttraction.id)
                        ? 'bg-[#9E4A2A] text-white'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {savedAttractions.includes(inspectedAttraction.id)
                        ? 'Bookmarked in Dossier'
                        : 'Bookmark Monument'}
                    </span>
                  </button>

                  <button
                    onClick={() => setInspectedAttraction(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors"
                  >
                    Close Dossier
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
