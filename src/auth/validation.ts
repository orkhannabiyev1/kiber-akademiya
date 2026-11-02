/** Client-side validation is UX only; Supabase Auth remains authoritative. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const MIN_PASSWORD_LENGTH = 8

export const validateEmail = (value: string): string | undefined => {
  if (!value.trim()) return 'Email daxil edin.'
  return EMAIL_PATTERN.test(value.trim()) ? undefined : 'Düzgün email ünvanı daxil edin.'
}

/** Login only checks presence, so existing accounts are never locked out by a new rule. */
export const validateLoginPassword = (value: string): string | undefined =>
  value ? undefined : 'Şifrə daxil edin.'

export const validateNewPassword = (value: string): string | undefined => {
  if (!value) return 'Şifrə daxil edin.'
  return value.length >= MIN_PASSWORD_LENGTH ? undefined : `Şifrə ən azı ${MIN_PASSWORD_LENGTH} simvol olmalıdır.`
}

export const validateConfirmation = (password: string, confirmation: string): string | undefined => {
  if (!confirmation) return 'Şifrəni təkrar daxil edin.'
  return password === confirmation ? undefined : 'Şifrələr eyni deyil.'
}
