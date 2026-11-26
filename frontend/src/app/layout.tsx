import type { Metadata } from 'next/types';
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google';
import { Navigation } from '@/components/nav/Navigation';
import { Footer } from '@/components/nav/Footer';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import '@/styles/globals.css';

/* Display face. Bricolage's tighter apertures and slightly irregular
   counters keep large headlines from reading as a system default. */
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://saravanan.krelyvo.in';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Saravanan | Senior Full-Stack Developer & Software Engineer',
    template: '%s | Saravanan',
  },
  description:
    'Chennai-based Full-Stack Developer (Next.js, Node.js, TypeScript) building multi-tenant SaaS architectures, backend systems, compliance platforms, and AI-integrated applications.',
  keywords: [
    'Full-Stack Developer',
    'Software Engineer',
    'SaaS Developer',
    'Next.js Developer',
    'Node.js Developer',
    'Multi-Tenant Architecture',
    'Backend Engineering',
    'AI-Integrated Applications',
    'Chennai Full-Stack Developer',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Saravanan — Full-Stack Engineer',
    title: 'Saravanan | Senior Full-Stack Developer & Software Engineer',
    description:
      'Chennai-based Full-Stack Developer building multi-tenant SaaS architectures, backend systems, and AI-integrated applications.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saravanan | Senior Full-Stack Developer & Software Engineer',
    description:
      'Full-Stack Developer specializing in Next.js, Node.js, multi-tenant architecture, and AI-integrated applications.',
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Saravanan Ramesh',
  jobTitle: 'Senior Full-Stack Developer',
  url: SITE_URL,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://github.com/SARAVANAN-2503',
    'https://linkedin.com/in/saravanan-ramesh-dev',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-[100dvh] flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* The palette ships a full light and dark theme, so the site follows
            the visitor's system preference and the nav toggle overrides it.
            Previously this was pinned to dark with enableSystem={false}, which
            made the light half of the token set unreachable. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={200}>
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
