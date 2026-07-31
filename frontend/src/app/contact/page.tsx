import type { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Saravanan — open to remote and hybrid full-stack roles.',
};

const CONTACTS = [
  {
    label: 'Email',
    value: 'saravanan.r25032001@gmail.com',
    href: 'mailto:saravanan.r25032001@gmail.com',
    note: 'Best way to reach me',
    external: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+91 90030 45246',
    href: 'tel:+919003045246',
    note: 'Calls & WhatsApp',
    external: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.42 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/saravanan-ramesh-dev',
    href: 'https://linkedin.com/in/saravanan-ramesh-dev',
    note: 'Connect professionally',
    external: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/SARAVANAN-2503',
    href: 'https://github.com/SARAVANAN-2503',
    note: 'Source code & projects',
    external: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="pt-14">
      <div className="section-container py-16">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-accent" />
              <span className="font-mono text-xs text-accent tracking-widest uppercase">Get In Touch</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-slate-100 sm:text-4xl mb-3">
              Let&apos;s work together
            </h1>
            <p className="text-slate-400 max-w-xl leading-relaxed">
              I&apos;m currently open to <strong className="text-slate-300">remote and hybrid full-stack roles</strong>.
              If you have a product to build, a team to join, or just want to talk architecture — reach out.
            </p>

            {/* Availability badge */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="font-mono text-xs text-green-400">
                Available for new opportunities · April 2026
              </span>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-5">

            {/* Contact cards */}
            <div className="lg:col-span-3 space-y-3">
              {CONTACTS.map(c => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noopener noreferrer' : undefined}
                  className="card-surface p-5 flex items-center gap-4 hover:border-accent/30 hover:shadow-[0_0_20px_-6px_rgba(245,158,11,0.12)] transition-all group block"
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg border border-slate-700/60 bg-slate-800/60 flex items-center justify-center text-slate-500 group-hover:text-accent group-hover:border-accent/30 transition-colors">
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-300">{c.label}</div>
                    <div className="text-xs font-mono text-slate-500 truncate mt-0.5">{c.value}</div>
                    <div className="text-[10px] text-slate-600 mt-0.5">{c.note}</div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className="text-slate-700 group-hover:text-accent/60 transition-colors shrink-0">
                    <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
                  </svg>
                </a>
              ))}

              {/* Resume download */}
              <div className="card-surface p-5 flex items-center gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg border border-slate-700/60 bg-slate-800/60 flex items-center justify-center text-slate-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/>
                    <path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-300">Resume</div>
                  <div className="text-xs text-slate-600 mt-0.5">Senior Full Stack Developer — PDF</div>
                </div>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-mono text-accent hover:bg-accent/20 transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
                  </svg>
                  Download
                </a>
              </div>
            </div>

            {/* Right side card */}
            <div className="lg:col-span-2">
              <div className="card-surface p-6 h-full flex flex-col gap-5">
                <div>
                  <div className="font-mono text-xs text-accent mb-2 uppercase tracking-widest">Location</div>
                  <p className="text-sm text-slate-300">Chennai, Tamil Nadu, India 🇮🇳</p>
                  <p className="text-xs text-slate-500 mt-1">IST (UTC+5:30)</p>
                </div>

                <div className="h-px bg-slate-800/60" />

                <div>
                  <div className="font-mono text-xs text-accent mb-2 uppercase tracking-widest">Preferred Work Mode</div>
                  <div className="flex flex-wrap gap-2">
                    {['Remote', 'Hybrid'].map(mode => (
                      <span key={mode} className="inline-flex items-center gap-1 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-xs font-mono text-green-400">
                        ✓ {mode}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-slate-800/60" />

                <div>
                  <div className="font-mono text-xs text-accent mb-2 uppercase tracking-widest">Role Types</div>
                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent/60" />
                      Full-Time Employment
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent/60" />
                      Contract / Freelance
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent/60" />
                      Consulting
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-800/60" />

                <div>
                  <div className="font-mono text-xs text-accent mb-2 uppercase tracking-widest">Response Time</div>
                  <p className="text-xs text-slate-400">Usually within <span className="text-slate-300">24 hours</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
