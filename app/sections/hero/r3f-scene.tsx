"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMemo, useRef, useEffect, type RefObject } from "react";
import * as THREE from "three";

const DEEP_PURPLE = new THREE.Color("#2e1065"); // violet-950
const VIBRANT_VIOLET = new THREE.Color("#8b5cf6"); // violet-500
const HIGHLIGHT = new THREE.Color("#fcd34d"); // amber-300
const DARK_BG = new THREE.Color("#0a0514"); // Very dark purple background

interface R3FSceneProps {
  scrollRef: RefObject<number>;
  mobilePerformanceMode?: boolean;
  active?: boolean;
}

// 1. The Ocean of Data (Massive flowing particle topography)
function DataOcean({ mobilePerformanceMode = false }: { mobilePerformanceMode?: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  // Mobile: 40×40 = 1600 instances (vs 60×60 = 3600 on desktop). Density and
  // spacing stay identical to desktop so the wave reads as the same shape,
  // just covering a smaller area — "a mesma coisa só menor". No frame skip,
  // no spacing tricks — those changed the look, not just the cost.
  const count = mobilePerformanceMode ? 40 : 60;
  const spacing = 1.8;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Set colors ONCE to prevent severe WebGL performance drops during scroll
  useEffect(() => {
    if (!meshRef.current) return;
    const tempColor = new THREE.Color();
    let i = 0;
    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        const pX = (x - count / 2) * spacing;
        const pZ = (z - count / 2) * spacing;

        // Static elegant gradient from center outwards
        const dist = Math.sqrt(pX * pX + pZ * pZ);
        const mixRatio = Math.max(0, Math.min(1, dist / 30));

        tempColor.lerpColors(VIBRANT_VIOLET, DEEP_PURPLE, mixRatio);
        meshRef.current.setColorAt(i, tempColor);
        i++;
      }
    }
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [count, spacing]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime * 0.8;
    let i = 0;

    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        const pX = (x - count / 2) * spacing;
        const pZ = (z - count / 2) * spacing;

        const y =
          Math.sin(pX * 0.08 + time) * 2.5 +
          Math.cos(pZ * 0.12 + time * 0.8) * 2.5 +
          Math.sin((pX + pZ) * 0.04 - time) * 1.5;

        dummy.position.set(pX, y - 4, pZ);

        const scale = Math.max(0.1, (y + 5) * 0.18);
        dummy.scale.set(scale, scale, scale);

        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);

        i++;
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count * count]}>
      <boxGeometry args={[0.9, 1.2, 0.9]} />
      <meshStandardMaterial emissiveIntensity={1.5} roughness={0.2} metalness={0.8} />
    </instancedMesh>
  );
}

// Dynamic Cinematic Camera
function CameraRig({ scrollRef }: { scrollRef: RefObject<number> }) {
  const { camera } = useThree();
  const targetPos = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const t = THREE.MathUtils.clamp(scrollRef.current ?? 0, 0, 1);
    const easeT = THREE.MathUtils.smoothstep(t, 0, 1);

    // Idle camera sway — identical on mobile and desktop.
    const idleX = Math.sin(state.clock.elapsedTime * 0.1) * 2;
    const idleY = Math.cos(state.clock.elapsedTime * 0.08) * 1;

    // Start: Look at full wide scene
    const startX = idleX;
    const startY = 4 + idleY;
    const startZ = 28;

    // End: Slightly pushed in to emphasize data ocean without losing graphs
    const endX = idleX * 0.5;
    const endY = 2 + idleY * 0.5;
    const endZ = 18;
    
    targetPos.set(
      THREE.MathUtils.lerp(startX, endX, easeT),
      THREE.MathUtils.lerp(startY, endY, easeT),
      THREE.MathUtils.lerp(startZ, endZ, easeT)
    );
    
    camera.position.lerp(targetPos, 0.05);
    camera.lookAt(0, 2, 0); 
  });

  return null;
}

export default function R3FScene({ scrollRef, mobilePerformanceMode = false, active = true }: R3FSceneProps) {
  return (
    <Canvas
      // frameloop="never" fully halts the WebGL render + useFrame ticks once
      // the hero is off-screen. Resumes automatically when it scrolls back.
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 4, 28], fov: 45 }}
      style={{ pointerEvents: "none" }}
    >
      <color attach="background" args={[DARK_BG]} />
      <fog attach="fog" args={[DARK_BG, 10, 60]} />
      
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} color={HIGHLIGHT} />
      <pointLight position={[-10, 10, -10]} intensity={3} color={DEEP_PURPLE} />
      
      <DataOcean mobilePerformanceMode={mobilePerformanceMode} />

      <CameraRig scrollRef={scrollRef} />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          mipmapBlur
          intensity={1.5}
        />
      </EffectComposer>
    </Canvas>
  );
}
