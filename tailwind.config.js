/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  // Preflight is disabled on purpose: the deck already ships a full hand-rolled
  // base stylesheet (src/App.css) for slides 1-4, 6-10, 12. Turning off Tailwind's
  // reset layer means Tailwind utility classes are additive/opt-in (used only in
  // Slide05Esports.tsx and Slide11Ask.tsx) instead of clobbering global element
  // styles (h1/h2/h3/p/table/ul defaults) that the rest of the deck relies on.
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      fontFamily: {
        display: ['Unbounded', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
