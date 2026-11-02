import { useEffect, useId, useRef, type ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

/** Uses native <dialog>: focus trapping, Escape handling and inertness come from the browser. */
export function Modal({ open, onClose, title, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-lg border border-line-strong bg-surface p-0 text-fg shadow-overlay backdrop:bg-bg/70"
    >
      <div className="p-6">
        <h2 id={titleId} className="text-xl">{title}</h2>
        <div className="mt-3 text-sm text-fg-muted">{children}</div>
      </div>
    </dialog>
  )
}
