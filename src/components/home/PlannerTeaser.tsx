import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { LinkButton } from '../ui/LinkButton';
import { tourismRepository } from '../../lib/repository';
import { BudgetTier } from '../../types';
import {
  Calendar,
  Users,
  IndianRupee,
  Clock,
  ArrowRight,
  ShieldCheck,
  Compass,
  Check,
} from 'lucide-react';
import { Link } from '../../lib/router';

export const PlannerTeaser: React.FC = () => {
  const [days, setDays] = useState(6);
  const [travelers, setTravelers] = useState(2);
  const [tier, setTier] = useState<BudgetTier>('midRange');

  const circuits = tourismRepository.getAllItineraries();

  const estimate = tourismRepository.calculateEstimatedBudget({
    days,
    travelers,
    tier,
  });

  return (
    <Section variant="sandstone" padding="lg" className="border-b border-[#E7DFD5]">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="terracotta" size="sm">
                Trip Crafting Engine
              </Badge>
              <span className="text-xs uppercase font-semibold tracking-wider text-stone-500">
                Itinerary & Budget Estimation
              </span>
            </div>
            <Heading level={2} variant="display" className="text-stone-900">
              Plan Your Journey into Royalty
            </Heading>
            <Text color="secondary" className="text-base sm:text-lg">
              Explore pre-built thematic circuits or simulate your accommodation, transit, and dining tariffs with our educational budget calculator.
            </Text>
          </div>

          <div className="shrink-0">
            <LinkButton href="/planner" variant="primary" size="md">
              <span>Launch Full Interactive Planner</span>
              <ArrowRight className="w-4 h-4" />
            </LinkButton>
          </div>
        </div>

        {/* Dual Interactive Grid: Budget Estimator & Curated Circuits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Quick Interactive Calculator */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E7DFD5] shadow-xs space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#F9EBE5] text-[#B85D38] flex items-center justify-center">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      Quick Budget Estimator
                    </h3>
                    <p className="text-[11px] text-stone-500">Parametric simulation</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-[#B85D38] bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#E7DFD5]">
                  Instant Preview
                </span>
              </div>

              {/* Slider: Number of Days */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-stone-700 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-500" />
                    Trip Duration
                  </span>
                  <span className="text-[#B85D38] font-bold">{days} Days</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={14}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#B85D38]"
                />
                <div className="flex justify-between text-[10px] text-stone-400">
                  <span>3 days (Weekend)</span>
                  <span>7 days (Classic)</span>
                  <span>14 days (Grand Tour)</span>
                </div>
              </div>

              {/* Counter: Travelers */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-stone-700 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-stone-500" />
                    Number of Travelers
                  </span>
                  <span className="text-[#B85D38] font-bold">{travelers} {travelers === 1 ? 'Person' : 'People'}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 4, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setTravelers(num)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        travelers === num
                          ? 'bg-[#1C1917] text-white shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {num} {num === 1 ? 'Solo' : num === 2 ? 'Couple' : `${num} Group`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tier Selector */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-stone-700 block">
                  Comfort Tier
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'budget', label: 'Budget', desc: 'Heritage Stays' },
                    { key: 'midRange', label: 'Mid-Range', desc: 'Boutique Haveli' },
                    { key: 'luxury', label: 'Luxury', desc: 'Palace Resorts' },
                  ].map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setTier(t.key as BudgetTier)}
                      className={`p-2.5 rounded-xl text-left transition-all cursor-pointer border ${
                        tier === t.key
                          ? 'bg-[#FDF6F3] border-[#B85D38] text-[#843B20]'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div className="text-xs font-bold">{t.label}</div>
                      <div className="text-[10px] text-stone-500">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimate Calculation Results Box */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-medium text-stone-600">Estimated Total:</span>
                  <div className="text-right">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-[#B85D38]">
                      ₹{estimate.grandTotal.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-stone-500">
                      (~₹{estimate.perPersonTotal.toLocaleString('en-IN')} / person)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 pt-2 border-t border-[#E7DFD5]">
                  <div>Lodging: ₹{estimate.accommodationTotal.toLocaleString('en-IN')}</div>
                  <div>Meals: ₹{estimate.foodTotal.toLocaleString('en-IN')}</div>
                  <div>Transit: ₹{estimate.transportTotal.toLocaleString('en-IN')}</div>
                  <div>Activities: ₹{estimate.activitiesTotal.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/planner"
                className="w-full py-3 rounded-xl bg-[#B85D38] hover:bg-[#9E4A2A] text-white text-xs font-bold text-center block transition-all shadow-xs"
              >
                Customize Route in Trip Planner →
              </Link>
            </div>
          </div>

          {/* Right: Curated Pre-Built Circuits */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase font-bold tracking-wider text-stone-500">
                Recommended Thematic Travel Circuits
              </h3>
              <span className="text-xs text-stone-500 font-medium">
                Tested Road & Rail Connections
              </span>
            </div>

            <div className="space-y-4">
              {circuits.map((circuit) => (
                <Card
                  key={circuit.id}
                  variant="hover-lift"
                  hoverLift
                  interactive
                  padding="lg"
                  className="rounded-3xl bg-white border border-[#E7DFD5] space-y-4 group"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-semibold">
                        {circuit.theme}
                      </span>
                      <span className="text-xs text-[#B85D38] font-bold">
                        {circuit.durationDays} Days Duration
                      </span>
                    </div>

                    <span className="text-xs text-stone-500">
                      Est. ₹{circuit.estimatedBudget.estimatedCostINR.toLocaleString('en-IN')} ({circuit.estimatedBudget.budgetTier})
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif text-2xl font-bold text-stone-900 group-hover:text-[#B85D38] transition-colors">
                      {circuit.title}
                    </h4>
                    <p className="text-xs text-[#B85D38] font-medium mt-0.5">
                      {circuit.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                      {circuit.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {circuit.highlights.slice(0, 3).map((hl, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-[#FAF7F2] text-stone-700 border border-[#E7DFD5]"
                      >
                        ✓ {hl}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs text-stone-500">
                      Hubs: {circuit.destinationIds.map((id) => id.toUpperCase()).join(' → ')}
                    </span>
                    <Link
                      href="/planner"
                      className="text-xs font-bold text-[#B85D38] hover:text-[#9E4A2A] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Explore Day-by-Day Plan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
};
