'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

// ── Configuración ─────────────────────────────────────────────────────────────
const N   = 160;      // puntos por línea — más puntos = curvas más suaves
const W   = 16;       // ancho en unidades 3D (sobrepasa el viewport para llenarlo)

// Bandas simétricas (top + mirror abajo). Centro = más amplitud y brillo.
// Inspirado en un espectro de audio real: frecuencias bajas en el centro,
// agudos en los extremos del eje Y.
const BANDS = [
  // yAbs  freq   amp   speed  color      opacity  lw
  [  0.22,  3.2,  0.24,  1.6, '#dbeafe',   0.95,  1.8 ],
  [  0.55,  2.5,  0.19,  1.2, '#bfdbfe',   0.80,  1.5 ],
  [  0.90,  4.1,  0.14,  1.0, '#93c5fd',   0.65,  1.2 ],
  [  1.28,  2.9,  0.09,  1.5, '#60a5fa',   0.50,  1.0 ],
  [  1.68,  3.7,  0.06,  0.8, '#3b82f6',   0.35,  0.8 ],
  [  2.12,  2.1,  0.03,  1.8, '#1d4ed8',   0.22,  0.6 ],
] as const;

// ── Helpers ───────────────────────────────────────────────────────────────────
/** Crea los puntos iniciales de una línea horizontal */
function initPoints(yBase: number): THREE.Vector3[] {
  return Array.from({ length: N }, (_, i) => {
    const x = -W / 2 + (i / (N - 1)) * W;
    return new THREE.Vector3(x, yBase, 0);
  });
}

/** Buffer plano reutilizable para setPositions() de LineGeometry */
function calcPositions(
  out: number[],
  yBase: number,
  freq: number,
  amp: number,
  t: number,
  beat: number,
): void {
  out.length = 0;
  for (let i = 0; i < N; i++) {
    const x   = -W / 2 + (i / (N - 1)) * W;
    // Envolvente suave en los bordes (0.4 → 1.0 → 0.4)
    const env = 0.4 + 0.6 * Math.sin((i / (N - 1)) * Math.PI);
    // Onda principal + armónico
    const y   = yBase
      + Math.sin(x * freq + t)           * amp * beat * env
      + Math.sin(x * freq * 1.9 - t * 0.55) * amp * 0.28 * env;
    out.push(x, y, 0);
  }
}

// ── Componente de línea individual ────────────────────────────────────────────
interface WaveLineProps {
  yBase   : number;
  freq    : number;
  amp     : number;
  speed   : number;
  color   : string;
  opacity : number;
  lw      : number;
  phase   : number;
}

function WaveLine({ yBase, freq, amp, speed, color, opacity, lw, phase }: WaveLineProps) {
  const lineRef   = useRef<any>(null);
  const posBuffer = useRef<number[]>([]);
  const points    = useMemo(() => initPoints(yBase), [yBase]);

  useFrame(({ clock }) => {
    const line = lineRef.current;
    if (!line?.geometry?.setPositions) return;

    const t    = clock.elapsedTime * speed + phase;
    // Pulsación tipo "beat" cada ~0.67 s — simula ritmo musical
    const beat = 0.68 + 0.32 * Math.abs(Math.sin(clock.elapsedTime * 1.5));

    calcPositions(posBuffer.current, yBase, freq, amp, t, beat);
    line.geometry.setPositions(posBuffer.current);
  });

  return (
    <Line
      ref={lineRef}
      points={points}
      color={color}
      lineWidth={lw}
      transparent
      opacity={opacity}
      depthWrite={false}
    />
  );
}

// ── Canvas exportado ──────────────────────────────────────────────────────────
export default function SoundWaveHero() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      frameloop="always"
      style={{
        position    : 'absolute',
        inset       : 0,
        width       : '100%',
        height      : '100%',
        pointerEvents: 'none',
        zIndex      : 0,
      }}
    >
      {BANDS.flatMap(([yAbs, freq, amp, speed, color, opacity, lw], i) => [
        // Línea superior
        <WaveLine
          key={`t${i}`}
          yBase={  yAbs as number}
          freq={   freq   as number}
          amp={    amp    as number}
          speed={  speed  as number}
          color={  color  as string}
          opacity={opacity as number}
          lw={     lw      as number}
          phase={i * 0.55}
        />,
        // Línea inferior (espejo)
        <WaveLine
          key={`b${i}`}
          yBase={-(yAbs as number)}
          freq={   freq   as number}
          amp={    amp    as number}
          speed={  speed  as number}
          color={  color  as string}
          opacity={opacity as number}
          lw={     lw      as number}
          phase={i * 0.55 + Math.PI}
        />,
      ])}
    </Canvas>
  );
}
