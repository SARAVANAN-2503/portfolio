import { learningCoachingPlatform } from './learning-coaching-platform';
import { multiTenantWebStudio } from './multi-tenant-web-studio';
import { expertCommercePlatform } from './expert-commerce-platform';
import { visaManagementSystem } from './visa-management-system';
import { intelligentAssessmentPlatform } from './intelligent-assessment-platform';
import { aiSalesCrm } from './ai-sales-crm';
import { retailErpPos } from './retail-erp-pos';
import type { Project } from './types';

export type {
  Project,
  ProjectMetric,
  EngagementType,
  ConfidentialityStatus,
  ExternalLinkConfig,
  ExternalLinkLabel,
} from './types';
export { getExternalLink, EXTERNAL_LINK_CONFIG } from './externalLinks';

/**
 * Full list of portfolio projects in centralized storage.
 */
export const allProjects: Project[] = [
  learningCoachingPlatform,
  multiTenantWebStudio,
  expertCommercePlatform,
  visaManagementSystem,
  intelligentAssessmentPlatform,
  aiSalesCrm,
  retailErpPos,
];

/**
 * Projects that have full dedicated case-study pages (/projects/[slug]).
 */
export const projects: Project[] = allProjects.filter((p) => p.hasCaseStudy);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByEmployer(
  employerId: NonNullable<Project['employerId']>
): Project[] {
  return allProjects.filter((p) => p.employerId === employerId);
}

export function getFreelanceProjects(): Project[] {
  return allProjects.filter((p) => p.engagementType === 'freelance');
}
