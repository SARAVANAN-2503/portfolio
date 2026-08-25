/**
 * Shared header for the three "Engineering Lab" pages (Architecture,
 * Performance, API Explorer). One consistent sub-brand marker instead of
 * three near-identical eyebrows, and an asymmetric layout distinct from
 * the content-page header (see ContentHeader).
 */
interface LabHeaderProps {
  title: string;
  description: string;
  meta?: string;
}

export function LabHeader({ title, description, meta }: LabHeaderProps) {
  return (
    <div className="mb-10 flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-xl">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-blueprint/25 bg-blueprint-dim px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-blueprint">
          Engineering Lab
        </div>
        <h1 className="font-display text-page-h1 font-bold tracking-tight text-ivory">
          {title}
        </h1>
        <p className="mt-3 text-grey leading-relaxed">{description}</p>
      </div>
      {meta && (
        <div className="shrink-0 font-mono text-xs text-grey-muted lg:text-right">
          {meta}
        </div>
      )}
    </div>
  );
}
