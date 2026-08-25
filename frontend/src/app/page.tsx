"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ImpactMetrics } from "@/components/landing/ImpactMetrics";
import { SkillMatrix } from "@/components/landing/SkillMatrix";
import { CaseStudyStack } from "@/components/landing/CaseStudyStack";
import { projects } from "@/content/projects";

/* Icons stay on lucide-react: it is already a project dependency, which is
   the documented exception to preferring Phosphor. Mixing a second icon
   family in would be worse than the discouraged default. */

const techStack = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "MySQL",
  "MongoDB",
  "AWS",
  "Socket.IO",
  "Redis",
  "Docker",
];

const labTools = [
  {
    href: "/api-explorer",
    title: "API Explorer",
    description:
      "Call the real endpoints behind these projects and watch actual latency and cursor pagination come back.",
    meta: "/api/users?cursor=xyz",
  },
  {
    href: "/architecture",
    title: "Architecture",
    description:
      "Interactive flow diagrams for multi-tenant isolation, RBAC permission resolution, and queue-backed jobs.",
    meta: "client to api to db",
  },
  {
    href: "/performance",
    title: "Performance Lab",
    description:
      "A live benchmark racing cursor-based pagination against offset pagination as the dataset grows.",
    meta: "O(1) vs O(N)",
  },
] as const;

