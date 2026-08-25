/**
 * Shared header for content pages (Projects, Experience, Contact).
 *
 * The eyebrow this used to render was removed rather than restyled. On a
 * standalone page the label was saying what the H1 already said ("GET IN
 * TOUCH" above "Let's work together") while the nav had already marked the
 * current section, and repeating that uppercase mono rhythm at the top of
 * every page is most of what made the site read as templated.
 */
interface ContentHeaderProps {
  title: string;
  description: React.ReactNode;
}

export function ContentHeader({ title, description }: ContentHeaderProps) {
  return (
    <header className="mb-14 max-w-[46ch]">
      <h1 className="display text-page-h1 text-ink">{title}</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">{description}</p>
    </header>
  );
}
