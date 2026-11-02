import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/auth/useAuth'
import { validateConfirmation, validateEmail, validateNewPassword } from '@/auth/validation'
import { Button, Input } from '@/components/ui'
import { authLinkClass, FormMessage } from './AuthFormShell'
import { PasswordInput } from './PasswordInput'

type FieldErrors = { email?: string; password?: string; confirm?: string }

export function SignupForm() {
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string>()
  const [submitting, setSubmitting] = useState(false)
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false)
  const inFlight = useRef(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (inFlight.current) return
    const next: FieldErrors = {
      email: validateEmail(email),
      password: validateNewPassword(password),
      confirm: validateConfirmation(password, confirm),
    }
    setErrors(next)
    setFormError(undefined)
    const firstInvalid = next.email ? 'signup-email' : next.password ? 'signup-password' : next.confirm ? 'signup-confirm' : null
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus()
      return
    }
    inFlight.current = true
    setSubmitting(true)
    const result = await signUp(email, password)
    inFlight.current = false
    setSubmitting(false)
    setPassword('')
    setConfirm('')
    if (!result.ok) setFormError(result.message)
    else if (result.needsEmailConfirmation) setAwaitingConfirmation(true)
    // Otherwise a session exists and GuestOnlyRoute redirects to /dashboard.
  }

  if (awaitingConfirmation) {
    return (
      <div className="flex flex-col gap-4">
        <FormMessage tone="success">
          Emailinizi yoxlayın. Hesabı təsdiqləmək üçün göndərilən link vasitəsilə davam edin. Məktub gəlmirsə, spam qovluğuna baxın və ya daxil olmağa çalışın.
        </FormMessage>
        <Link to="/login" className={authLinkClass}>Daxil ol səhifəsinə keç</Link>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={submitting} className="flex flex-col gap-5">
      <Input id="signup-email" label="Email" type="email" autoComplete="email" inputMode="email"
        value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
      <PasswordInput id="signup-password" label="Şifrə" autoComplete="new-password"
        hint="Ən azı 8 simvol." value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
      <PasswordInput id="signup-confirm" label="Şifrəni təkrar et" autoComplete="new-password"
        value={confirm} onChange={(e) => setConfirm(e.target.value)} error={errors.confirm} />
      {formError && <FormMessage tone="error">{formError}</FormMessage>}
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? 'Qeydiyyat edilir…' : 'Qeydiyyatdan keç'}
      </Button>
    </form>
  )
}
