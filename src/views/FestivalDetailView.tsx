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
import { getFestivalSlideSequence } from '../data/imageManifest';
import { LinkButton } from '../components/ui/LinkButton';
import {
  ArrowLeft,
  Calendar,
  Sparkles,
  MapPin,
  Clock,
  Info,
  Check,
  Share2,
  Bookmark,
  ArrowRight,
  Compass,
} from 'lucide-react';

export const FestivalDetailView: React.FC = () => {
  const { params } = useRouter();
  const slug = params.slug || 'pushkar-camel-fair';
  const festival = tourismRepository.getFestivalById(slug);

  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useDocumentMeta(
    festival
      ? `${festival.name} (${festival.hindiName || 'Celebration'}) | Rajasthan Tourism`
      : 'Festival Not Found | Rajasthan Tourism',
    festival
      ? `${festival.description} Timing: ${festival.approximateMonth}. Key ceremonies, visitor guide, and cultural heritage.`
      : 'The requested Rajasthan cultural festival could not be located.'
  );

  if (!festival) {
    return (
      <Section padding="xl">
        <Container size="sm" className="text-center space-y-4">
          <Heading level={1} variant="h2">
            Festival Not Found
          </Heading>
          <Text color="muted">
            The festival "{slug}" does not exist in our cultural calendar.
          </Text>
          <div className="pt-4">
            <LinkButton href="/festivals" variant="primary">
              Return to Cultural Calendar
            </LinkButton>
          </div>
        </Container>
      </Section>
    );
  }

  const relatedDestinations = festival.destinationIds
    .map((destId) => tourismRepository.getDestinationById(destId))
    .filter(Boolean);

  const relatedFestivals = (festival.relatedFestivalIds || [])
    .map((id) => tourismRepository.getFestivalById(id))
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
                href="/festivals"
                className="inline-flex items-center gap-1.5 hover:text-stone-900 font-medium transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Cultural Calendar</span>
              </Link>
              <span className="text-stone-300">/</span>
              <span className="text-stone-800 font-semibold truncate max-w-[200px] sm:max-w-none">
                {festival.name}
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
                title={saved ? 'Saved to Favorites' : 'Save Festival'}
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
                <Badge variant="saffron" size="md">
                  Annual Heritage Fair
                </Badge>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#B45309] bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{festival.approximateMonth}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-baseline gap-3">
                <Heading level={1} variant="display">
                  {festival.name}
                </Heading>
                {festival.hindiName && (
                  <span className="font-serif text-2xl text-stone-400 font-normal">
                    {festival.hindiName}
                  </span>
                )}
              </div>

              <Text variant="lead" color="secondary" className="leading-relaxed">
                {festival.description}
              </Text>

              {/* Quick Vital Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#E7DFD5]">
                <div className="p-3.5 bg-white rounded-xl border border-[#E7DFD5]">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B85D38]" />
                    <span className="font-medium">Primary Venue</span>
                  </div>
                  <p className="text-xs font-semibold text-stone-900 leading-snug">
                    {festival.location}
                  </p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-[#E7DFD5]">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#B85D38]" />
                    <span className="font-medium">Best Time of Day</span>
                  </div>
                  <p className="text-xs font-semibold text-stone-900 leading-snug">
                    {festival.bestTimeOfDay || 'Morning & Twilight Processions'}
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
                  slides={getFestivalSlideSequence(slug)}
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

      {/* Narrative & Practical Guide */}
      <Section padding="lg" className="border-b border-[#E7DFD5]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-8">
              {/* Cultural Context */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B45309]">
                  <Sparkles className="w-4 h-4" />
                  <span>Cultural Significance</span>
                </div>
                <Heading level={2} variant="h2">
                  Heritage, Rituals & Devotion
                </Heading>
                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] text-stone-700 leading-relaxed text-sm sm:text-base space-y-3">
                  <p>{festival.culturalContext}</p>
                </div>
              </div>

              {/* Major Activities & Ceremonies */}
              <div className="space-y-4">
                <Heading level={3} variant="h3">
                  Signature Activities & Ceremonies
                </Heading>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(festival.majorActivities && festival.majorActivities.length > 0
                    ? festival.majorActivities
                    : festival.highlights
                  ).map((activity, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white border border-[#E7DFD5] flex items-start gap-3 shadow-xs"
                    >
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed">
                        {activity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visitor Guide & Etiquette */}
              {festival.visitorGuide && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B85D38]">
                    <Info className="w-4 h-4" />
                    <span>Traveler Advisory</span>
                  </div>
                  <Heading level={3} variant="h3">
                    Visitor Guide & Timing Strategy
                  </Heading>
                  <Card padding="md" className="bg-[#FFFDF9] border-[#E7DFD5] text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {festival.visitorGuide}
                  </Card>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Host Destinations */}
              <Card padding="md" className="space-y-4 bg-white border-[#E7DFD5]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#B85D38]" />
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Host Epicenter
                  </h3>
                </div>
                <p className="text-xs text-stone-600">
                  Explore the destination and surrounding attractions hosting this celebration:
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
                    Include Festival in Itinerary
                  </LinkButton>
                </div>
              </Card>

              {/* Related Festivals */}
              {relatedFestivals.length > 0 && (
                <Card padding="md" className="space-y-4 bg-white border-[#E7DFD5]">
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Other Historic Celebrations
                  </h3>
                  <div className="space-y-3">
                    {relatedFestivals.map((relFest) => (
                      <Link
                        key={relFest?.id}
                        href={`/festivals/${relFest?.slug || relFest?.id}`}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FAF7F2] transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-stone-200">
                          <img
                            src={relFest?.image}
                            alt={relFest?.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-stone-900 group-hover:text-[#B85D38] transition-colors truncate">
                            {relFest?.name}
                          </p>
                          <p className="text-[11px] text-stone-500 truncate">
                            {relFest?.approximateMonth}
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
