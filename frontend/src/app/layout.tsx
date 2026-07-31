import type { Metadata } from 'next/types';
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';
import { Navigation } from '@/components/nav/Navigation';
import { Footer } from '@/components/nav/Footer';
import '@/styles/globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Saravanan — Senior Full-Stack Engineer',
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
      className={`${syne.variable} ${dmSans.variable} ${jetBrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
