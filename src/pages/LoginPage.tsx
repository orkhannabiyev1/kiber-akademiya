import { Link } from 'react-router-dom'
import { authLinkClass, AuthFormShell } from '@/components/auth/AuthFormShell'
import { LoginForm } from '@/components/auth/LoginForm'

export function LoginPage() {
  return (
    <AuthFormShell
      title="Daxil ol"
      footer={<p>Hesabınız yoxdur? <Link to="/signup" className={authLinkClass}>Qeydiyyatdan keç</Link></p>}
    >
      <LoginForm />
    </AuthFormShell>
  )
}
