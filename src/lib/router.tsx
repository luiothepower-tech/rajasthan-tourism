/**
 * Rajasthan Tourism — Routing Foundation
 * Phase 1: Foundation & Architecture
 * 
 * Provides an accessible, lightweight client-side router supporting both HTML5 History
 * and Hash-fallback (ideal for sandbox iframes).
 * Supports path matching with dynamic route parameters (e.g., /destinations/:slug).
 */

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

export type AppRoute =
  | '/'
  | '/destinations'
  | '/destinations/:slug'
  | '/experiences'
  | '/experiences/:slug'
  | '/food'
  | '/food/:slug'
  | '/festivals'
  | '/festivals/:slug'
  | '/culture'
  | '/culture/:slug'
  | '/travel-guide'
  | '/planner'
  | '/privacy'
  | '/terms'
  | '/disclaimer';

interface RouteMatch {
  matchedRoute: AppRoute | null;
  params: Record<string, string>;
}

interface RouterContextValue {
  currentPath: string;
  navigate: (to: string) => void;
  params: Record<string, string>;
}

const RouterContext = createContext<RouterContextValue | null>(null);

/**
 * Normalizes browser path whether driven by window.location.pathname or hash
 */
function getInitialPath(): string {
  if (typeof window === 'undefined') return '/';

  // Check if hash-based route is present (e.g. #/destinations/jaipur)
  if (window.location.hash.startsWith('#/')) {
    return window.location.hash.slice(1);
  }
  
  return window.location.pathname || '/';
}

function sanitizeSlug(raw: string): string {
  let s = raw;
  try {
    s = decodeURIComponent(s).toLowerCase().trim();
  } catch {
    s = s.toLowerCase().trim();
  }
  return s.replace(/[^a-z0-9-]/g, '');
}

/**
 * Pattern matcher for static and dynamic routes
 */
function matchRoute(path: string): RouteMatch {
  const cleanPath = path.split('?')[0].replace(/\/$/, '') || '/';

  if (cleanPath === '' || cleanPath === '/') return { matchedRoute: '/', params: {} };
  if (cleanPath === '/destinations') return { matchedRoute: '/destinations', params: {} };
  if (cleanPath === '/experiences') return { matchedRoute: '/experiences', params: {} };
  if (cleanPath === '/food' || cleanPath === '/cuisines') return { matchedRoute: '/food', params: {} };
  if (cleanPath === '/festivals') return { matchedRoute: '/festivals', params: {} };
  if (cleanPath === '/culture') return { matchedRoute: '/travel-guide', params: {} };
  if (cleanPath === '/travel-guide') return { matchedRoute: '/travel-guide', params: {} };
  if (
    cleanPath === '/planner' ||
    cleanPath === '/budget' ||
    cleanPath === '/planner/budget' ||
    cleanPath === '/itinerary' ||
    cleanPath === '/itineraries'
  ) {
    return {
      matchedRoute: '/planner',
      params: cleanPath.includes('budget') ? { section: 'budget' } : {},
    };
  }

  if (cleanPath === '/privacy') return { matchedRoute: '/privacy', params: {} };
  if (cleanPath === '/terms' || cleanPath === '/disclaimer') return { matchedRoute: '/terms', params: {} };

  // Dynamic /destinations/:slug
  const destMatch = cleanPath.match(/^\/destinations\/([^/]+)$/);
  if (destMatch) {
    return {
      matchedRoute: '/destinations/:slug',
      params: { slug: sanitizeSlug(destMatch[1]) },
    };
  }

  // Dynamic /food/:slug or /cuisines/:slug
  const foodMatch = cleanPath.match(/^\/(?:food|cuisines)\/([^/]+)$/);
  if (foodMatch) {
    return {
      matchedRoute: '/food/:slug',
      params: { slug: sanitizeSlug(foodMatch[1]) },
    };
  }

  // Dynamic /festivals/:slug
  const festivalMatch = cleanPath.match(/^\/festivals\/([^/]+)$/);
  if (festivalMatch) {
    return {
      matchedRoute: '/festivals/:slug',
      params: { slug: sanitizeSlug(festivalMatch[1]) },
    };
  }

  // Dynamic /experiences/:slug
  const expMatch = cleanPath.match(/^\/experiences\/([^/]+)$/);
  if (expMatch) {
    return {
      matchedRoute: '/experiences/:slug',
      params: { slug: sanitizeSlug(expMatch[1]) },
    };
  }

  // Dynamic /culture/:slug
  const cultureMatch = cleanPath.match(/^\/culture\/([^/]+)$/);
  if (cultureMatch) {
    return {
      matchedRoute: '/culture/:slug',
      params: { slug: sanitizeSlug(cultureMatch[1]) },
    };
  }

  // Fallback to home if unrecognized
  return { matchedRoute: '/', params: {} };
}

export const RouterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);

  const navigate = useCallback((to: string) => {
    const trimmed = to.trim();
    // Defense against unsafe protocols / cross-site script injections
    if (/^(javascript|data|vbscript|file):/i.test(trimmed)) {
      console.warn('[Router Security]: Blocked unsafe navigation scheme:', trimmed);
      return;
    }

    const target = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    
    // Update hash for cross-iframe compatibility
    window.location.hash = `#${target}`;
    setCurrentPath(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const path = getInitialPath();
      setCurrentPath(path);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const { params } = matchRoute(currentPath);

  return (
    <RouterContext.Provider value={{ currentPath, navigate, params }}>
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter(): RouterContextValue {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a <RouterProvider>');
  }
  return context;
}

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  activeClassName?: string;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  activeClassName = '',
  className = '',
  onClick,
  ...rest
}) => {
  const { currentPath, navigate } = useRouter();

  const isCurrent =
    href === '/' ? currentPath === '/' : currentPath.startsWith(href);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <a
      href={`#${href}`}
      onClick={handleClick}
      aria-current={isCurrent ? 'page' : undefined}
      className={`${className} ${isCurrent ? activeClassName : ''}`.trim()}
      {...rest}
    >
      {children}
    </a>
  );
};
