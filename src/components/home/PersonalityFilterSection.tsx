import React, { useState } from 'react';
import { Link } from '../../lib/router';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { LinkButton } from '../ui/LinkButton';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import { VERIFIED_IMAGES } from '../../data/imageAssets';
import {
  Castle,
  Heart,
  Compass,
  Sparkles,
  Utensils,
  ArrowRight,
  Clock,
  MapPin,
  Check,
} from 'lucide-react';

interface PersonalityArchetype {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tagline: string;
  recommendedDuration: string;
  recommendedDestinations: { name: string; slug: string; role: string }[];
  curatedExperiences: {
    title: string;
    image: string;
    location: string;
    note: string;
  }[];
  circuitRoute: string;
}

const PERSONALITIES: PersonalityArchetype[] = [
  {
    id: 'historian',
    title: 'Heritage Historian',
    subtitle: 'Fortresses, Armour & Chivalry',
    icon: <Castle className="w-5 h-5" />,
    tagline: 'Stand upon 400-foot basalt cliffs and walk the mirror halls of royal dynasties.',
    recommendedDuration: '6 - 8 Days',
    circuitRoute: 'Jaipur → Jodhpur → Chittorgarh → Bikaner',
    recommendedDestinations: [
      { name: 'Jaipur', slug: 'jaipur', role: 'Amer Fort & Astronomical Observatory' },
      { name: 'Jodhpur', slug: 'jodhpur', role: 'Mehrangarh Fort & Armoury' },
      { name: 'Chittorgarh', slug: 'chittorgarh', role: '700-Acre UNESCO Citadel' },
      { name: 'Bikaner', slug: 'bikaner', role: 'Undefeated Junagarh Fort' },
    ],
    curatedExperiences: [
      {
        title: 'Brahmpuri Ramparts & Blue City History',
        image: VERIFIED_IMAGES.jodhpur.mehrangarhBlueCity,
        location: 'Jodhpur',
        note: 'Centuries of Rathore architecture built into living sheer cliffs.',
      },
      {
        title: 'Amer Fort Sheesh Mahal Mirror Craft',
        image: VERIFIED_IMAGES.jaipur.amerFort,
        location: 'Jaipur',
        note: 'Intricate Belgian glass mosaics reflecting candlelight across marble ceilings.',
      },
    ],
  },
  {
    id: 'romantic',
    title: 'Romantic Wanderer',
    subtitle: 'Water Palaces & Sunset Ghats',
    icon: <Heart className="w-5 h-5" />,
    tagline: 'Twilight boat cruises on calm waters and candlelight courtyards encircled by hills.',
    recommendedDuration: '4 - 6 Days',
    circuitRoute: 'Udaipur → Pushkar → Jaipur',
    recommendedDestinations: [
      { name: 'Udaipur', slug: 'udaipur', role: 'Lake Pichola & Island Palaces' },
      { name: 'Pushkar', slug: 'pushkar', role: '52 Sacred Ghats at Twilight' },
      { name: 'Jaipur', slug: 'jaipur', role: 'Jal Mahal Water Palace' },
    ],
    curatedExperiences: [
      {
        title: 'Sunset Gondola on Lake Pichola',
        image: VERIFIED_IMAGES.udaipur.ghatsDusk,
        location: 'Udaipur',
        note: 'Gilded boat passage as Jag Mandir illuminates against the dusk Aravalli sky.',
      },
      {
        title: 'Evening Aarti at Pushkar Lake Ghats',
        image: VERIFIED_IMAGES.pushkar.holyLake,
        location: 'Pushkar',
        note: 'Flickering oil lamps and chiming bells echoing across the sacred water body.',
      },
    ],
  },
  {
    id: 'nomad',
    title: 'Desert Nomad',
    subtitle: 'Stargazing, Camels & Dunes',
    icon: <Compass className="w-5 h-5" />,
    tagline: 'Venture deep into the Thar desert where golden dunes shift under the Milky Way.',
    recommendedDuration: '5 - 7 Days',
    circuitRoute: 'Jodhpur → Jaisalmer → Thar Dunes → Bikaner',
    recommendedDestinations: [
      { name: 'Jaisalmer', slug: 'jaisalmer', role: 'Sonar Qila Living Fortress' },
      { name: 'Sam Dunes', slug: 'jaisalmer', role: 'Overnight Thar Stargazing Camp' },
      { name: 'Bikaner', slug: 'bikaner', role: 'Caravan Route & Camel Breeding' },
    ],
    curatedExperiences: [
      {
        title: 'Thar Desert Stargaze & Folk Ballads',
        image: VERIFIED_IMAGES.jaisalmer.samDunes,
        location: 'Jaisalmer Dunes',
        note: 'Listening to Manganiyar kamaicha music beside an acacia campfire.',
      },
      {
        title: 'Sonar Qila Golden Sandstone Alleys',
        image: VERIFIED_IMAGES.jaisalmer.sonarQila,
        location: 'Jaisalmer',
        note: 'A vibrant 800-year-old fort where residents still live inside bastions.',
      },
    ],
  },
  {
    id: 'spiritual',
    title: 'Spiritual Seeker',
    subtitle: 'Sacred Lakes & Mountain Sanctuaries',
    icon: <Sparkles className="w-5 h-5" />,
    tagline: 'Rare Brahma shrines, 11th-century carved Jain marble, and tranquil holy ghats.',
    recommendedDuration: '4 - 5 Days',
    circuitRoute: 'Pushkar → Mount Abu → Udaipur',
    recommendedDestinations: [
      { name: 'Pushkar', slug: 'pushkar', role: 'World’s Foremost Brahma Temple' },
      { name: 'Mount Abu', slug: 'mount-abu', role: 'Dilwara Intricate Marble Temples' },
      { name: 'Udaipur', slug: 'udaipur', role: '17th-Century Jagdish Temple' },
    ],
    curatedExperiences: [
      {
        title: 'Dilwara Translucent Marble Lotus Ceilings',
        image: VERIFIED_IMAGES.mountAbu.dilwaraTemple,
        location: 'Mount Abu',
        note: 'Stone filigree carved so sheer that natural daylight passes through petals.',
      },
      {
        title: 'Brahma Temple Sacred Pilgrimage',
        image: VERIFIED_IMAGES.pushkar.brahmaTemple,
        location: 'Pushkar',
        note: 'Dating back to the 14th century, crowned by a distinct vermillion spire.',
      },
    ],
  },
  {
    id: 'culinary',
    title: 'Gastronome & Artisan',
    subtitle: 'Royal Recipes & Block Print Guilds',
    icon: <Utensils className="w-5 h-5" />,
    tagline: 'Stone-ground Mathania chillies, golden Ghevar, and artisan wood-block printers.',
    recommendedDuration: '5 - 6 Days',
    circuitRoute: 'Jaipur → Jodhpur → Bikaner',
    recommendedDestinations: [
      { name: 'Jaipur', slug: 'jaipur', role: 'Bagru Block Printing & Saffron Ghevar' },
      { name: 'Jodhpur', slug: 'jodhpur', role: 'Mirchi Bada & Clock Tower Spices' },
      { name: 'Bikaner', slug: 'bikaner', role: 'World-Famed Bhujia & Rasgulla' },
    ],
    curatedExperiences: [
      {
        title: 'Bagru Natural Vegetable Dye Printing',
        image: VERIFIED_IMAGES.jaipur.blockPrinting,
        location: 'Jaipur Outskirts',
        note: 'Working alongside 7th-generation Chippa artisan families.',
      },
      {
        title: 'Thal of the Maharajas Feast',
        image: VERIFIED_IMAGES.cuisines.dalBaatiChurma,
        location: 'Jodhpur / Jaipur',
        note: 'Ghee-soaked Dal Baati Churma, Ker Sangri, and slow-cooked Laal Maas.',
      },
    ],
  },
];

