import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarFieldProps {
  count?: number;
  speed?: number;
  warpSpeed?: boolean;
}

export function StarField({ count = 2500, speed = 0.05, warpSpeed = false }: StarFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate star positions, sizes, and colors
  const [positions, colors, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sca = new Float32Array(count);

    const colorPalette = [
      new THREE.Color('#38bdf8'), // Cyan
      new THREE.Color('#818cf8'), // Indigo
      new THREE.Color('#c084fc'), // Purple
      new THREE.Color('#ffffff'), // White
      new THREE.Color('#93c5fd'), // Soft Blue
    ];

    for (let i = 0; i < count; i++) {
      // Distribute in a spherical galaxy shell
      const radius = 25 + Math.random() * 120;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      sca[i] = Math.random() * 1.8 + 0.6;
    }

    return [pos, col, sca];
  }, [count]);

  // Shooting star effect
  const shootingStarRef = useRef<THREE.Mesh>(null);
  const shootingStarState = useRef({
    active: false,
    pos: new THREE.Vector3(),
    dir: new THREE.Vector3(),
    speed: 1.8,
    timer: 0
  });

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const rotSpeed = warpSpeed ? speed * 8 : speed;
    pointsRef.current.rotation.y += delta * rotSpeed * 0.2;
    pointsRef.current.rotation.x += delta * rotSpeed * 0.05;

    // Shooting star logic
    const ss = shootingStarState.current;
    ss.timer += delta;
    if (!ss.active && ss.timer > (warpSpeed ? 2 : 5 + Math.random() * 6)) {
      ss.active = true;
      ss.timer = 0;
      ss.pos.set(
        (Math.random() - 0.5) * 60,
        20 + Math.random() * 20,
        -20 - Math.random() * 30
      );
      ss.dir.set(
        -1 - Math.random() * 0.5,
        -0.8 - Math.random() * 0.4,
        0.5
      ).normalize();
    }

    if (ss.active && shootingStarRef.current) {
      ss.pos.addScaledVector(ss.dir, ss.speed);
      shootingStarRef.current.position.copy(ss.pos);
      if (ss.pos.y < -30) {
        ss.active = false;
        shootingStarRef.current.position.set(0, -999, 0);
      }
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[scales, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.65}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Shooting star streak */}
      <mesh ref={shootingStarRef} position={[0, -999, 0]}>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
    </group>
  );
}
