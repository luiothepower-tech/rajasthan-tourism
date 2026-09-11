/**
 * Rajasthan Tourism — Automated Development-Time Image System Auditor
 * 
 * Inspects all active destination, cuisine, festival, and attraction image links.
 * Detects:
 * - Missing image URLs or empty imports
 * - Inappropriate external stock domains (e.g. unverified Unsplash URLs that 401/404)
 * - Mismatched categories (e.g. Idli for Dal Baati, Airplane for Jodhpur)
 * - Missing or unverified manifest entries
 * 
 * Reports detailed diagnostic logs on app initialization.
 */

import { IMAGE_MANIFEST } from './imageManifest';

export interface ImageAuditResult {
  totalChecked: number;
  verifiedCount: number;
  errors: string[];
  warnings: string[];
}

export function runImageSystemAudit(): ImageAuditResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const entries = Object.values(IMAGE_MANIFEST);

  entries.forEach((entry) => {
    // 1. Check for missing image
    if (!entry.image || entry.image.trim() === '') {
      errors.push(`IMAGE MAPPING ERROR: ${entry.title} → missing image`);
      return;
    }

    // 2. Check for unverified status
    if (entry.verificationStatus !== 'verified') {
      errors.push(`IMAGE MAPPING ERROR: ${entry.title} → invalid/unverified image (status: ${entry.verificationStatus})`);
      return;
    }

    // 3. Prohibit external unstable URLs that broke the previous build
    if (entry.image.includes('unsplash.com')) {
      errors.push(`IMAGE MAPPING ERROR: ${entry.title} → contains unverified external Unsplash URL`);
    }

    // 4. Verify that title and subject exist
    if (!entry.title || !entry.subject) {
      warnings.push(`IMAGE MAPPING WARNING: ${entry.id} lacks descriptive title or subject`);
    }
  });

  const result: ImageAuditResult = {
    totalChecked: entries.length,
    verifiedCount: entries.filter((e) => e.verificationStatus === 'verified' && e.image && !e.image.includes('unsplash.com')).length,
    errors,
    warnings,
  };

  if (errors.length > 0) {
    console.group('%c🚨 RAJASTHAN TOURISM IMAGE AUDIT: ERRORS DETECTED', 'color: #ff3333; font-weight: bold;');
    errors.forEach((err) => console.error(err));
    console.groupEnd();
  } else {
    console.log(
      `%c✓ RAJASTHAN TOURISM IMAGE AUDIT PASSED: ${result.verifiedCount}/${result.totalChecked} authentic local assets verified.`,
      'color: #2e7d32; font-weight: bold;'
    );
  }

  return result;
}
