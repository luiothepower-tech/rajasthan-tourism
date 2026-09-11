import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { useDocumentMeta } from '../lib/seo';
import { Link } from '../lib/router';
import { getAllManifestEntries, ImageManifestEntry } from '../data/imageManifest';
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Search,
  Camera,
  ExternalLink,
} from 'lucide-react';

export const TermsView: React.FC = () => {
  useDocumentMeta(
    'Terms, Disclaimer & Asset Directory | Rajasthan Explorer',
    'Terms of use, non-government affiliation disclaimer, travel guidance estimates, and comprehensive photographic asset registry.'
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'destination' | 'food' | 'festival' | 'experience' | 'attraction'>('all');

  const allAssets = getAllManifestEntries();

  const filteredAssets = allAssets.filter((asset) => {
    const matchesSearch =
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || asset.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="w-full bg-[#FAF7F2] text-stone-900 min-h-screen py-10">
      <Container size="lg">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-[#B85D38] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-4 pb-8 border-b border-[#E7DFD5]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B85D38]/10 text-[#B85D38] text-xs font-semibold tracking-wide uppercase">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Disclaimer &amp; Asset Directory</span>
          </div>

          <Heading level={1} variant="display" className="text-3xl sm:text-4xl text-stone-900">
            Terms of Use &amp; Educational Disclaimers
          </Heading>

          <Text variant="lead" color="secondary" className="text-stone-600 max-w-3xl">
            Rajasthan Explorer is a personal learning project and educational travel chronicle. Please review these disclosures regarding informational purpose, non-affiliation, and photographic asset records.
          </Text>

          <p className="text-xs text-stone-500">
            Published for educational reference &bull; Not commercial legal advice
          </p>
        </div>

        {/* Key Disclaimer Callout Banner */}
        <div className="my-8 p-6 rounded-2xl bg-amber-50 border border-amber-200/80 shadow-xs flex flex-col sm:flex-row gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-amber-200/60 text-amber-800 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-[#B85D38]" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-stone-900">
              Independent Educational Project Notice
            </h2>
            <p className="text-sm text-stone-800 leading-relaxed font-medium">
              Rajasthan Explorer is an independent educational/travel project and is not affiliated with or endorsed by the Government of Rajasthan or Rajasthan Tourism.
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              This site does not claim official government sponsorship, public sector partnership, or statutory authority. For official government circulars, state tourism department permits, or formal administrative inquiries, please visit official government portals directly.
            </p>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-10 text-stone-800 text-sm leading-relaxed pb-12">
          
          {/* Section 1: Informational & Educational Scope */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B85D38]" />
              <span>1. Informational &amp; Educational Nature</span>
            </h2>
            <p>
              All content published on this website—including regional destination narratives, architectural histories, cultural etiquette notes, culinary recipes, festival calendars, and suggested daily travel itineraries—is provided solely for personal educational exploration, cultural study, and travel planning simulation.
            </p>
            <p className="text-stone-600">
              No content on this site constitutes professional travel agency advice, certified guide services, legal counsel, or medical advice for travel health.
            </p>
          </section>

          {/* Section 2: Pricing, Timings & Dynamic Travel Realities */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#B85D38]" />
              <span>2. Monument Timings, Entry Fees &amp; Travel Conditions</span>
            </h2>
            <p>
              Travel conditions in Rajasthan are inherently dynamic:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-stone-700">
              <li>
                <strong>Monument Fees &amp; Composite Tickets:</strong> Stated entry fees (e.g. for Amer Fort, City Palace museums, boat rides, or camera tickets) are benchmark estimates based on historic research. Monument trusts, the Archaeological Survey of India (ASI), and state departments periodically adjust entrance tariffs without prior notice.
              </li>
              <li>
                <strong>Operating Timings:</strong> Opening and closing times for temples, stepwells, and palaces may vary on religious festival holidays, VIP state visits, or seasonal weather shifts.
              </li>
              <li>
                <strong>Festival Dates:</strong> Traditional fairs such as the Pushkar Camel Fair, Teej, and Mewar Gangaur follow the Hindu lunar calendar (e.g. Kartik Purnima or Shravan Shukla Tritiya). Gregorian calendar dates change annually and must be verified independently before booking travel.
              </li>
              <li>
                <strong>Budget Estimator Rates:</strong> The parametric calculations generated by the planner represent simulated mathematical models across budget, mid-range, and heritage luxury tiers. They do not constitute guaranteed commercial rates or booking offers.
              </li>
            </ul>
            <p className="text-stone-600 pt-1">
              <strong>Recommendation:</strong> Always verify operating schedules, composite ticket counters, and road conditions with official monument administrations and authorized local authorities prior to arrival.
            </p>
          </section>

          {/* Section 3: Intellectual Property & Photographic Asset Directory */}
          <section className="space-y-6 pt-6 border-t border-[#E7DFD5]">
            <div className="space-y-2">
              <h2 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#B85D38]" />
                <span>3. Image Licensing &amp; Photographic Asset Directory</span>
              </h2>
              <p className="text-stone-700">
                To maintain authentic cultural representation, Rajasthan Explorer enforces an automated development-time image validation manifest. All visual assets represent authentic Rajasthani heritage (prohibiting inappropriate or generic placeholders).
              </p>
              <div className="p-4 rounded-xl bg-stone-100 border border-[#E7DFD5] text-xs text-stone-700 space-y-1">
                <p><strong>Licensing Status:</strong> Local Project Assets / Educational Fair Use.</p>
                <p><strong>Human Review Flag:</strong> As this is an educational learning project, any future commercial reproduction, public publication, or derivative distribution outside this educational prototype requires independent rights and license clearance.</p>
              </div>
            </div>

            {/* Asset Search & Filter Controls */}
            <div className="p-4 rounded-2xl bg-white border border-[#E7DFD5] shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search asset, subject, or landmark..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-stone-50 border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#B85D38]"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                  {(['all', 'destination', 'attraction', 'food', 'festival', 'experience'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-colors cursor-pointer ${
                        selectedType === type
                          ? 'bg-[#B85D38] text-white'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Asset Count */}
              <p className="text-xs text-stone-500">
                Showing {filteredAssets.length} of {allAssets.length} verified photographic assets
              </p>

              {/* Assets Grid / Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {filteredAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="p-3.5 rounded-xl bg-stone-50 border border-[#E7DFD5] space-y-2.5 flex flex-col justify-between hover:border-[#B85D38]/50 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-stone-200 border border-stone-200">
                        <img
                          src={asset.image}
                          alt={asset.altText || asset.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-emerald-400 capitalize">
                          {asset.verificationStatus}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#B85D38]">
                          {asset.type}
                        </span>
                        <h3 className="font-serif text-sm font-bold text-stone-900 line-clamp-1">
                          {asset.title}
                        </h3>
                        <p className="text-xs text-stone-600 line-clamp-2 mt-0.5">
                          {asset.subject}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E7DFD5] text-[11px] space-y-1 text-stone-500">
                      <p>
                        <strong className="text-stone-700">Source:</strong> {asset.source || 'Local Project Asset'}
                      </p>
                      <p>
                        <strong className="text-stone-700">License:</strong> {asset.license || 'Project Educational Use'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 4: Limitation of Liability */}
          <section className="space-y-3 pt-6 border-t border-[#E7DFD5]">
            <h2 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B85D38]" />
              <span>4. Limitation of Liability</span>
            </h2>
            <p className="text-stone-700">
              The project creator, contributors, and maintainers shall not be held liable for any direct, indirect, or incidental loss, travel disruption, missed train connections, monument closure inconvenience, or expense resulting from reliance upon information provided within this prototype application.
            </p>
          </section>

          {/* Section 5: Public-Release & Educational Compliance Checklist */}
          <section className="space-y-4 pt-6 border-t border-[#E7DFD5]">
            <div className="space-y-1">
              <h2 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B85D38]" />
                <span>5. Defensive Public-Release Checklist</span>
              </h2>
              <p className="text-xs text-stone-600">
                Current status verification for non-commercial educational deployment.
              </p>
            </div>

            <div className="rounded-xl bg-white border border-[#E7DFD5] divide-y divide-[#E7DFD5] overflow-hidden text-xs">
              <div className="p-3.5 flex items-start gap-3 bg-emerald-50/50">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900">Zero Secrets in Source</p>
                  <p className="text-stone-600 mt-0.5">
                    Confirmed no API keys, private tokens, or secrets exist in the repository or client bundle.
                  </p>
                </div>
              </div>

              <div className="p-3.5 flex items-start gap-3 bg-emerald-50/50">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900">Prominent Non-Affiliation Disclaimer</p>
                  <p className="text-stone-600 mt-0.5">
                    Clear notice embedded in the site footer, privacy policy, and terms view clarifying this is an independent educational chronicle.
                  </p>
                </div>
              </div>

              <div className="p-3.5 flex items-start gap-3 bg-emerald-50/50">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900">No Official Seals or Emblems</p>
                  <p className="text-stone-600 mt-0.5">
                    Verified complete absence of government insignia, state seals, or official emblems.
                  </p>
                </div>
              </div>

              <div className="p-3.5 flex items-start gap-3 bg-emerald-50/50">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900">Privacy Policy Published</p>
                  <p className="text-stone-600 mt-0.5">
                    Transparently details client-side localStorage usage and zero remote server-side tracking.
                  </p>
                </div>
              </div>

              <div className="p-3.5 flex items-start gap-3 bg-emerald-50/50">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900">Pricing &amp; Timings Disclaimed</p>
                  <p className="text-stone-600 mt-0.5">
                    All monument tariffs and itinerary budgets are explicitly disclaimed as educational simulation models.
                  </p>
                </div>
              </div>

              <div className="p-3.5 flex items-start gap-3 bg-emerald-50/50">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900">Accessible Controls &amp; Reduced Motion</p>
                  <p className="text-stone-600 mt-0.5">
                    Keyboard controls, ARIA landmark roles, touch navigation, and `prefers-reduced-motion` detection implemented across image slideshows.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </Container>
    </div>
  );
};
