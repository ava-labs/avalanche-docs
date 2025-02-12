import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist Variable', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono Variable', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config 
