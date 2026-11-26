export interface ProjectMetric {
  label: string;
  value: string;
}

export type EngagementType = 'employer' | 'freelance';

export type ConfidentialityStatus =
  | 'anonymized-case-study'
  | 'public-link-approved'
  | 'restricted';

export type ExternalLinkLabel =
  | 'Visit Product'
  | 'View Public Website'
  | 'Explore Live Platform';

export interface ExternalLinkConfig {
  enabled: boolean;
  url?: string;
  label: ExternalLinkLabel;
}

export interface Project {
  /** Neutral internal identifier */
  id: string;
  /** Public URL slug (anonymized) */
  slug: string;
  /** Public display name (anonymized) */
  title: string;
  tagline: string;
  category: string;
  engagementType: EngagementType;
  /** Optional employer key for experience timeline grouping */
  employerId?: 'gnxtace' | 'jnana';
  status?: 'live' | 'shipped' | 'internal';
  year?: string;
  /** Neutralized public asset path */
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  /** Whether this project has a dedicated case-study detail page */
  hasCaseStudy: boolean;
  /** Concise public summary */
  summary: string;
  /** Approved technical contributions */
  highlights: string[];
  problem: string;
  /** Approved architectural overview */
  architecture: string;
  tradeoffs: string;
  /** Approved achievements / metrics */
  metrics: ProjectMetric[];
  stack: string[];
  confidentialityStatus: ConfidentialityStatus;
  explainMode: {
    interviewPitch: string;
    talkingPoints: string[];
    tradeoffsExplained: string;
  };
}
