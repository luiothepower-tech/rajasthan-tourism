import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useDocumentMeta } from '../lib/seo';
import { HeroSection } from '../components/home/HeroSection';
import { EditorialIntro } from '../components/home/EditorialIntro';
import { DestinationDiscovery } from '../components/home/DestinationDiscovery';
import { PersonalityFilterSection } from '../components/home/PersonalityFilterSection';
import { CinematicStorySection } from '../components/home/CinematicStorySection';
import { RajasthanSenses } from '../components/home/RajasthanSenses';
import { FoodFestivalSection } from '../components/home/FoodFestivalSection';
import { HomeMapTeaser } from '../components/home/HomeMapTeaser';
import { PlannerTeaser } from '../components/home/PlannerTeaser';
import { FinalCtaSection } from '../components/home/FinalCtaSection';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Scroll-triggered fade-in and slide-up animated wrapper
 * Powered by Framer Motion (motion/react) with accessible reduced motion support.
 */
const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = 'w-full',
  delay = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -40px 0px' }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.75,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.25, 1, 0.5, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const HomeView: React.FC = () => {
  useDocumentMeta(
    'Rajasthan Tourism | The Royal Heritage Experience',
    'Experience the majesty of Rajasthan: royal forts, tranquil stepwells, living desert dunes, vibrant festivals, and authentic culinary heritage.'
  );

  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      {/* 1. Cinematic Hero with verified cross-fade slides, live search & ambient audio */}
      <HeroSection />

      {/* 2. Editorial Foundation & Cultural Pillars */}
      <AnimatedSection>
        <EditorialIntro />
      </AnimatedSection>

      {/* 3. Destination Discovery Catalog with Region Filters & Quick Preview Modal */}
      <AnimatedSection>
        <DestinationDiscovery />
      </AnimatedSection>

      {/* 4. Travel Personality & Mood Filters */}
      <AnimatedSection>
        <PersonalityFilterSection />
      </AnimatedSection>

      {/* 5. Cinematic Photo Stories: Forts, Water Architecture, and Quad-Colors */}
      <AnimatedSection>
        <CinematicStorySection />
      </AnimatedSection>

      {/* 6. Rajasthan Through the Senses (Sound, Scent, Sight, Touch, Taste) */}
      <AnimatedSection>
        <RajasthanSenses />
      </AnimatedSection>

      {/* 7. Regional Gastronomy & Annual Cultural Festivals */}
      <AnimatedSection>
        <FoodFestivalSection />
      </AnimatedSection>

      {/* 8. Spatial Exploration: Normalized Vector Map Preview */}
      <AnimatedSection>
        <HomeMapTeaser />
      </AnimatedSection>

      {/* 9. Trip Planner & Parametric Budget Calculator Teaser */}
      <AnimatedSection>
        <PlannerTeaser />
      </AnimatedSection>

      {/* 10. Majestic Closing Call to Action */}
      <AnimatedSection>
        <FinalCtaSection />
      </AnimatedSection>
    </div>
  );
};

