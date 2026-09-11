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
import { LinkButton } from '../components/ui/LinkButton';
import {
  ArrowLeft,
  Sparkles,
  Clock,
  Compass,
  MapPin,
  Calendar,
  ShieldCheck,
  Check,
  Share2,
  Bookmark,
  ArrowRight,
} from 'lucide-react';

export const ExperienceDetailView: React.FC = () => {
  const { params } = useRouter();
  const slug = params.slug || 'exp-thar-stargaze';
  const experience = tourismRepository.getExperienceById(slug);

  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useDocumentMeta(
    experience
      ? `${experience.title} | Curated Experience | Rajasthan Tourism`
      : 'Experience Not Found | Rajasthan Tourism',
    experience
      ? `${experience.description} Duration: ${experience.duration}. Authentic cultural guidance and itinerary details.`
      : 'The requested Rajasthan curated cultural experience could not be located.'
  );

  if (!experience) {
    return (
      <Section padding="xl">
        <Container size="sm" className="text-center space-y-4">
          <Heading level={1} variant="h2">
            Experience Not Found
          </Heading>
          <Text color="muted">
            The cultural experience "{slug}" does not exist in our curated catalog.
          </Text>
          <div className="pt-4">
            <LinkButton href="/experiences" variant="primary">
              Return to Experiences
            </LinkButton>
          </div>
        </Container>
      </Section>
    );
  }

  const relatedDestinations = experience.destinationIds
    .map((destId) => tourismRepository.getDestinationById(destId))
    .filter(Boolean);

  const relatedExperiences = (experience.relatedExperienceIds || [])
    .map((id) => tourismRepository.getExperienceById(id))
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
                href="/experiences"
                className="inline-flex items-center gap-1.5 hover:text-stone-900 font-medium transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Curated Experiences</span>
              </Link>
              <span className="text-stone-300">/</span>
              <span className="text-stone-800 font-semibold truncate max-w-[200px] sm:max-w-none">
                {experience.title}
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
                title={saved ? 'Saved to Favorites' : 'Save Experience'}
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
                <Badge variant="indigo" size="md">
                  {experience.category}
                </Badge>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 bg-white px-2.5 py-1 rounded-md border border-[#E7DFD5]">
                  <Clock className="w-3.5 h-3.5 text-[#B85D38]" />
                  <span>{experience.duration}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-baseline gap-3">
                <Heading level={1} variant="display">
                  {experience.title}
                </Heading>
                {experience.hindiTitle && (
                  <span className="font-serif text-2xl text-stone-400 font-normal">
                    {experience.hindiTitle}
                  </span>
                )}
              </div>

              <Text variant="lead" color="secondary" className="leading-relaxed">
                {experience.description}
              </Text>

              {/* Quick Vital Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#E7DFD5]">
                <div className="p-3.5 bg-white rounded-xl border border-[#E7DFD5]">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B85D38]" />
                    <span className="font-medium">Setting & Location</span>
                  </div>
                  <p className="text-xs font-semibold text-stone-900 leading-snug">
                    {experience.locationSummary || experience.destinationIds.map((id) => id.charAt(0).toUpperCase() + id.slice(1)).join(', ')}
                  </p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-[#E7DFD5]">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-[#B85D38]" />
                    <span className="font-medium">Optimal Season</span>
                  </div>
                  <p className="text-xs font-semibold text-stone-900 leading-snug">
                    {experience.bestSeason || 'October through March'}
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
              <div className="relative rounded-2xl overflow-hidden shadow-md border-4 border-white bg-stone-200">
                <ResponsiveImage
                  src={experience.image}
                  alt={experience.title}
                  aspectRatio="4/3"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-4 text-white">
                  <p className="text-xs font-medium text-amber-200 uppercase tracking-wider">
                    {experience.category} Experience
                  </p>
                  <p className="text-xs opacity-90">{experience.duration}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Narrative & Practical Guide */}
      <Section padding="lg" className="border-b border-[#E7DFD5]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: What to Expect & Practical Tips */}
            <div className="lg:col-span-8 space-y-8">
              {/* What to Expect */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B85D38]">
                  <Sparkles className="w-4 h-4" />
                  <span>The Journey</span>
                </div>
                <Heading level={2} variant="h2">
                  What You Will Experience
                </Heading>
                <div className="space-y-3">
                  {(experience.whatToExpect && experience.whatToExpect.length > 0
                    ? experience.whatToExpect
                    : [
                        'Immersive engagement guided by local heritage custodians',
                        'Authentic interaction with traditional artisans, musicians, and regional communities',
                        'Unrushed contemplation of architecture, natural landscapes, and historical sites',
                      ]
                  ).map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white border border-[#E7DFD5] flex items-start gap-3 shadow-xs"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#FAF7F2] text-[#B85D38] border border-[#E7DFD5] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Tips */}
              {experience.practicalTips && experience.practicalTips.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B85D38]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Traveler Preparation</span>
                  </div>
                  <Heading level={3} variant="h3">
                    Practical Tips & Gear Advisory
                  </Heading>
                  <div className="space-y-2.5">
                    {experience.practicalTips.map((tip, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#FFFDF9] border border-[#E7DFD5] text-xs sm:text-sm text-stone-700 leading-relaxed flex items-start gap-2.5"
                      >
                        <span className="text-[#B85D38] font-bold">•</span>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="space-y-2 pt-2">
                <span className="text-xs uppercase font-bold tracking-wider text-stone-500">
                  Experience Tags
                </span>
                <div className="flex flex-wrap gap-2">
                  {experience.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-lg bg-white border border-[#E7DFD5] text-stone-700 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Host Destinations */}
              <Card padding="md" className="space-y-4 bg-white border-[#E7DFD5]">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#B85D38]" />
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Host Destination
                  </h3>
                </div>
                <p className="text-xs text-stone-600">
                  Experience this cultural immersion in the following regional cities:
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
                    Add Experience to Planner
                  </LinkButton>
                </div>
              </Card>

              {/* Related Experiences */}
              {relatedExperiences.length > 0 && (
                <Card padding="md" className="space-y-4 bg-white border-[#E7DFD5]">
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Similar Cultural Immersions
                  </h3>
                  <div className="space-y-3">
                    {relatedExperiences.map((relExp) => (
                      <Link
                        key={relExp?.id}
                        href={`/experiences/${relExp?.slug || relExp?.id}`}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FAF7F2] transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-stone-200">
                          <img
                            src={relExp?.image}
                            alt={relExp?.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-stone-900 group-hover:text-[#B85D38] transition-colors truncate">
                            {relExp?.title}
                          </p>
                          <p className="text-[11px] text-stone-500 truncate">
                            {relExp?.category} • {relExp?.duration}
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
