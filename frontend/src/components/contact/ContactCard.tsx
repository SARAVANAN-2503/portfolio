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
        // unfocused document, insecure context) — fail silently.
      });
  }

  return (
    <a
      href={contact.href}
      target={contact.external ? '_blank' : undefined}
      rel={contact.external ? 'noopener noreferrer' : undefined}
      className="card-surface group flex items-center gap-4 p-5 transition-all hover:border-crimson/30 hover:shadow-[0_0_24px_-8px_rgba(229,72,77,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-bright"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2/60 text-grey-muted transition-colors group-hover:border-crimson/30 group-hover:text-crimson [&_svg]:h-4.5 [&_svg]:w-4.5">
        {contact.icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-ivory">{contact.label}</div>
        <div className="mt-0.5 truncate font-mono text-xs text-grey-muted">{contact.value}</div>
        <div className="mt-0.5 text-[10px] text-grey-muted">{contact.note}</div>
      </div>
      {contact.copyable ? (
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${contact.label.toLowerCase()}`}
          className="shrink-0 rounded-md border border-line p-2 text-grey-muted transition-colors hover:border-crimson/40 hover:text-crimson cursor-pointer"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-live" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      ) : (
        <ArrowUpRight className="h-4 w-4 shrink-0 text-grey-muted transition-colors group-hover:text-crimson" />
      )}
    </a>
  );
}
