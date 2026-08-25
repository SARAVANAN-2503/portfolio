'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { clsx } from 'clsx';

/* Segmented control, 4px corners to match every other surface. The selected
   half uses the volt fill with ink text; the previous version used
   `bg-crimson text-white`, which under the new palette resolved to white on
   lime and failed contrast outright. */
export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );

  // `theme` is "system" until the user picks one, so fall back to what the
  // system actually resolved to for the pressed state.
  const isDark = mounted ? (theme === 'system' ? resolvedTheme : theme) === 'dark' : false;

  const base =
    'flex h-6 w-7 items-center justify-center rounded-[var(--radius)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt-text focus-visible:ring-offset-1 focus-visible:ring-offset-paper';

  return (
    <div className="inline-flex items-center rounded-[var(--radius)] border border-line p-0.5">
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-label="Switch to light theme"
        aria-pressed={mounted && !isDark}
        className={clsx(
          base,
          mounted && !isDark
            ? 'bg-volt text-[#171612]'
            : 'text-muted-2 hover:text-ink'
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
          base,
          mounted && isDark
            ? 'bg-volt text-[#171612]'
            : 'text-muted-2 hover:text-ink'
        )}
      >
        <Moon className="h-3.5 w-3.5" strokeWidth={2} />
      </button>
    </div>
  );
}
