/* Renamed from Skills3D, which rendered no 3D: it was six identical bordered
   cards, each wrapping a row of bordered pills, on a page that already had
   several card grids. This is the same content as grouped hairline rows,
   which is the right component for six lists of five-to-eight items. */

import { Fragment } from 'react';

interface Skill {
  name: string;
  mono: string;
}

interface SkillCategory {
  label: string;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    label: 'Languages',
    skills: [
      { name: 'JavaScript (ES6+)', mono: 'JS' },
      { name: 'TypeScript', mono: 'TS' },
      { name: 'PHP', mono: 'PHP' },
    ],
  },
  {
    label: 'Frontend',
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
    skills: [
      { name: 'AWS Lambda', mono: 'LMB' },
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

export function SkillMatrix() {
  return (
    <div className="border-t border-line">
      {categories.map((cat) => (
        <div
          key={cat.label}
          className="grid gap-4 border-b border-line py-7 md:grid-cols-12 md:gap-8"
        >
          <h3 className="display text-section-h3 text-ink md:col-span-3">
            {cat.label}
          </h3>
          <div className="md:col-span-9">
            <p className="flex flex-wrap items-baseline gap-x-1 gap-y-2.5 text-[15px] text-ink-dim">
              {cat.skills.map((skill, i) => (
                <Fragment key={skill.name}>
                  <span className="inline-flex items-baseline gap-1.5">
                    <span className="font-mono text-[10px] text-muted-2">
                      {skill.mono}
                    </span>
                    {skill.name}
                  </span>
                  {i < cat.skills.length - 1 && (
                    <span aria-hidden className="px-2 text-muted-2">
                      /
                    </span>
                  )}
                </Fragment>
              ))}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
