'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

const links = [
  { href: '/projects', label: 'Projects' },
  { href: '/api-explorer', label: 'API Explorer' },
  { href: '/architecture', label: 'Architecture' },
  { href: '/performance', label: 'Performance' },
  { href: '/contact', label: 'Contact' },
] as const;

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-800/50 backdrop-blur-xl bg-navy-900/80">
      <div className="section-container flex h-14 items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-slate-100 hover:text-accent transition-colors"
        >
          Saravanan<span className="text-accent">.</span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                pathname === href || pathname?.startsWith(href + '/')
                  ? 'text-accent bg-accent-muted'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
