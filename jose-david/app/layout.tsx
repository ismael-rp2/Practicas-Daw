import type { Metadata }   from 'next';
import './globals.css';

import { MinimizeProvider }  from '@/context/MinimizeContext';
import MinimizedShell        from '@/components/MinimizedShell';
import MarqueeBackground     from '@/components/MarqueeBackground';
import PageLoader            from '@/components/PageLoader';

export const metadata: Metadata = {
  title: 'José David — Educación & Inteligencia Artificial',
  description:
    'Maestro, Ingeniero y Formador de docentes. Transforma tu forma de enseñar con Inteligencia Artificial. Cursos, formaciones y comunidad para docentes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans">
        <PageLoader />
        <MinimizeProvider>

          <div aria-hidden="true" className="bg-lights" style={{ zIndex: 0 }} />

          <MinimizedShell>
            <div
              id="mq-text-wrapper"
              aria-hidden="true"
              style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
            >
              <MarqueeBackground />
            </div>
            {children}
          </MinimizedShell>

        </MinimizeProvider>
      </body>
    </html>
  );
}
