'use client';

import { Component, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { useIsomorphicLayoutEffect } from '@/lib/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger);

// Onda de sonido — sólo para la página de Podcasts
const SoundWaveHeroCanvas = dynamic(() => import('./SoundWaveHero'), { ssr: false });

// ── Error boundary ────────────────────────────────────────────────────────────
class ModelErrorBoundary extends Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

// ── Modelos 3D ────────────────────────────────────────────────────────────────
const MODELS = [
  { path: '/models/bombilla.glb',                      scale: 1.1,  position: [-3.2,  1.3,  0.0] as [number,number,number], rotation: [ 0.0,  0.3,  0.0] as [number,number,number] },
  { path: '/models/youtube.glb',                       scale: 0.95, position: [ 3.8,  1.4, -0.5] as [number,number,number], rotation: [ 0.0, -0.4,  0.0] as [number,number,number] },
  { path: '/models/libro-3d.glb',                      scale: 0.9,  position: [-2.8, -1.6,  0.3] as [number,number,number], rotation: [ 0.2,  0.5,  0.0] as [number,number,number] },
  { path: '/models/graduation%20cap%203d%20model.glb', scale: 1.05, position: [ 3.0, -1.4, -0.2] as [number,number,number], rotation: [-0.1, -0.3,  0.1] as [number,number,number] },
] as const;

const MODEL_SPIN = [
  { spinY:  0.25, spinX:  0.06 },
  { spinY: -0.20, spinX:  0.05 },
  { spinY:  0.18, spinX: -0.04 },
  { spinY: -0.22, spinX:  0.07 },
];

const FLOAT = {
  speed            : 1.8,
  rotationIntensity: 0.5,
  floatIntensity   : 1.1,
  floatingRange    : [-0.18, 0.18] as [number, number],
};

// Luces potentes para que los modelos sean bien visibles
const LIGHTS = {
  ambient: { intensity: 6.0 },
  key    : { intensity: 10.0, pos: [ 4.0,  5.0,  4.0] as [number,number,number], color: '#ffffff' },
  fill   : { intensity:  4.0, pos: [-3.0,  2.0, -2.0] as [number,number,number], color: '#d8d0ff' },
  rim    : { intensity:  3.0, pos: [ 0.0, -4.0, -3.0] as [number,number,number], color: '#a0a8ff' },
  front  : { intensity:  2.5, pos: [ 0.0,  0.0,  6.0] as [number,number,number], color: '#ffffff' },
};

// ── SpinningModel — con boost de emissive para que se vea en fondos oscuros ───
type SpinningModelProps = {
  path    : string;
  scale   : number;
  position: readonly [number, number, number];
  initRot : readonly [number, number, number];
  spinY   : number;
  spinX   : number;
};

function SpinningModel({ path, scale, position, initRot, spinY, spinX }: SpinningModelProps) {
  const { scene } = useGLTF(path);
  const cloned    = useMemo(() => {
    const c = scene.clone(true);
    // Boost emissive en todos los materiales para visibilidad en fondo oscuro
    c.traverse((obj: THREE.Object3D) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh   = obj as THREE.Mesh;
        const origArr = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mesh.material = origArr.map((orig) => {
          const mat = (orig as THREE.MeshStandardMaterial).clone() as THREE.MeshStandardMaterial;
          if ('emissive' in mat) {
            mat.emissive          = new THREE.Color(0.07, 0.05, 0.12);
            mat.emissiveIntensity = 1.0;
          }
          mat.roughness = Math.min((mat.roughness ?? 0.5), 0.55);
          mat.metalness = Math.max((mat.metalness ?? 0.0), 0.15);
          return mat;
        });
        if (!Array.isArray(origArr) && mesh.material instanceof Array) {
          mesh.material = mesh.material[0]; // un único material
        }
      }
    });
    return c;
  }, [scene]);

  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * spinY;
    groupRef.current.rotation.x += delta * spinX;
  });

  return (
    <group ref={groupRef} scale={scale} position={[...position] as [number,number,number]} rotation={[...initRot] as [number,number,number]}>
      <primitive object={cloned} />
    </group>
  );
}

