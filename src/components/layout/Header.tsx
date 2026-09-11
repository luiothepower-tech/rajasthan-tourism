import React, { useState, useEffect } from 'react';
import { useRouter, Link } from '../../lib/router';
import { Compass, Menu, X, MapPin, Calendar, Sparkles } from 'lucide-react';
import { LinkButton } from '../ui/LinkButton';
import { GlobalSearch } from './GlobalSearch';

interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Destinations', href: '/destinations' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Culinary Heritage', href: '/food' },
  { label: 'Festivals', href: '/festivals' },
  { label: 'Travel Guide', href: '/travel-guide' },
];

export const Header: React.FC = () => {
  const { currentPath } = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for subtle elevation boundary
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7DFD5] shadow-xs'
            : 'bg-[#FAF7F2] border-b border-[#E7DFD5]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Rajputana Cultural Emblem */}
            <Link
              href="/"
              className="flex items-center gap-3 text-stone-900 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B85D38] rounded-lg p-1"
              aria-label="Rajasthan Tourism Homepage"
            >
              <div className="w-10 h-10 rounded-lg bg-[#B85D38] text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
                <Compass className="w-5 h-5" strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-900 leading-none">
                  Rajasthan
                </span>
                <span className="text-[10px] uppercase font-medium tracking-[0.25em] text-[#B85D38] mt-1">
                  Tourism Experience
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
              {NAV_ITEMS.map((item) => {
                const isActive = currentPath.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors relative ${
                      isActive
                        ? 'text-[#B85D38] bg-[#F5EFE6]'
                        : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/50'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#B85D38] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action & Global Search & Planner CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <GlobalSearch />
              <LinkButton
                href="/planner"
                variant={currentPath === '/planner' ? 'primary' : 'secondary'}
                size="md"
                icon={<Calendar className="w-4 h-4" />}
                iconPosition="left"
              >
                Plan Itinerary
              </LinkButton>
            </div>

            {/* Mobile Menu & Search Toggle Buttons */}
            <div className="flex items-center gap-1 sm:gap-2 lg:hidden">
              <GlobalSearch />
              <Link
                href="/planner"
                className="p-2 text-[#B85D38] hover:bg-[#F5EFE6] rounded-md"
                aria-label="Plan Itinerary"
              >
                <Calendar className="w-5 h-5" />
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-stone-800 hover:bg-[#F5EFE6] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B85D38]"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label={isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 top-20 z-30 lg:hidden bg-black/40 backdrop-blur-xs transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-full max-w-sm ml-auto h-full bg-[#FAF7F2] border-l border-[#E7DFD5] p-6 shadow-xl flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#E7DFD5] space-y-3">
                <p className="text-xs uppercase font-semibold tracking-wider text-stone-500">
                  Explore Royal Rajasthan
                </p>
                <GlobalSearch
                  variant="drawer"
                  onOpen={() => setIsMobileMenuOpen(false)}
                />
              </div>

              <nav className="flex flex-col space-y-2">
                <Link
                  href="/"
                  className={`px-4 py-3 text-base font-medium rounded-lg transition-colors flex items-center justify-between ${
                    currentPath === '/' ? 'bg-[#B85D38] text-white' : 'text-stone-800 hover:bg-[#F5EFE6]'
                  }`}
                >
                  <span>Home Experience</span>
                  <Sparkles className="w-4 h-4 opacity-70" />
                </Link>

                {NAV_ITEMS.map((item) => {
                  const isActive = currentPath.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`px-4 py-3 text-base font-medium rounded-lg transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-[#B85D38] text-white'
                          : 'text-stone-800 hover:bg-[#F5EFE6]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <MapPin className="w-4 h-4 opacity-70" />
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E7DFD5] space-y-3">
              <LinkButton
                href="/planner"
                variant="primary"
                size="lg"
                className="w-full justify-center"
                icon={<Calendar className="w-5 h-5" />}
              >
                Interactive Trip Planner
              </LinkButton>
              <p className="text-xs text-center text-stone-500">
                Curated Heritage & Travel Intelligence
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
