export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  problem: string;
  architecture: string;
  tradeoffs: string;
  metrics: ProjectMetric[];
  stack: string[];
  explainMode: {
    interviewPitch: string;
    talkingPoints: string[];
    tradeoffsExplained: string;
  };
}