// ── HeroScene3D ────────────────────────────────────────────────────────────────
function HeroScene3D({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (!groupRef.current) return;
    const p = scrollRef.current;
    groupRef.current.position.z =  p * 3.5;
    groupRef.current.position.y =  p * 1.8;
    groupRef.current.rotation.x =  p * 0.4;
  });

  return (
    <>
      <ambientLight intensity={LIGHTS.ambient.intensity} />
      <directionalLight intensity={LIGHTS.key.intensity}   position={LIGHTS.key.pos}   color={LIGHTS.key.color}   castShadow />
      <directionalLight intensity={LIGHTS.fill.intensity}  position={LIGHTS.fill.pos}  color={LIGHTS.fill.color}  />
      <directionalLight intensity={LIGHTS.rim.intensity}   position={LIGHTS.rim.pos}   color={LIGHTS.rim.color}   />
      <directionalLight intensity={LIGHTS.front.intensity} position={LIGHTS.front.pos} color={LIGHTS.front.color} />

      <group ref={groupRef}>
        {MODELS.map((cfg, i) => (
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
              position={cfg.position}
              initRot={cfg.rotation}
              spinY={MODEL_SPIN[i].spinY}
              spinX={MODEL_SPIN[i].spinX}
            />
          </Float>
        ))}
      </group>
    </>
  );
}

MODELS.forEach(({ path }) => useGLTF.preload(path));

// ── Props ─────────────────────────────────────────────────────────────────────
interface HeroPageProps {
  label?       : string;
  line1Normal? : string;
  line1Accent? : string;
  line2Normal? : string;
  line2Accent? : string;
  sub?         : string;
  stamp?       : string;
  /** Reemplaza los modelos 3D con la onda de sonido (para /podcasts) */
  soundWave?   : boolean;
}

const LIFT_RADIUS = 95;
const MAX_LIFT    = -7;

