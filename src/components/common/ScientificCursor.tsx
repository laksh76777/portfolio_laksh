import React, { useEffect, useState, useRef } from 'react';

export const ScientificCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  const targetPos = useRef({ x: -100, y: -100 });
  const currentTrail = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      if (!hasMoved) setHasMoved(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.tagName === 'A' ||
          target.tagName === 'BUTTON')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Smooth physics loop for outer trailing HUD reticle
    let animId = 0;
    const loop = () => {
      const ease = 0.25;
      currentTrail.current.x += (targetPos.current.x - currentTrail.current.x) * ease;
      currentTrail.current.y += (targetPos.current.y - currentTrail.current.y) * ease;

      setTrailPos({
        x: Math.round(currentTrail.current.x * 10) / 10,
        y: Math.round(currentTrail.current.y * 10) / 10,
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animId);
    };
  }, [hasMoved]);

  if (!hasMoved) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden select-none">
      {/* 1. Outer Smooth Trailing Sci-Fi HUD Reticle */}
      <div
        className={`fixed top-0 left-0 flex items-center justify-center pointer-events-none transition-transform duration-75`}
        style={{
          transform: `translate3d(${trailPos.x}px, ${trailPos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        {/* Outer Rotating Segmented Hologram Ring */}
        <div
          className={`rounded-full border border-dashed transition-all duration-300 ${
            isHovered
              ? 'w-14 h-14 border-cyan-300 shadow-[0_0_25px_rgba(56,189,248,0.9)] animate-[spin_3s_linear_infinite]'
              : 'w-9 h-9 border-cyan-400/60 animate-[spin_8s_linear_infinite]'
          } ${isClicked ? 'scale-90 border-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.9)]' : ''}`}
        />

        {/* 4 Corner Targeting Crosshair Brackets */}
        <div
          className={`absolute transition-all duration-300 ${
            isHovered ? 'w-16 h-16' : 'w-11 h-11'
          }`}
        >
          {/* Top-Left */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400 shadow-[0_0_8px_#38bdf8]" />
          {/* Top-Right */}
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400 shadow-[0_0_8px_#38bdf8]" />
          {/* Bottom-Left */}
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400 shadow-[0_0_8px_#38bdf8]" />
          {/* Bottom-Right */}
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400 shadow-[0_0_8px_#38bdf8]" />
        </div>

        {/* Dynamic Orbiting Quantum Photon Satellite */}
        <div className="absolute inset-0 animate-[spin_2s_linear_infinite]">
          <div className="absolute top-0 left-1/2 -ml-1 -mt-1 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#38bdf8,0_0_24px_#06b6d4]" />
        </div>

        {/* Click Shockwave Expansion Wave */}
        {isClicked && (
          <div className="absolute w-12 h-12 rounded-full border-2 border-cyan-300 animate-ping opacity-90 pointer-events-none" />
        )}
      </div>

      {/* 2. Center Instant Precision Quantum Laser Dot (Zero-Latency) */}
      <div
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        {/* Glowing Center Laser Core */}
        <div
          className={`rounded-full bg-white transition-all duration-150 shadow-[0_0_10px_#38bdf8,0_0_20px_#06b6d4,0_0_30px_#38bdf8] ${
            isHovered ? 'w-3 h-3 bg-cyan-200 ring-2 ring-cyan-400' : 'w-2 h-2'
          }`}
        />

        {/* Precision Micro Crosshair Lines */}
        <div className="absolute -top-3 w-[1.5px] h-2 bg-cyan-400/90 shadow-[0_0_6px_#38bdf8]" />
        <div className="absolute -bottom-3 w-[1.5px] h-2 bg-cyan-400/90 shadow-[0_0_6px_#38bdf8]" />
        <div className="absolute -left-3 w-2 h-[1.5px] bg-cyan-400/90 shadow-[0_0_6px_#38bdf8]" />
        <div className="absolute -right-3 w-2 h-[1.5px] bg-cyan-400/90 shadow-[0_0_6px_#38bdf8]" />
      </div>
    </div>
  );
};
