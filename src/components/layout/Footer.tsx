import React from 'react';
import { Link } from '../../lib/router';
import { Compass, Heart, ShieldCheck, Map, Utensils, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#1C1917] text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#B85D38] text-white flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-stone-100">
                  Rajasthan
                </span>
                <span className="block text-[10px] uppercase font-semibold tracking-[0.25em] text-[#B85D38]">
                  Tourism Experience
                </span>
              </div>
            </div>
            
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              An editorial travel chronicle and interactive spatial exploration of India’s most storied desert state. Crafted to discover the living heritage, colossal fortresses, and culinary soul of Rajputana.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-stone-500">
              <ShieldCheck className="w-4 h-4 text-[#B85D38]" />
              <span>Independent Cultural Heritage & Travel Chronicle</span>
            </div>
          </div>

          {/* Column 1: Core Destinations */}
          <div className="space-y-3">
            <p className="text-xs uppercase font-semibold tracking-wider text-stone-100">
              Destinations
            </p>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link href="/destinations/jaipur" className="hover:text-stone-100 transition-colors">
                  Jaipur (Pink City)
                </Link>
              </li>
              <li>
                <Link href="/destinations/udaipur" className="hover:text-stone-100 transition-colors">
                  Udaipur (City of Lakes)
                </Link>
              </li>
              <li>
                <Link href="/destinations/jodhpur" className="hover:text-stone-100 transition-colors">
                  Jodhpur (Blue City)
                </Link>
              </li>
              <li>
                <Link href="/destinations/jaisalmer" className="hover:text-stone-100 transition-colors">
                  Jaisalmer (Golden City)
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-[#B85D38] hover:text-[#D47853] transition-colors font-medium">
                  View All 8 Destinations →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Cultural Heritage */}
          <div className="space-y-3">
            <p className="text-xs uppercase font-semibold tracking-wider text-stone-100">
              Culture & Living Arts
            </p>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link href="/experiences" className="hover:text-stone-100 transition-colors">
                  Thar Stargazing & Safaris
                </Link>
              </li>
              <li>
                <Link href="/food" className="hover:text-stone-100 transition-colors">
                  Dal Baati & Desert Gastronomy
                </Link>
              </li>
              <li>
                <Link href="/festivals" className="hover:text-stone-100 transition-colors">
                  Pushkar Fair & Camel Festivals
                </Link>
              </li>
              <li>
                <Link href="/travel-guide" className="hover:text-stone-100 transition-colors">
                  Seasonal Weather & Etiquette
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Trip Tools */}
          <div className="space-y-3">
            <p className="text-xs uppercase font-semibold tracking-wider text-stone-100">
              Trip Crafting
            </p>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link href="/planner" className="hover:text-stone-100 transition-colors flex items-center gap-1.5">
                  <Map className="w-3.5 h-3.5 text-[#B85D38]" />
                  <span>Itinerary Builder</span>
                </Link>
              </li>
              <li>
                <Link href="/planner" className="hover:text-stone-100 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B85D38]" />
                  <span>Budget Estimator</span>
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-stone-100 transition-colors flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-[#B85D38]" />
                  <span>Interactive Map</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Legal Transparency */}
          <div className="space-y-3">
            <p className="text-xs uppercase font-semibold tracking-wider text-stone-100">
              Transparency &amp; Legal
            </p>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link href="/privacy" className="hover:text-stone-100 transition-colors flex items-center gap-1.5">
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-stone-100 transition-colors flex items-center gap-1.5">
                  <span>Terms of Use</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-stone-100 transition-colors flex items-center gap-1.5">
                  <span>Asset &amp; Licensing Directory</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal / Learning Project Disclaimer */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p className="max-w-xl text-stone-400 leading-relaxed text-center sm:text-left">
            <strong className="text-stone-200">Independent Educational Project:</strong> Rajasthan Explorer is an independent educational/travel project and is not affiliated with or endorsed by the Government of Rajasthan or Rajasthan Tourism. Budget figures and schedules represent educational simulation models.
          </p>
          <div className="flex items-center gap-1 text-stone-400 shrink-0">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-[#B85D38] fill-[#B85D38]" />
            <span>for Rajasthan cultural heritage</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
