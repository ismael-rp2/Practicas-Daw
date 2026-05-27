'use client';

import { Component, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';

class ModelErrorBoundary extends Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';
import { registerProgressSetter, unregisterProgressSetter } from '@/lib/heroScrollBridge';
import { registerHeroST, unregisterHeroST } from '@/lib/heroSTBridge';
import { useMinimize } from '@/context/MinimizeContext';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  label?:        string;
  line1Normal?:  string;
  line1Accent?:  string;
  line2Normal?:  string;
  line2Accent?:  string;
  sub?:          string;
  stamp?:        string;
}

const LIFT_RADIUS = 95;
const MAX_LIFT    = -7;

// ── Cámara ──────────────────────────────────────────────────────────────────
const CAMERA = {
  position: [0, 0, 7] as [number, number, number],
  fov: 50,
};

// ── Modelos 3D educación/IA ──────────────────────────────────────────────────
// Copia los modelos de app-mav/public/models/ a jose-david/public/models/
const MODELS = [
  {
    path: '/models/bombilla.glb',
    scale: 1.1,
    position: [-3.2, 1.3, 0.0] as [number, number, number],
    rotation: [0.0, 0.3, 0.0] as [number, number, number],
  },
  {
    path: '/models/youtube.glb',
    scale: 0.95,
    position: [3.8, 1.4, -0.5] as [number, number, number],
    rotation: [0.0, -0.4, 0.0] as [number, number, number],
  },
  {
    path: '/models/libro-3d.glb',
    scale: 0.9,
    position: [-2.8, -1.6, 0.3] as [number, number, number],
    rotation: [0.2, 0.5, 0.0] as [number, number, number],
  },
  {
    path: '/models/graduation%20cap%203d%20model.glb',
    scale: 1.05,
    position: [3.0, -1.4, -0.2] as [number, number, number],
    rotation: [-0.1, -0.3, 0.1] as [number, number, number],
  },
] as const;

const MODELS_MINI_POSITIONS: (readonly [number, number, number] | null)[] = [
  null,
  [4.3, 1.4, -0.5],
  null,
  [3.3, -1.4, -0.2],
];

const MODEL_SPIN = [
  { spinY: 0.25, spinX: 0.06 },
  { spinY: -0.2, spinX: 0.05 },
  { spinY: 0.18, spinX: -0.04 },
  { spinY: -0.22, spinX: 0.07 },
];

const FLOAT = {
  speed: 1.8,
  rotationIntensity: 0.5,
  floatIntensity: 1.1,
  floatingRange: [-0.18, 0.18] as [number, number],
};

const LIGHTS = {
  ambient: { intensity: 2.4 },
  key:  { intensity: 5.0, pos: [4.0, 5.0, 4.0] as [number, number, number], color: '#ffffff' },
  fill: { intensity: 1.2, pos: [-3.0, 2.0, -2.0] as [number, number, number], color: '#c8c0ff' },
  rim:  { intensity: 1.0, pos: [0.0, -4.0, -3.0] as [number, number, number], color: '#a0a8ff' },
};

const SCROLL_ANIM = {
  scrollEnd: 0.6,
  groupZ: 3.5,
  groupY: 1.8,
  groupRotX: 0.4,
  textY: -8,
  textScale: 1.06,
  textStagger: 0.16,
};

// ── SpinningModel ────────────────────────────────────────────────────────────
type SpinningModelProps = {
  path: string;
  scale: number;
  position: readonly [number, number, number];
  initRot: readonly [number, number, number];
  spinY: number;
  spinX: number;
};

function SpinningModel({ path, scale, position, initRot, spinY, spinX }: SpinningModelProps) {
  const { scene } = useGLTF(path);
  const cloned    = useMemo(() => scene.clone(true), [scene]);
  const groupRef  = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * spinY;
    groupRef.current.rotation.x += delta * spinX;
  });

  return (
    <group
      ref={groupRef}
      scale={scale}
      position={[...position] as [number, number, number]}
      rotation={[...initRot] as [number, number, number]}
    >
      <primitive object={cloned} />
    </group>
  );
}

