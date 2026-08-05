'use client';

import { Code2, LayoutTemplate, Server, Database, Cloud, Puzzle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Skill {
  name: string;
  mono: string;
}

interface SkillCategory {
  label: string;
  icon: LucideIcon;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    label: 'Languages',
    icon: Code2,
    skills: [
      { name: 'JavaScript (ES6+)', mono: 'JS' },
      { name: 'TypeScript', mono: 'TS' },
      { name: 'PHP', mono: 'PHP' },
    ],
  },
  {
    label: 'Frontend Engineering',
    icon: LayoutTemplate,
    skills: [
      { name: 'React.js', mono: 'RC' },
      { name: 'Next.js', mono: 'NX' },
      { name: 'Vue.js', mono: 'VU' },
      { name: 'Redux Toolkit', mono: 'RTK' },
      { name: 'Zustand', mono: 'ZU' },
      { name: 'Tailwind CSS', mono: 'TW' },
      { name: 'Ant Design', mono: 'AD' },
    ],
  },
  {
    label: 'Backend & APIs',
    icon: Server,
    skills: [
      { name: 'Node.js', mono: 'ND' },
      { name: 'Express.js', mono: 'EX' },
      { name: 'Laravel', mono: 'LV' },
      { name: 'REST APIs', mono: 'API' },
      { name: 'JWT', mono: 'JWT' },
      { name: 'OAuth', mono: 'OA' },
      { name: 'WebSockets', mono: 'WS' },
      { name: 'Socket.IO', mono: 'IO' },
    ],
  },
  {
    label: 'Databases',
    icon: Database,
    skills: [
      { name: 'MySQL', mono: 'SQL' },
      { name: 'MongoDB', mono: 'MDB' },
      { name: 'Redis', mono: 'RD' },
      { name: 'Schema Design', mono: 'SD' },
      { name: 'Query Optimization', mono: 'QO' },
    ],
  },
  {
    label: 'Cloud & DevOps',
    icon: Cloud,
    skills: [
      { name: 'AWS Lambda', mono: 'λ' },
      { name: 'AWS S3', mono: 'S3' },
      { name: 'AWS SQS', mono: 'SQS' },
      { name: 'Docker', mono: 'DK' },
      { name: 'GitHub Actions', mono: 'GA' },
      { name: 'CI/CD', mono: 'CI' },
      { name: 'Linux Admin', mono: 'LX' },
    ],
  },
  {
    label: 'Tools & Integrations',
    icon: Puzzle,
    skills: [
      { name: 'Stripe', mono: 'ST' },
      { name: 'Razorpay', mono: 'RP' },
      { name: 'Square', mono: 'SQ' },
      { name: 'Firebase/FCM', mono: 'FB' },
      { name: 'Zoom SDK', mono: 'ZM' },
      { name: 'Swagger/OpenAPI', mono: 'SW' },
      { name: 'Jest', mono: 'JT' },
    ],
  },
];

export function Skills3D() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map(cat => (
        <div key={cat.label} className="card-surface p-5">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-crimson/25 bg-crimson/10">
              <cat.icon className="h-4 w-4 text-crimson" strokeWidth={1.75} />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-grey">{cat.label}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cat.skills.map(skill => (
              <span
                key={skill.name}
                className="group inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-2/50 py-1 pl-1 pr-2.5 text-xs text-grey transition-colors hover:border-crimson/30 hover:text-ivory"
              >
                <span className="flex h-5 min-w-5 items-center justify-center rounded bg-surface-2 px-1 font-mono text-[9px] font-semibold text-crimson">
                  {skill.mono}
                </span>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
