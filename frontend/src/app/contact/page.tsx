import type { Metadata } from 'next/types';
import { Mail, Phone, FileText, Download, MapPin, Check } from 'lucide-react';
import { ContactCard, type ContactMethod } from '@/components/contact/ContactCard';
import { ContentHeader } from '@/components/ui/ContentHeader';
import { GithubMark, LinkedInMark } from '@/components/icons/BrandIcons';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Saravanan, open to remote and hybrid full-stack roles.',
};

const CONTACT_EMAIL = 'saravanan.r25032001@gmail.com';

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
    icon: <LinkedInMark />,
  },
  {
    label: 'GitHub',
    value: 'github.com/SARAVANAN-2503',
    href: 'https://github.com/SARAVANAN-2503',
    note: 'Source code & projects',
    external: true,
    copyable: false,
    icon: <GithubMark />,
  },
];

export default function ContactPage() {
  return (
    <div className="pt-14">
      <div className="section-container py-16">
        <div className="mx-auto max-w-4xl">

          {/* Header */}
          <div className="mb-8">
            <ContentHeader
              eyebrow="Get In Touch"
              title="Let's work together"
              description={
                <>
                  I&apos;m currently open to <strong className="text-ivory">remote and hybrid full-stack roles</strong>.
                  If you have a product to build, a team to join, or just want to talk architecture, reach out.
                </>
              }
            />

            {/* Availability badge — no hardcoded date, the pulse already signals it's live */}
            <div className="inline-flex items-center gap-2 rounded-full border border-live/25 bg-live/5 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
              </span>
              <span className="font-mono text-xs text-live">
                Available for new opportunities
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
                  <div className="mt-0.5 text-xs text-grey-muted">Full Stack Developer, PDF</div>
                </div>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-crimson/30 bg-crimson/10 px-3 py-1.5 font-mono text-xs text-crimson transition-colors hover:bg-crimson/20 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-bright"
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
                  <div className="space-y-1.5 border-l border-line pl-3 text-xs text-grey">
                    <div>Full-Time Employment</div>
                    <div>Contract / Freelance</div>
                    <div>Consulting</div>
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
