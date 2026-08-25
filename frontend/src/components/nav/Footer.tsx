import Link from 'next/link';
import { Mail } from 'lucide-react';
import { GithubMark, LinkedInMark } from '@/components/icons/BrandIcons';

const GITHUB_URL = 'https://github.com/SARAVANAN-2503';
const LINKEDIN_URL = 'https://linkedin.com/in/saravanan-ramesh-dev';
const CONTACT_EMAIL = 'saravanan.r25032001@gmail.com';

const social = [
  { href: GITHUB_URL, label: 'GitHub', Icon: GithubMark, external: true },
  { href: LINKEDIN_URL, label: 'LinkedIn', Icon: LinkedInMark, external: true },
  { href: `mailto:${CONTACT_EMAIL}`, label: 'Email', Icon: Mail, external: false },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="section-container flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <Link
            href="/"
            className="display w-fit text-base text-ink transition-colors hover:text-volt-text"
          >
            Saravanan.
          </Link>
          {/* The pinging status dot that used to sit here is gone: a decorative
              indicator that never changes state is noise, and the sentence
              already says the same thing. */}
          <span className="text-[13px] text-muted">
            Full-Stack Developer, open to work
          </span>
        </div>

        <div className="flex items-center gap-5">
          {social.map(({ href, label, Icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              aria-label={label}
              className="rounded-[var(--radius)] text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt-text"
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[var(--radius)] border border-line-strong px-3 py-1.5 text-[13px] font-medium text-ink transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt-text"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
