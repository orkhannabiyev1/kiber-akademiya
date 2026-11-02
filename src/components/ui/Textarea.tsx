import { useId, type ComponentPropsWithRef } from 'react'
import { cx } from '@/lib/cx'
import { controlClasses, describedBy, Field } from './Field'

interface TextareaProps extends ComponentPropsWithRef<'textarea'> {
  label: string
  hint?: string
  error?: string
}

export function Textarea({ label, hint, error, className, id, rows = 4, ...props }: TextareaProps) {
  const auto = useId()
  const fieldId = id ?? auto
  return (
    <Field id={fieldId} label={label} hint={hint} error={error}>
      <textarea
        id={fieldId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(fieldId, hint, error)}
        className={cx(controlClasses, 'py-2', error && 'border-danger', className)}
        {...props}
      />
    </Field>
  )
}
