'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, ChevronDown, Download, Eye } from 'lucide-react';
import { clsx } from 'clsx';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

const links = [
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/api-explorer', label: 'API Explorer' },
  { href: '/architecture', label: 'Architecture' },
  { href: '/performance', label: 'Performance' },
  { href: '/contact', label: 'Contact' },
] as const;

function isActive(pathname: string | null, href: string) {
  return pathname === href || pathname?.startsWith(href + '/');
}

function ResumeMenu({ compact }: { compact?: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={clsx(
            'inline-flex items-center gap-1.5 rounded-md border border-line-strong font-mono text-xs font-semibold text-volt-text transition-colors hover:bg-surface-2 hover:border-line-strong cursor-pointer',
            compact ? 'w-full justify-center px-4 py-2.5' : 'px-3 py-1.5'
          )}
        >
          Resume
          <ChevronDown className="h-3 w-3" strokeWidth={2.5} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem asChild>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="cursor-pointer gap-2">
            <Eye className="h-3.5 w-3.5" /> View resume
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/resume.pdf" download className="cursor-pointer gap-2">
            <Download className="h-3.5 w-3.5" /> Download PDF
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 8);
  });

  return (
    <nav
      className={clsx(
        'fixed top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-line bg-paper/85 backdrop-blur-xl shadow-[0_1px_0_0_var(--line)]'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className="section-container flex h-14 items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-ink transition-colors hover:text-volt-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt-text focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm"
        >
          Saravanan<span className="text-volt-text">.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {links.map(({ href, label }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt-text',
                  // Ink-on-volt in both themes: `text-ink` would flip to
                  // ivory in dark mode and sit unreadable on the lime pill.
                  active ? 'text-[#171612]' : 'text-muted hover:text-ink'
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-md bg-volt"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right cluster */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <ResumeMenu />
        </div>

        {/* Mobile trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open navigation menu"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink transition-colors hover:border-line-strong hover:text-volt-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt-text cursor-pointer"
              >
                <Menu className="h-4.5 w-4.5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-l border-line bg-paper">
              <SheetHeader>
                <SheetTitle className="font-display text-ink">
                  Saravanan<span className="text-volt-text">.</span>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col gap-1 px-4">
                {links.map(({ href, label }) => {
                  const active = isActive(pathname, href);
                  return (
                    <SheetClose asChild key={href}>
                      <Link
                        href={href}
                        className={clsx(
                          'rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                          active
                            ? 'bg-volt text-[#171612]'
                            : 'text-muted hover:bg-surface-2 hover:text-ink'
                        )}
                      >
                        {label}
                      </Link>
                    </SheetClose>
                  );
                })}
                <div className="mt-4 border-t border-line pt-4">
                  <ResumeMenu compact />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
