/** Locale-aware uppercase so Azerbaijani i/İ and ı/I map correctly (for dynamic monospace labels). */
export const upperAz = (value: string): string => value.toLocaleUpperCase('az-AZ')
