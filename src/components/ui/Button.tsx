import type { ComponentPropsWithRef } from 'react'
import { cx } from '@/lib/cx'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md'

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-[background-color,color,transform] duration-150 active:translate-y-px disabled:pointer-events-none disabled:opacity-50'
const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-fg hover:bg-accent/90 hover:shadow-[0_0_0_1px_rgb(var(--accent)/0.5),0_0_20px_rgb(var(--accent)/0.35)] active:bg-accent/80',
  secondary: 'border border-line-strong text-fg hover:border-fg-subtle hover:bg-surface-raised active:bg-surface',
  ghost: 'text-fg-muted hover:bg-surface-raised hover:text-fg',
}
const sizes: Record<ButtonSize, string> = { sm: 'h-8 px-3 text-sm', md: 'h-10 px-4 text-sm' }

/** Exported so links (<Link>) can share button styling without duplicating it. */
export const buttonClasses = (variant: ButtonVariant = 'primary', size: ButtonSize = 'md') =>
  cx(base, variants[variant], sizes[size])

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({ variant, size, className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={cx(buttonClasses(variant, size), className)} {...props} />
}
