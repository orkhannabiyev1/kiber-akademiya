/** Decorative network-topology motif. Purely visual (aria-hidden); low contrast so it never competes with text. */
export function TopologyMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 120" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" className={className}>
      <g className="text-line-strong">
        <path d="M24 60H92M92 60L140 26H206M92 60L140 94H206M206 26H236M206 94H236M140 26V94" />
      </g>
      <g fill="rgb(var(--bg))" className="text-line-strong">
        <rect x="16" y="52" width="16" height="16" />
        <rect x="132" y="18" width="16" height="16" />
        <rect x="132" y="86" width="16" height="16" />
        <rect x="228" y="18" width="16" height="16" />
        <rect x="228" y="86" width="16" height="16" />
      </g>
      <path d="M24 60H92L140 26H206H236" className="animate-flow text-accent" strokeWidth="1.75" strokeLinecap="round" strokeDasharray="2 22" />
      <circle cx="92" cy="60" r="7" fill="rgb(var(--bg))" className="text-accent" />
      <circle cx="206" cy="26" r="4" fill="rgb(var(--bg))" className="text-line-strong" />
      <circle cx="206" cy="94" r="4" fill="rgb(var(--bg))" className="text-line-strong" />
    </svg>
  )
}
