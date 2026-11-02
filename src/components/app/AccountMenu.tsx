import { Button, Dropdown } from '@/components/ui'

interface AccountProps { email: string; busy: boolean; onSignOut: () => void }

/** Desktop: pinned to the bottom of the sidebar. The email is text-escaped by React. */
export function SidebarAccount({ email, busy, onSignOut }: AccountProps) {
  return (
    <div className="mt-auto border-t border-line bg-bg/40 p-3">
      <p className="label px-1">HESAB</p>
      <p className="mt-1 truncate px-1 text-sm text-fg-muted" title={email}>{email}</p>
      <Button variant="secondary" size="sm" className="mt-2 w-full" onClick={onSignOut} disabled={busy}>
        {busy ? 'Çıxılır…' : 'Çıxış'}
      </Button>
    </div>
  )
}

/** Mobile: email as the menu trigger, logout inside. */
export function MobileAccountMenu({ email, busy, onSignOut }: AccountProps) {
  return (
    <Dropdown
      align="right"
      trigger={<span className="block max-w-[9.5rem] truncate">{email}</span>}
      items={[{ label: busy ? 'Çıxılır…' : 'Çıxış', onSelect: onSignOut }]}
    />
  )
}
