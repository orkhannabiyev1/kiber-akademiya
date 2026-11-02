import { useId, type ComponentPropsWithRef, type ReactNode } from 'react'
import { cx } from '@/lib/cx'
import { controlClasses, describedBy, Field } from './Field'

interface InputProps extends ComponentPropsWithRef<'input'> {
  label: string
  hint?: string
  error?: string
  /** Optional control placed inside the field's right edge (e.g. a visibility toggle). */
  adornment?: ReactNode
}

export function Input({ label, hint, error, adornment, className, id, ...props }: InputProps) {
  const auto = useId()
  const fieldId = id ?? auto
  return (
    <Field id={fieldId} label={label} hint={hint} error={error}>
      <div className="relative">
        <input
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(fieldId, hint, error)}
          className={cx(controlClasses, 'h-10', adornment ? 'pr-11' : '', error && 'border-danger', className)}
          {...props}
        />
        {adornment && <div className="absolute inset-y-0 right-0 flex items-center">{adornment}</div>}
      </div>
    </Field>
  )
}
