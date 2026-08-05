"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Terminal,
  Waypoints,
  Gauge,
  MapPin,
  CalendarClock,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroConstellation } from "@/components/three/HeroConstellation";
import { ImpactMetrics } from "@/components/landing/ImpactMetrics";
import { Skills3D } from "@/components/landing/Skills3D";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/content/projects";

const techStack = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "MySQL",
  "MongoDB",
  "AWS",
];

const labTools = [
  {
    href: "/api-explorer",
    icon: Terminal,
    eyebrow: "/api/users?cursor=xyz",
    title: "API Explorer",
    description: "Real endpoints, real latency, real pagination.",
  },
  {
    href: "/architecture",
    icon: Waypoints,
    eyebrow: "client → api → db",
    title: "Architecture",
    description: "Interactive flows for multi-tenant, RBAC, queues.",
  },
  {
    href: "/performance",
    icon: Gauge,
    eyebrow: "O(1) vs O(N)",
    title: "Performance Lab",
    description: "Live cursor vs offset pagination benchmark.",
  },
] as const;

const experiencePreview = [
  {
    company: "Gnxtace Technology",
    role: "Full Stack Developer",
    period: "May 2024 – Present",
    current: true,
    stack: ["NexusOne.coach", "Seltrix", "GovPass", "ZPONZ"],
  },
  {
    company: "Jnana Inventive Pvt Ltd",
    role: "Full Stack Developer",
    period: "Jun 2022 – May 2024",
    current: false,
    stack: ["AdUnity", "QuickBizz"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
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
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const reduce = useReducedMotion();

  return (
    <div className="pt-14">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Neutral depth wash, confined mostly behind the visualization */}
        <div className="absolute inset-0 bg-glow-radial pointer-events-none" />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-[60%]"
          style={{
            backgroundImage: "var(--background-image-hero-grid)",
            backgroundSize: "var(--background-size-hero-grid)",
            maskImage: "linear-gradient(to left, black, transparent)",
            WebkitMaskImage: "linear-gradient(to left, black, transparent)",
          }}
        />

        <div className="relative mx-auto grid max-w-[1440px] gap-8 px-4 py-10 min-h-[680px] sm:px-6 sm:py-12 lg:min-h-[720px] lg:grid-cols-[52%_48%] lg:items-center lg:gap-4 lg:px-8 lg:py-12">
          {/* Left */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-live/25 bg-live/5 px-3 py-1 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-live" />
              </span>
              <span className="font-mono text-xs text-live tracking-wide">
                Open to Remote &amp; Hybrid roles
              </span>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-crimson" />
              <span className="font-mono text-xs text-crimson tracking-widest uppercase">
                Chennai, India
              </span>
            </div>

            <h1 className="max-w-[680px] text-balance font-display font-extrabold text-ivory text-[clamp(2.65rem,4.4vw,4.25rem)] leading-[0.98] tracking-[-0.045em]">
              <span className="block">Saravanan</span>
              <span className="block">Full-Stack Developer</span>
              <span className="block max-[374px]:text-[0.84em]">
                building <span className="text-gradient">reliable</span>
              </span>
              <span className="text-gradient block max-[374px]:text-[0.82em] max-[374px]:tracking-[-0.055em]">
                digital systems
              </span>
            </h1>

            <p className="mt-6 max-w-[580px] text-base text-ivory-dim leading-relaxed">
              I build clean architecture, measurable performance and code that
              actually works in production — multi-tenant SaaS, LMS platforms,
              marketplace/wallet flows, and serverless pipelines.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-md bg-crimson px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-crimson-bright active:scale-[0.97] active:bg-wine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-bright focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
              >
                View selected work
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/architecture"
                className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium text-ivory transition-all hover:border-crimson/40 hover:bg-surface/40 hover:text-crimson active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-bright"
              >
                Explore engineering lab
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface/50 px-2.5 py-1 font-mono text-xs text-ivory-dim"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — Three.js constellation */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="relative h-[320px] sm:h-[400px] md:h-[440px] lg:h-[600px] xl:h-[650px]"
          >
            <div className="absolute top-3 right-3 z-10 hidden items-center gap-1.5 rounded-full border border-live/25 bg-obsidian/70 px-2.5 py-1 backdrop-blur-sm sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-live" />
              <span className="font-mono text-[10px] text-live">
                System Health
              </span>
            </div>
            <HeroConstellation />
          </motion.div>
        </div>
      </section>

      {/* ── Metrics ──────────────────────────────────────────────────────── */}
      <Reveal className="section-container pt-2 pb-16 lg:pt-0">
        <ImpactMetrics />
      </Reveal>

      {/* ── Selected Work ────────────────────────────────────────────────── */}
      <Reveal className="section-container pb-16" delay={0.05}>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs text-crimson tracking-widest uppercase">
            Selected Work
          </span>
          <div className="h-px flex-1 bg-line" />
          <Link
            href="/projects"
            className="text-xs font-mono text-grey-muted transition-colors hover:text-crimson"
          >
            View all {projects.length} projects &rarr;
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ProjectCard project={projects[0]} variant="featured" />
          </div>
          <div className="lg:col-span-2">
            <ProjectCard project={projects[1]} variant="default" />
          </div>
        </div>
      </Reveal>

      {/* ── Engineering Lab ──────────────────────────────────────────────── */}
      <Reveal className="border-t border-line bg-elevated/60" delay={0.05}>
        <div className="section-container py-16">
          <div className="grid gap-8 lg:grid-cols-4">
            <div>
              <span className="font-mono text-xs text-crimson tracking-widest uppercase">
                Engineering Lab
              </span>
              <h2 className="mt-3 font-display text-xl font-bold text-ivory">
                Interactive tools and visualizations from my lab.
              </h2>
              <p className="mt-3 text-sm text-grey leading-relaxed">
                Every project includes interactive diagrams, live API endpoints
                you can test, and performance visualizations comparing real
                approaches.
              </p>
              <Link
                href="/architecture"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-grey-muted transition-colors hover:text-crimson"
              >
                Explore all tools <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-3">
              {labTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="card-surface group flex flex-col justify-between p-5 transition-all hover:border-crimson/35 hover:shadow-[0_0_32px_-14px_rgba(229,72,77,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-bright"
                >
                  <div>
                    <tool.icon
                      className="h-5 w-5 text-crimson"
                      strokeWidth={1.75}
                    />
                    <div className="mt-4 font-mono text-[11px] text-grey-muted">
                      {tool.eyebrow}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-ivory transition-colors group-hover:text-crimson">
                      {tool.title}
                    </div>
                    <div className="mt-1 text-xs text-grey-muted">
                      {tool.description}
                    </div>
                  </div>
                  <ArrowUpRight className="mt-4 h-4 w-4 text-grey-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-crimson" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── Skills ───────────────────────────────────────────────────────── */}
      <Reveal className="section-container py-16">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px w-8 bg-crimson" />
          <span className="font-mono text-xs text-crimson tracking-widest uppercase">
            Capabilities
          </span>
          <div className="h-px flex-1 bg-line" />
        </div>
        <Skills3D />
      </Reveal>

      {/* ── About + Experience preview ───────────────────────────────────── */}
      <Reveal className="section-container pb-16">
        <div className="card-surface flex flex-col gap-8 p-8 lg:flex-row lg:gap-12 lg:p-10">
          <div className="shrink-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-crimson/25 bg-crimson/10">
              <span className="font-display text-2xl font-bold text-crimson">
                S
              </span>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-crimson tracking-widest uppercase">
                About
              </span>
            </div>
            <h2 className="font-display text-xl font-bold text-ivory mb-3">
              A developer who loves the full picture
            </h2>
            <p className="text-sm text-grey leading-relaxed max-w-2xl">
              I&apos;m Saravanan, a full-stack developer based in Chennai,
              India. I started out building internal ERP and CRM tooling, and
              over the past 4+ years I&apos;ve shipped everything from
              government visa platforms to LMS/coaching apps, expert
              marketplaces, and multi-tenant SaaS builders.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <span className="flex items-center gap-1.5 text-xs text-grey-muted">
                <MapPin className="h-3.5 w-3.5" /> Chennai, India
              </span>
              <span className="flex items-center gap-1.5 text-xs text-grey-muted">
                <CalendarClock className="h-3.5 w-3.5" /> 4+ years experience
              </span>
              <span className="flex items-center gap-1.5 text-xs text-live">
                <span className="h-1.5 w-1.5 rounded-full bg-live" /> Open to
                remote &amp; hybrid
              </span>
            </div>

            <div className="mt-6 grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
              {experiencePreview.map((job) => (
                <div
                  key={job.company}
                  className="rounded-lg border border-line bg-surface-2/40 p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-ivory">
                          {job.company}
                        </span>
                        {job.current && (
                          <Badge
                            variant="outline"
                            className="border-live/30 bg-live/10 text-live text-[9px]"
                          >
                            Current
                          </Badge>
                        )}
                      </div>
                      <p className="mt-0.5 font-mono text-[11px] text-grey-muted">
                        {job.role}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] text-grey-muted">
                      {job.period}
                    </span>
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {job.stack.map((s) => (
                      <span key={s} className="tag text-[9px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/experience"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-grey-muted transition-colors hover:text-crimson"
            >
              Full work history <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </Reveal>

      {/* ── Contact CTA ──────────────────────────────────────────────────── */}
      <Reveal className="border-t border-line bg-elevated/60">
        <div className="section-container py-16 text-center">
          <span className="font-mono text-xs text-crimson tracking-widest uppercase">
            Get in touch
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold text-ivory sm:text-3xl">
            Let&apos;s build something reliable.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-grey leading-relaxed">
            I&apos;m actively looking for remote and hybrid full-stack roles. If
            you have a system to build, reach out.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-crimson px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-crimson-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-bright focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
            >
              Contact me
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-md border border-line-strong px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:border-crimson/40 hover:text-crimson"
            >
              See my work
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
