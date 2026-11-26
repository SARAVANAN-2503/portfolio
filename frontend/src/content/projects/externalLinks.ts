import type { ExternalLinkConfig } from './types';

/**
 * Centralized configuration for optional external official product links.
 *
 * Confidentiality policy:
 * - Default to `enabled: false` for all restricted or unapproved projects.
 * - Do NOT populate `url` for disabled entries so restricted product domains
 *   are not serialized into client-side bundles or rendered HTML.
 * - Note: Enabling an external link inherently allows the official product
 *   association to be discovered by visitors and search engines.
 */
export const EXTERNAL_LINK_CONFIG: Record<string, ExternalLinkConfig> = {
  'learning-coaching-platform': {
    enabled: false,
    label: 'Explore Live Platform',
  },
  'multi-tenant-web-studio': {
    enabled: false,
    label: 'Visit Product',
  },
  'expert-commerce-platform': {
    enabled: false,
    label: 'Explore Live Platform',
  },
  'visa-management-system': {
    enabled: false,
    label: 'View Public Website',
  },
  'intelligent-assessment-platform': {
    enabled: false,
    label: 'Explore Live Platform',
  },
  'ai-sales-crm': {
    enabled: false,
    label: 'Visit Product',
  },
  'retail-erp-pos': {
    enabled: false,
    label: 'Visit Product',
  },
};

export function getExternalLink(slug: string): ExternalLinkConfig | null {
  const entry = EXTERNAL_LINK_CONFIG[slug];
  if (!entry || !entry.enabled || !entry.url) {
    return null;
  }
  return entry;
}
