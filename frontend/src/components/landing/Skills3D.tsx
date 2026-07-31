'use client';

import { useRef, MouseEvent } from 'react';

interface Skill {
  name: string;
  icon: string;
  level: number; // 1-5
}

interface SkillCategory {
  label: string;
  color: string;
  glow: string;
  border: string;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    label: 'Languages',
    color: 'from-slate-500/20 to-slate-400/10',
    glow: 'rgba(148,163,184,0.25)',
    border: 'border-slate-500/20 hover:border-slate-400/50',
    skills: [
      { name: 'JavaScript (ES6+)', icon: 'JS', level: 5 },
      { name: 'TypeScript', icon: 'TS', level: 5 },
      { name: 'PHP', icon: '🐘', level: 3 },
    ],
  },
  {
    label: 'Frontend',
    color: 'from-cyan-500/20 to-blue-500/10',
    glow: 'rgba(34,211,238,0.25)',
    border: 'border-cyan-500/20 hover:border-cyan-400/50',
    skills: [
      { name: 'React.js', icon: '⚛', level: 5 },
      { name: 'Next.js', icon: '▲', level: 5 },
      { name: 'Vue.js', icon: '🟢', level: 4 },
      { name: 'Redux Toolkit', icon: '⚙', level: 4 },
      { name: 'Zustand', icon: '🐻', level: 3 },
      { name: 'Tailwind CSS', icon: '🎨', level: 5 },
      { name: 'Ant Design', icon: '🐜', level: 3 },
    ],
  },
  {
    label: 'Backend',
    color: 'from-green-500/20 to-emerald-500/10',
    glow: 'rgba(74,222,128,0.25)',
    border: 'border-green-500/20 hover:border-green-400/50',
    skills: [
      { name: 'Node.js', icon: '⬡', level: 5 },
      { name: 'Express.js', icon: '🚀', level: 5 },
      { name: 'Laravel', icon: '🔺', level: 3 },
      { name: 'REST APIs', icon: '⇄', level: 5 },
      { name: 'JWT', icon: '🔐', level: 5 },
      { name: 'OAuth', icon: '🔑', level: 4 },
      { name: 'WebSockets', icon: '⚡', level: 5 },
      { name: 'Socket.IO', icon: '🔌', level: 5 },
    ],
  },
  {
    label: 'Databases',
    color: 'from-orange-500/20 to-amber-500/10',
    glow: 'rgba(249,115,22,0.25)',
    border: 'border-orange-500/20 hover:border-orange-400/50',
    skills: [
      { name: 'MySQL', icon: '🐬', level: 5 },
      { name: 'MongoDB', icon: '🍃', level: 4 },
      { name: 'Redis', icon: '🔴', level: 4 },
      { name: 'Schema Design', icon: '🗂', level: 5 },
      { name: 'Query Optimization', icon: '📊', level: 4 },
    ],
  },
  {
    label: 'Cloud & DevOps',
    color: 'from-amber-500/20 to-yellow-500/10',
    glow: 'rgba(245,158,11,0.25)',
    border: 'border-amber-500/20 hover:border-amber-400/50',
    skills: [
      { name: 'AWS Lambda', icon: 'λ', level: 4 },
      { name: 'AWS S3', icon: '☁', level: 4 },
      { name: 'AWS SQS', icon: '📬', level: 4 },
      { name: 'Docker', icon: '🐳', level: 3 },
      { name: 'GitHub Actions', icon: '⚙', level: 3 },
      { name: 'CI/CD', icon: '🔁', level: 3 },
      { name: 'Linux Admin', icon: '🐧', level: 3 },
    ],
  },
  {
    label: 'Tools & Integrations',
    color: 'from-purple-500/20 to-violet-500/10',
    glow: 'rgba(168,85,247,0.25)',
    border: 'border-purple-500/20 hover:border-purple-400/50',
    skills: [
      { name: 'Stripe', icon: '💳', level: 5 },
      { name: 'Razorpay', icon: '₹', level: 4 },
      { name: 'Square', icon: '■', level: 3 },
      { name: 'Firebase/FCM', icon: '🔥', level: 4 },
      { name: 'Zoom SDK', icon: '🎥', level: 4 },
      { name: 'Swagger/OpenAPI', icon: '📜', level: 4 },
      { name: 'Jest', icon: '🧪', level: 3 },
    ],
  },
];

const levelLabels = ['', 'Basic', 'Familiar', 'Proficient', 'Advanced', 'Expert'];

function SkillCard({ skill, glow }: { skill: Skill; glow: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -12;
    const rotY = ((x - cx) / cx) * 12;
    el.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04,1.04,1.04)`;
    el.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
    el.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
  }

  function handleMouseLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.15s ease-out', willChange: 'transform' }}
      className="relative rounded-lg border border-slate-700/50 bg-navy-800/60 p-3 cursor-default overflow-hidden group"
    >
      {/* Shine overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), ${glow} 0%, transparent 60%)`,
        }}
      />
      {/* Icon */}
      <div className="text-lg mb-1.5 leading-none">{skill.icon}</div>
      {/* Name */}
      <div className="text-xs font-medium text-slate-300 leading-tight">{skill.name}</div>
      {/* Level bar */}
      <div className="mt-2 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-0.5 flex-1 rounded-full transition-colors duration-300"
            style={{
              background: i < skill.level
                ? glow.replace('0.25', '0.9')
                : 'rgba(148,163,184,0.15)',
            }}
          />
        ))}
      </div>
      <div className="mt-1 text-[9px] font-mono text-slate-600">
        {levelLabels[skill.level]}
      </div>
    </div>
  );
}

export function Skills3D() {
  return (
    <div className="space-y-6">
      {categories.map(cat => (
        <div key={cat.label}>
          {/* Category header */}
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">
              {cat.label}
            </span>
            <div className="h-px flex-1 bg-slate-800/60" />
          </div>
          {/* Skills grid */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {cat.skills.map(skill => (
              <SkillCard key={skill.name} skill={skill} glow={cat.glow} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
