import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch — email, GitHub, LinkedIn, resume download.',
};

const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '';
const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL ?? '#';
const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? '#';

export default function ContactPage() {
  return (
    <div className="pt-14">
      <div className="section-container py-16 max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-accent" />
          <span className="font-mono text-xs text-accent tracking-widest uppercase">
            Get In Touch
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold text-slate-100 mb-3">
          Contact
        </h1>
        <p className="text-slate-400 mb-10">
          Interested in working together or want to discuss system architecture?
        </p>

        <div className="space-y-4">
          <ContactRow
            label="Email"
            href={`mailto:${EMAIL}`}
            value={EMAIL}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            }
          />
          <ContactRow
            label="GitHub"
            href={GITHUB_URL}
            value={GITHUB_URL.replace('https://', '')}
            external
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            }
          />
          <ContactRow
            label="LinkedIn"
            href={LINKEDIN_URL}
            value={LINKEDIN_URL.replace('https://', '')}
            external
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            }
          />
          <div className="card-surface p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-slate-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                  <path d="M14 2v6h6" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                  <path d="M10 9H8" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-slate-300 font-medium">Resume</div>
                <div className="text-xs text-slate-600">PDF download</div>
              </div>
            </div>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="tag-accent hover:bg-accent/20 transition-colors"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactRow({
  label,
  href,
  value,
  external,
  icon,
}: {
  label: string;
  href: string;
  value: string;
  external?: boolean;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="card-surface p-5 flex items-center gap-4 hover:border-accent/30 transition-all group block"
    >
      <div className="text-slate-500 group-hover:text-accent transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-slate-300 font-medium">{label}</div>
        <div className="text-xs text-slate-600 truncate font-mono">{value}</div>
      </div>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-slate-600 group-hover:text-accent/60 transition-colors shrink-0"
      >
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
      </svg>
    </a>
  );
}
