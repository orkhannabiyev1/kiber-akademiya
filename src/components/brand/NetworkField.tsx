/**
 * Large decorative network map for hero backgrounds: nodes, links and packets flowing along one route.
 * Purely visual (aria-hidden). Motion is CSS-only and switched off by prefers-reduced-motion.
 */
const nodes: { x: number; y: number; label: string; accent?: boolean }[] = [
  { x: 50, y: 190, label: 'CLIENT' },
  { x: 160, y: 190, label: 'SWITCH' },
  { x: 280, y: 120, label: 'ROUTER', accent: true },
  { x: 280, y: 260, label: 'FIREWALL' },
  { x: 420, y: 60, label: 'WEB' },
  { x: 420, y: 170, label: 'INTERNET', accent: true },
  { x: 420, y: 300, label: 'DNS' },
]
const links = 'M50 190H160M160 190L280 120M160 190L280 260M280 120L420 60M280 120L420 170M280 260L420 170M280 260L420 300M280 120V260'
const route = 'M50 190H160L280 120L420 170'

export function NetworkField({ className, labels = true }: { className?: string; labels?: boolean }) {
  return (
    <svg viewBox="0 0 500 340" fill="none" aria-hidden="true" className={className}>
      <path d={links} className="stroke-line-strong" strokeWidth="1" />
      <path d={route} className="stroke-accent/50" strokeWidth="1.25" />
      <path d={route} className="animate-flow stroke-accent" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 22" />
      {nodes.map((n) => (
        <g key={n.label}>
          {n.accent ? (
            <>
              <circle cx={n.x} cy={n.y} r="14" className="animate-pulse-soft stroke-accent/40" strokeWidth="1" />
              <circle cx={n.x} cy={n.y} r="6" className="fill-bg stroke-accent" strokeWidth="1.5" />
            </>
          ) : (
            <rect x={n.x - 7} y={n.y - 7} width="14" height="14" className="fill-bg stroke-line-strong" strokeWidth="1" />
          )}
          {labels && <text x={n.x} y={n.y + 28} textAnchor="middle" className="fill-fg-subtle font-mono" fontSize="9" letterSpacing="1.5">{n.label}</text>}
        </g>
      ))}
    </svg>
  )
}
