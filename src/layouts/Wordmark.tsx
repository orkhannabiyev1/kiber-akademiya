import { Link } from 'react-router-dom'
import { site } from '@/lib/site'
import { upperAz } from '@/lib/text'

/** `stacked` is the two-line sidebar lockup: KİBER over AKADEMİYA, with the teal node as a mark. */
export function Wordmark({ stacked = false }: { stacked?: boolean }) {
  const [first = '', ...rest] = site.name.split(' ')
  return (
    <Link to="/" aria-label={site.name} className="inline-flex items-center gap-2.5 font-mono text-sm font-normal tracking-tight text-fg">
      <span aria-hidden="true" className={stacked ? 'size-2.5 rounded-[2px] bg-accent' : 'size-1.5 bg-accent'} />
      {stacked ? (
        <span aria-hidden="true" className="flex flex-col text-[0.8125rem] font-medium leading-[1.1] tracking-[0.14em]">
          <span>{upperAz(first)}</span>
          <span className="text-fg-muted">{upperAz(rest.join(' '))}</span>
        </span>
      ) : (
        site.name
      )}
    </Link>
  )
}
