'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { clsx } from 'clsx';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );

  const isDark = mounted ? theme === 'dark' : true;

  return (
    <div className="inline-flex items-center rounded-full border border-line bg-surface/60 p-0.5">
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-label="Switch to light theme"
        aria-pressed={mounted && !isDark}
        className={clsx(
          'flex h-6 w-6 items-center justify-center rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-bright focus-visible:ring-offset-1 focus-visible:ring-offset-obsidian',
          mounted && !isDark
            ? 'bg-crimson text-white'
            : 'text-grey-muted hover:text-ivory'
        )}
      >
        <Sun className="h-3.5 w-3.5" strokeWidth={2} />
      </button>
      <button
        type="button"
        onClick={() => setTheme('dark')}
        aria-label="Switch to dark theme"
        aria-pressed={mounted && isDark}
        className={clsx(
          'flex h-6 w-6 items-center justify-center rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-bright focus-visible:ring-offset-1 focus-visible:ring-offset-obsidian',
          mounted && isDark
            ? 'bg-crimson text-white'
            : 'text-grey-muted hover:text-ivory'
        )}
      >
        <Moon className="h-3.5 w-3.5" strokeWidth={2} />
      </button>
    </div>
  );
}