const experiencePreview = [
  {
    company: "Gnxtace Technology",
    role: "Full Stack Developer",
    period: "May 2024 - Present",
    current: true,
    stack: ["NexusOne.coach", "Seltrix", "GovPass", "ZPONZ"],
  },
  {
    company: "Jnana Inventive Pvt Ltd",
    role: "Full Stack Developer",
    period: "Jun 2022 - May 2024",
    current: false,
    stack: ["AdUnity", "QuickBizz"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────────
   Asymmetric editorial. The headline runs the full measure at display
   scale; the supporting block is deliberately indented to the right of the
   grid rather than stacked flush-left under it, so the composition has a
   diagonal instead of a single left edge. */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Scrubbed parallax on the backdrop only. Motivated: it separates the
  // grid from the type so the headline sits in front of the page rather
  // than on it. The content itself never moves on scroll.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-line"
    >
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: gridY }}
        className="pointer-events-none absolute inset-x-0 -top-24 bottom-0 opacity-70"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "var(--background-image-hero-grid)",
            backgroundSize: "var(--background-size-hero-grid)",
            maskImage:
              "radial-gradient(ellipse 80% 65% at 78% 25%, black, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 65% at 78% 25%, black, transparent 72%)",
          }}
        />
      </motion.div>

      <div className="wide-container relative pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-28">
        <motion.h1
          initial={reduce ? undefined : { opacity: 0, y: 28 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="display max-w-[14ch] text-[clamp(2.75rem,8.2vw,7.5rem)] text-ink"
        >
          Systems that hold up in production.
        </motion.h1>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 grid gap-8 lg:grid-cols-12"
        >
          {/* Indented to column 6 on desktop: the offset is what keeps the
              hero from being one flush-left stack. */}
          <div className="lg:col-span-5 lg:col-start-6">
            <p className="text-lg leading-relaxed text-ink-dim">
              Saravanan, a full-stack developer in Chennai. Multi-tenant SaaS,
              government platforms, LMS, and serverless pipelines.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/projects" className="btn-primary">
                View work
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
              <Link href="/contact" className="btn-ghost">
                Get in touch
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <Hero />

      {/* ── Stack band. The one marquee on the page: breadth that does not
             need individual attention, sitting under the hero rather than
             inside it. ──────────────────────────────────────────────────── */}
      <section
        aria-label="Core stack"
        className="overflow-hidden border-b border-line bg-volt py-4"
      >
        <div className="flex w-max animate-[marquee_38s_linear_infinite] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center"
            >
              {techStack.map((tech) => (
                <li
                  key={tech}
                  className="flex items-center gap-10 px-5 font-mono text-sm font-medium text-[#171612]"
                >
                  {tech}
                  <span className="h-1 w-1 rounded-[var(--radius)] bg-[#171612]/35" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* ── Impact. One lead number carrying the section, three supporting
             rows beside it. ─────────────────────────────────────────────── */}
      <section className="section-container py-24 lg:py-32">
        <Reveal>
          <ImpactMetrics />
        </Reveal>
      </section>

      {/* ── Work. Sticky stack: each case study pins until the next covers
             it, so the reader finishes one before the next arrives. ─────── */}
      <section className="border-t border-line bg-elevated">
        <div className="section-container py-24 lg:py-32">
          <Reveal className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <h2 className="display max-w-[16ch] text-section-h2 text-ink">
              Recent work, with the decisions behind it.
            </h2>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-volt-text"
            >
              All {projects.length} projects
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </Link>
          </Reveal>

          <CaseStudyStack projects={projects.slice(0, 3)} />
        </div>
      </section>

      {/* ── Lab. Wide indexed rows: numbered, full measure, and visually
             unlike both the stack above and the sticky columns below. ───── */}
      <section className="border-t border-line">
        <div className="wide-container py-24 lg:py-32">
          <Reveal className="mb-14 max-w-[36ch]">
            <h2 className="display text-section-h2 text-ink">
              Things you can actually click.
            </h2>
          </Reveal>

          <Reveal className="border-t border-line" delay={0.05}>
            {labTools.map((tool, i) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group grid grid-cols-1 items-baseline gap-4 border-b border-line py-9 transition-colors hover:bg-surface md:grid-cols-12 md:gap-8 md:px-5"
              >
                <span className="display text-3xl text-ink/15 transition-colors group-hover:text-volt-text md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="md:col-span-4">
                  <div className="display text-[clamp(1.25rem,2vw,1.75rem)] text-ink transition-colors group-hover:text-volt-text">
                    {tool.title}
                  </div>
                  <div className="mt-2 font-mono text-xs text-muted-2">
                    {tool.meta}
                  </div>
                </div>
                <p className="max-w-[58ch] text-[15px] leading-relaxed text-muted md:col-span-6">
                  {tool.description}
                </p>
                <div className="md:col-span-1 md:justify-self-end">
                  <ArrowUpRight
                    className="h-5 w-5 text-muted-2 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-volt-text"
                    strokeWidth={1.75}
                  />
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Skills. Sticky heading against a scrolling column, which is a
             different reading motion from every other section. ──────────── */}
      <section className="border-t border-line bg-elevated">
        <div className="section-container grid gap-10 py-24 lg:grid-cols-12 lg:gap-16 lg:py-32">
          <div className="lg:col-span-4">
            <h2 className="display text-section-h2 text-ink lg:sticky lg:top-28">
              What I build with.
            </h2>
          </div>
          <Reveal className="lg:col-span-8">
            <SkillMatrix />
          </Reveal>
        </div>
      </section>

      {/* ── About. Offset prose, then experience as a full-width table
             underneath rather than a side-by-side split. ────────────────── */}
      <section className="border-t border-line">
        <div className="section-container py-24 lg:py-32">
          <Reveal className="grid gap-8 lg:grid-cols-12">
            <h2 className="display text-section-h2 text-ink lg:col-span-5">
              A developer who wants the whole picture.
            </h2>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-lg leading-relaxed text-ink-dim">
                I started on internal ERP and CRM tooling. Over the past four
                years I have shipped government visa platforms, LMS and
                coaching apps, expert marketplaces, and multi-tenant SaaS
                builders.
              </p>
              <p className="mt-5 text-base leading-relaxed text-muted">
                The work I like most is the part where a vague requirement
                turns into a schema, a boundary, and a decision someone can
                argue with.
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-20 border-t border-line" delay={0.05}>
            {experiencePreview.map((job) => (
              <div
                key={job.company}
                className="grid gap-4 border-b border-line py-8 lg:grid-cols-12 lg:gap-8"
              >
                <div className="flex flex-wrap items-center gap-3 lg:col-span-4">
                  <span className="display text-[clamp(1.25rem,2vw,1.625rem)] text-ink">
                    {job.company}
                  </span>
                  {job.current && (
                    <span className="rounded-[var(--radius)] bg-volt px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wide text-[#171612]">
                      Current
                    </span>
                  )}
                </div>
                <div className="lg:col-span-3">
                  <p className="text-[15px] text-ink-dim">{job.role}</p>
                  <p className="mt-1 font-mono text-xs text-muted-2">
                    {job.period}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 lg:col-span-5 lg:justify-end">
                  {job.stack.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <Link
              href="/experience"
              className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-volt-text"
            >
              Full work history
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Contact. Full-bleed accent block at display scale. ───────────── */}
      <section className="bg-volt">
        <div className="wide-container py-24 lg:py-32">
          <Reveal>
            <h2 className="display max-w-[15ch] text-[clamp(2rem,5.2vw,4.5rem)] text-[#171612]">
              Looking for a full-stack engineer who ships.
            </h2>
            <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
              <p className="max-w-[46ch] text-lg leading-relaxed text-[#171612]/75 lg:col-span-6">
                Open to remote and hybrid roles. If you have a system to build,
                I would like to hear about it.
              </p>
              <div className="lg:col-span-5 lg:col-start-8 lg:justify-self-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-[#171612] px-7 py-3.5 text-base font-semibold text-[#f4f3ef] transition-transform duration-150 hover:brightness-125 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171612] focus-visible:ring-offset-2 focus-visible:ring-offset-[#d8f34a]"
                >
                  Get in touch
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
