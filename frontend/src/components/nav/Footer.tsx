import { Mail } from 'lucide-react';
import { GithubMark, LinkedInMark } from '@/components/icons/BrandIcons';

const GITHUB_URL = 'https://github.com/SARAVANAN-2503';
const LINKEDIN_URL = 'https://linkedin.com/in/saravanan-ramesh-dev';
const CONTACT_EMAIL = 'saravanan.r25032001@gmail.com';

export function Footer() {
  return (
    <footer className="border-t border-line bg-elevated">
      <div className="section-container flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <span className="font-display text-sm font-bold text-ivory">
            Saravanan<span className="text-crimson">.</span>
          </span>
          <span className="flex items-center gap-1.5 text-xs text-grey-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
            </span>
            Full-Stack Developer &middot; Open to work
          </span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-grey-muted transition-colors hover:text-crimson focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-bright rounded-sm"
            aria-label="GitHub"
          >
            <GithubMark className="h-[18px] w-[18px]" />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-grey-muted transition-colors hover:text-crimson focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-bright rounded-sm"
            aria-label="LinkedIn"
          >
            <LinkedInMark className="h-[18px] w-[18px]" />
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-grey-muted transition-colors hover:text-crimson focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-bright rounded-sm"
            aria-label="Email"
          >
            <Mail className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="tag-accent hover:bg-crimson/20 transition-colors"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
