import React, { useState } from 'react';
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
import { getDestinationSlideSequence } from '../data/imageManifest';
import { LinkButton } from '../components/ui/LinkButton';
import { AttractionsEditorialSection } from '../components/AttractionsEditorialSection';
import { CultureInsight } from '../components/CultureInsight';
import {
  MapPin,
  Calendar,
  Clock,
  Navigation,
  Compass,
  ArrowLeft,
  ArrowRight,
  Info,
  Utensils,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const DestinationDetailView: React.FC = () => {
  const { params } = useRouter();
  const slug = params.slug || 'jaipur';
  const destination = tourismRepository.getDestinationBySlug(slug);
  const [isCultureInsightOpen, setIsCultureInsightOpen] = useState(false);
  const destinationExperiences = destination ? tourismRepository.getExperiencesByDestination(destination.id) : [];
  const destinationCulture = destination ? tourismRepository.getCultureInsightsByDestination(destination.id) : [];

  useDocumentMeta(
    destination
      ? `${destination.name} — ${destination.moniker} | Rajasthan Tourism`
      : 'Destination Not Found | Rajasthan Tourism',
    destination
      ? destination.shortDescription
      : 'The requested Rajasthan destination could not be located.'
  );

  if (!destination) {
    return (
      <Section padding="xl">
        <Container size="sm" className="text-center space-y-4">
          <Heading level={1} variant="h2">
            Destination Not Found
          </Heading>
          <Text color="muted">
            The requested destination slug "{slug}" does not exist in our regional database.
          </Text>
          <div className="pt-4">
            <LinkButton href="/destinations" variant="primary">
              Return to All Destinations
            </LinkButton>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <div className="w-full">
      {/* Editorial Breadcrumb & Back Action */}
      <div className="bg-[#FAF7F2] border-b border-[#E7DFD5] py-3">
        <Container>
          <div className="flex items-center justify-between text-xs text-stone-500">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-1 hover:text-stone-900 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Destinations</span>
            </Link>
            <span className="font-mono text-stone-400">
              {destination.coordinates.lat.toFixed(2)}°N, {destination.coordinates.lng.toFixed(2)}°E
            </span>
          </div>
        </Container>
      </div>

      {/* Destination Editorial Banner */}
      <Section variant="sandstone" padding="md" className="border-b border-[#E7DFD5]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="terracotta" size="md">
                  {destination.region} Region
                </Badge>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#B85D38]">
                  {destination.moniker}
                </span>
              </div>

              <div className="flex items-baseline gap-4">
                <Heading level={1} variant="display">
                  {destination.name}
                </Heading>
                {destination.hindiName && (
                  <span className="font-serif text-2xl text-stone-400 font-normal">
                    {destination.hindiName}
                  </span>
                )}
              </div>

              <Text variant="lead" color="secondary">
                {destination.shortDescription}
              </Text>

              {/* Quick Vital Statistics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#E7DFD5]">
                <div className="p-3 bg-white rounded-lg border border-[#E7DFD5]">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-[#B85D38]" />
                    <span>Best Season</span>
                  </div>
                  <p className="text-xs font-semibold text-stone-900">
                    {destination.bestTimeToVisit.idealMonths}
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-[#E7DFD5]">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#B85D38]" />
                    <span>Duration</span>
                  </div>
                  <p className="text-xs font-semibold text-stone-900">
                    {destination.recommendedDuration}
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-[#E7DFD5] col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                    <Info className="w-3.5 h-3.5 text-[#B85D38]" />
                    <span>Est. Daily Budget</span>
                  </div>
                  <p className="text-xs font-semibold text-stone-900">
                    ₹{destination.estimatedBudget.dailyEstimatedINR.midRange.toLocaleString('en-IN')} (Mid-tier)
                  </p>
                </div>
              </div>

              {/* Cultural Insight Quick Facts Trigger */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  id="open-culture-insight-hero-btn"
                  type="button"
                  onClick={() => setIsCultureInsightOpen(true)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#241B15] text-[#FAF7F2] hover:bg-stone-800 text-xs font-semibold shadow-xs transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Cultural Insights & Quick Facts</span>
                  <span className="px-1.5 py-0.5 rounded-sm bg-amber-400/20 text-amber-300 text-[10px] font-bold">
                    Traditions
                  </span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-md border border-[#E7DFD5] bg-stone-900">
                <ImageGallerySlideshow
                  slides={getDestinationSlideSequence(destination.id)}
                  aspectRatio="4/3"
                  showControls={true}
                  showIndicators={true}
                  showThumbnails={true}
                  showAttribution={true}
                  autoPlayInterval={7000}
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Narrative Overview & Historical Highlights */}
      <Section padding="lg" className="border-b border-[#E7DFD5]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <Badge variant="indigo" size="sm">
                  Historical Chronicle
                </Badge>
                <Heading level={2} variant="h2">
                  The Essence of {destination.name}
                </Heading>
              </div>

              <p className="text-stone-700 leading-relaxed text-base sm:text-lg">
                {destination.description}
              </p>

              <div className="p-5 bg-[#FAF7F2] rounded-xl border border-[#E7DFD5] space-y-3">
                <h4 className="font-serif text-lg font-bold text-stone-900">
                  Key Cultural Highlights
                </h4>
                <ul className="space-y-2">
                  {destination.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B85D38] mt-2 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Culture Insight Trigger within Cultural Highlights */}
                <div className="pt-3 border-t border-[#E7DFD5] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="text-stone-600 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#B85D38]" />
                    Discover turbans, customs, and traveler etiquette
                  </span>
                  <button
                    id="open-culture-insight-highlights-btn"
                    type="button"
                    onClick={() => setIsCultureInsightOpen(true)}
                    className="inline-flex items-center gap-1 font-bold text-[#B85D38] hover:text-[#8E4324] hover:underline cursor-pointer"
                  >
                    <span>Explore {destination.name} Traditions</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Travel Logistics Box */}
            <div className="lg:col-span-5 space-y-6">
              <Card padding="md" className="space-y-4">
                <div className="flex items-center gap-2 text-[#B85D38]">
                  <Navigation className="w-4 h-4" />
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Connectivity & Arrival
                  </h3>
                </div>

                <div className="space-y-3 text-xs text-stone-600">
                  <div>
                    <span className="font-semibold text-stone-900 block">Air:</span>
                    {destination.travelInformation.nearestAirport}
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 block">Rail:</span>
                    {destination.travelInformation.railConnectivity}
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 block">Road:</span>
                    {destination.travelInformation.roadConnectivity}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-2">
                    Travel Advisory Notes
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-600">
                    {destination.travelInformation.travelTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#B85D38] font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              {/* Connected Neighboring Hubs */}
              <Card padding="md" variant="sandstone" className="space-y-3">
                <h4 className="font-serif text-base font-bold text-stone-900">
                  Connected Regional Routes
                </h4>
                <div className="space-y-2">
                  {destination.nearbyDestinations.map((nearby) => (
                    <div
                      key={nearby.destinationId}
                      className="flex items-center justify-between text-xs p-2 bg-white rounded-lg border border-[#E7DFD5]"
                    >
                      <div>
                        <span className="font-semibold text-stone-900">
                          {nearby.destinationName}
                        </span>
                        <span className="text-stone-500 block">
                          {nearby.distanceKm} km • Approx {nearby.approxDurationHours} hrs ({nearby.mode})
                        </span>
                      </div>
                      <Link
                        href={`/destinations/${nearby.destinationId}`}
                        className="text-[#B85D38] font-semibold hover:underline"
                      >
                        Explore →
                      </Link>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Signature Attractions Editorial Section */}
      {destination.attractions && destination.attractions.length > 0 && (
        <AttractionsEditorialSection
          destinationName={destination.name}
          destinationHindiName={destination.hindiName}
          attractions={destination.attractions}
        />
      )}

      {/* Visual Dossier Gallery */}
      {destination.gallery && destination.gallery.length > 0 && (
        <Section padding="md" className="border-b border-[#E7DFD5] bg-[#1C1917] text-white">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                  Visual Dossier & Photographic Archive
                </span>
                <Heading level={2} variant="h3" className="text-white">
                  Verified Glimpses of {destination.name}
                </Heading>
              </div>
              <p className="text-xs text-stone-400">
                Authentic landscape & architectural perspectives
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destination.gallery.map((item) => (
                <div key={item.id} className="group relative rounded-xl overflow-hidden aspect-[16/10] bg-stone-800 border border-stone-800 shadow-md">
                  <ResponsiveImage
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 transition-opacity flex items-end p-4 pointer-events-none">
                    <p className="text-xs text-stone-200 font-medium">
                      {item.alt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Cultural Gastronomy & Festive Links */}
      {(destination.foods.length > 0 || destination.festivals.length > 0) && (
        <Section variant="sandstone" padding="lg">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Regional Foods */}
              {destination.foods.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-[#B85D38]" />
                      <h3 className="font-serif text-2xl font-bold text-stone-900">
                        Regional Gastronomy
                      </h3>
                    </div>
                    <Link
                      href="/food"
                      className="text-xs font-semibold text-[#B85D38] hover:text-[#9E4A2A] flex items-center gap-1"
                    >
                      <span>All Cuisines</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {destination.foods.map((food) => {
                      const foodUrl = `/food/${food.slug || food.id}`;
                      return (
                        <Card
                          key={food.id}
                          variant="hover-lift"
                          hoverLift
                          interactive
                          padding="sm"
                          className="space-y-1 group"
                        >
                          <Link href={foodUrl} className="block focus:outline-hidden">
                            <div className="flex items-center justify-between">
                              <h4 className="font-serif text-base font-bold text-stone-900 group-hover:text-[#B85D38] transition-colors">
                                {food.name}
                              </h4>
                              <Badge variant="terracotta" size="sm">
                                {food.category}
                              </Badge>
                            </div>
                            <p className="text-xs text-stone-600 leading-relaxed mt-1 line-clamp-2">
                              {food.description}
                            </p>
                            <div className="flex items-center justify-end gap-1 text-[11px] font-semibold text-[#B85D38] pt-2">
                              <span>Story & Recipe</span>
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </Link>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Regional Festivals */}
              {destination.festivals.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#D97706]" />
                      <h3 className="font-serif text-2xl font-bold text-stone-900">
                        Annual Celebrations
                      </h3>
                    </div>
                    <Link
                      href="/festivals"
                      className="text-xs font-semibold text-[#B85D38] hover:text-[#9E4A2A] flex items-center gap-1"
                    >
                      <span>Calendar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {destination.festivals.map((fest) => {
                      const festUrl = `/festivals/${fest.slug || fest.id}`;
                      return (
                        <Card
                          key={fest.id}
                          variant="hover-lift"
                          hoverLift
                          interactive
                          padding="sm"
                          className="space-y-1 group"
                        >
                          <Link href={festUrl} className="block focus:outline-hidden">
                            <div className="flex items-center justify-between">
                              <h4 className="font-serif text-base font-bold text-stone-900 group-hover:text-[#B85D38] transition-colors">
                                {fest.name}
                              </h4>
                              <span className="text-xs font-semibold text-[#B45309]">
                                {fest.approximateMonth}
                              </span>
                            </div>
                            <p className="text-xs text-stone-600 leading-relaxed mt-1 line-clamp-2">
                              {fest.description}
                            </p>
                            <div className="flex items-center justify-end gap-1 text-[11px] font-semibold text-[#B85D38] pt-2">
                              <span>Festival Guide</span>
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </Link>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* Destination Experiences Section */}
      {destinationExperiences.length > 0 && (
        <Section padding="lg" className="border-t border-[#E7DFD5]">
          <Container>
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#B85D38]">
                  Curated Itinerary
                </span>
                <Heading level={2} variant="h3">
                  Signature Experiences in {destination.name}
                </Heading>
              </div>
              <Link
                href="/experiences"
                className="text-xs font-semibold text-[#B85D38] hover:text-[#9E4A2A] flex items-center gap-1"
              >
                <span>View All Experiences</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinationExperiences.map((exp) => {
                const expUrl = `/experiences/${exp.slug || exp.id}`;
                return (
                  <Card
                    key={exp.id}
                    variant="hover-lift"
                    hoverLift
                    interactive
                    padding="none"
                    className="flex flex-col justify-between group overflow-hidden bg-white border border-[#E7DFD5]"
                  >
                    <Link href={expUrl} className="block flex-1 flex flex-col justify-between focus:outline-hidden">
                      <div>
                        <div className="overflow-hidden bg-stone-200 aspect-[16/10]">
                          <ResponsiveImage
                            src={exp.image}
                            alt={exp.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <Badge variant="indigo" size="sm">
                              {exp.category}
                            </Badge>
                            <span className="text-stone-500">{exp.duration}</span>
                          </div>
                          <h4 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#B85D38] transition-colors">
                            {exp.title}
                          </h4>
                          <p className="text-xs text-stone-600 line-clamp-2">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                      <div className="p-4 pt-0 border-t border-stone-100 flex items-center justify-end text-xs font-semibold text-[#B85D38] mt-2">
                        <span className="flex items-center gap-1">
                          <span>View Experience</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* Destination Cultural Lore Section */}
      {destinationCulture.length > 0 && (
        <Section padding="lg" variant="sandstone" className="border-t border-[#E7DFD5]">
          <Container>
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#B85D38]">
                  Heritage & Lore
                </span>
                <Heading level={2} variant="h3">
                  Cultural Traditions Connected to {destination.name}
                </Heading>
              </div>
              <button
                type="button"
                onClick={() => setIsCultureInsightOpen(true)}
                className="text-xs font-semibold text-[#B85D38] hover:text-[#9E4A2A] flex items-center gap-1 cursor-pointer"
              >
                <span>Quick Heritage Dossier</span>
                <BookOpen className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinationCulture.map((lore) => {
                const loreUrl = `/culture/${lore.slug || lore.id}`;
                return (
                  <Card
                    key={lore.id}
                    variant="hover-lift"
                    hoverLift
                    interactive
                    padding="none"
                    className="flex flex-col justify-between group overflow-hidden bg-white border border-[#E7DFD5]"
                  >
                    <Link href={loreUrl} className="block flex-1 flex flex-col justify-between focus:outline-hidden">
                      <div>
                        <div className="overflow-hidden bg-stone-200 aspect-[16/10]">
                          <ResponsiveImage
                            src={lore.image}
                            alt={lore.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <Badge variant="terracotta" size="sm">
                              {lore.category}
                            </Badge>
                            {lore.hindiTitle && (
                              <span className="font-serif text-stone-400">{lore.hindiTitle}</span>
                            )}
                          </div>
                          <h4 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#B85D38] transition-colors">
                            {lore.title}
                          </h4>
                          <p className="text-xs text-stone-600 line-clamp-2">
                            {lore.quickFact}
                          </p>
                        </div>
                      </div>
                      <div className="p-4 pt-0 border-t border-stone-100 flex items-center justify-end text-xs font-semibold text-[#B85D38] mt-2">
                        <span className="flex items-center gap-1">
                          <span>Explore Lore</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* Reusable CultureInsight Modal Component */}
      <CultureInsight
        isOpen={isCultureInsightOpen}
        onClose={() => setIsCultureInsightOpen(false)}
        destinationId={destination.id}
        destinationName={destination.name}
      />
    </div>
  );
};
