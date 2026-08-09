import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { SectionId } from '../../types/portfolio';

interface CinematicPlanetProps {
  activeSection: SectionId;
  scale?: number;
  wireframe?: boolean;
  isMobile?: boolean;
}

// Section-specific orbital waypoints for ideal framing alongside content
const SECTION_WAYPOINTS: Record<SectionId, { x: number; y: number; z: number; rotX: number; rotZ: number }> = {
  hero: { x: 5.2, y: -0.5, z: -7.0, rotX: 0.35, rotZ: -0.15 },
  about: { x: -5.6, y: 1.1, z: -8.0, rotX: 0.45, rotZ: 0.2 },
  skills: { x: 5.5, y: -1.8, z: -8.5, rotX: 0.25, rotZ: -0.3 },
  projects: { x: -5.2, y: -0.8, z: -7.8, rotX: 0.5, rotZ: 0.15 },
  achievements: { x: 4.8, y: 1.6, z: -8.2, rotX: 0.3, rotZ: -0.2 },
  contact: { x: 4.4, y: -1.2, z: -7.2, rotX: 0.4, rotZ: -0.1 },
};

export function CinematicPlanet({
  activeSection,
  scale = 2.6,
  wireframe = false,
  isMobile = false,
}: CinematicPlanetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const satelliteRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  const scrollProgressRef = useRef(0);

  // Track continuous scroll progress smoothly
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      scrollProgressRef.current = Math.min(1, Math.max(0, scrollY / maxScroll));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state, delta) => {
    // 1. Continuous smooth rotations (axial spin, clouds, rings, satellite)
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.12;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.18;
      cloudsRef.current.rotation.x += delta * 0.04;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.06;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.03;
    }
    if (satelliteRef.current) {
      satelliteRef.current.rotation.y += delta * 0.55;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.05;
    }

    if (!groupRef.current) return;

    // 2. Compute smooth target position combining section waypoints + continuous scroll progress
    const waypoint = SECTION_WAYPOINTS[activeSection] || SECTION_WAYPOINTS.hero;
    const progress = scrollProgressRef.current;

    // Fluid continuous orbital wave path
    const orbitWaveX = Math.sin(progress * Math.PI * 2) * (isMobile ? 0.6 : 1.2);
    const orbitWaveY = Math.cos(progress * Math.PI * 3) * (isMobile ? 0.4 : 0.8);
    const orbitWaveZ = Math.sin(progress * Math.PI * 4) * 0.5;

    const targetX = (isMobile ? (waypoint.x > 0 ? 1.4 : -1.4) : waypoint.x) + orbitWaveX * 0.4;
    const targetY = (isMobile ? waypoint.y * 0.7 - 1.2 : waypoint.y) + orbitWaveY * 0.3;
    const targetZ = waypoint.z + orbitWaveZ;

    // Mouse parallax reaction
    const mouseX = state.pointer.x * (isMobile ? 0.2 : 0.6);
    const mouseY = state.pointer.y * (isMobile ? 0.2 : 0.6);

    // Frame-rate independent exponential smoothing (ultra-fluid 60-120fps glide)
    const smoothFactor = 1 - Math.exp(-2.8 * delta);

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX + mouseX,
      smoothFactor
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY + mouseY,
      smoothFactor
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      smoothFactor
    );

    // Smooth continuous rotational orientation / tilt
    const targetRotX = waypoint.rotX + Math.sin(progress * Math.PI * 2) * 0.15;
    const targetRotZ = waypoint.rotZ + Math.cos(progress * Math.PI * 2) * 0.15;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      smoothFactor * 0.8
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotZ,
      smoothFactor * 0.8
    );
  });

  return (
    <group ref={groupRef} position={[5.2, -0.5, -7.0]} scale={scale}>
      {/* Atmosphere outer glow sphere */}
      <mesh ref={atmosphereRef} scale={1.22}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.16}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main Planet Core Sphere */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#0b1329"
          emissive="#0369a1"
          emissiveIntensity={0.4}
          roughness={0.55}
          metalness={0.45}
          wireframe={wireframe}
        />
      </mesh>

      {/* Cloud / Cyber Matrix Lattice Shell */}
      <mesh ref={cloudsRef} scale={1.035}>
        <sphereGeometry args={[1, 36, 36]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#9333ea"
          emissiveIntensity={0.35}
          transparent
          opacity={0.4}
          wireframe={true}
        />
      </mesh>

      {/* Primary Glowing Planetary Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.7, Math.PI / 5.5, 0]}>
        <ringGeometry args={[1.35, 2.35, 64]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.5}
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Secondary Outer Concentric Ring */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 2.7, Math.PI / 5.5, 0]}>
        <ringGeometry args={[2.55, 2.75, 64]} />
        <meshBasicMaterial
          color="#c084fc"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbiting Telemetry Satellite */}
      <group ref={satelliteRef}>
        <mesh position={[2.85, 0.35, 0]}>
          <boxGeometry args={[0.09, 0.09, 0.14]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#38bdf8"
            emissiveIntensity={1.5}
          />
        </mesh>
        {/* Satellite solar array */}
        <mesh position={[2.85, 0.35, 0]}>
          <boxGeometry args={[0.34, 0.015, 0.07]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.8} />
        </mesh>
      </group>

      {/* Dynamic Cosmic Lighting */}
      <pointLight color="#38bdf8" intensity={5} distance={10} position={[-2.5, 2.5, 3]} />
      <pointLight color="#c084fc" intensity={3.5} distance={8} position={[3.5, -2.5, -2]} />
    </group>
  );
}
