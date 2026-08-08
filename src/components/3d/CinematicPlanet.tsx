import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CinematicPlanetProps {
  position?: [number, number, number];
  scale?: number;
  wireframe?: boolean;
}

export function CinematicPlanet({ position = [6, -1, -8], scale = 2.8, wireframe = false }: CinematicPlanetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const satelliteRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.08;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.12;
      cloudsRef.current.rotation.x += delta * 0.02;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.04;
    }
    if (satelliteRef.current) {
      satelliteRef.current.rotation.y += delta * 0.5;
    }

    // Subtle floating mouse reaction
    if (groupRef.current) {
      const mouseX = state.pointer.x * 0.5;
      const mouseY = state.pointer.y * 0.5;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, position[0] + mouseX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, position[1] + mouseY, 0.05);
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Atmosphere outer glow sphere */}
      <mesh scale={1.18}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main Planet Surface */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#0284c7"
          emissiveIntensity={0.35}
          roughness={0.65}
          metalness={0.4}
          wireframe={wireframe}
        />
      </mesh>

      {/* Cloud / Energy Lattice Layer */}
      <mesh ref={cloudsRef} scale={1.03}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#c084fc"
          emissiveIntensity={0.25}
          transparent
          opacity={0.35}
          wireframe={true}
        />
      </mesh>

      {/* Glowing Orbital Ring System */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.8, Math.PI / 6, 0]}>
        <ringGeometry args={[1.4, 2.3, 64]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.4}
          transparent
          opacity={0.45}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer secondary thin ring */}
      <mesh rotation={[Math.PI / 2.8, Math.PI / 6, 0]}>
        <ringGeometry args={[2.5, 2.6, 64]} />
        <meshBasicMaterial
          color="#c084fc"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Orbiting Telemetry Satellite */}
      <group ref={satelliteRef}>
        <mesh position={[2.8, 0.4, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.12]} />
          <meshStandardMaterial color="#ffffff" emissive="#38bdf8" emissiveIntensity={1} />
        </mesh>
        {/* Satellite solar panels */}
        <mesh position={[2.8, 0.4, 0]}>
          <boxGeometry args={[0.3, 0.01, 0.06]} />
          <meshStandardMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* Local dynamic point light illuminating the planet */}
      <pointLight color="#38bdf8" intensity={4} distance={8} position={[-2, 2, 3]} />
      <pointLight color="#a855f7" intensity={2.5} distance={6} position={[3, -2, -2]} />
    </group>
  );
}