// ── HeroScene ────────────────────────────────────────────────────────────────
function HeroScene({ scrollRef, isMini }: { scrollRef: React.RefObject<number>; isMini: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (!groupRef.current) return;
    const p = scrollRef.current;
    groupRef.current.position.x = 0;
    groupRef.current.position.z = p * SCROLL_ANIM.groupZ;
    groupRef.current.position.y = p * SCROLL_ANIM.groupY;
    groupRef.current.rotation.x = p * SCROLL_ANIM.groupRotX;
  });

  return (
    <>
      <ambientLight intensity={LIGHTS.ambient.intensity} />
      <directionalLight intensity={LIGHTS.key.intensity}  position={LIGHTS.key.pos}  color={LIGHTS.key.color}  castShadow />
      <directionalLight intensity={LIGHTS.fill.intensity} position={LIGHTS.fill.pos} color={LIGHTS.fill.color} />
      <directionalLight intensity={LIGHTS.rim.intensity}  position={LIGHTS.rim.pos}  color={LIGHTS.rim.color}  />

      <group ref={groupRef}>
        {MODELS.map((cfg, i) => {
          const miniPos = isMini ? MODELS_MINI_POSITIONS[i] : null;
          const pos: readonly [number, number, number] = miniPos ?? cfg.position;
          return (
            <Float
              key={i}
              speed={FLOAT.speed + i * 0.3}
              rotationIntensity={FLOAT.rotationIntensity}
              floatIntensity={FLOAT.floatIntensity}
              floatingRange={FLOAT.floatingRange}
            >
              <SpinningModel
                path={cfg.path}
                scale={cfg.scale}
                position={pos}
                initRot={cfg.rotation}
                spinY={MODEL_SPIN[i].spinY}
                spinX={MODEL_SPIN[i].spinX}
              />
            </Float>
          );
        })}
      </group>
    </>
  );
}

MODELS.forEach(({ path }) => useGLTF.preload(path));

