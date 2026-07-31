import { nexusone } from './nexusone';
import { seltrix } from './seltrix';
import { zponz } from './zponz';
import { govpass } from './govpass';
import { appolo } from './appolo';
import { adunity } from './adunity';
import type { Project } from './types';

export type { Project, ProjectMetric } from './types';

export const projects: Project[] = [
  nexusone,
  seltrix,
  zponz,
  govpass,
  appolo,
  adunity,
];

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}
