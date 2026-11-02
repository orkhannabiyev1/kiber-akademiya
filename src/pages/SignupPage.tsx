import { Link } from 'react-router-dom'
import { authLinkClass, AuthFormShell } from '@/components/auth/AuthFormShell'
import { SignupForm } from '@/components/auth/SignupForm'

export function SignupPage() {
  return (
    <AuthFormShell
      title="Qeydiyyat"
      footer={<p>Artıq hesabınız var? <Link to="/login" className={authLinkClass}>Daxil olun</Link></p>}
    >
      <SignupForm />
    </AuthFormShell>
  )
}
