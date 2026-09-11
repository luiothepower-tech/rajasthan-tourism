import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter, Link } from '../../lib/router';
import { tourismRepository } from '../../lib/repository';
import { soundscapeEngine } from '../../lib/soundscape';
import { Destination } from '../../types';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import { VERIFIED_IMAGES } from '../../data/imageAssets';
import {
  Compass,
  Volume2,
  VolumeX,
  Search,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Shield,
  Utensils,
  Landmark,
} from 'lucide-react';

interface HeroSlide {
  id: string;
  name: string;
  moniker: string;
  region: string;
  title: string;
  description: string;
  imageUrl: string;
  destinationSlug: string;
  quote: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'jaipur',
    name: 'Jaipur',
    moniker: 'The Pink City',
    region: 'Dhundhar',
    title: 'Echoes of Terracotta & Astronomical Wonders',
    description: 'The geometric royal capital planned by Maharajas and bathed in warm terracotta pink, framed by the wind-swept honeycomb facade of Hawa Mahal.',
    imageUrl: VERIFIED_IMAGES.jaipur.hero,
    destinationSlug: 'jaipur',
    quote: 'Where 953 carved sandstone windows whisper ancient desert songs.',
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    moniker: 'The City of Lakes',
    region: 'Mewar',
    title: 'White Marble Palaces upon Shimmering Waters',
    description: 'Surrounded by the ancient Aravalli ridges, floating water palaces mirror the twilight skies of Lake Pichola in an unbroken four-century Mewar legacy.',
    imageUrl: VERIFIED_IMAGES.udaipur.hero,
    destinationSlug: 'udaipur',
    quote: 'The romantic cradle of Rajput chivalry resting upon crystalline waters.',
  },
  {
    id: 'jodhpur',
    name: 'Jodhpur',
    moniker: 'The Blue City',
    region: 'Marwar',
    title: 'Indigo Alleys beneath the Monolithic Fort',
    description: 'An azure ocean of flat-roofed houses sprawling beneath the towering basalt ramparts of Mehrangarh Fort, where ancient stepwells hold living history.',
    imageUrl: VERIFIED_IMAGES.jodhpur.hero,
    destinationSlug: 'jodhpur',
    quote: 'A 400-foot fortress cliff guarding the desert frontier for 560 years.',
  },
  {
    id: 'jaisalmer',
    name: 'Jaisalmer',
    moniker: 'The Golden City',
    region: 'Thar',
    title: 'Living Sandstone Citadel in the Shifting Dunes',
    description: 'A jurassic golden fortress rising like an ethereal desert mirage, where families, Jain temples, and generational havelis thrive inside active medieval walls.',
    imageUrl: VERIFIED_IMAGES.jaisalmer.hero,
    destinationSlug: 'jaisalmer',
    quote: 'A living citadel carved from golden sandstone against the endless Thar.',
  },
];

