/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7EBD6',
        bone: '#F1DFC3',
        ink: '#2A1710',
        terracotta: '#C2572F',
        rojo: '#8E1F2B',
        vino: '#6C1220',
        amarillo: '#F2B63C',
        turquesa: '#1F9E96',
        cobalto: '#1F3F8F',
        naranja: '#E8752A',
        night: '#0A1330',
        noche: '#111E45',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      },
      boxShadow: {
        paper: '0 30px 60px -20px rgba(42, 23, 16, 0.45)',
        card: '0 24px 50px -24px rgba(42, 23, 16, 0.5)',
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
