import { useEffect } from 'react';

/**
 * Hook to manage page title and Open Graph/meta description tags
 * Safely synchronizes document head metadata and restores previous values on unmount
 */
export function useDocumentMeta(title: string, description?: string): void {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const previousTitle = document.title;
    document.title = title;

    let descMeta = document.querySelector('meta[name="description"]');
    const previousDesc = descMeta?.getAttribute('content') || '';

    let ogTitleMeta = document.querySelector('meta[property="og:title"]');
    const previousOgTitle = ogTitleMeta?.getAttribute('content') || '';

    let ogDescMeta = document.querySelector('meta[property="og:description"]');
    const previousOgDesc = ogDescMeta?.getAttribute('content') || '';

    if (description) {
      if (descMeta) {
        descMeta.setAttribute('content', description);
      } else {
        descMeta = document.createElement('meta');
        descMeta.setAttribute('name', 'description');
        descMeta.setAttribute('content', description);
        document.head.appendChild(descMeta);
      }

      if (ogDescMeta) {
        ogDescMeta.setAttribute('content', description);
      }
    }

    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', title);
    }

    return () => {
      document.title = previousTitle;
      if (descMeta && previousDesc) {
        descMeta.setAttribute('content', previousDesc);
      }
      if (ogTitleMeta && previousOgTitle) {
        ogTitleMeta.setAttribute('content', previousOgTitle);
      }
      if (ogDescMeta && previousOgDesc) {
        ogDescMeta.setAttribute('content', previousOgDesc);
      }
    };
  }, [title, description]);
}
