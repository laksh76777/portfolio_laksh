import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { StarField } from './StarField';
import { CinematicPlanet } from './CinematicPlanet';
import { FloatingParticles } from './FloatingParticles';
import type { SectionId } from '../../types/portfolio';

interface UniverseCanvasProps {
  activeSection: SectionId;
  warpSpeed: boolean;
  wireframeMode: boolean;
  cameraMode: 'cinematic' | 'orbit' | 'topdown';
}

export const UniverseCanvas: React.FC<UniverseCanvasProps> = ({
  activeSection,
  warpSpeed,
  wireframeMode,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const planetScale = isMobile ? 1.9 : 2.7;
  const starCount = isMobile ? 900 : 2600;

  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 bg-[#030712] overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: isMobile ? 65 : 50 }}
        dpr={isMobile ? [1, 1.2] : [1, 1.5]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[10, 10, 5]} intensity={1.3} color="#ffffff" />
          <pointLight position={[-10, -5, -5]} intensity={0.9} color="#38bdf8" />
          <pointLight position={[5, -10, 5]} intensity={0.7} color="#a855f7" />

          {/* Deep Space Starfield with Twinkling & Shooting Stars */}
          <StarField count={starCount} warpSpeed={warpSpeed} speed={0.04} />

          {/* Floating Quantum Particles */}
          <FloatingParticles count={isMobile ? 80 : 220} />

          {/* Majestic Cinematic 3D Planet with Silky Smooth Continuous Trajectory */}
          <CinematicPlanet
            activeSection={activeSection}
            scale={planetScale}
            wireframe={wireframeMode}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>

      {/* Subtle cinematic gradient vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030712]/30 to-[#030712]/80 pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />
    </div>
  );
};
