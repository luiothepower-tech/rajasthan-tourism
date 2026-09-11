import React, { useState } from 'react';
import { useDocumentMeta } from '../lib/seo';
import { tourismRepository } from '../lib/repository';
import { RegionCategory } from '../types';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ResponsiveImage } from '../components/ui/ResponsiveImage';
import { Link } from '../lib/router';
import { ArrowRight, MapPin, Compass } from 'lucide-react';

const REGIONS: (RegionCategory | 'All')[] = [
  'All',
  'Dhundhar',
  'Mewar',
  'Marwar',
  'Thar',
  'Bikaner',
  'Sirohi',
];

export const DestinationsView: React.FC = () => {
  useDocumentMeta(
    'Royal Destinations | Rajasthan Tourism',
    'Explore the 8 royal epicenter destinations of Rajasthan, from the pink stone of Jaipur to the blue alleys of Jodhpur and golden ramparts of Jaisalmer.'
  );

  const [selectedRegion, setSelectedRegion] = useState<RegionCategory | 'All'>('All');
  const allDestinations = tourismRepository.getAllDestinations();

  const filteredDestinations =
    selectedRegion === 'All'
      ? allDestinations
      : allDestinations.filter((d) => d.region === selectedRegion);

  return (
    <div className="w-full">
      <Section variant="sandstone" padding="md" className="border-b border-[#E7DFD5]">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B85D38]">
              <Compass className="w-4 h-4" />
              <span>Rajasthan Dossiers</span>
            </div>
            <Heading level={1} variant="display">
              Royal Destinations
            </Heading>
            <Text variant="lead" color="secondary">
              Discover the unique architectural identity, arid landscapes, and living history of Rajasthan’s 8 foundational regions.
            </Text>
          </div>

          {/* Region Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-[#E7DFD5]">
            <span className="text-xs font-semibold text-stone-500 mr-2">Filter Region:</span>
            {REGIONS.map((region) => {
              const isSelected = selectedRegion === region;
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    isSelected
                      ? 'bg-[#B85D38] text-white shadow-xs'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-[#E7DFD5]'
                  }`}
                  aria-pressed={isSelected}
                >
                  {region}
                </button>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section padding="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDestinations.map((dest) => (
              <Card
                key={dest.id}
                variant="hover-lift"
                hoverLift
                interactive
                padding="none"
                className="group flex flex-col justify-between"
              >
                <div>
                  <ResponsiveImage
                    src={dest.heroImage}
                    alt={dest.name}
                    aspectRatio="16/9"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="sandstone" size="sm">
                        {dest.region}
                      </Badge>
                      <span className="text-xs text-stone-500">
                        {dest.recommendedDuration}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <h2 className="font-serif text-2xl font-bold text-stone-900 group-hover:text-[#B85D38] transition-colors">
                        {dest.name}
                      </h2>
                      {dest.hindiName && (
                        <span className="text-sm font-serif text-stone-400">
                          {dest.hindiName}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#B85D38] font-medium">
                      {dest.moniker}
                    </p>

                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mt-2">
                      {dest.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-stone-500">
                    {dest.attractions.length} Attractions
                  </span>
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#B85D38] hover:text-[#9E4A2A]"
                  >
                    <span>View Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};
