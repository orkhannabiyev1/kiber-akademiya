import { useRef, useState, type FormEvent } from 'react'
import { useAuth } from '@/auth/useAuth'
import { validateEmail, validateLoginPassword } from '@/auth/validation'
import { Button, Input } from '@/components/ui'
import { FormMessage } from './AuthFormShell'
import { PasswordInput } from './PasswordInput'

export function LoginForm() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [formError, setFormError] = useState<string>()
  const [submitting, setSubmitting] = useState(false)
  const inFlight = useRef(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (inFlight.current) return
    const next = { email: validateEmail(email), password: validateLoginPassword(password) }
    setErrors(next)
    setFormError(undefined)
    if (next.email || next.password) {
      document.getElementById(next.email ? 'login-email' : 'login-password')?.focus()
      return
    }
    inFlight.current = true
    setSubmitting(true)
    const result = await signIn(email, password)
    inFlight.current = false
    setSubmitting(false)
    // On success the auth state changes and GuestOnlyRoute redirects to /dashboard.
    if (!result.ok) {
      setFormError(result.message)
      setPassword('')
      document.getElementById('login-password')?.focus()
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={submitting} className="flex flex-col gap-5">
      <Input id="login-email" label="Email" type="email" autoComplete="email" inputMode="email"
        value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
      <PasswordInput id="login-password" label="Şifrə" autoComplete="current-password"
        value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
      {formError && <FormMessage tone="error">{formError}</FormMessage>}
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? 'Daxil olunur…' : 'Daxil ol'}
      </Button>
    </form>
  )
}
