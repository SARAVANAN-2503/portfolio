import {
  GraduationCap,
  Layers,
  ShieldCheck,
  Wallet,
  BrainCircuit,
  CloudCog,
  Boxes,
} from 'lucide-react';

/**
 * Procedural per-project visual — replaces the letter-monogram placeholder.
 *
 * No image-generation tool or contextually-relevant stock photography is
 * available for abstract software-product thumbnails, so instead of a fake
 * screenshot or a random photo, each project gets a deterministic circuit
 * pattern (grid-snapped nodes + right-angle traces) seeded from its slug —
 * the same schematic language already used by the Architecture diagrams and
 * the homepage constellation, so project cards visually rhyme with the rest
 * of the site rather than introducing an unrelated device.
 */

interface ProjectVisualProps {
  slug: string;
  category: string;
  size?: 'featured' | 'default' | 'compact';
  className?: string;
}

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface CategoryIconProps {
  category: string;
  width: number;
  height: number;
  style: React.CSSProperties;
}

/**
 * Each branch renders a literal, statically-named icon tag rather than
 * assigning a component reference to a variable, keeping icon identity
 * stable across renders.
 */
function CategoryIcon({ category, width, height, style }: CategoryIconProps) {
  const c = category.toLowerCase();
  const shared = { width, height, strokeWidth: 1.25, style };
  if (/government|compliance/.test(c)) return <ShieldCheck {...shared} />;
  if (/marketplace|wallet/.test(c)) return <Wallet {...shared} />;
  if (/lms|coaching|edtech|education/.test(c)) return <GraduationCap {...shared} />;
  if (/ai|crm/.test(c)) return <BrainCircuit {...shared} />;
  if (/serverless/.test(c)) return <CloudCog {...shared} />;
  if (/saas/.test(c)) return <Layers {...shared} />;
  return <Boxes {...shared} />;
}

const GRID_X = [40, 110, 180, 250, 320, 360];
const GRID_Y = [40, 90, 140, 190, 240];

function generateCircuit(seed: number, nodeCount: number) {
  const rand = mulberry32(seed);
  const points: Array<{ x: number; y: number }> = [];
  const used = new Set<string>();

  while (points.length < nodeCount) {
    const x = GRID_X[Math.floor(rand() * GRID_X.length)];
    const y = GRID_Y[Math.floor(rand() * GRID_Y.length)];
    const key = `${x},${y}`;
    if (used.has(key)) continue;
    used.add(key);
    points.push({ x, y });
  }

  // Right-angle trace between each consecutive pair — mirrors the
  // orthogonal edge style used in the architecture flow diagrams.
  const traces = points.slice(1).map((p, i) => {
    const prev = points[i];
    const midX = rand() > 0.5 ? p.x : prev.x;
    return `M ${prev.x} ${prev.y} L ${midX} ${prev.y} L ${midX} ${p.y} L ${p.x} ${p.y}`;
  });

  return { points, traces };
}

export function ProjectVisual({ slug, category, size = 'default', className = '' }: ProjectVisualProps) {
  const seed = hashSeed(slug);
  const accentIsBlueprint = seed % 2 === 0;
  const accentVar = accentIsBlueprint ? 'var(--color-blueprint)' : 'var(--color-crimson)';
  const nodeCount = size === 'featured' ? 7 : size === 'compact' ? 3 : 5;
  const { points, traces } = generateCircuit(seed, nodeCount);
  const iconSize = size === 'featured' ? 72 : size === 'compact' ? 40 : 56;

  // No `relative` here: callers always pass a positioning class (`absolute
  // inset-0`), and applying both `relative` and `absolute` on the same
  // element leaves position undefined depending on Tailwind's generated
  // rule order, which was collapsing this box to zero height.
  return (
    <div className={`overflow-hidden ${className}`}>
      {/* Blueprint grid base, consistent with Architecture/diagram surfaces */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Duotone wash seeded per-project */}
      <div
        className="absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl"
        style={{ backgroundColor: accentVar, opacity: 0.06 }}
      />

      {/* Generated circuit */}
      <svg viewBox="0 0 400 280" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {traces.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={accentVar} strokeWidth={1.25} opacity={0.5} />
        ))}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={i === 0 ? 4 : 2.5} fill={accentVar} opacity={i === 0 ? 0.8 : 0.6} />
        ))}
      </svg>

      {/* Category mark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <CategoryIcon
          category={category}
          width={iconSize}
          height={iconSize}
          style={{ color: accentVar, opacity: 0.32 }}
        />
      </div>
    </div>
  );
}
