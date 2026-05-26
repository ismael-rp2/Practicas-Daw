'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMinimize } from '@/context/MinimizeContext';
import { destroyLenis, initLenis } from '@/lib/lenisControl';
import { destroyHeroST, initHeroST } from '@/lib/heroSTBridge';

gsap.registerPlugin(ScrollTrigger);

const SCALE        = 0.88;
const DURATION_IN  = 0.65;
const DURATION_OUT = 0.5;
const BOX_SHADOW_IN  = '0 32px 80px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.35)';
const BOX_SHADOW_OUT = 'none';
const COUNTER      = 1 / SCALE;

export default function MinimizedShell({ children }: { children: ReactNode }) {
  const { isMinimized } = useMinimize();
  const shellRef        = useRef<HTMLDivElement>(null);
  const everMinimized   = useRef(false);
  const savedScrollRef  = useRef(0);
  const miniScrollCleanupRef = useRef<(() => void) | null>(null);

  const getScrollViewport = () => document.querySelector<HTMLElement>('.scroll-viewport');

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;

    if (isMinimized) {
      everMinimized.current = true;
      el.classList.add('app-mini');

      const sv = getScrollViewport();
      savedScrollRef.current = sv?.scrollTop ?? 0;

      destroyLenis();
      destroyHeroST();

      const heroEl = document.querySelector<HTMLElement>('#inicio');
      if (heroEl) {
        gsap.set(heroEl.querySelectorAll<HTMLElement>('.hero-label, .hero-sub, .reveal-wrap, .reveal-inner'), {
          clearProps: 'opacity,transform,scale',
        });
      }

      ScrollTrigger.getAll().forEach((st) => {
        if (st.animation) st.animation.progress(1, true);
        st.disable(false);
      });

      gsap.set('.testimonios', { clearProps: 'opacity,y,transform' });

      if (sv) {
        initHeroST(sv);
        sv.scrollTop = savedScrollRef.current;

        let targetST = sv.scrollTop;
        let rafId    = 0;
        const lerpFn = (a: number, b: number, t: number) => a + (b - a) * t;

        const tick = () => {
          const cur  = sv.scrollTop;
          const next = lerpFn(cur, targetST, 0.14);
          if (Math.abs(next - cur) > 0.05) {
            sv.scrollTop = next;
            ScrollTrigger.update();
            rafId = requestAnimationFrame(tick);
          } else {
            sv.scrollTop = targetST;
            ScrollTrigger.update();
          }
        };

        const onMiniWheel = (e: WheelEvent) => {
          e.preventDefault();
          let delta = e.deltaY;
          if (e.deltaMode === 1) delta *= 16;
          if (e.deltaMode === 2) delta *= window.innerHeight;
          const maxST = sv.scrollHeight - sv.clientHeight;
          targetST = Math.max(0, Math.min(targetST + delta, maxST));
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(tick);
        };

        el.addEventListener('wheel', onMiniWheel, { passive: false });
        miniScrollCleanupRef.current = () => {
          el.removeEventListener('wheel', onMiniWheel);
          cancelAnimationFrame(rafId);
        };

        ScrollTrigger.update();
      }

      gsap.to(el, { scale: SCALE, transformOrigin: '0% 0%', boxShadow: BOX_SHADOW_IN, duration: DURATION_IN, ease: 'expo.out', overwrite: true });

      const topbar  = document.querySelector<HTMLElement>('.topbar');
      const sidebar = document.querySelector<HTMLElement>('.nav-sidebar');
      if (topbar)  gsap.to(topbar,  { scaleY: COUNTER, transformOrigin: 'center top',  duration: DURATION_IN, ease: 'expo.out', overwrite: true });
      if (sidebar) gsap.to(sidebar, { scaleX: COUNTER, transformOrigin: 'left center', duration: DURATION_IN, ease: 'expo.out', overwrite: true });

    } else if (everMinimized.current) {
      el.classList.remove('app-mini');
      miniScrollCleanupRef.current?.();
      miniScrollCleanupRef.current = null;

      const sv = getScrollViewport();
      const innerScroll = sv?.scrollTop ?? savedScrollRef.current;

      const topbar  = document.querySelector<HTMLElement>('.topbar');
      const sidebar = document.querySelector<HTMLElement>('.nav-sidebar');

      if (topbar)  gsap.to(topbar,  { scaleY: 1, duration: DURATION_OUT, ease: 'expo.out', overwrite: true });
      if (sidebar) gsap.to(sidebar, { scaleX: 1, duration: DURATION_OUT, ease: 'expo.out', overwrite: true });

      gsap.to(el, {
        scale: 1, boxShadow: BOX_SHADOW_OUT, duration: DURATION_OUT, ease: 'expo.out', overwrite: true,
        onComplete: () => {
          gsap.set(el, { clearProps: 'scale,boxShadow,transform' });
          if (topbar)  gsap.set(topbar,  { clearProps: 'transform' });
          if (sidebar) gsap.set(sidebar, { clearProps: 'transform' });
          initHeroST();
          ScrollTrigger.getAll().forEach((st) => st.enable(false, false));
          ScrollTrigger.refresh();
          initLenis(innerScroll);
        },
      });
    }
  }, [isMinimized]);

  return <div ref={shellRef} className="app-shell">{children}</div>;
}
