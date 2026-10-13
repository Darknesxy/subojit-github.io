/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#f4f3ef',
          surface: '#faf9f5',
          border: '#dfded8',
          'border-dark': '#1e2830',
          dark: '#080c0e',
          'dark-card': '#0d1318',
          emerald: '#0e5a3c',
          'emerald-light': '#147a52',
          'green-glow': '#10b981',
          amber: '#f59e0b',
          crimson: '#ef4444',
          cyan: '#06b6d4',
          text: '#121417',
          muted: '#686f78',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'spin-slow': 'spin 18s linear infinite',
      }
    },
  },
  plugins: [],
}
