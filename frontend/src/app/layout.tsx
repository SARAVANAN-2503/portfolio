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

export const metadata: Metadata = {
  title: {
    default: 'Saravanan, Senior Full-Stack Engineer',
    template: '%s | Saravanan',
  },
  description:
    'Production-grade portfolio showcasing multi-tenant SaaS, government systems, real-time platforms, and serverless architecture.',
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
