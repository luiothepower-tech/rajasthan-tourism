import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Badge } from '../ui/Badge';
import { Castle, Droplets, Palette, ArrowRight, Quote } from 'lucide-react';
import { Link } from '../../lib/router';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import { VERIFIED_IMAGES } from '../../data/imageAssets';

interface StoryChapter {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  icon: React.ReactNode;
  heroImage: string;
  secondaryImage: string;
  quote: string;
  author: string;
  narrative: string[];
  historicalFact: string;
  relatedDestination: { name: string; slug: string };
}

const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'living-forts',
    title: 'The Living Citadels of Thar',
    subtitle: 'Where medieval bastions are homes, not relics',
    tag: 'Living Heritage',
    icon: <Castle className="w-5 h-5" />,
    heroImage: VERIFIED_IMAGES.jaisalmer.sonarQila,
    secondaryImage: VERIFIED_IMAGES.jodhpur.mehrangarhBlueCity,
    quote: 'The fort does not merely commemorate our ancestors; it wakes with us, cooks with us, and watches our children grow.',
    author: 'Jaisalmer Fort generational silversmith',
    narrative: [
      'While castles across the globe stand as silent monuments fenced off by turnstiles, Rajasthan’s great fortresses remain vibrant living ecosystems. Inside the massive honeycombed ramparts of Jaisalmer’s Sonar Qila, nearly four thousand residents live in ancestral havelis, drawing water from centuries-old reservoirs and singing ancient Bhati ballads in sandstone courtyards.',
      'Perched upon sheer 400-foot volcanic rock, Jodhpur’s Mehrangarh fort guards an intact royal armoury and miniature painting guild, its shadow stretching over the labyrinthine indigo-tinted Brahmpuri alleys where families have lived continuously since the mid-15th century.',
    ],
    historicalFact: 'Sonar Qila is one of the world’s very few living UNESCO World Heritage forts where communities maintain continuous residence inside 99 massive stone bastions.',
    relatedDestination: { name: 'Explore Jaisalmer', slug: 'jaisalmer' },
  },
  {
    id: 'stepwells',
    title: 'Water Architecture & Desert Geometries',
    subtitle: 'Sacred subterranean labyrinths engineered for survival',
    tag: 'Ancient Engineering',
    icon: <Droplets className="w-5 h-5" />,
    heroImage: VERIFIED_IMAGES.jaipur.pannaMeenaKund,
    secondaryImage: VERIFIED_IMAGES.jaipur.pannaMeenaKund,
    quote: 'In Rajasthan, water is not merely chemistry; it is sacred architecture, prayer, and community gathering.',
    author: 'Architectural Historian of Mewar',
    narrative: [
      'In a landscape where monsoon rainfall is fleeting, medieval Rajasthani rulers and philanthropic queens engineered some of the world’s most intricate subterranean architecture: the baori (stepwell). Sites like Panna Meena ka Kund in Amer and Toorji ka Jhalra in Jodhpur transform water conservation into profound geometric art.',
      'Carved down dozens of meters into the bedrock, symmetrical criss-crossing stairways allowed people to descend to whatever level the aquifer rested at. Deep within the stone well, air temperatures were up to ten degrees cooler than the scorching desert above, creating sanctuaries for travelers and spiritual gatherings.',
    ],
    historicalFact: 'The intricate multi-tiered stepwells were engineered so perfectly that even during peak summer, subterranean temperatures remained naturally air-cooled.',
    relatedDestination: { name: 'Explore Amer & Jodhpur', slug: 'jaipur' },
  },
  {
    id: 'colors',
    title: 'The Quad-Color Realm of Rajputana',
    subtitle: 'How four chromatic codes came to define four royal capitals',
    tag: 'Chromatic Heritage',
    icon: <Palette className="w-5 h-5" />,
    heroImage: VERIFIED_IMAGES.jaipur.hawaMahal,
    secondaryImage: VERIFIED_IMAGES.udaipur.cityPalaceLake,
    quote: 'Color in Rajasthan is our weapon against the monotony of arid dust.',
    author: 'Master Artisan of Bagru',
    narrative: [
      'Each major capital of Rajasthan adopted a singular chromatic identity that transformed architecture into storytelling. Jaipur turned terracotta pink in 1876 by decree of Maharaja Ram Singh to welcome the Prince of Wales, a warm welcoming hue preserved by municipal ordinance to this day.',
      'Jodhpur bathed its Brahmin and merchant quarters in indigo copper-sulphate lime, which repelled termites and cooled interiors against the desert sun. Jaisalmer glistens like pure bullion with native Jurassic golden sandstone, while Udaipur gleams in white marble and lime plaster reflected across its tranquil lake basins.',
    ],
    historicalFact: 'Jaipur’s municipal law mandates that all buildings within the historic walled city gates maintain the designated terracotta pink tone.',
    relatedDestination: { name: 'Explore Jaipur', slug: 'jaipur' },
  },
];

