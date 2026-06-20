'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useRef, useMemo, MutableRefObject, Suspense } from 'react';
import * as THREE from 'three';

/* ── Orbit math ───────────────────────────────────────────── */

interface Orbit {
  ux: number; uy: number; uz: number;
  vx: number; vy: number; vz: number;
  radius: number;
  speed: number;
}

function buildOrbits(count: number, minR: number, maxR: number): { orbits: Orbit[]; phases: Float32Array } {
  const orbits: Orbit[] = [];
  const phases = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    let nx = Math.random() * 2 - 1;
    let ny = Math.random() * 2 - 1;
    let nz = Math.random() * 2 - 1;
    const nlen = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
    nx /= nlen; ny /= nlen; nz /= nlen;

    let upX = 0, upY = 1, upZ = 0;
    if (Math.abs(ny) > 0.9) { upX = 1; upY = 0; }

    let ux = ny * upZ - nz * upY;
    let uy = nz * upX - nx * upZ;
    let uz = nx * upY - ny * upX;
    const ulen = Math.sqrt(ux * ux + uy * uy + uz * uz) || 1;
    ux /= ulen; uy /= ulen; uz /= ulen;

    const vx = ny * uz - nz * uy;
    const vy = nz * ux - nx * uz;
    const vz = nx * uy - ny * ux;

    phases[i] = Math.random() * Math.PI * 2;
    orbits.push({
      ux, uy, uz, vx, vy, vz,
      radius: minR + Math.random() * (maxR - minR),
      speed: (0.06 + Math.random() * 0.22) * (Math.random() > 0.5 ? 1 : -1),
    });
  }
  return { orbits, phases };
}

/* ── Particle system ──────────────────────────────────────── */

function ParticleSystem({ count, minR, maxR, size, opacity }: {
  count: number; minR: number; maxR: number; size: number; opacity: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, orbits, phases } = useMemo(() => {
    const { orbits, phases } = buildOrbits(count, minR, maxR);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    return { geometry: geo, orbits, phases };
  }, [count, minR, maxR]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const pos = geometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      phases[i] += delta * orbits[i].speed;
      const ca = Math.cos(phases[i]);
      const sa = Math.sin(phases[i]);
      const o = orbits[i];
      pos.setXYZ(
        i,
        o.radius * (ca * o.ux + sa * o.vx),
        o.radius * (ca * o.uy + sa * o.vy),
        o.radius * (ca * o.uz + sa * o.vz),
      );
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#F59E0B"
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}

/* ── Glass sphere + wireframes ────────────────────────────── */

function GlassSphere({
  mouseRef,
  scrollRef,
}: {
  mouseRef: MutableRefObject<[number, number]>;
  scrollRef: MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const outerGroupRef = useRef<THREE.Group>(null);
  const innerOctaRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const [mx, my] = mouseRef.current;
    const scroll = scrollRef.current;
    const t = state.clock.elapsedTime;

    groupRef.current.rotation.x += (my * 0.55 - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.y += (mx * 0.55 - groupRef.current.rotation.y) * 0.04;

    const s = Math.max(0.4, 1 - scroll * 0.4);
    groupRef.current.scale.x += (s - groupRef.current.scale.x) * 0.06;
    groupRef.current.scale.y = groupRef.current.scale.x;
    groupRef.current.scale.z = groupRef.current.scale.x;

    if (outerGroupRef.current) {
      outerGroupRef.current.rotation.y += delta * 0.065;
      outerGroupRef.current.rotation.x += delta * 0.028;
    }

    if (innerOctaRef.current) {
      innerOctaRef.current.rotation.y -= delta * 0.15;
      innerOctaRef.current.rotation.z += delta * 0.07;
    }

    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.4 + 0.35 * Math.sin(t * 1.6);
    }
  });

  return (
    <group ref={groupRef}>

      {/* Glass fill */}
      <mesh>
        <icosahedronGeometry args={[1.62, 5]} />
        <meshPhysicalMaterial
          color="#6688aa"
          metalness={0.05}
          roughness={0.0}
          clearcoat={1.0}
          clearcoatRoughness={0.0}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer wireframe group */}
      <group ref={outerGroupRef}>
        <mesh>
          <icosahedronGeometry args={[1.66, 1]} />
          <meshBasicMaterial
            color="#F59E0B"
            wireframe
            transparent
            opacity={0.65}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.66, 1]} />
          <meshBasicMaterial
            color="#FCD34D"
            wireframe
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Inner octahedron */}
      <mesh ref={innerOctaRef}>
        <octahedronGeometry args={[0.92, 0]} />
        <meshBasicMaterial
          color="#FCD34D"
          wireframe
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Pulsing core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.38, 16, 16]} />
        <meshBasicMaterial
          color="#FFB300"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

    </group>
  );
}

/* ── Canvas — transparent, no post-processing ─────────────── */

export default function HeroScene({
  mouseRef,
  scrollRef,
}: {
  mouseRef: MutableRefObject<[number, number]>;
  scrollRef: MutableRefObject<number>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 8, 5]} intensity={0.7} color="#ffffff" />
      <pointLight position={[-3, 2, 4]} intensity={1.4} color="#F59E0B" />
      <pointLight position={[4, -3, -2]} intensity={0.9} color="#818cf8" />

      <GlassSphere mouseRef={mouseRef} scrollRef={scrollRef} />
      <ParticleSystem count={70} minR={1.85} maxR={2.7} size={0.055} opacity={1.0} />
      <ParticleSystem count={55} minR={3.0} maxR={4.2} size={0.03} opacity={0.55} />

      <Suspense fallback={null}>
        <Environment preset="city" background={false} />
      </Suspense>
    </Canvas>
  );
}
