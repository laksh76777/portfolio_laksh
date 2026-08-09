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

  // Triple Multi-Ring System Refs
  const innerRingRef = useRef<THREE.Mesh>(null);
  const midRingRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const crossRingRef = useRef<THREE.Mesh>(null);

  // Orbiting Spacecraft / Aircraft & Satellite Refs
  const aircraftGroupRef = useRef<THREE.Group>(null);
  const aircraftThruster1Ref = useRef<THREE.Mesh>(null);
  const aircraftThruster2Ref = useRef<THREE.Mesh>(null);
  const satelliteRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  const scrollProgressRef = useRef(0);
  const flightTimeRef = useRef(0);

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
    flightTimeRef.current += delta;
    const time = flightTimeRef.current;

    // 1. Continuous smooth rotations (Planet, Clouds, Atmosphere)
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.14;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.20;
      cloudsRef.current.rotation.x += delta * 0.05;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.06;
    }

    // 2. Multi-Ring Dynamic Gyroscopic Rotations
    if (innerRingRef.current) {
      // Fast counter-rotation on inner ring
      innerRingRef.current.rotation.z -= delta * 0.18;
      innerRingRef.current.rotation.x += delta * 0.04;
    }
    if (midRingRef.current) {
      // Primary mid planetary ring
      midRingRef.current.rotation.z += delta * 0.12;
      midRingRef.current.rotation.y += delta * 0.02;
    }
    if (outerRingRef.current) {
      // Majestic outer celestial ring
      outerRingRef.current.rotation.z -= delta * 0.07;
      outerRingRef.current.rotation.x -= delta * 0.03;
    }
    if (crossRingRef.current) {
      // Cross-inclined gyroscopic holographic ring
      crossRingRef.current.rotation.y += delta * 0.15;
      crossRingRef.current.rotation.z += delta * 0.08;
    }

    // 3. Orbiting Telemetry Satellite
    if (satelliteRef.current) {
      satelliteRef.current.rotation.y += delta * 0.45;
    }

    // 4. Futuristic Orbiting Aircraft Navigation & Banking Flight Physics
    if (aircraftGroupRef.current) {
      const flightSpeed = 0.75;
      const angle = time * flightSpeed;
      const orbitRadiusX = 3.3;
      const orbitRadiusY = 1.6;
      const orbitRadiusZ = 3.3;

      // Elliptical inclined orbit
      const shipX = Math.cos(angle) * orbitRadiusX;
      const shipY = Math.sin(angle * 2) * 0.4 + Math.sin(angle) * orbitRadiusY * 0.5;
      const shipZ = Math.sin(angle) * orbitRadiusZ;

      aircraftGroupRef.current.position.set(shipX, shipY, shipZ);

      // Tangent velocity vector to orient the nose forward in flight path
      const nextAngle = angle + 0.05;
      const nextX = Math.cos(nextAngle) * orbitRadiusX;
      const nextY = Math.sin(nextAngle * 2) * 0.4 + Math.sin(nextAngle) * orbitRadiusY * 0.5;
      const nextZ = Math.sin(nextAngle) * orbitRadiusZ;

      const tangent = new THREE.Vector3(nextX - shipX, nextY - shipY, nextZ - shipZ).normalize();
      
      // Look forward along trajectory
      const lookTarget = new THREE.Vector3(shipX, shipY, shipZ).add(tangent);
      aircraftGroupRef.current.lookAt(lookTarget);

      // Banking roll into curves
      const bankingAngle = Math.sin(angle) * 0.45;
      aircraftGroupRef.current.rotateZ(bankingAngle);

      // Pulse engine plasma glow
      if (aircraftThruster1Ref.current && aircraftThruster2Ref.current) {
        const pulse = 0.8 + Math.sin(time * 20) * 0.25;
        aircraftThruster1Ref.current.scale.set(1, 1, pulse);
        aircraftThruster2Ref.current.scale.set(1, 1, pulse);
      }
    }

    if (!groupRef.current) return;

    // 5. Compute smooth target position combining section waypoints + continuous scroll progress
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
          emissiveIntensity={0.42}
          roughness={0.52}
          metalness={0.48}
          wireframe={wireframe}
        />
      </mesh>

      {/* Cloud / Cyber Matrix Lattice Shell */}
      <mesh ref={cloudsRef} scale={1.038}>
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

      {/* ========================================================================= */}
      {/* MULTI-RING ROTATING PLANETARY SYSTEM (Inner, Mid, Outer, Cross-Inclined) */}
      {/* ========================================================================= */}

      {/* 1. INNER ROTATING NEON RING */}
      <mesh ref={innerRingRef} rotation={[Math.PI / 2.5, Math.PI / 4, 0]}>
        <ringGeometry args={[1.16, 1.34, 64]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={0.7}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 2. PRIMARY MID GLOWING PLANETARY RING */}
      <mesh ref={midRingRef} rotation={[Math.PI / 2.7, Math.PI / 5.5, 0]}>
        <ringGeometry args={[1.42, 2.38, 64]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.55}
          transparent
          opacity={0.58}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. SECONDARY OUTER CONCENTRIC RING */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 2.7, Math.PI / 5.5, 0]}>
        <ringGeometry args={[2.58, 2.82, 64]} />
        <meshBasicMaterial
          color="#c084fc"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 4. CROSS-INCLINED GYROSCOPIC POLAR RING */}
      <mesh ref={crossRingRef} rotation={[Math.PI / 6, Math.PI / 2.2, 0]}>
        <ringGeometry args={[1.8, 1.86, 64]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ========================================================================= */}
      {/* FUTURISTIC ORBITING AIRCRAFT / STARSHIP */}
      {/* ========================================================================= */}
      <group ref={aircraftGroupRef}>
        {/* Main Aerodynamic Hull */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.07, 0.32, 5]} />
          <meshStandardMaterial
            color="#0f172a"
            emissive="#0284c7"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Cockpit Glowing Canopy */}
        <mesh position={[0, 0.025, 0.05]}>
          <sphereGeometry args={[0.038, 12, 12]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        {/* Delta Swept Wings */}
        <mesh position={[0, -0.02, -0.05]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.36, 0.18]} />
          <meshStandardMaterial
            color="#1e293b"
            emissive="#38bdf8"
            emissiveIntensity={0.4}
            side={THREE.DoubleSide}
            metalness={0.8}
          />
        </mesh>

        {/* Dual Wingtip Laser/Beacon Lights (Port Red & Starboard Green/Cyan) */}
        <mesh position={[-0.18, -0.02, -0.08]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
        <mesh position={[0.18, -0.02, -0.08]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>

        {/* Twin Plasma Ion Engine Thrusters */}
        <mesh ref={aircraftThruster1Ref} position={[-0.04, -0.02, -0.18]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.03, 0.12, 8]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.9} />
        </mesh>
        <mesh ref={aircraftThruster2Ref} position={[0.04, -0.02, -0.18]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.03, 0.12, 8]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.9} />
        </mesh>

        {/* Local dynamic point light from the aircraft engine */}
        <pointLight color="#38bdf8" intensity={2} distance={2} position={[0, 0, -0.1]} />
      </group>

      {/* Orbiting Telemetry Satellite */}
      <group ref={satelliteRef}>
        <mesh position={[2.95, 0.35, 0]}>
          <boxGeometry args={[0.09, 0.09, 0.14]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#38bdf8"
            emissiveIntensity={1.5}
          />
        </mesh>
        {/* Satellite solar array */}
        <mesh position={[2.95, 0.35, 0]}>
          <boxGeometry args={[0.34, 0.015, 0.07]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.8} />
        </mesh>
      </group>

      {/* Dynamic Cosmic Lighting */}
      <pointLight color="#38bdf8" intensity={5.5} distance={10} position={[-2.5, 2.5, 3]} />
      <pointLight color="#c084fc" intensity={3.8} distance={8} position={[3.5, -2.5, -2]} />
    </group>
  );
}
