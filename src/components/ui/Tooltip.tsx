import { cloneElement, useId, type ReactElement } from 'react'

interface TooltipProps {
  content: string
  children: ReactElement<{ 'aria-describedby'?: string }>
}

/** CSS-driven tooltip: shows on hover and keyboard focus, links content via aria-describedby. */
export function Tooltip({ content, children }: TooltipProps) {
  const id = useId()
  return (
    <span className="group relative inline-flex">
      {cloneElement(children, { 'aria-describedby': id })}
      <span
        id={id}
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-50 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-sm border border-line-strong bg-surface-raised px-2 py-1 text-xs text-fg opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
      >
        {content}
      </span>
    </span>
  )
}
