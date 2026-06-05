import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  // Sólo activa Tailwind en los archivos del proyecto (no en node_modules)
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  // El sitio siempre está en dark mode — usamos la estrategia 'class'
  // pero dado que el layout ya fuerza fondo oscuro, simplemente activamos
  // las variantes dark sin necesidad de añadir clase al <html>.
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [typography],
};

export default config;
