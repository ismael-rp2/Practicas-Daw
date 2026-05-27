'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── Waveform shape function ───────────────────────────────────────────────────
// Combines multiple harmonics to produce a complex audio-waveform look
function wave(t: number): number {
  const env = Math.pow(Math.sin(t * Math.PI), 0.65); // envelope — tapers at edges
  return env * (
    Math.sin(t * Math.PI * 4.0  + 0.40) * 1.40 +
    Math.sin(t * Math.PI * 9.0  - 0.30) * 0.58 +
    Math.sin(t * Math.PI * 17.5 + 0.20) * 0.22 +
    Math.sin(t * Math.PI * 32.0        ) * 0.09
  );
}

// ── Point cloud ───────────────────────────────────────────────────────────────
const SEG   = 300;   // horizontal resolution per layer
const LAYER = 35;    // depth layers
const TOTAL = SEG * LAYER;

function WaveformPoints({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Points>(null);

  const { geo, orig, scatter } = useMemo(() => {
    const pos     = new Float32Array(TOTAL * 3);
    const orig    = new Float32Array(TOTAL * 3);
    const scatter = new Float32Array(TOTAL * 3);

    let i = 0;
    for (let l = 0; l < LAYER; l++) {
      const z   = -l * 0.10;
      const amp = 1 - (l / LAYER) * 0.38;
      for (let s = 0; s < SEG; s++) {
        const t  = s / (SEG - 1);
        const x  = (t - 0.5) * 14;
        const y  = wave(t) * amp;

        pos[i*3]   = x;  pos[i*3+1] = y;  pos[i*3+2] = z;
        orig[i*3]  = x;  orig[i*3+1] = y; orig[i*3+2] = z;

        // Random scatter destination — particles fly outward
        const angle = Math.random() * Math.PI * 2;
        const r     = 4 + Math.random() * 12;
        scatter[i*3]   = x + Math.cos(angle) * r;
        scatter[i*3+1] = y + Math.sin(angle) * r * 0.6;
        scatter[i*3+2] = z + (Math.random() - 0.5) * 8;
        i++;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return { geo, orig, scatter };
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const p   = Math.min(Math.max(progressRef.current, 0) * 1.5, 1);
    const pos = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < TOTAL; i++) {
      pos[i*3]   = orig[i*3]   + (scatter[i*3]   - orig[i*3])   * p;
      pos[i*3+1] = orig[i*3+1] + (scatter[i*3+1] - orig[i*3+1]) * p;
      pos[i*3+2] = orig[i*3+2] + (scatter[i*3+2] - orig[i*3+2]) * p;
    }
    geo.attributes.position.needsUpdate = true;

    const mat = meshRef.current.material as THREE.PointsMaterial;
    mat.opacity = Math.max(0, 1 - p * 1.3);
  });

  return (
    <points ref={meshRef} geometry={geo}>
      <pointsMaterial
        size={0.018}
        color="#a8b4ff"
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ── Exported canvas wrapper ───────────────────────────────────────────────────
export default function WaveformScene({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 52 }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
      frameloop="always"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <WaveformPoints progressRef={progressRef} />
    </Canvas>
  );
}
