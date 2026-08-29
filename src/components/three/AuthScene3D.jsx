import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function HologramShieldCore() {
  const meshRef = useRef();
  const ringRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.25;
      meshRef.current.rotation.y = time * 0.35;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = -time * 0.3;
      ringRef.current.rotation.z = time * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = time * 0.5;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Outer Holographic Wireframe Icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshStandardMaterial
          wireframe
          color="#D64545"
          emissive="#D64545"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* 2. Gyro Orbit Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.0, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#F5F4F0"
          emissive="#F5F4F0"
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={1}
        />
      </mesh>

      {/* 3. Central Glowing Quantum Security Core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.75, 0]} />
        <meshPhysicalMaterial
          color="#121212"
          emissive="#D64545"
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.8}
          transmission={0.5}
          thickness={0.8}
        />
      </mesh>

      {/* 4. Nucleus Point Light */}
      <pointLight color="#D64545" intensity={3} distance={5} />

      {/* 5. Floating Sparkles / Data Particles */}
      <Sparkles count={35} scale={3.5} size={1.8} speed={0.4} color="#D64545" />
    </group>
  );
}

export function AuthScene3D({ className = 'h-40 w-full' }) {
  return (
    <div className={`relative overflow-hidden pointer-events-none ${className}`}>
      <Suspense fallback={<div className="w-full h-full flex items-center justify-center bg-black/40 text-xs text-muted font-mono">LOADING 3D CORE...</div>}>
        <Canvas
          camera={{ position: [0, 0, 4.8], fov: 45 }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full block"
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#FFFFFF" />
          <directionalLight position={[-5, -5, -5]} intensity={1.0} color="#D64545" />

          <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
            <HologramShieldCore />
          </Float>
        </Canvas>
      </Suspense>
    </div>
  );
}