// ── Hero ─────────────────────────────────────────────────────────────────────
export default function HeroJD({
  label       = '01 — Inicio',
  line1Normal = 'Transforma tu forma de ',
  line1Accent = 'enseñar',
  line2Normal = 'con Inteligencia ',
  line2Accent = 'Artificial.',
  sub         = 'Soy José David. Maestro, Ingeniero y Formador de docentes. Te ayudo a integrar la IA, mejorar tu competencia digital y optimizar tus clases para que recuperes tu tiempo.',
  stamp       = 'José David — Educación & IA',
}: HeroProps = {}) {
  const { isMinimized } = useMinimize();
  const TOTAL = line1Normal.length + line1Accent.length + line2Normal.length + line2Accent.length;
  const [showCanvas, setShowCanvas] = useState(true);

  const sectionRef  = useRef<HTMLElement>(null);
  const labelRef    = useRef<HTMLParagraphElement>(null);
  const line1Ref    = useRef<HTMLSpanElement>(null);
  const line2Ref    = useRef<HTMLSpanElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const innerRef    = useRef<HTMLDivElement>(null);
  const canvasWrap  = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef(0);
  const scrollCtxRef = useRef<gsap.Context | null>(null);
  const proxyRef   = useRef<HTMLElement | null>(null);
  const charRefs   = useRef<(HTMLSpanElement | null)[]>(Array.from({ length: TOTAL }, () => null));

  useEffect(() => {
    registerProgressSetter((p: number) => { scrollRef.current = p; });
    return () => { unregisterProgressSetter(); };
  }, []);

  // Desactivar canvas 3D en móvil para evitar lag de scroll
  useEffect(() => {
    const check = () => setShowCanvas(window.innerWidth >= 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  function createScrollTrigger(_scroller?: Element | Window | string | null) {
    if (!sectionRef.current) return;
    scrollRef.current = 0;
    if (proxyRef.current) { ScrollTrigger.scrollerProxy(proxyRef.current); proxyRef.current = null; }
    if (scrollCtxRef.current) { scrollCtxRef.current.revert(); scrollCtxRef.current = null; }

    const sv = document.querySelector<HTMLElement>('.scroll-viewport');
    if (!sv) return;

    const wraps = innerRef.current ? Array.from(innerRef.current.querySelectorAll('.reveal-wrap')) : [];
    const textElements = [labelRef.current, subRef.current, ...wraps].filter(Boolean);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current, scroller: sv,
          start: 'top top', end: '+=70%',
          pin: true, pinSpacing: true, pinType: 'transform',
          anticipatePin: 1, scrub: 2.5,
          onUpdate: (self) => { scrollRef.current = self.progress; },
        },
      });
      tl.fromTo(textElements,
        { y: 0, opacity: 1, scale: 1, immediateRender: false },
        { y: SCROLL_ANIM.textY, opacity: 0, scale: SCROLL_ANIM.textScale, ease: 'power1.in', stagger: { each: SCROLL_ANIM.textStagger, from: 'start' }, transformOrigin: 'center center' }
      );
      if (canvasWrap.current) {
        tl.fromTo(canvasWrap.current,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.3
        );
      }
    }, sectionRef);

    scrollCtxRef.current = ctx;
  }

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;
    const entranceCtx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(labelRef.current, { y: 20, opacity: 0, duration: 0.8, delay: 0.4 })
        .from([line1Ref.current, line2Ref.current], { y: '110%', duration: 1.05, stagger: 0.13 }, '-=0.45')
        .from(subRef.current, { y: 18, opacity: 0, duration: 0.9, ease: 'power2.out' }, '-=0.25');
    }, sectionRef);
    createScrollTrigger();
    return () => {
      scrollCtxRef.current?.revert();
      scrollCtxRef.current = null;
      entranceCtx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    registerHeroST(
      (scroller) => createScrollTrigger(scroller as Element | Window | string | null),
      () => { scrollCtxRef.current?.revert(); scrollCtxRef.current = null; },
    );
    return () => { unregisterHeroST(); };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLHeadingElement>) => {
    charRefs.current.forEach((el) => {
      if (!el) return;
      const r    = el.getBoundingClientRect();
      const dist = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
      if (dist < LIFT_RADIUS) {
        const t = 1 - dist / LIFT_RADIUS;
        gsap.to(el, { y: MAX_LIFT * t * t, duration: 0.18, ease: 'power2.out', overwrite: 'auto' });
      } else {
        gsap.to(el, { y: 0, duration: 0.7, ease: 'elastic.out(1.1,0.45)', overwrite: 'auto' });
      }
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    charRefs.current.forEach((el) => {
      if (el) gsap.to(el, { y: 0, duration: 0.8, ease: 'elastic.out(1,0.4)', overwrite: 'auto' });
    });
  }, []);

  function chars(text: string, startIdx: number, isEm = false) {
    const result: React.ReactNode[] = [];
    let i = 0;
    while (i < text.length) {
      if (text[i] === ' ') {
        const idx = startIdx + i;
        result.push(
          <span key={idx} ref={(el) => { charRefs.current[idx] = el; }} className="hero-char">
            {' '}
          </span>
        );
        i++;
      } else {
        const wordStart = i;
        while (i < text.length && text[i] !== ' ') i++;
        const wordSpans = text.slice(wordStart, i).split('').map((ch, j) => {
          const idx = startIdx + wordStart + j;
          return (
            <span
              key={idx}
              ref={(el) => { charRefs.current[idx] = el; }}
              className="hero-char"
              data-em={isEm ? 'true' : undefined}
              style={isEm ? { fontStyle: 'italic' } : undefined}
            >
              {ch}
            </span>
          );
        });
        result.push(
          <span
            key={`w${wordStart}`}
            className={isEm ? 'inline-block whitespace-nowrap hover:text-white transition-colors duration-300 cursor-default' : undefined}
            style={isEm ? { color: 'var(--accent, #818cf8)' } : { display: 'inline-block', whiteSpace: 'nowrap' }}
          >
            {wordSpans}
          </span>
        );
      }
    }
    return result;
  }

  return (
    <section className="hero" id="inicio" ref={sectionRef}>
      <div ref={canvasWrap} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {showCanvas && (
          <Canvas
            style={{ width: '100%', height: '100%' }}
            camera={{ position: CAMERA.position, fov: CAMERA.fov }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
            frameloop="always"
            resize={{ scroll: false, debounce: { resize: 0, scroll: 0 } }}
          >
            <ModelErrorBoundary>
              <Suspense fallback={null}>
                <HeroScene scrollRef={scrollRef} isMini={isMinimized} />
              </Suspense>
            </ModelErrorBoundary>
          </Canvas>
        )}
      </div>

      <div className="hero-inner" ref={innerRef}>
        <p className="hero-label" ref={labelRef}>{label}</p>

        <h1 className="hero-headline font-display font-light" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <span className="reveal-wrap">
            <span className="reveal-inner" ref={line1Ref}>
              {chars(line1Normal, 0)}
              {chars(line1Accent, line1Normal.length, true)}
            </span>
          </span>
          <span className="reveal-wrap">
            <span className="reveal-inner" ref={line2Ref}>
              {chars(line2Normal, line1Normal.length + line1Accent.length)}
              {chars(line2Accent, line1Normal.length + line1Accent.length + line2Normal.length)}
            </span>
          </span>
        </h1>

        <p className="hero-sub" ref={subRef}>{sub}</p>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          Scroll
        </span>
      </div>
      <span className="hero-stamp">{stamp}</span>
    </section>
  );
}
