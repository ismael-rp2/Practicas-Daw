'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { registerLenisControl, unregisterLenisControl } from '@/lib/lenisControl';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let lenisRAF: ((time: number) => void) | null = null;

    const CONFIG = {
      duration    : 1.2,
      easing      : (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel : true,
    } as const;

    function init(scrollTo = 0) {
      if (lenis) destroy();

      const scrollViewport = document.querySelector<HTMLElement>('.scroll-viewport');
      const contentFlow    = document.querySelector<HTMLElement>('.content-flow');

      if (!scrollViewport) return;

      // Siempre forzar la posición de scroll (evita que el navegador restaure una posición antigua)
      scrollViewport.scrollTop = scrollTo;

      lenis = new Lenis({
        wrapper      : scrollViewport,
        content      : contentFlow ?? undefined,
        eventsTarget : window,
        ...CONFIG,
      } as ConstructorParameters<typeof Lenis>[0]);

      (window as unknown as Record<string, unknown>)['lenis'] = lenis;

      // Notificar a otros componentes que Lenis está listo
      window.dispatchEvent(new CustomEvent('lenisReady', { detail: lenis }));

      ScrollTrigger.scrollerProxy(scrollViewport, {
        scrollTop(value?: number) {
          if (typeof value === 'number') scrollViewport.scrollTop = value;
          return scrollViewport.scrollTop;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
      });

      lenis.on('scroll', ScrollTrigger.update);

      lenisRAF = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(lenisRAF);
      gsap.ticker.lagSmoothing(0);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }

    function destroy() {
      if (lenisRAF) { gsap.ticker.remove(lenisRAF); lenisRAF = null; }
      if (lenis)    { lenis.destroy(); lenis = null; }
      delete (window as unknown as Record<string, unknown>)['lenis'];
    }

    // Evitar que el navegador restaure automáticamente la posición de scroll
    if (typeof history !== 'undefined') history.scrollRestoration = 'manual';

    init();
    registerLenisControl(destroy, init);

    return () => {
      destroy();
      unregisterLenisControl();
    };
  }, []);

  return <>{children}</>;
}