export const CinematicStorySection: React.FC = () => {
  const [activeStoryId, setActiveStoryId] = useState<string>('living-forts');
  const activeStory = STORY_CHAPTERS.find((c) => c.id === activeStoryId) || STORY_CHAPTERS[0];

  return (
    <Section padding="lg" className="border-b border-[#E7DFD5] bg-[#FAF7F2]">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-10">
          <Badge variant="terracotta" size="sm">
            Editorial Photo Chronicle
          </Badge>
          <Heading level={2} variant="display" className="text-stone-900">
            A Land Sculpted by Sun, Sand, and Valour
          </Heading>
          <Text color="secondary" className="text-base sm:text-lg">
            Immerse yourself in the defining historical phenomena that shaped Rajasthan’s architecture, survival, and visual identity.
          </Text>
        </div>

        {/* Story Selector Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8">
          {STORY_CHAPTERS.map((chapter) => {
            const isSelected = chapter.id === activeStoryId;
            return (
              <button
                key={chapter.id}
                onClick={() => setActiveStoryId(chapter.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-[#1C1917] text-white shadow-md'
                    : 'bg-white text-stone-700 border border-[#E7DFD5] hover:bg-stone-100'
                }`}
              >
                <span className={isSelected ? 'text-[#D97706]' : 'text-stone-400'}>
                  {chapter.icon}
                </span>
                <span>{chapter.title}</span>
              </button>
            );
          })}
        </div>

        {/* Editorial Story Layout: Dual Imagery + Rich Narrative */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7DFD5] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#B85D38]">
                  {activeStory.tag}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
                  {activeStory.title}
                </h3>
                <p className="text-sm text-[#2A4B6B] font-medium font-serif italic">
                  {activeStory.subtitle}
                </p>
              </div>

              {/* Editorial Quote Box */}
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border-l-4 border-[#B85D38] space-y-2">
                <div className="flex items-start gap-2">
                  <Quote className="w-5 h-5 text-[#B85D38] shrink-0 opacity-60" />
                  <p className="font-serif italic text-sm text-stone-800 leading-relaxed">
                    "{activeStory.quote}"
                  </p>
                </div>
                <p className="text-[11px] text-stone-500 font-medium pl-7">
                  — {activeStory.author}
                </p>
              </div>

              {/* Narrative Prose */}
              <div className="space-y-3 text-stone-700 text-sm leading-relaxed font-light">
                {activeStory.narrative.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Architectural / Historical Fact */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-stone-800 space-y-1">
                <span className="font-bold text-[#B45309] block uppercase tracking-wider text-[10px]">
                  Historical Provenance
                </span>
                <p>{activeStory.historicalFact}</p>
              </div>

              <div className="pt-2">
                <Link
                  href={`/destinations/${activeStory.relatedDestination.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#B85D38] hover:text-[#9E4A2A]"
                >
                  <span>{activeStory.relatedDestination.name} in Detail</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Verified Photography Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-stone-900 group">
                <ResponsiveImage
                  src={activeStory.heroImage}
                  alt={activeStory.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-serif italic drop-shadow-xs z-10">
                  Photographed in Rajasthan • Real verified location
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-xs bg-stone-900 group">
                  <ResponsiveImage
                    src={activeStory.secondaryImage}
                    alt={activeStory.subtitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                </div>
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DFD5] flex flex-col justify-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                    Preserved Era
                  </span>
                  <p className="font-serif text-base font-bold text-stone-900">
                    12th – 18th Century
                  </p>
                  <p className="text-[11px] text-stone-600">
                    Authentic Rajputana dynastic heritage
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </Section>
  );
};
