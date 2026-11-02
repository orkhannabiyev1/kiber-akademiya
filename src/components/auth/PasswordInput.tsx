import { useState, type ComponentProps } from 'react'
import { IconButton, Input } from '@/components/ui'

type PasswordInputProps = Omit<ComponentProps<typeof Input>, 'type' | 'adornment'>

/** Password field with a visibility toggle. Only the input `type` changes, never the value. */
export function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false)
  return (
    <Input
      {...props}
      type={visible ? 'text' : 'password'}
      adornment={
        <IconButton label={visible ? 'Şifrəni gizlət' : 'Şifrəni göstər'} aria-pressed={visible} onClick={() => setVisible((v) => !v)}>
          <span aria-hidden="true" className="text-xs">{visible ? 'Gizlət' : 'Göstər'}</span>
        </IconButton>
      }
    />
  )
}
