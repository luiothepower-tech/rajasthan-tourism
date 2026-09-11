import React from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Badge } from '../ui/Badge';
import { MapFoundation } from '../map/MapFoundation';
import { Map, Navigation, Route, Compass, ArrowRight } from 'lucide-react';
import { LinkButton } from '../ui/LinkButton';

export const HomeMapTeaser: React.FC = () => {
  return (
    <Section padding="lg" className="border-b border-[#E7DFD5] bg-[#FAF7F2]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="indigo" size="sm">
                Spatial Geography
              </Badge>
              <span className="text-xs uppercase font-semibold tracking-wider text-stone-500">
                Normalized Vector Explorer
              </span>
            </div>
            <Heading level={2} variant="display" className="text-stone-900">
              The Geography of Rajputana
            </Heading>
            <Text color="secondary" className="text-base sm:text-lg">
              Spanning 342,239 square kilometers, Rajasthan stretches from the ancient rolling Aravalli Range to the golden sand dunes of the Pakistan frontier.
            </Text>
          </div>

          <div className="flex items-center gap-4 text-xs text-stone-600">
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white border border-[#E7DFD5]">
              <Navigation className="w-3.5 h-3.5 text-[#B85D38]" />
              <span><strong>8</strong> Regional Pins</span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white border border-[#E7DFD5]">
              <Route className="w-3.5 h-3.5 text-[#2A4B6B]" />
              <span>Road & Rail Connected</span>
            </div>
          </div>
        </div>

        {/* Map Canvas Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7DFD5] shadow-xs">
          <MapFoundation />
        </div>
      </Container>
    </Section>
  );
};
