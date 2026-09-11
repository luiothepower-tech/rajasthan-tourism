import React from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { LinkButton } from '../ui/LinkButton';
import { Link } from '../../lib/router';
import { Compass, Calendar, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  return (
    <Section padding="xl" className="relative bg-[#1C1917] text-white overflow-hidden">
      {/* Subtle Background architectural texture / gradient */}
      <div className="absolute inset-0 bg-radial from-[#843B20]/20 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-serif italic text-amber-200 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Padharo Mhare Desh • The Golden Kingdom</span>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Your Odyssey Across Sandstone & Royalty Awaits
            </h2>
            <p className="text-base sm:text-lg text-stone-300 font-light max-w-2xl mx-auto leading-relaxed">
              Step beyond ordinary travel guides. Craft your personalized itinerary across living fortresses, sacred water bodies, and starlit desert dunes.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <LinkButton
              href="/planner"
              variant="primary"
              size="lg"
              icon={<Calendar className="w-5 h-5" />}
              className="bg-[#B85D38] hover:bg-[#9E4A2A] text-white font-semibold shadow-lg shadow-[#B85D38]/30 px-8 py-4 text-base"
            >
              Launch Interactive Trip Planner
            </LinkButton>

            <LinkButton
              href="/destinations"
              variant="outline"
              size="lg"
              icon={<Compass className="w-5 h-5 text-amber-300" />}
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-base backdrop-blur-md"
            >
              Browse All 8 Royal Dossiers
            </LinkButton>
          </div>

          {/* Trust & Craft Indicators */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs text-stone-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>100% Verified Geographic Images</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Typed Domain Repository</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Zero-Dependency Vector Map</span>
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
};
