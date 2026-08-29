import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ProctorGeometry({ scrollProgressRef }) {
  const groupRef = useRef();
  const innerRef = useRef();
  const cageRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const coreRef = useRef();

  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Track cursor position for subtle 2-4px lerped parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Frame Loop
  useFrame((state, delta) => {
    // 1. Lerp mouse parallax
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, mouse.current.targetX, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, mouse.current.targetY, 0.05);

    if (groupRef.current) {
      // Base continuous ambient rotation
      const time = state.clock.getElapsedTime();

      // Parallax tilt
      groupRef.current.rotation.y = time * 0.15 + mouse.current.x * 0.35;
      groupRef.current.rotation.x = mouse.current.y * 0.25;

      // Scroll-linked transformation
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scrollProgress = Math.min(1, Math.max(0, scrollY / 800));

      // As user scrolls, the hero object disassembles and expands
      if (cageRef.current) {
        cageRef.current.rotation.x = time * 0.2 + scrollProgress * 2;
        cageRef.current.rotation.z = time * 0.15 + scrollProgress * 1.5;
        const cageScale = 1 + scrollProgress * 0.45;
        cageRef.current.scale.set(cageScale, cageScale, cageScale);
      }

      if (ring1Ref.current) {
        ring1Ref.current.rotation.x = time * 0.4 + scrollProgress * 3;
        ring1Ref.current.rotation.y = time * 0.3;
      }

      if (ring2Ref.current) {
        ring2Ref.current.rotation.y = -time * 0.35 - scrollProgress * 2.5;
        ring2Ref.current.rotation.z = time * 0.2;
      }

      if (innerRef.current) {
        innerRef.current.rotation.y = -time * 0.25;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Outer Faceted Wireframe Cage */}
      <mesh ref={cageRef}>
        <icosahedronGeometry args={[2.2, 0]} />
        <meshStandardMaterial
          wireframe
          color="#D64545"
          emissive="#D64545"
          emissiveIntensity={0.25}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* 2. Precision Gyro Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.6, 0.025, 16, 64]} />
        <meshStandardMaterial
          color="#F5F4F0"
          roughness={0.15}
          metalness={0.95}
        />
      </mesh>

      {/* 3. Precision Gyro Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.85, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#8E8E8C"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* 4. Central Refractive Monolith Core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[1.3, 0]} />
        <meshPhysicalMaterial
          color="#121212"
          roughness={0.08}
          metalness={0.15}
          transmission={0.65}
          thickness={1.2}
          ior={1.6}
          reflectivity={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* 5. Internal Quantum Nucleus */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color="#D64545"
          emissive="#D64545"
          emissiveIntensity={2.5}
        />
        <pointLight color="#D64545" intensity={4} distance={6} />
      </mesh>
    </group>
  );
}
