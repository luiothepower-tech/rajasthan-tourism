import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Badge } from '../ui/Badge';
import {
  Music,
  Flame,
  Eye,
  Hand,
  UtensilsCrossed,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Link } from '../../lib/router';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import { VERIFIED_IMAGES } from '../../data/imageAssets';

interface SensePillar {
  id: string;
  name: string;
  hindiName: string;
  icon: React.ReactNode;
  heroImage: string;
  title: string;
  subtitle: string;
  description: string;
  elements: { title: string; desc: string }[];
  culturalSignificance: string;
  relatedLink: { label: string; href: string };
}

const SENSE_PILLARS: SensePillar[] = [
  {
    id: 'sound',
    name: 'Sound',
    hindiName: 'ध्वनि',
    icon: <Music className="w-5 h-5" />,
    heroImage: VERIFIED_IMAGES.jaisalmer.samDunes,
    title: 'Ravanahatha Strings & Twilight Desert Ballads',
    subtitle: 'Acoustic echoes from ancient camel trade routes',
    description: 'The ancient folk instruments of Rajasthan are built from desert materials: dried gourds, horsehair, and coconut shells. From the haunting resonance of the bowed Ravanahatha to the complex vocal rhythms of the Manganiyar hereditary musicians, Rajasthan’s sonic world is deep, emotional, and ancestral.',
    elements: [
      { title: 'The Ravanahatha', desc: 'An ancient bowed string instrument predating the violin, played by wandering Bhopa bards.' },
      { title: 'Evening Lake Aarti', desc: 'Temple brass bells and conch shells resonating across the 52 sacred water steps of Pushkar.' },
      { title: 'Manganiyar Ballads', desc: 'Oral history epics passed through generations without written musical notation.' },
    ],
    culturalSignificance: 'Desert bards were historically the keepers of dynastic memory, singing royal genealogies across desert fires.',
    relatedLink: { label: 'Explore Desert Festivals', href: '/festivals' },
  },
  {
    id: 'scent',
    name: 'Scent & Spice',
    hindiName: 'सुगंध',
    icon: <Flame className="w-5 h-5" />,
    heroImage: VERIFIED_IMAGES.cuisines.laalMaas,
    title: 'Sun-Dried Mathania Chillies & Damask Rose',
    subtitle: 'Aromas born of sun-baked earth and pure ghee',
    description: 'Walk through the Sardar Market clocktower in Jodhpur or the old bazaars of Jaipur, and your senses are greeted by the pungent warmth of indigenous Mathania chillies, golden turmeric, and pure cow ghee bubbling in cast-iron cauldrons.',
    elements: [
      { title: 'Mathania Red Chilli', desc: 'Indigenous sun-dried chilli celebrated for vibrant scarlet color and deep smoky warmth.' },
      { title: 'Pushkar Damask Rose', desc: 'Distilled into pure rosewater and fragrant gulkand preserves exported worldwide.' },
      { title: 'Champa & Sandalwood Incense', desc: 'Hand-rolled temple incense wafting from morning prayer sanctums.' },
    ],
    culturalSignificance: 'In dry desert climates, spices were prized both for preservative medicinal properties and appetite stimulation in extreme heat.',
    relatedLink: { label: 'Discover Regional Gastronomy', href: '/food' },
  },
  {
    id: 'sight',
    name: 'Sight',
    hindiName: 'दृष्टि',
    icon: <Eye className="w-5 h-5" />,
    heroImage: VERIFIED_IMAGES.jaipur.hawaMahal,
    title: 'Filigree Sandstone Jharokhas & Mirror Halls',
    subtitle: 'Visual complexity where stone behaves like lace',
    description: 'Rajasthan’s visual architecture defies the hardness of stone. Master stonemasons chiseled yellow and red sandstone into paper-thin screens (jalis) that diffuse searing desert sun into soothing geometric shadows. In Sheesh Mahal, mirrors imported from Belgium reflect single flames into constellations.',
    elements: [
      { title: 'Carved Jharokhas', desc: 'Overhanging enclosed balconies designed for ventilation and discreet courtyard viewing.' },
      { title: 'Sheesh Mahal Mirror Mosaics', desc: 'Convex glass mirrors set in marble plaster creating celestial light indoors.' },
      { title: 'Stepwell Geometric Stairways', desc: 'Trigonometric stair formations creating hypnotic light-and-shadow patterns.' },
    ],
    culturalSignificance: 'Architectural geometry was carefully aligned with astronomical axes and seasonal thermal dynamics.',
    relatedLink: { label: 'Explore Architectural Destinations', href: '/destinations' },
  },
  {
    id: 'touch',
    name: 'Touch',
    hindiName: 'स्पर्श',
    icon: <Hand className="w-5 h-5" />,
    heroImage: VERIFIED_IMAGES.jaipur.blockPrinting,
    title: 'Teak Block-Print Khadi & Cool Makrana Marble',
    subtitle: 'The tactile soul of generational artisan craft',
    description: 'To experience Rajasthan is to touch textures: the natural vegetable-dyed cotton of Sanganer and Bagru stamped with carved teak blocks; the impossibly cool, silken surface of white Makrana marble in Dilwara; and the fine golden sand of Sam dunes sifting through your fingers.',
    elements: [
      { title: 'Hand-Carved Teakwood Blocks', desc: 'Centuries-old stamps dipped in fermented iron, madder root, and indigo dyes.' },
      { title: 'Makrana Marble', desc: 'The world’s purest crystalline marble that remains cool to the touch even under summer sun.' },
      { title: 'Shifting Thar Sands', desc: 'Fine wind-rippled desert grains sculpted by Thar winds each morning.' },
    ],
    culturalSignificance: 'Artisans here believe the touch of the hand imprints the soul of the maker into the cloth and stone.',
    relatedLink: { label: 'Experience Artisan Workshops', href: '/experiences' },
  },
  {
    id: 'taste',
    name: 'Taste',
    hindiName: 'स्वाद',
    icon: <UtensilsCrossed className="w-5 h-5" />,
    heroImage: VERIFIED_IMAGES.cuisines.dalBaatiChurma,
    title: 'Ghee-Drenched Baatis & Saffron-Soaked Ghevar',
    subtitle: 'Culinary mastery shaped by scarcity and royalty',
    description: 'Arid climate necessitated genius in the kitchen. Rajasthan created recipes that require minimal water, substitute buttermilk for moisture, and use indigenous desert plants like Ker and Sangri that thrive in drought. Paired with pure desi ghee, the cuisine is hearty and royal.',
    elements: [
      { title: 'Dal Baati Churma', desc: 'Crisp roasted wheat dumplings crushed into rich dal and sweetened wheat crumble.' },
      { title: 'Ker Sangri', desc: 'Tangy desert capers and dried beans sautéed with whole dry spices and raisins.' },
      { title: 'Honeycomb Ghevar', desc: 'Airy, crispy disc soaked in cardamom saffron syrup and capped with rabri.' },
    ],
    culturalSignificance: 'Rajput warriors carried dried baatis and sangri that stayed fresh for months on long military marches.',
    relatedLink: { label: 'Explore Culinary Heritage', href: '/food' },
  },
];

