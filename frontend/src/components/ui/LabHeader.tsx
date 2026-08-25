/**
 * Shared header for the three Engineering Lab pages (Architecture,
 * Performance, API Explorer).
 *
 * The "Engineering Lab" marker survives where ContentHeader's eyebrow did
 * not, because it does real work: it groups three sibling pages under one
 * sub-brand. It is set as a plain label against a rule rather than an
 * uppercase wide-tracked pill, which is the form that reads as decoration.
 */
interface LabHeaderProps {
  title: string;
  description: string;
  meta?: string;
}

export function LabHeader({ title, description, meta }: LabHeaderProps) {
  return (
    <header className="mb-12 border-b border-line pb-10">
      <div className="mb-6 flex items-center gap-3">
        <span aria-hidden className="h-px w-6 bg-volt-text" />
        <span className="text-[13px] font-medium text-volt-text">
          Engineering Lab
        </span>
      </div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[44ch]">
          <h1 className="display text-page-h1 text-ink">{title}</h1>
          <p className="mt-5 text-base leading-relaxed text-muted">
            {description}
          </p>
        </div>
        {meta && (
          <div className="shrink-0 font-mono text-xs text-muted-2 lg:text-right">
            {meta}
          </div>
        )}
      </div>
    </header>
  );
}
