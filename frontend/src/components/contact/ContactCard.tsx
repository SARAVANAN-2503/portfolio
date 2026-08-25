'use client';

import { useState, type ReactNode } from 'react';
import { Check, Copy, ArrowUpRight } from 'lucide-react';

export interface ContactMethod {
  label: string;
  value: string;
  href: string;
  note: string;
  external: boolean;
  copyable: boolean;
  icon: ReactNode;
}

/* A hairline row, not a card. Five of these stacked used to be five identical
   bordered boxes each holding a bordered icon tile, which is the same object
   repeated down the page. As rows they read as one list. */
export function ContactCard({ contact }: { contact: ContactMethod }) {
  const [copied, setCopied] = useState(false);

  function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    navigator.clipboard
      .writeText(contact.value)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {
        // Clipboard access can be denied by the browser (permissions,
        // unfocused document, insecure context). Fail silently.
      });
  }

  return (
    <div className="group relative border-b border-line">
      <a
        href={contact.href}
        target={contact.external ? '_blank' : undefined}
        rel={contact.external ? 'noopener noreferrer' : undefined}
        className="grid grid-cols-1 items-baseline gap-1 py-6 transition-colors sm:grid-cols-12 sm:gap-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt-text"
      >
        <div className="display text-section-h3 text-ink transition-colors group-hover:text-volt-text sm:col-span-3">
          {contact.label}
        </div>
        <div className="min-w-0 sm:col-span-6">
          <div className="truncate font-mono text-sm text-ink-dim">
            {contact.value}
          </div>
          <div className="mt-1 text-[13px] text-muted">{contact.note}</div>
        </div>
        <div className="sm:col-span-3 sm:justify-self-end">
          {!contact.copyable && (
            <ArrowUpRight
              className="h-5 w-5 text-muted-2 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-volt-text"
              strokeWidth={1.75}
            />
          )}
        </div>
      </a>

      {/* Kept outside the anchor: a button nested inside a link is invalid
          markup and breaks keyboard activation of both. */}
      {contact.copyable && (
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${contact.label.toLowerCase()}`}
          className="absolute top-1/2 right-0 flex -translate-y-1/2 items-center gap-1.5 rounded-[var(--radius)] border border-line px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-line-strong hover:text-ink cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt-text"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy
            </>
          )}
        </button>
      )}
    </div>
  );
}
