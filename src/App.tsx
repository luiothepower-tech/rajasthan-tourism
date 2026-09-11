/**
 * Rajasthan Tourism — Primary Application Orchestrator
 * Phase 1: Foundation, Design System & Core Architecture
 */

import React, { useEffect } from 'react';
import { RouterProvider, useRouter } from './lib/router';
import { PageShell } from './components/layout/PageShell';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { HomeView } from './views/HomeView';
import { DestinationsView } from './views/DestinationsView';
import { DestinationDetailView } from './views/DestinationDetailView';
import { FoodDetailView } from './views/FoodDetailView';
import { FestivalDetailView } from './views/FestivalDetailView';
import { ExperienceDetailView } from './views/ExperienceDetailView';
import { CultureDetailView } from './views/CultureDetailView';
import { ExperiencesView } from './views/ExperiencesView';
import { FoodView } from './views/FoodView';
import { FestivalsView } from './views/FestivalsView';
import { TravelGuideView } from './views/TravelGuideView';
import { PlannerView } from './views/PlannerView';
import { PrivacyView } from './views/PrivacyView';
import { TermsView } from './views/TermsView';
import { runImageSystemAudit } from './data/imageValidation';

/**
 * Route Switcher rendering the matched view based on current route path
 */
const AppRouteSwitcher: React.FC = () => {
  const { currentPath } = useRouter();

  const renderCurrentView = () => {
    // Dynamic destination detail matching: /destinations/:slug
    if (currentPath.startsWith('/destinations/') && currentPath !== '/destinations/') {
      return <DestinationDetailView />;
    }

    // Dynamic culinary detail matching: /food/:slug or /cuisines/:slug
    if (
      (currentPath.startsWith('/food/') && currentPath !== '/food/') ||
      (currentPath.startsWith('/cuisines/') && currentPath !== '/cuisines/')
    ) {
      return <FoodDetailView />;
    }

    // Dynamic festival detail matching: /festivals/:slug
    if (currentPath.startsWith('/festivals/') && currentPath !== '/festivals/') {
      return <FestivalDetailView />;
    }

    // Dynamic experience detail matching: /experiences/:slug
    if (currentPath.startsWith('/experiences/') && currentPath !== '/experiences/') {
      return <ExperienceDetailView />;
    }

    // Dynamic culture insight matching: /culture/:slug
    if (currentPath.startsWith('/culture/') && currentPath !== '/culture/') {
      return <CultureDetailView />;
    }

    switch (currentPath) {
      case '/destinations':
        return <DestinationsView />;
      case '/experiences':
        return <ExperiencesView />;
      case '/food':
        return <FoodView />;
      case '/festivals':
        return <FestivalsView />;
      case '/travel-guide':
        return <TravelGuideView />;
      case '/planner':
      case '/budget':
      case '/planner/budget':
      case '/itinerary':
      case '/itineraries':
        return <PlannerView />;
      case '/privacy':
        return <PrivacyView />;
      case '/terms':
      case '/disclaimer':
        return <TermsView />;
      case '/':
      default:
        return <HomeView />;
    }
  };

  return (
    <PageShell>
      <div key={currentPath} className="animate-fade-in">
        {renderCurrentView()}
      </div>
    </PageShell>
  );
};

export default function App() {
  useEffect(() => {
    // Run Rajasthan Tourism image system verification audit
    const audit = runImageSystemAudit();
    if (audit.errors.length > 0) {
      console.error('[Rajasthan Tourism Image Audit] FAILED:', audit);
    } else {
      console.log(
        `%c[Rajasthan Tourism Image Audit] PASSED: ${audit.totalChecked} entries verified. 0 unverified URLs. 100% accuracy.`,
        'color: #2e7d32; font-weight: bold;'
      );
    }
  }, []);

  return (
    <ErrorBoundary>
      <RouterProvider>
        <AppRouteSwitcher />
      </RouterProvider>
    </ErrorBoundary>
  );
}
