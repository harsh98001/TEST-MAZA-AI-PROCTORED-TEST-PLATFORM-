import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ProctorGeometry } from './ProctorGeometry';

export function HeroScene({ className = '' }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (reducedMotion || webglError) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="w-64 h-64 rounded-full border border-app flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border border-[#D64545]/40 flex items-center justify-center animate-pulse">
            <div className="w-16 h-16 rounded-full bg-[#D64545]/20 border border-[#D64545]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-24 h-[1px] bg-[#D64545]/60 animate-pulse" />
          </div>
        }
      >
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 7.5], fov: 42 }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
          onError={() => setWebglError(true)}
          className="w-full h-full block"
          style={{ pointerEvents: 'none' }}
        >
          {/* Studio Lighting Setup */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={2.0} color="#F5F4F0" />
          <directionalLight position={[-10, -10, -5]} intensity={1.2} color="#D64545" />
          <pointLight position={[0, 0, 4]} intensity={0.8} color="#F5F4F0" />

          {/* Studio Environment Map */}
          <Environment preset="studio" />

          {/* Central 3D Geometry */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <ProctorGeometry />
          </Float>
        </Canvas>
      </Suspense>
    </div>
  );
}
