"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ImpactMetrics } from "@/components/landing/ImpactMetrics";
import { SkillMatrix } from "@/components/landing/SkillMatrix";
import { ProjectCard } from "@/components/projects/ProjectCard";
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

export default function Home() {
  const reduce = useReducedMotion();

  return (
    <div>
      {/* ── Hero. Editorial manifesto: the sentence is the visual, so the
             type fills the measure instead of leaving half the viewport
             empty next to it. Three text elements total. ───────────────── */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage: "var(--background-image-hero-grid)",
            backgroundSize: "var(--background-size-hero-grid)",
            maskImage:
              "radial-gradient(ellipse 90% 70% at 70% 20%, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 70% at 70% 20%, black, transparent 75%)",
          }}
        />

        <div className="section-container relative pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="display max-w-[16ch] text-hero text-ink">
              Systems that hold up in production.
            </h1>

            <p className="mt-8 max-w-[54ch] text-lg leading-relaxed text-ink-dim sm:text-xl">
              Saravanan, a full-stack developer in Chennai. Multi-tenant SaaS,
              government platforms, LMS, and serverless pipelines.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/projects" className="btn-primary">
                View work
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
              <Link href="/contact" className="btn-ghost">
                Get in touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stack band. The one marquee on the page: it carries breadth that
             does not need individual attention, and it sits under the hero
             rather than inside it. ───────────────────────────────────────── */}
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

      {/* ── Metrics ──────────────────────────────────────────────────────── */}
      <ImpactMetrics />

      {/* ── Selected work. Asymmetric pair, not a grid of equals. ────────── */}
      <section className="section-container py-20 lg:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display max-w-[18ch] text-section-h2 text-ink">
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

        {/* items-start: stretching the shorter card to match the featured one
            left a large void above its footer, which reads as a bug rather
            than as alignment. */}
        <Reveal
          className="mt-12 grid gap-6 lg:grid-cols-12 lg:items-start"
          delay={0.05}
        >
          <div className="lg:col-span-7">
            <ProjectCard project={projects[0]} variant="featured" />
          </div>
          <div className="lg:col-span-5">
            <ProjectCard project={projects[1]} variant="default" />
          </div>
        </Reveal>
      </section>

      {/* ── Engineering lab. Hairline rows, not three identical cards. ───── */}
      <section className="border-y border-line bg-elevated">
        <div className="section-container py-20 lg:py-28">
          <Reveal className="max-w-[42ch]">
            <h2 className="display text-section-h2 text-ink">
              Things you can actually click.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Every claim on this site has something behind it you can poke at
              yourself.
            </p>
          </Reveal>

          <Reveal className="mt-14 border-t border-line" delay={0.05}>
            {labTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group grid grid-cols-1 gap-3 border-b border-line py-7 transition-colors hover:bg-surface md:grid-cols-12 md:items-baseline md:gap-6 md:px-4"
              >
                <div className="md:col-span-4">
                  <div className="display text-section-h3 text-ink transition-colors group-hover:text-volt-text">
                    {tool.title}
                  </div>
                  <div className="mt-1.5 font-mono text-xs text-muted-2">
                    {tool.meta}
                  </div>
                </div>
                <p className="max-w-[60ch] text-[15px] leading-relaxed text-muted md:col-span-7">
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

      {/* ── Skills ───────────────────────────────────────────────────────── */}
      <section className="section-container py-20 lg:py-28">
        <Reveal>
          <h2 className="display max-w-[20ch] text-section-h2 text-ink">
            What I build with.
          </h2>
        </Reveal>
        <Reveal className="mt-14" delay={0.05}>
          <SkillMatrix />
        </Reveal>
      </section>

      {/* ── About and experience. Split, no nested cards. ────────────────── */}
      <section className="border-t border-line">
        <div className="section-container grid gap-14 py-20 lg:grid-cols-12 lg:gap-20 lg:py-28">
          <Reveal className="lg:col-span-5">
            <h2 className="display text-section-h2 text-ink">
              A developer who wants the whole picture.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              I started on internal ERP and CRM tooling. Over the past four
              years I have shipped government visa platforms, LMS and coaching
              apps, expert marketplaces, and multi-tenant SaaS builders.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              The work I like most is the part where a vague requirement turns
              into a schema, a boundary, and a decision someone can argue with.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.05}>
            <div className="border-t border-line">
              {experiencePreview.map((job) => (
                <div
                  key={job.company}
                  className="grid gap-3 border-b border-line py-7 sm:grid-cols-12 sm:gap-6"
                >
                  <div className="sm:col-span-7">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="display text-section-h3 text-ink">
                        {job.company}
                      </span>
                      {job.current && (
                        <span className="rounded-[var(--radius)] bg-volt px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wide text-[#171612]">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm text-muted">{job.role}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {job.stack.map((s) => (
                        <span key={s} className="tag">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="font-mono text-xs text-muted-2 sm:col-span-5 sm:text-right">
                    {job.period}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/experience"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-volt-text"
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

      {/* ── Contact. Full-bleed accent panel, left aligned. ──────────────── */}
      <section className="bg-volt">
        <div className="section-container py-20 lg:py-28">
          <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2 className="display max-w-[20ch] text-section-h2 text-[#171612]">
                Looking for a full-stack engineer who ships.
              </h2>
              <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-[#171612]/75">
                Open to remote and hybrid roles. If you have a system to build,
                I would like to hear about it.
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-[#171612] px-6 py-3 text-sm font-semibold text-[#f4f3ef] transition-transform duration-150 hover:brightness-125 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171612] focus-visible:ring-offset-2 focus-visible:ring-offset-[#d8f34a]"
              >
                Get in touch
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
