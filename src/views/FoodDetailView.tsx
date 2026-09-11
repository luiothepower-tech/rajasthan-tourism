import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useRouter, Link } from '../lib/router';
import { tourismRepository } from '../lib/repository';
import { useDocumentMeta } from '../lib/seo';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { ResponsiveImage } from '../components/ui/ResponsiveImage';
import { ImageGallerySlideshow } from '../components/ui/ImageGallerySlideshow';
import { getCuisineSlideSequence } from '../data/imageManifest';
import { LinkButton } from '../components/ui/LinkButton';
import {
  ArrowLeft,
  Utensils,
  Flame,
  BookOpen,
  MapPin,
  Sparkles,
  Share2,
  Bookmark,
  Check,
  Compass,
  ArrowRight,
} from 'lucide-react';

export const FoodDetailView: React.FC = () => {
  const { params } = useRouter();
  const slug = params.slug || 'dal-baati-churma';
  const food = tourismRepository.getFoodById(slug);

  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useDocumentMeta(
    food
      ? `${food.name} (${food.hindiName || 'Authentic Food'}) | Rajasthan Tourism`
      : 'Culinary Dish Not Found | Rajasthan Tourism',
    food
      ? `${food.description} Discover key ingredients, royal stories, and authentic taste profiles.`
      : 'The requested Rajasthani culinary specialty could not be found.'
  );

  if (!food) {
    return (
      <Section padding="xl">
        <Container size="sm" className="text-center space-y-4">
          <Heading level={1} variant="h2">
            Dish Not Found
          </Heading>
          <Text color="muted">
            The culinary specialty "{slug}" does not exist in our regional gastronomic archive.
          </Text>
          <div className="pt-4">
            <LinkButton href="/food" variant="primary">
              Return to Culinary Heritage
            </LinkButton>
          </div>
        </Container>
      </Section>
    );
  }

  // Get destinations where this food is iconic
  const relatedDestinations = food.destinationIds
    .map((destId) => tourismRepository.getDestinationById(destId))
    .filter(Boolean);

  // Get related dishes
  const relatedDishes = (food.relatedDishIds || [])
    .map((id) => tourismRepository.getFoodById(id))
    .filter(Boolean);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full">
      {/* Editorial Breadcrumb & Navigation */}
      <div className="bg-[#FAF7F2] border-b border-[#E7DFD5] py-3.5">
        <Container>
          <div className="flex items-center justify-between text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <Link
                href="/food"
                className="inline-flex items-center gap-1.5 hover:text-stone-900 font-medium transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Culinary Heritage</span>
              </Link>
              <span className="text-stone-300">/</span>
              <span className="text-stone-800 font-semibold truncate max-w-[200px] sm:max-w-none">
                {food.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSaved(!saved)}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 text-xs ${
                  saved
                    ? 'bg-[#B85D38] border-[#B85D38] text-white'
                    : 'bg-white border-[#E7DFD5] text-stone-700 hover:border-stone-400'
                }`}
                title={saved ? 'Saved to Favorites' : 'Save Dish'}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
              </button>
              <button
                onClick={handleShare}
                className="p-1.5 rounded-lg border border-[#E7DFD5] bg-white text-stone-700 hover:border-stone-400 transition-all cursor-pointer flex items-center gap-1 text-xs"
                title="Share link"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 hidden sm:inline">Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Share</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Hero Editorial Banner */}
      <Section variant="sandstone" padding="md" className="border-b border-[#E7DFD5]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="terracotta" size="md">
                  {food.category}
                </Badge>
                <Badge variant="sandstone" size="md">
                  {food.region} Province
                </Badge>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#B85D38] flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5" />
                  Royal Recipe
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-3">
                <Heading level={1} variant="display">
                  {food.name}
                </Heading>
                {food.hindiName && (
                  <span className="font-serif text-2xl text-stone-400 font-normal">
                    {food.hindiName}
                  </span>
                )}
              </div>

              <Text variant="lead" color="secondary" className="leading-relaxed">
                {food.description}
              </Text>

              {/* Vital Flavor Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#E7DFD5]">
                <div className="p-3.5 bg-white rounded-xl border border-[#E7DFD5]">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                    <Flame className="w-3.5 h-3.5 text-[#B85D38]" />
                    <span className="font-medium">Taste Profile</span>
                  </div>
                  <p className="text-xs font-semibold text-stone-900 leading-snug">
                    {food.tasteProfile}
                  </p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-[#E7DFD5]">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B85D38]" />
                    <span className="font-medium">Epicenter Hubs</span>
                  </div>
                  <p className="text-xs font-semibold text-stone-900 leading-snug">
                    {food.destinationIds.map((id) => id.charAt(0).toUpperCase() + id.slice(1)).join(', ')}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#E7DFD5] bg-stone-900">
                <ImageGallerySlideshow
                  slides={getCuisineSlideSequence(slug)}
                  aspectRatio="4/3"
                  showControls={true}
                  showIndicators={true}
                  showAttribution={true}
                  autoPlayInterval={6500}
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Deep Dive: Story, Ingredients, and Ritual */}
      <Section padding="lg" className="border-b border-[#E7DFD5]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-8">
              {/* Cultural Story */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B85D38]">
                  <BookOpen className="w-4 h-4" />
                  <span>The Heritage Story</span>
                </div>
                <Heading level={2} variant="h2">
                  Origins & Rajput Gastronomy
                </Heading>
                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] text-stone-700 leading-relaxed text-sm sm:text-base space-y-3">
                  <p>{food.culturalStory}</p>
                </div>
              </div>

              {/* Key Ingredients */}
              {food.keyIngredients && food.keyIngredients.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B85D38]">
                    <Sparkles className="w-4 h-4" />
                    <span>Indigenous Pantry</span>
                  </div>
                  <Heading level={3} variant="h3">
                    Essential Authentic Ingredients
                  </Heading>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {food.keyIngredients.map((ingredient, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white border border-[#E7DFD5] flex items-start gap-2.5 shadow-xs"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#B85D38] mt-1.5 shrink-0" />
                        <span className="text-xs sm:text-sm font-medium text-stone-800">
                          {ingredient}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Serving Ritual & Etiquette */}
              {food.servingRitual && (
                <div className="space-y-3">
                  <Heading level={3} variant="h3">
                    Traditional Serving Ritual & Etiquette
                  </Heading>
                  <Card padding="md" className="bg-[#FFFDF9] border-[#E7DFD5] text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {food.servingRitual}
                  </Card>
                </div>
              )}

              {/* Visitor Experience & Where to Taste */}
              {food.visitorExperience && (
                <div className="space-y-3">
                  <Heading level={3} variant="h3">
                    Where & How to Experience It
                  </Heading>
                  <Card padding="md" className="bg-white border-[#E7DFD5] text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {food.visitorExperience}
                  </Card>
                </div>
              )}
            </div>

            {/* Right Sidebar: Related Destinations & Dishes */}
            <div className="lg:col-span-4 space-y-6">
              {/* Destinations Hub Card */}
              <Card padding="md" className="space-y-4 bg-white border-[#E7DFD5]">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#B85D38]" />
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Taste in These Cities
                  </h3>
                </div>
                <p className="text-xs text-stone-600">
                  Plan your itinerary around cities known for the finest renditions of this dish:
                </p>
                <div className="space-y-2.5">
                  {relatedDestinations.map((dest) => (
                    <Link
                      key={dest?.id}
                      href={`/destinations/${dest?.slug}`}
                      className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DFD5] flex items-center justify-between hover:border-[#B85D38] hover:bg-white transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-stone-200">
                          <img
                            src={dest?.heroImage}
                            alt={dest?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-stone-900 group-hover:text-[#B85D38] transition-colors">
                            {dest?.name}
                          </p>
                          <p className="text-[11px] text-stone-500">{dest?.moniker}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#B85D38] group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#E7DFD5]">
                  <LinkButton
                    href="/planner"
                    variant="outline"
                    size="sm"
                    className="w-full justify-center"
                  >
                    Build Food Circuit in Planner
                  </LinkButton>
                </div>
              </Card>

              {/* Related Cuisines */}
              {relatedDishes.length > 0 && (
                <Card padding="md" className="space-y-4 bg-white border-[#E7DFD5]">
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Related Royal Dishes
                  </h3>
                  <div className="space-y-3">
                    {relatedDishes.map((relFood) => (
                      <Link
                        key={relFood?.id}
                        href={`/food/${relFood?.slug || relFood?.id}`}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FAF7F2] transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-stone-200">
                          <img
                            src={relFood?.image}
                            alt={relFood?.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-stone-900 group-hover:text-[#B85D38] transition-colors truncate">
                            {relFood?.name}
                          </p>
                          <p className="text-[11px] text-stone-500 truncate">
                            {relFood?.category} • {relFood?.region}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