interface HeroSectionProps {
  onSelectMood?: (mood: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectMood }) => {
  const router = useRouter();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const destinations = tourismRepository.getAllDestinations();
  const currentSlide = HERO_SLIDES[activeSlideIndex];

  // Auto advance slide every 8 seconds unless user paused
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleAudio = () => {
    const playing = soundscapeEngine.toggle();
    setIsAudioPlaying(playing);
  };

  const handleSearchChange = (val: string) => {
    // Defensive input sanitization: limit length to 50 chars and strip control/injection characters
    const sanitized = val.slice(0, 50).replace(/[<>{}\\]/g, '');
    setSearchQuery(sanitized);
  };

  // Search results
  const searchResults = searchQuery.trim().length > 1
    ? destinations.filter(d =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.moniker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-[95vh] bg-[#1C1917] text-white flex flex-col justify-between overflow-hidden">
      {/* Background Cinematic Image Carousel with smooth crossfade and subtle scale-down */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === activeSlideIndex;
          return (
            <motion.div
              key={slide.id}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.05,
              }}
              transition={{
                opacity: { duration: 1.2, ease: 'easeInOut' },
                scale: { duration: 7, ease: 'easeOut' },
              }}
              className={`absolute inset-0 ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
            >
              <ResponsiveImage
                src={slide.imageUrl}
                alt={`${slide.name} - ${slide.title}`}
                className="w-full h-full object-cover object-center"
              />
              {/* Multi-layered cinematic gradient overlays for high contrast editorial legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/65 to-[#1C1917]/35" />
              <div className="absolute inset-0 bg-radial from-transparent via-[#1C1917]/35 to-[#1C1917]/85" />
            </motion.div>
          );
        })}
      </div>

      {/* Top Bar Utilities: Cultural greeting & Ambient Soundscape Toggle */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-serif italic tracking-wide text-amber-200">
            पधारो म्हारे देश
          </span>
          <span className="hidden sm:inline-block text-xs uppercase tracking-[0.2em] text-stone-300 font-medium">
            Welcome to the Royal Realm
          </span>
        </div>

        {/* Ambient Soundscape Controller */}
        <button
          onClick={handleToggleAudio}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border transition-all cursor-pointer ${
            isAudioPlaying
              ? 'bg-[#B85D38] border-[#B85D38] text-white shadow-lg shadow-[#B85D38]/30'
              : 'bg-white/10 border-white/20 text-stone-200 hover:bg-white/20'
          }`}
          title="Toggle ambient Indian classical Tanpura drone and desert breeze"
          aria-label={isAudioPlaying ? 'Mute ambient soundscape' : 'Play ambient soundscape'}
        >
          {isAudioPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              <span>Soundscape: On</span>
              <span className="flex items-end gap-0.5 h-3 ml-1">
                <span className="w-0.5 h-full bg-white animate-bounce" />
                <span className="w-0.5 h-2/3 bg-white animate-bounce delay-75" />
                <span className="w-0.5 h-4/5 bg-white animate-bounce delay-150" />
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 opacity-80" />
              <span>Ambient Audio</span>
            </>
          )}
        </button>
      </div>

      {/* Main Center Content: Headline & Editorial Narrative with Staggered Animations */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12, delayChildren: 0.05 },
                },
                exit: { opacity: 0, transition: { duration: 0.3 } },
              }}
              className="space-y-6"
            >
              {/* Active Chapter Label */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="flex items-center gap-3"
              >
                <span className="text-xs uppercase font-semibold tracking-[0.3em] text-[#D97706] drop-shadow-xs">
                  {currentSlide.region} Realm • {currentSlide.name}
                </span>
                <span className="w-8 h-[1px] bg-amber-500/50" />
                <span className="text-xs text-stone-300 font-serif italic">
                  {currentSlide.moniker}
                </span>
              </motion.div>

              {/* Majestic Display Headline with upward reveal */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
                }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]"
              >
                {currentSlide.title}
              </motion.h1>

              {/* Poetic description with delayed reveal */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
                }}
                className="text-base sm:text-lg text-stone-200 leading-relaxed font-light max-w-2xl"
              >
                {currentSlide.description}
              </motion.p>

              {/* Quick Action Buttons with delayed reveal */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Link
                  href={`/destinations/${currentSlide.destinationSlug}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#B85D38] hover:bg-[#9E4A2A] text-white font-medium text-sm transition-all shadow-lg shadow-[#B85D38]/30 hover:scale-[1.02]"
                >
                  <span>Explore {currentSlide.name} Dossier</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/planner"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-stone-100 font-medium text-sm backdrop-blur-md transition-all hover:scale-[1.02]"
                >
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span>Craft Itinerary</span>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Live Quick-Jump Search Box with Defensive Input Sanitization */}
          <div className="pt-2 relative max-w-xl">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 absolute left-4 text-stone-400 pointer-events-none" />
              <input
                type="text"
                maxLength={50}
                placeholder="Search fortresses, lake palaces, desert safaris, foods..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#B85D38] focus:bg-black/60 backdrop-blur-md transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-xs text-stone-400 hover:text-white px-2 py-1 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dropdown Live Results */}
            {isSearchFocused && searchResults.length > 0 && (
              <div
                className="absolute top-full left-0 right-0 mt-2 bg-[#FAF7F2] text-stone-900 rounded-xl shadow-2xl border border-stone-200 overflow-hidden z-30"
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              >
                <div className="p-2 border-b border-stone-200 bg-stone-100/80 text-[11px] uppercase font-semibold tracking-wider text-stone-500">
                  Matching Destinations & Heritage
                </div>
                <div className="divide-y divide-stone-100 max-h-64 overflow-y-auto">
                  {searchResults.map((item) => (
                    <Link
                      key={item.id}
                      href={`/destinations/${item.slug}`}
                      className="p-3 flex items-center justify-between hover:bg-stone-100 transition-colors group"
                      onClick={() => setIsSearchFocused(false)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md overflow-hidden shrink-0">
                          <ResponsiveImage
                            src={item.heroImage}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-serif font-bold text-stone-900 group-hover:text-[#B85D38]">
                            {item.name}
                          </div>
                          <div className="text-xs text-stone-500">{item.moniker} • {item.region}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cinematic Scroll Indicator */}
      <div className="relative z-10 w-full flex justify-center pb-2">
        <a
          href="#editorial-intro"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('editorial-intro')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group flex flex-col items-center gap-1.5 text-stone-400 hover:text-amber-200 transition-colors cursor-pointer focus:outline-none"
          aria-label="Scroll down to explore editorial introduction"
        >
          <span className="text-[10px] uppercase font-semibold tracking-[0.25em] text-stone-400 group-hover:text-amber-200 transition-colors">
            Descend Into The Annals
          </span>
          <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1 group-hover:border-amber-300/60 transition-colors">
            <div className="w-1 h-2 rounded-full bg-amber-300 animate-bounce" />
          </div>
        </a>
      </div>

      {/* Bottom Bar: Carousel Switcher & Core Dimension Metrics */}
      <div className="relative z-10 border-t border-white/10 bg-[#1C1917]/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Chapter Slides Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs uppercase font-semibold tracking-wider text-stone-400 mr-2 shrink-0">
              Featured Chapters:
            </span>
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setActiveSlideIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  idx === activeSlideIndex
                    ? 'bg-white text-stone-900 font-bold shadow-xs'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${idx === activeSlideIndex ? 'bg-[#B85D38]' : 'bg-stone-500'}`} />
                <span>{slide.name}</span>
              </button>
            ))}
          </div>

          {/* Quick Travel Dimensions */}
          <div className="flex items-center gap-6 text-stone-300 text-xs shrink-0">
            <div className="flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-amber-400" />
              <span><strong>8</strong> Royal Regions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#B85D38]" />
              <span><strong>32+</strong> Heritage Forts</span>
            </div>
            <div className="flex items-center gap-1.5 hidden sm:flex">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span><strong>1000+</strong> Yrs Living History</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