// ── HeroPage ──────────────────────────────────────────────────────────────────
export default function HeroPage({
  label       = '02 — Página',
  line1Normal = 'Título de ',
  line1Accent = 'la página',
  line2Normal = '',
  line2Accent = '',
  sub         = '',
  stamp       = 'José David — Educación & IA',
  soundWave   = false,
}: HeroPageProps) {
  const sectionRef  = useRef<HTMLElement>(null);
  const labelRef    = useRef<HTMLParagraphElement>(null);
  const line1Ref    = useRef<HTMLSpanElement>(null);
  const line2Ref    = useRef<HTMLSpanElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const innerRef    = useRef<HTMLDivElement>(null);
  const canvasWrap  = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef(0);
  const [showCanvas, setShowCanvas] = useState(true);

  useEffect(() => {
    const check = () => setShowCanvas(window.innerWidth >= 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const TOTAL    = line1Normal.length + line1Accent.length + line2Normal.length + line2Accent.length;
  const charRefs = useRef<(HTMLSpanElement | null)[]>(Array.from({ length: TOTAL }, () => null));

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;
    const sv = document.querySelector<HTMLElement>('.scroll-viewport');

    // Asegurar opacity inicial
    if (canvasWrap.current) gsap.set(canvasWrap.current, { opacity: 1 });

    const entranceCtx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from(labelRef.current,  { y: 20, opacity: 0, duration: 0.8, delay: 0.3 })
        .from([line1Ref.current, line2Ref.current].filter(Boolean),
          { y: '110%', duration: 1.0, stagger: 0.13 }, '-=0.45')
        .from(subRef.current, { y: 18, opacity: 0, duration: 0.9, ease: 'power2.out' }, '-=0.25');
    }, sectionRef);

    let scrollCtx: gsap.Context | null = null;
    if (sv && window.innerWidth >= 640) {
      const wraps   = innerRef.current ? Array.from(innerRef.current.querySelectorAll('.reveal-wrap')) : [];
      const textEls = [labelRef.current, subRef.current, ...wraps].filter(Boolean);

      scrollCtx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger      : sectionRef.current,
            scroller     : sv,
            start        : 'top top',
            end          : '+=70%',
            pin          : true,
            pinSpacing   : true,
            pinType      : 'transform',
            anticipatePin: 1,
            scrub        : 2.5,
            onUpdate     : (self) => { scrollRef.current = self.progress; },
          },
        });

        tl.to(textEls, {
          y: -8, opacity: 0, scale: 1.05,
          ease: 'power1.in',
          stagger: { each: 0.14, from: 'start' },
          transformOrigin: 'center center',
          duration: 0.8,
        });

        if (canvasWrap.current) {
          tl.to(canvasWrap.current,
            { opacity: 0, ease: 'power2.in', duration: 0.7 },
            0.3,
          );
        }
      }, sectionRef);
    }

    return () => {
      entranceCtx.revert();
      scrollCtx?.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  // ── Hover char-lift ──────────────────────────────────────────────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLHeadingElement>) => {
    charRefs.current.forEach((el) => {
      if (!el) return;
      const r    = el.getBoundingClientRect();
      const dist = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
      if (dist < LIFT_RADIUS) {
        gsap.to(el, { y: MAX_LIFT * Math.pow(1 - dist / LIFT_RADIUS, 2), duration: 0.18, ease: 'power2.out', overwrite: 'auto' });
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

  // ── Char builder ─────────────────────────────────────────────────────────────
  function chars(text: string, startIdx: number, isEm = false) {
    const result: React.ReactNode[] = [];
    let i = 0;
    while (i < text.length) {
      if (text[i] === ' ') {
        const idx = startIdx + i;
        result.push(
          <span key={idx} ref={(el) => { charRefs.current[idx] = el; }} className="hero-char">{' '}</span>
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
              style={isEm ? { fontStyle: 'italic' } : undefined}
            >{ch}</span>
          );
        });
        result.push(
          <span
            key={`w${wordStart}`}
            style={isEm
              ? { color: 'var(--accent)', display: 'inline-block', whiteSpace: 'nowrap' }
              : { display: 'inline-block', whiteSpace: 'nowrap' }}
          >{wordSpans}</span>
        );
      }
    }
    return result;
  }

  // ── JSX ───────────────────────────────────────────────────────────────────────
  return (
    <section className="hero" id="inicio" ref={sectionRef}>

      {/* Canvas 3D — modelos o onda de sonido según la página */}
      <div ref={canvasWrap} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {showCanvas && (soundWave ? (
          <SoundWaveHeroCanvas />
        ) : (
          <Canvas
            style={{ width: '100%', height: '100%' }}
            camera={{ position: [0, 0, 7], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
            frameloop="always"
            resize={{ scroll: false, debounce: { resize: 0, scroll: 0 } }}
          >
            <ModelErrorBoundary>
              <Suspense fallback={null}>
                <HeroScene3D scrollRef={scrollRef} />
              </Suspense>
            </ModelErrorBoundary>
          </Canvas>
        ))}
      </div>

      {/* Texto hero */}
      <div className="hero-inner" ref={innerRef}>
        <p className="hero-label" ref={labelRef}>{label}</p>

        <h1
          className="hero-headline font-display font-light"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <span className="reveal-wrap">
            <span className="reveal-inner" ref={line1Ref}>
              {chars(line1Normal, 0)}
              {chars(line1Accent, line1Normal.length, true)}
            </span>
          </span>
          {(line2Normal || line2Accent) && (
            <span className="reveal-wrap">
              <span className="reveal-inner" ref={line2Ref}>
                {chars(line2Normal, line1Normal.length + line1Accent.length)}
                {chars(line2Accent, line1Normal.length + line1Accent.length + line2Normal.length)}
              </span>
            </span>
          )}
        </h1>

        {sub && <p className="hero-sub" ref={subRef}>{sub}</p>}
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