export const PersonalityFilterSection: React.FC = () => {
  const [activePersonalityId, setActivePersonalityId] = useState<string>('historian');
  const activePersonality = PERSONALITIES.find((p) => p.id === activePersonalityId) || PERSONALITIES[0];

  return (
    <Section variant="sandstone" padding="lg" className="border-b border-[#E7DFD5]">
      <Container>
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <Badge variant="indigo" size="sm">
            Tailored Experiences
          </Badge>
          <Heading level={2} variant="display" className="text-stone-900">
            Discover Rajasthan by Your Travel Spirit
          </Heading>
          <Text color="secondary" className="text-base sm:text-lg">
            Choose the travel archetype that resonates with you. We configure the ideal circuit, duration, and immersive experiences for your journey.
          </Text>
        </div>

        {/* Personality Archetype Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {PERSONALITIES.map((p) => {
            const isActive = p.id === activePersonalityId;
            return (
              <button
                key={p.id}
                onClick={() => setActivePersonalityId(p.id)}
                className={`p-4 rounded-2xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-white border-[#B85D38] shadow-md ring-2 ring-[#B85D38]/20'
                    : 'bg-white/60 border-[#E7DFD5] hover:bg-white hover:border-stone-300'
                }`}
              >
                <div className="space-y-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isActive ? 'bg-[#B85D38] text-white' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-stone-900 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                      {p.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                  <span className="font-medium text-stone-600">{p.recommendedDuration}</span>
                  {isActive && <Check className="w-3.5 h-3.5 text-[#B85D38]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Personality Presentation Dashboard */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7DFD5] shadow-xs space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E7DFD5]">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#FDF6F3] text-[#B85D38] text-xs font-semibold">
                  Curated for {activePersonality.title}
                </span>
                <span className="text-xs text-stone-500">
                  Optimal Window: {activePersonality.recommendedDuration}
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                {activePersonality.tagline}
              </h3>
              <p className="text-xs sm:text-sm text-[#2A4B6B] font-medium flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>Recommended Circuit: <strong>{activePersonality.circuitRoute}</strong></span>
              </p>
            </div>

            <LinkButton
              href="/planner"
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Open in Trip Planner
            </LinkButton>
          </div>

          {/* Grid of Curated Highlights & Destinations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Recommended Regional Hubs */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-bold tracking-wider text-stone-500">
                Key Epicenters in This Journey
              </h4>
              <div className="space-y-3">
                {activePersonality.recommendedDestinations.map((dest, i) => (
                  <Link
                    key={i}
                    href={`/destinations/${dest.slug}`}
                    className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E7DFD5] flex items-center justify-between hover:border-[#B85D38] hover:bg-white transition-all group"
                  >
                    <div>
                      <div className="font-serif font-bold text-stone-900 group-hover:text-[#B85D38] transition-colors">
                        {dest.name}
                      </div>
                      <div className="text-xs text-stone-600">{dest.role}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#B85D38] group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Signature Curated Experiences */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-bold tracking-wider text-stone-500">
                Signature Curated Experiences
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activePersonality.curatedExperiences.map((exp, i) => (
                  <Card
                    key={i}
                    variant="hover-lift"
                    hoverLift
                    interactive
                    padding="none"
                    className="rounded-2xl border border-stone-200 overflow-hidden bg-stone-50 flex flex-col justify-between group"
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden bg-stone-200">
                      <ResponsiveImage
                        src={exp.image}
                        alt={exp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#B85D38]">
                          {exp.location}
                        </span>
                        <h5 className="font-serif font-bold text-stone-900 text-sm leading-snug group-hover:text-[#B85D38] transition-colors">
                          {exp.title}
                        </h5>
                      </div>
                      <p className="text-[11px] text-stone-600 leading-relaxed pt-1">
                        {exp.note}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
