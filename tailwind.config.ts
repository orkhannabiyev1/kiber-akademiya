import type { Config } from 'tailwindcss'

// Every color resolves to a CSS variable in src/styles/tokens.css.
// Themes swap variables; components never reference raw colors.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      bg: token('bg'),
      elevated: token('bg-elevated'),
      surface: { DEFAULT: token('surface'), raised: token('surface-raised') },
      line: { DEFAULT: token('border'), strong: token('border-strong') },
      fg: { DEFAULT: token('fg'), muted: token('fg-muted'), subtle: token('fg-subtle') },
      accent: { DEFAULT: token('accent'), fg: token('accent-fg') },
      success: token('success'),
      warning: token('warning'),
      danger: token('danger'),
      ai: token('ai'),
    },
    fontFamily: {
      sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
      mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
    },
    // Type scale: ~1.2 ratio. Each step carries its own line-height and tracking.
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1.125rem' }],
      sm: ['0.875rem', { lineHeight: '1.375rem' }],
      base: ['1rem', { lineHeight: '1.625rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.375rem', { lineHeight: '1.875rem', letterSpacing: '-0.01em' }],
      '2xl': ['1.75rem', { lineHeight: '2.125rem', letterSpacing: '-0.015em' }],
      '3xl': ['2.25rem', { lineHeight: '2.625rem', letterSpacing: '-0.02em' }],
      display: ['clamp(1.5rem, 0.75rem + 3.6vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      '4xl': ['3rem', { lineHeight: '3.25rem', letterSpacing: '-0.025em' }],
    },
    fontWeight: { normal: '400', medium: '500', semibold: '600' },
    // Radius rules: 3px controls, 6px overlays. Surfaces in the page have none.
    borderRadius: { none: '0', sm: '0', md: '0', lg: '0', xl: '0', full: '9999px' },
    // Shadows only for things that float above the page.
    boxShadow: { none: 'none', overlay: '5px 5px 0 rgb(var(--shadow))' },
    extend: {
      spacing: { sidebar: '15rem', header: '3.5rem' },
      maxWidth: { prose: '68ch', page: '72rem' },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'page-in': { from: { opacity: '0', transform: 'translateY(4px)' }, to: { opacity: '1', transform: 'none' } },
        flow: { to: { strokeDashoffset: '-24' } },
        'pulse-soft': { '0%,100%': { opacity: '0.25' }, '50%': { opacity: '1' } },
      },
      animation: {
        'fade-in': 'fade-in 150ms ease-out',
        'page-in': 'page-in 180ms ease-out',
        flow: 'flow 1.6s linear infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
