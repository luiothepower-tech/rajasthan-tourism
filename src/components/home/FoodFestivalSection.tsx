import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { LinkButton } from '../ui/LinkButton';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import { tourismRepository } from '../../lib/repository';
import { Utensils, Calendar, Sparkles, MapPin, ArrowRight, Flame } from 'lucide-react';
import { Link } from '../../lib/router';

export const FoodFestivalSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'food' | 'festivals'>('food');

  const foods = tourismRepository.getAllFoods();
  const festivals = tourismRepository.getAllFestivals();

  return (
    <Section padding="lg" className="border-b border-[#E7DFD5] bg-[#FAF7F2]">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="terracotta" size="sm">
                Culinary & Celebrations
              </Badge>
              <span className="text-xs uppercase font-semibold tracking-wider text-stone-500">
                Taste & Living Traditions
              </span>
            </div>
            <Heading level={2} variant="display" className="text-stone-900">
              Gastronomic Soul & Annual Pageantry
            </Heading>
            <Text color="secondary" className="text-base sm:text-lg">
              From slow-simmered game curries and porous ghee honeycomb sweets to desert camel beauty contests under the full moon.
            </Text>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center p-1.5 rounded-2xl bg-white border border-[#E7DFD5] shadow-xs">
            <button
              onClick={() => setActiveTab('food')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'food'
                  ? 'bg-[#B85D38] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Royal Gastronomy ({foods.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('festivals')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'festivals'
                  ? 'bg-[#B85D38] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Cultural Calendar ({festivals.length})</span>
            </button>
          </div>
        </div>

        {/* Content: Food Tab */}
        {activeTab === 'food' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foods.map((dish) => {
                const dishUrl = `/food/${dish.slug || dish.id}`;
                return (
                  <Card
                    key={dish.id}
                    variant="hover-lift"
                    hoverLift
                    interactive
                    padding="none"
                    className="bg-white border border-[#E7DFD5] rounded-2xl overflow-hidden flex flex-col justify-between group"
                  >
                    <div>
                      <Link href={dishUrl} className="block relative aspect-[16/10] overflow-hidden bg-stone-200">
                        <ResponsiveImage
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white">
                            {dish.category}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 text-white">
                          <span className="text-xs text-amber-200 font-serif italic">
                            {dish.region} Specialty
                          </span>
                        </div>
                      </Link>

                      <div className="p-5 space-y-3">
                        <div>
                          <Link href={dishUrl}>
                            <h3 className="font-serif text-2xl font-bold text-stone-900 group-hover:text-[#B85D38] transition-colors">
                              {dish.name}
                            </h3>
                          </Link>
                          {dish.hindiName && (
                            <p className="text-xs text-stone-500 font-serif">
                              {dish.hindiName}
                            </p>
                          )}
                        </div>

                        <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                          {dish.description}
                        </p>

                        <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E7DFD5] space-y-1 text-xs">
                          <div className="flex items-center gap-1 font-semibold text-[#843B20]">
                            <Flame className="w-3.5 h-3.5 text-[#B85D38]" />
                            <span>Taste Profile</span>
                          </div>
                          <p className="text-[11px] text-stone-600 italic">
                            "{dish.tasteProfile}"
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between">
                      <span className="text-[11px] text-stone-500">
                        Found in: {dish.destinationIds.slice(0, 2).join(', ')}
                      </span>
                      <Link
                        href={dishUrl}
                        className="text-xs font-semibold text-[#B85D38] hover:text-[#9E4A2A] flex items-center gap-1"
                      >
                        <span>Story & Recipe</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="text-center pt-2">
              <LinkButton href="/food" variant="outline" size="md">
                <span>View Full Culinary Guide & Royal Recipes</span>
                <ArrowRight className="w-4 h-4" />
              </LinkButton>
            </div>
          </div>
        )}

        {/* Content: Festivals Tab */}
        {activeTab === 'festivals' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {festivals.map((fest) => {
                const festUrl = `/festivals/${fest.slug || fest.id}`;
                return (
                  <Card
                    key={fest.id}
                    variant="hover-lift"
                    hoverLift
                    interactive
                    padding="none"
                    className="bg-white border border-[#E7DFD5] rounded-2xl overflow-hidden flex flex-col justify-between group"
                  >
                    <div>
                      <Link href={festUrl} className="block relative aspect-[16/10] overflow-hidden bg-stone-200">
                        <ResponsiveImage
                          src={fest.image}
                          alt={fest.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-md bg-[#B85D38] text-white text-[11px] font-semibold">
                            {fest.approximateMonth}
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 text-white flex items-center gap-1.5 text-xs">
                          <MapPin className="w-3.5 h-3.5 text-amber-300" />
                          <span>{fest.location}</span>
                        </div>
                      </Link>

                      <div className="p-5 space-y-3">
                        <div>
                          <Link href={festUrl}>
                            <h3 className="font-serif text-2xl font-bold text-stone-900 group-hover:text-[#B85D38] transition-colors">
                              {fest.name}
                            </h3>
                          </Link>
                          {fest.hindiName && (
                            <p className="text-xs text-stone-500 font-serif">
                              {fest.hindiName}
                            </p>
                          )}
                        </div>

                        <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                          {fest.description}
                        </p>

                        {/* Highlights */}
                        <div className="space-y-1.5 pt-1">
                          <p className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                            Key Festivities:
                          </p>
                          <ul className="space-y-1 text-xs text-stone-700">
                            {fest.highlights.slice(0, 2).map((hl, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <Sparkles className="w-3 h-3 text-[#B85D38] shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{hl}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between">
                      <span className="text-[11px] text-stone-500 font-medium">
                        Annual Festival
                      </span>
                      <Link
                        href={festUrl}
                        className="text-xs font-semibold text-[#B85D38] hover:text-[#9E4A2A] flex items-center gap-1"
                      >
                        <span>Festival Guide</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="text-center pt-2">
              <LinkButton href="/festivals" variant="outline" size="md">
                <span>View Complete Year-Round Cultural Calendar</span>
                <ArrowRight className="w-4 h-4" />
              </LinkButton>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
};
