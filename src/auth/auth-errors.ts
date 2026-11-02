import { isAuthRetryableFetchError, type AuthError } from '@supabase/supabase-js'

/** User-facing Azerbaijani messages. Raw provider errors are never shown. */
export const authMessages = {
  invalidCredentials: 'Email və ya şifrə yanlışdır.',
  emailNotConfirmed: 'Email təsdiqi tələb olunur.',
  network: 'Şəbəkə xətası baş verdi. Yenidən cəhd edin.',
  server: 'Server xətası baş verdi. Bir az sonra yenidən cəhd edin.',
  rateLimit: 'Çox sayda cəhd edildi. Bir az sonra yenidən cəhd edin.',
  weakPassword: 'Şifrə tələblərə cavab vermir. Daha uzun və ya daha güclü şifrə seçin.',
  // Deliberately neutral: does not confirm or deny that an email is registered.
  signUpFailed: 'Qeydiyyat tamamlanmadı. Məlumatları yoxlayın və ya daxil olmağa çalışın.',
  signInFailed: 'Daxil olmaq mümkün olmadı. Yenidən cəhd edin.',
  signOutFailed: 'Çıxış zamanı xəta baş verdi. Yenidən cəhd edin.',
  notConfigured: 'Autentifikasiya hazırda əlçatan deyil.',
} as const

export type AuthContextKind = 'signIn' | 'signUp'

export function mapAuthError(error: unknown, kind: AuthContextKind): string {
  if (error instanceof TypeError) return authMessages.network
  const authError = error as Partial<AuthError> | null
  if (authError && isAuthRetryableFetchError(authError as AuthError)) {
    return (authError.status ?? 0) >= 500 ? authMessages.server : authMessages.network
  }

  switch (authError?.code) {
    case 'invalid_credentials':
      return authMessages.invalidCredentials
    case 'email_not_confirmed':
      return authMessages.emailNotConfirmed
    case 'over_request_rate_limit':
    case 'over_email_send_rate_limit':
      return authMessages.rateLimit
    case 'weak_password':
      return authMessages.weakPassword
    case 'user_already_exists':
    case 'email_exists':
      return authMessages.signUpFailed
    default:
      return kind === 'signIn' ? authMessages.signInFailed : authMessages.signUpFailed
  }
}
