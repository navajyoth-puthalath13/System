// Tailwind v4 uses the PostCSS plugin (CSS-first config — no tailwind.config.js).
// A bundler (Vite/Next) is intentionally NOT chosen yet; wire this in when you add one.
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