export const RajasthanSenses: React.FC = () => {
  const [activeSenseId, setActiveSenseId] = useState<string>('sound');
  const activeSense = SENSE_PILLARS.find((s) => s.id === activeSenseId) || SENSE_PILLARS[0];

  return (
    <Section variant="sandstone" padding="lg" className="border-b border-[#E7DFD5]">
      <Container>
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <Badge variant="saffron" size="sm">
            Sensory Immersion
          </Badge>
          <Heading level={2} variant="display" className="text-stone-900">
            Rajasthan Through the Five Senses
          </Heading>
          <Text color="secondary" className="text-base sm:text-lg">
            Beyond monuments and maps, Rajasthan is a multi-sensory symphony of sound, spice, texture, and light.
          </Text>
        </div>

        {/* 5 Sense Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-4 mb-8">
          {SENSE_PILLARS.map((sense) => {
            const isSelected = sense.id === activeSenseId;
            return (
              <button
                key={sense.id}
                onClick={() => setActiveSenseId(sense.id)}
                className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#B85D38] text-white shadow-md'
                    : 'bg-white text-stone-700 border border-[#E7DFD5] hover:bg-stone-100'
                }`}
              >
                <span>{sense.icon}</span>
                <span>{sense.name}</span>
                <span className={`text-xs font-serif ${isSelected ? 'text-amber-200' : 'text-stone-400'}`}>
                  ({sense.hindiName})
                </span>
              </button>
            );
          })}
        </div>

        {/* Sensory Detail Presentation */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7DFD5] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Photo & Cultural Badge */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-stone-900 group">
                <ResponsiveImage
                  src={activeSense.heroImage}
                  alt={activeSense.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-serif">
                    {activeSense.hindiName} • {activeSense.name}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-serif italic text-amber-200">
                    {activeSense.subtitle}
                  </p>
                </div>
              </div>

              {/* Cultural Insight Callout */}
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7DFD5] text-xs text-stone-700 space-y-1">
                <span className="font-bold text-[#843B20] block uppercase tracking-wider text-[10px]">
                  Cultural Wisdom
                </span>
                <p>{activeSense.culturalSignificance}</p>
              </div>
            </div>

            {/* Right Sensory Exploration Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold tracking-widest text-[#B85D38]">
                  Sensory Experience
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
                  {activeSense.title}
                </h3>
                <p className="text-stone-700 text-sm leading-relaxed font-light">
                  {activeSense.description}
                </p>
              </div>

              {/* 3 Core Sensory Elements */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase font-bold tracking-wider text-stone-500">
                  Signature Sensations
                </h4>
                <div className="space-y-2.5">
                  {activeSense.elements.map((el, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E7DFD5] space-y-1"
                    >
                      <h5 className="font-serif font-bold text-stone-900 text-sm">
                        {el.title}
                      </h5>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {el.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deep Exploration Link */}
              <div className="pt-2">
                <Link
                  href={activeSense.relatedLink.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C1917] hover:bg-stone-800 text-white text-xs font-semibold transition-all shadow-xs"
                >
                  <span>{activeSense.relatedLink.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </Section>
  );
};
