import React from 'react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { useDocumentMeta } from '../lib/seo';
import { Link } from '../lib/router';
import { ShieldCheck, HardDrive, Volume2, Globe, FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const PrivacyView: React.FC = () => {
  useDocumentMeta(
    'Privacy Policy | Rajasthan Explorer',
    'Transparent disclosure of client-side data handling, local storage usage, and privacy practices for the Rajasthan Explorer project.'
  );

  return (
    <div className="w-full bg-[#FAF7F2] text-stone-900 min-h-screen py-10">
      <Container size="md">
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
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy & Data Handling</span>
          </div>

          <Heading level={1} variant="display" className="text-3xl sm:text-4xl text-stone-900">
            Privacy Policy
          </Heading>

          <Text variant="lead" color="secondary" className="text-stone-600 max-w-2xl">
            Rajasthan Explorer is an independent educational and cultural travel chronicle. This document provides clear, honest disclosures regarding how data is handled.
          </Text>

          <p className="text-xs text-stone-500">
            Last Updated: March 2026 &bull; Scope: Client-Side Web Application
          </p>
        </div>

        {/* Content Sections */}
        <div className="py-8 space-y-10 text-stone-800 text-sm leading-relaxed">
          
          {/* Section 1: Independent Status & Identity */}
          <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#E7DFD5] shadow-xs">
            <h2 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#B85D38]" />
              <span>1. Project Identity & Independent Status</span>
            </h2>
            <p>
              <strong>Rajasthan Explorer is an independent educational/travel project and is not affiliated with or endorsed by the Government of Rajasthan or Rajasthan Tourism.</strong>
            </p>
            <p className="text-stone-600">
              The application serves solely as an interactive cultural learning tool, spatial exploration interface, and itinerary simulation guide celebrating the tangible and intangible heritage of Rajasthan.
            </p>
          </section>

          {/* Section 2: Zero Personal Data Collection */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#B85D38]" />
              <span>2. Personal Information Collection (Zero Server-Side Storage)</span>
            </h2>
            <p>
              We believe in minimal data footprint. Unlike commercial travel aggregators or booking portals:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700">
              <li><strong>No user account registration:</strong> You are not asked to create a username, provide an email address, or enter a password.</li>
              <li><strong>No financial or payment data:</strong> We do not conduct transactions, accept payments, or store credit/debit card numbers. All budget amounts shown are strictly educational estimates.</li>
              <li><strong>No server-side user database:</strong> We do not operate a remote database that collects or logs personal profiles, session histories, or identity tokens.</li>
              <li><strong>No invasive third-party ad networks or tracking pixels:</strong> There are no commercial advertising networks or third-party behavioral trackers embedded in this application.</li>
            </ul>
          </section>

          {/* Section 3: Client-Side LocalStorage */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-[#B85D38]" />
              <span>3. Client-Side Browser Storage (`localStorage`)</span>
            </h2>
            <p>
              To make the <strong>Trip Itinerary Planner</strong> and <strong>Budget Estimator</strong> helpful across your browsing sessions, the application stores your planning preferences locally in your browser:
            </p>
            <div className="p-4 rounded-xl bg-stone-50 border border-[#E7DFD5] space-y-2 text-xs font-mono text-stone-700">
              <p><strong>Storage Key:</strong> <code className="text-[#B85D38]">rajasthan_tourism_planner_v1</code></p>
              <p><strong>Payload Stored:</strong> Selected destination IDs, trip duration in days, traveler count, chosen accommodation tier, transport tier, culinary tier, activity pace, and custom itinerary day adjustments.</p>
            </div>
            <p className="text-stone-600">
              <strong>Your control:</strong> This data resides exclusively on your device and is never transmitted to any external server. You can wipe this state at any time by clicking the &ldquo;Reset Planner&rdquo; button in the planner interface or by clearing your browser&rsquo;s cache and local storage data.
            </p>
          </section>

          {/* Section 4: Web Audio API Synthesizer */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-[#B85D38]" />
              <span>4. Ambient Soundscape Synthesizer</span>
            </h2>
            <p>
              The application includes an optional ambient soundscape simulating an Indian classical Tanpura drone. This synthesizer operates 100% in-browser using mathematical sine and triangle oscillators via the standard Web Audio API:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700">
              <li>It does not fetch external MP3 or audio stream files from remote servers.</li>
              <li>It does not request or access your microphone or any audio recording device.</li>
              <li>Audio remains muted by default and only activates upon your explicit user interaction (clicking the audio toggle button).</li>
            </ul>
          </section>

          {/* Section 5: External Links & Map Rendering */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#B85D38]" />
              <span>5. Custom Vector Map & External Links</span>
            </h2>
            <p>
              The spatial map on this website is rendered through a custom, lightweight, in-code vector SVG system. It does not use third-party commercial mapping APIs that track your geolocation or transmit IP query parameters to remote servers.
            </p>
            <p className="text-stone-600">
              If the site contains external references (e.g. to official conservation authorities or informational resources), please be aware that clicking external hyperlinks directs you to third-party domains with their own respective privacy statements.
            </p>
          </section>

          {/* Section 6: Inquiries & Verification */}
          <section className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#E7DFD5] space-y-2">
            <h2 className="font-serif text-base font-bold text-stone-900">
              Questions or Concerns?
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              If you have any questions regarding this educational project, asset licensing, or data practices, please refer to our{' '}
              <Link href="/terms" className="text-[#B85D38] font-semibold hover:underline">
                Terms &amp; Asset Directory
              </Link>{' '}
              for complete licensing and educational attribution records.
            </p>
          </section>

        </div>
      </Container>
    </div>
  );
};
