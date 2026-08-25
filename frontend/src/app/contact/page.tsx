import type { Metadata } from 'next/types';
import { Mail, Phone, Download } from 'lucide-react';
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
    note: 'Calls and WhatsApp',
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
    note: 'Source code and projects',
    external: true,
    copyable: false,
    icon: <GithubMark />,
  },
];

/* Plain definition pairs. These were four uppercase mono eyebrows stacked in
   a sidebar card, which put more eyebrows on this page than the whole
   homepage had sections. */
const DETAILS: { term: string; value: string; sub?: string }[] = [
  { term: 'Based in', value: 'Chennai, Tamil Nadu, India', sub: 'IST (UTC+5:30)' },
  { term: 'Work mode', value: 'Remote or hybrid' },
  { term: 'Open to', value: 'Full-time, contract, consulting' },
  { term: 'Replies', value: 'Usually within 24 hours' },
];

export default function ContactPage() {
  return (
    <div className="section-container pt-32 pb-24 lg:pt-40">
      <ContentHeader
        title="Let's work together"
        description={
          <>
            Currently open to{' '}
            <strong className="font-semibold text-ink">
              remote and hybrid full-stack roles
            </strong>
            . If you have a product to build, a team to join, or just want to
            talk architecture, reach out.
          </>
        }
      />

      <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="min-w-0 lg:col-span-7">
          <div className="border-t border-line">
            {CONTACTS.map((c) => (
              <ContactCard key={c.label} contact={c} />
            ))}
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-10"
          >
            <Download className="h-4 w-4" strokeWidth={2} />
            Download resume
          </a>
        </div>

        <div className="lg:col-span-5">
          <dl className="border-t border-line">
            {DETAILS.map((d) => (
              <div
                key={d.term}
                className="grid grid-cols-12 gap-4 border-b border-line py-5"
              >
                <dt className="col-span-5 text-[13px] text-muted">{d.term}</dt>
                <dd className="col-span-7 text-[15px] text-ink">
                  {d.value}
                  {d.sub && (
                    <span className="mt-1 block font-mono text-xs text-muted-2">
                      {d.sub}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
