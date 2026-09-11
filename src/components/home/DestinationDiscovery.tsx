import React, { useState } from 'react';
import { Link } from '../../lib/router';
import { tourismRepository } from '../../lib/repository';
import { Destination, RegionCategory } from '../../types';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { LinkButton } from '../ui/LinkButton';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import {
  Compass,
  ArrowRight,
  Eye,
  X,
  Clock,
  Calendar,
  IndianRupee,
  MapPin,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const REGION_FILTERS: { label: string; value: RegionCategory | 'All' }[] = [
  { label: 'All Regions (8)', value: 'All' },
  { label: 'Dhundhar (Jaipur)', value: 'Dhundhar' },
  { label: 'Mewar (Udaipur & Chittor)', value: 'Mewar' },
  { label: 'Marwar (Jodhpur & Pushkar)', value: 'Marwar' },
  { label: 'Thar Desert (Jaisalmer)', value: 'Thar' },
  { label: 'Bikaner (Caravan Hub)', value: 'Bikaner' },
  { label: 'Sirohi (Mount Abu)', value: 'Sirohi' },
];

export const DestinationDiscovery: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionCategory | 'All'>('All');
  const [previewDestination, setPreviewDestination] = useState<Destination | null>(null);

  const allDestinations = tourismRepository.getAllDestinations();

  const filteredDestinations = selectedRegion === 'All'
    ? allDestinations
    : allDestinations.filter((d) => d.region === selectedRegion);

  return (
    <Section padding="lg" className="border-b border-[#E7DFD5] bg-[#FAF7F2]">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="terracotta" size="sm">
                Curated Epicenters
              </Badge>
              <span className="text-xs uppercase font-semibold tracking-wider text-stone-500">
                Verified Photographic Dossiers
              </span>
            </div>
            <Heading level={2} variant="display" className="text-stone-900">
              The Eight Royal Realms of Rajasthan
            </Heading>
            <Text color="secondary" className="text-base sm:text-lg">
              Each destination preserves distinct architectural traditions, dialect, and culinary secrets. Filter by historic region to begin your discovery.
            </Text>
          </div>

          <div className="shrink-0">
            <LinkButton href="/destinations" variant="outline" size="md">
              <span>View All 8 Dossiers</span>
              <ArrowRight className="w-4 h-4" />
            </LinkButton>
          </div>
        </div>

        {/* Region Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {REGION_FILTERS.map((filter) => {
            const isSelected = selectedRegion === filter.value;
            return (
              <button
                key={filter.label}
                onClick={() => setSelectedRegion(filter.value)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#B85D38] text-white shadow-sm'
                    : 'bg-white text-stone-700 border border-[#E7DFD5] hover:bg-stone-100'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
            <Card
              key={dest.id}
              variant="hover-lift"
              hoverLift
              interactive
              padding="none"
              className="group flex flex-col justify-between bg-white border border-[#E7DFD5] rounded-2xl overflow-hidden"
            >
              <div>
                {/* Visual Image container with overlay & quick preview trigger */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
                  <ResponsiveImage
                    src={dest.heroImage}
                    alt={`${dest.name} - ${dest.moniker}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Region badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white tracking-wide">
                      {dest.region}
                    </span>
                  </div>

                  {/* Hindi Script Moniker */}
                  {dest.hindiName && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-[11px] font-serif text-white">
                        {dest.hindiName}
                      </span>
                    </div>
                  )}

                  {/* Quick Preview Hover Trigger */}
                  <button
                    onClick={() => setPreviewDestination(dest)}
                    className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-stone-900 text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer"
                    title="Quick preview dossier"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#B85D38]" />
                    <span>Quick Preview</span>
                  </button>

                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-xs font-serif italic text-amber-200">
                      {dest.moniker}
                    </p>
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-2xl font-bold text-stone-900 group-hover:text-[#B85D38] transition-colors">
                      {dest.name}
                    </h3>
                    <span className="text-xs font-medium text-stone-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {dest.recommendedDuration}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {dest.shortDescription}
                  </p>

                  {/* Key Highlights Pills */}
                  <div className="pt-1 flex flex-wrap gap-1.5">
                    {dest.highlights.slice(0, 2).map((hl, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 line-clamp-1 border border-stone-200/60"
                      >
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between">
                <button
                  onClick={() => setPreviewDestination(dest)}
                  className="text-xs font-medium text-stone-500 hover:text-stone-900 cursor-pointer"
                >
                  Highlights
                </button>
                <Link
                  href={`/destinations/${dest.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#B85D38] hover:text-[#9E4A2A] group/link"
                >
                  <span>Full Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal: Quick Destination Preview Drawer */}
        {previewDestination && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setPreviewDestination(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Hero Image */}
              <div className="relative aspect-video w-full bg-stone-900 overflow-hidden">
                <ResponsiveImage
                  src={previewDestination.heroImage}
                  alt={previewDestination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <button
                  onClick={() => setPreviewDestination(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
                  aria-label="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-5 left-6 right-6 text-white space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#B85D38] text-[11px] font-semibold">
                      {previewDestination.region}
                    </span>
                    <span className="text-xs text-amber-200 font-serif italic">
                      {previewDestination.moniker}
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold">
                    {previewDestination.name} {previewDestination.hindiName && `(${previewDestination.hindiName})`}
                  </h3>
                </div>
              </div>

              {/* Modal Content Details */}
              <div className="p-6 sm:p-8 space-y-6">
                <p className="text-sm text-stone-700 leading-relaxed">
                  {previewDestination.description}
                </p>

                {/* Key Curated Highlights */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-stone-500">
                    Must-Visit Heritage Landmarks
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {previewDestination.highlights.map((hl, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-stone-800 bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E7DFD5]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#B85D38] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logistics At A Glance */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-stone-100 text-stone-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-stone-500 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Duration</span>
                    </div>
                    <p className="text-xs font-bold text-stone-900">
                      {previewDestination.recommendedDuration}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-stone-500 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Best Months</span>
                    </div>
                    <p className="text-xs font-bold text-stone-900 line-clamp-1">
                      {previewDestination.bestTimeToVisit.idealMonths}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-stone-500 font-medium">
                      <IndianRupee className="w-3.5 h-3.5" />
                      <span>Mid-Range / Day</span>
                    </div>
                    <p className="text-xs font-bold text-stone-900">
                      ₹{previewDestination.estimatedBudget.dailyEstimatedINR.midRange.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setPreviewDestination(null)}
                    className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    Close Preview
                  </button>
                  <Link
                    href={`/destinations/${previewDestination.slug}`}
                    className="px-5 py-2.5 rounded-xl bg-[#B85D38] hover:bg-[#9E4A2A] text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Read Comprehensive Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
};
