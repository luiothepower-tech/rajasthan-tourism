import React from 'react';
import { useDocumentMeta } from '../lib/seo';
import { tourismRepository } from '../lib/repository';
import { Link } from '../lib/router';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ResponsiveImage } from '../components/ui/ResponsiveImage';
import {
  Compass,
  Sun,
  Umbrella,
  Wind,
  ShieldAlert,
  Train,
  Plane,
  Car,
  Sparkles,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

export const TravelGuideView: React.FC = () => {
  useDocumentMeta(
    'Essential Travel Guide & Cultural Lore | Rajasthan Tourism',
    'Essential travel intelligence for Rajasthan: optimal seasonal windows, rail and road connectivity, living cultural traditions, and packing advisories.'
  );

  const culturalInsights = tourismRepository.getAllCultureInsights();

  return (
    <div className="w-full">
      <Section variant="sandstone" padding="md" className="border-b border-[#E7DFD5]">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B85D38]">
              <Compass className="w-4 h-4" />
              <span>Practical Advisory</span>
            </div>
            <Heading level={1} variant="display">
              Rajasthan Travel Guide
            </Heading>
            <Text variant="lead" color="secondary">
              Essential advice on seasonal weather patterns, regional connectivity, cultural etiquette, and packing for desert travel.
            </Text>
          </div>
        </Container>
      </Section>

      {/* Seasonal Windows */}
      <Section padding="lg" className="border-b border-[#E7DFD5]">
        <Container>
          <div className="max-w-2xl mb-8 space-y-2">
            <Badge variant="indigo" size="sm">
              Climatic Patterns
            </Badge>
            <Heading level={2} variant="h2">
              Seasons & Best Time to Visit
            </Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card padding="md" className="space-y-3">
              <div className="flex items-center gap-2 text-[#B85D38]">
                <Sun className="w-5 h-5" />
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Winter (Peak Season)
                </h3>
              </div>
              <Badge variant="terracotta" size="sm">
                October to March
              </Badge>
              <p className="text-xs text-stone-600 leading-relaxed">
                Clear sunny days with temperatures between 10°C and 27°C. Desert nights in Jaisalmer and Bikaner can drop below 5°C. The ideal season for heritage forts and desert safaris.
              </p>
            </Card>

            <Card padding="md" className="space-y-3">
              <div className="flex items-center gap-2 text-[#2A4B6B]">
                <Umbrella className="w-5 h-5" />
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Monsoon (Lush Season)
                </h3>
              </div>
              <Badge variant="indigo" size="sm">
                July to September
              </Badge>
              <p className="text-xs text-stone-600 leading-relaxed">
                The Aravalli hills turn strikingly green. Lakes in Udaipur and Mount Abu swell with fresh water. Perfect for romantic palace views and dramatic monsoon cloudscapes.
              </p>
            </Card>

            <Card padding="md" className="space-y-3">
              <div className="flex items-center gap-2 text-[#D97706]">
                <Wind className="w-5 h-5" />
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Summer (Shoulder Season)
                </h3>
              </div>
              <Badge variant="saffron" size="sm">
                April to June
              </Badge>
              <p className="text-xs text-stone-600 leading-relaxed">
                Hot desert weather often exceeding 40°C in western districts. Mount Abu remains pleasant at higher altitude. Excellent value for heritage palace stays and peaceful monument visits.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Connectivity & Etiquette */}
      <Section padding="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
                <Plane className="w-5 h-5 text-[#B85D38]" />
                <span>Inter-City Connectivity</span>
              </h3>
              <div className="space-y-3 text-xs text-stone-600">
                <Card padding="sm">
                  <span className="font-semibold text-stone-900 block mb-1">Major Airports:</span>
                  Jaipur (JAI) and Udaipur (UDR) connect directly to Delhi, Mumbai, Bengaluru, and Dubai. Jodhpur (JDH) offers regular domestic flights.
                </Card>
                <Card padding="sm">
                  <span className="font-semibold text-stone-900 block mb-1">Heritage Rail Network:</span>
                  Indian Railways connects all major hubs (Jaipur, Ajmer/Pushkar, Jodhpur, Bikaner, Jaisalmer). The luxury Palace on Wheels covers traditional royal circuits.
                </Card>
                <Card padding="sm">
                  <span className="font-semibold text-stone-900 block mb-1">Highway Corridors:</span>
                  Smooth 4-lane expressways connect the Golden Triangle (Delhi-Jaipur-Agra) and western desert corridors (NH 11, NH 48).
                </Card>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#842222]" />
                <span>Cultural Etiquette</span>
              </h3>
              <div className="space-y-3 text-xs text-stone-600">
                <Card padding="sm">
                  <span className="font-semibold text-stone-900 block mb-1">Temple Protocol:</span>
                  Remove footwear before entering shrines. Modest attire covering shoulders and knees is appreciated in spiritual sites like Pushkar and Dilwara.
                </Card>
                <Card padding="sm">
                  <span className="font-semibold text-stone-900 block mb-1">Photography Etiquette:</span>
                  Always seek polite permission before photographing local artisans, musicians, or community elders. Some inner fort sanctums prohibit photography.
                </Card>
                <Card padding="sm">
                  <span className="font-semibold text-stone-900 block mb-1">Bazaar Purchases:</span>
                  Polite bargaining is standard in unmetered street markets; fixed-price state handloom emporiums (Rajasthali) guarantee authentic craft certifications.
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Living Traditions & Cultural Lore */}
      <Section padding="lg" className="border-t border-[#E7DFD5] bg-[#FAF7F2]">
        <Container>
          <div className="max-w-2xl mb-8 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B85D38]">
              <Sparkles className="w-4 h-4" />
              <span>Living Traditions</span>
            </div>
            <Heading level={2} variant="h2">
              Cultural Heritage & Lore
            </Heading>
            <Text color="secondary" className="text-sm sm:text-base">
              Explore deep stories, warrior codes, sacred stepwells, safa turban symbolism, and royal arts.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {culturalInsights.map((insight) => {
              const detailUrl = `/culture/${insight.slug || insight.id}`;
              return (
                <Card
                  key={insight.id}
                  id={insight.id}
                  variant="hover-lift"
                  hoverLift
                  interactive
                  padding="none"
                  className="bg-white border border-[#E7DFD5] rounded-2xl overflow-hidden flex flex-col justify-between group"
                >
                  <Link href={detailUrl} className="block flex-1 flex flex-col justify-between focus:outline-hidden">
                    <div>
                      <div className="overflow-hidden bg-stone-200">
                        <ResponsiveImage
                          src={insight.image}
                          alt={insight.title}
                          aspectRatio="16/9"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="terracotta" size="sm">
                            {insight.category}
                          </Badge>
                          <span className="text-[11px] text-stone-500 font-medium">
                            {insight.destinationIds.includes('all') ? 'All Rajasthan' : `${insight.destinationIds.length} Regions`}
                          </span>
                        </div>

                        <div className="flex items-baseline gap-2">
                          <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#B85D38] transition-colors">
                            {insight.title}
                          </h3>
                          {insight.hindiTitle && (
                            <span className="text-xs font-serif text-stone-400">
                              {insight.hindiTitle}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                          {insight.quickFact}
                        </p>

                        <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#E7DFD5] space-y-1">
                          <div className="flex items-center gap-1 text-[11px] font-semibold text-stone-700">
                            <BookOpen className="w-3.5 h-3.5 text-[#B85D38]" />
                            <span>Significance</span>
                          </div>
                          <p className="text-[11px] text-stone-600 leading-normal line-clamp-2">
                            {insight.symbolism}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 mt-2">
                      <span className="text-[11px] text-stone-500">Living Custom</span>
                      <span className="text-xs font-semibold text-[#B85D38] group-hover:text-[#9E4A2A] flex items-center gap-1 shrink-0">
                        <span>Explore Lore</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>
    </div>
  );
};
