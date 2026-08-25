/**
 * Shared header for content pages (Projects, Experience, Contact). Distinct
 * from LabHeader — crimson eyebrow + centered rhythm, each page keeps its
 * own eyebrow word since these are standalone pages, not a scrolling stack
 * of sections competing for the eyebrow budget.
 */
interface ContentHeaderProps {
  eyebrow: string;
  title: string;
  description: React.ReactNode;
}

export function ContentHeader({ eyebrow, title, description }: ContentHeaderProps) {
  return (
    <div className="mb-12 max-w-2xl">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-px w-8 bg-crimson" />
        <span className="font-mono text-xs uppercase tracking-widest text-crimson">
          {eyebrow}
        </span>
      </div>
      <h1 className="font-display text-page-h1 font-bold tracking-tight text-ivory">
        {title}
      </h1>
      <p className="mt-3 text-grey leading-relaxed">{description}</p>
    </div>
  );
}
