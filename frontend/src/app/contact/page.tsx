import type { Metadata } from 'next/types';
import { Mail, Phone, FileText, Download, MapPin, Check } from 'lucide-react';
import { ContactCard, type ContactMethod } from '@/components/contact/ContactCard';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Saravanan — open to remote and hybrid full-stack roles.',
};

const CONTACT_EMAIL = 'saravanan.r25032001@gmail.com';

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const CONTACTS: ContactMethod[] = [
  {
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    note: 'Best way to reach me',
    external: false,
    copyable: true,
    icon: <Mail className="h-4.5 w-4.5" />,
  },
  {
    label: 'Phone',
    value: '+91 90030 45246',
    href: 'tel:+919003045246',
    note: 'Calls & WhatsApp',
    external: false,
    copyable: false,
    icon: <Phone className="h-4.5 w-4.5" />,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/saravanan-ramesh-dev',
    href: 'https://linkedin.com/in/saravanan-ramesh-dev',
    note: 'Connect professionally',
    external: true,
    copyable: false,
    icon: <LinkedInIcon />,
  },
  {
    label: 'GitHub',
    value: 'github.com/SARAVANAN-2503',
    href: 'https://github.com/SARAVANAN-2503',
    note: 'Source code & projects',
    external: true,
    copyable: false,
    icon: <GithubIcon />,
  },
];

export default function ContactPage() {
  return (
    <div className="pt-14">
      <div className="section-container py-16">
        <div className="mx-auto max-w-4xl">

          {/* Header */}
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-crimson" />
              <span className="font-mono text-xs uppercase tracking-widest text-crimson">Get In Touch</span>
            </div>
            <h1 className="mb-3 font-display text-3xl font-bold text-ivory sm:text-4xl">
              Let&apos;s work together
            </h1>
            <p className="max-w-xl leading-relaxed text-grey">
              I&apos;m currently open to <strong className="text-ivory">remote and hybrid full-stack roles</strong>.
              If you have a product to build, a team to join, or just want to talk architecture — reach out.
            </p>

            {/* Availability badge */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-live/25 bg-live/5 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
              </span>
              <span className="font-mono text-xs text-live">
                Available for new opportunities · April 2026
              </span>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-5">

            {/* Contact cards */}
            <div className="min-w-0 space-y-3 lg:col-span-3">
              {CONTACTS.map(c => (
                <ContactCard key={c.label} contact={c} />
              ))}

              {/* Resume download */}
              <div className="card-surface flex items-center gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2/60 text-grey-muted">
                  <FileText className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-ivory">Resume</div>
                  <div className="mt-0.5 text-xs text-grey-muted">Full Stack Developer — PDF</div>
                </div>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-crimson/30 bg-crimson/10 px-3 py-1.5 font-mono text-xs text-crimson transition-colors hover:bg-crimson/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-bright"
                >
                  <Download className="h-3 w-3" />
                  Download
                </a>
              </div>
            </div>

            {/* Right side card */}
            <div className="min-w-0 lg:col-span-2">
              <div className="card-surface flex h-full flex-col gap-5 p-6">
                <div>
                  <div className="mb-2 flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-crimson">
                    <MapPin className="h-3 w-3" /> Location
                  </div>
                  <p className="text-sm text-ivory">Chennai, Tamil Nadu, India</p>
                  <p className="mt-1 text-xs text-grey-muted">IST (UTC+5:30)</p>
                </div>

                <div className="h-px bg-line" />

                <div>
                  <div className="mb-2 font-mono text-xs uppercase tracking-widest text-crimson">Preferred Work Mode</div>
                  <div className="flex flex-wrap gap-2">
                    {['Remote', 'Hybrid'].map(mode => (
                      <span key={mode} className="inline-flex items-center gap-1 rounded-full border border-live/30 bg-live/10 px-2.5 py-0.5 font-mono text-xs text-live">
                        <Check className="h-3 w-3" /> {mode}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-line" />

                <div>
                  <div className="mb-2 font-mono text-xs uppercase tracking-widest text-crimson">Role Types</div>
                  <div className="space-y-1.5 text-xs text-grey">
                    <div className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-crimson/60" />
                      Full-Time Employment
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-crimson/60" />
                      Contract / Freelance
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-crimson/60" />
                      Consulting
                    </div>
                  </div>
                </div>

                <div className="h-px bg-line" />

                <div>
                  <div className="mb-2 font-mono text-xs uppercase tracking-widest text-crimson">Response Time</div>
                  <p className="text-xs text-grey">Usually within <span className="text-ivory">24 hours</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
