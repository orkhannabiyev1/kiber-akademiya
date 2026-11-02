import { pathPreview } from '@/data/landing'

/** The hero visual: the real shape of the platform (one path, several modules) drawn as an outline. */
export function PathTree() {
  return (
    <figure
      aria-label="Öyrənmə yolunun strukturu"
      className="animate-fade-in panel hud overflow-hidden font-mono text-sm"
    >
      <figcaption className="panel-bar px-4 py-2 text-xs text-fg-subtle">{pathPreview.hierarchyLabel}</figcaption>
      <div className="p-4">
        <p className="font-medium text-accent">{pathPreview.rootName}</p>
        <ul className="ml-1.5 mt-1">
          {pathPreview.topics.map((t) => (
            <li
              key={t.id}
              className="relative py-1.5 pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-line-strong after:absolute after:left-0 after:top-[17px] after:h-px after:w-4 after:bg-line-strong last:before:h-[17px]"
            >
              <span className="text-fg">{t.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  )
}
