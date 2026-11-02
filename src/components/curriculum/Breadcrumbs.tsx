import { Link } from 'react-router-dom'

export interface Crumb { label: string; to?: string }

/** The last crumb is the current page and is not a link. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Naviqasiya izi" className="text-sm text-fg-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="text-fg-subtle">/</span>}
            {item.to ? (
              <Link to={item.to} className="hover:text-fg hover:underline">{item.label}</Link>
            ) : (
              <span aria-current="page" className="text-fg">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
