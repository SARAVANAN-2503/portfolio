export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  status?: 'live' | 'shipped' | 'internal';
  year?: string;
  image?: string; // placeholder path — swap with real asset later
  highlights?: string[]; // 3–4 bullet impact points shown on card
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
