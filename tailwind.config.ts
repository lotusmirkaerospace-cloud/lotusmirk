import type { Config } from 'tailwindcss'

// Placeholder design-system tokens. Swap once brand files (logo, exact palette,
// type) arrive — every color/font reference in components pulls from these
// tokens, so replacing them here re-skins the whole site in one place.
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05070a',
          900: '#0a0e14',
          800: '#12161f',
          700: '#1b212c',
          600: '#2a323f',
        },
        mist: {
          400: '#7b8794',
          300: '#a3adb8',
          200: '#c8d0d8',
          100: '#e7ebef',
        },
        signal: {
          DEFAULT: '#4fd1ff',
          dim: '#2a8fb8',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest2: '0.28em',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
export default config
