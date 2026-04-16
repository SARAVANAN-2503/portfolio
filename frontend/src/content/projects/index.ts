import { tenantcraft } from './tenantcraft';
import { govpass } from './govpass';
import { expertconnect } from './expertconnect';
import { appolo } from './appolo';
import { leadpulse } from './leadpulse';
import { livebid } from './livebid';
import type { Project } from './types';

export type { Project, ProjectMetric } from './types';

export const projects: Project[] = [
  tenantcraft,
  govpass,
  expertconnect,
  appolo,
  leadpulse,
  livebid,
];

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}
