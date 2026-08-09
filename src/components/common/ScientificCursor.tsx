import React, { useEffect, useRef, useState } from 'react';

export const ScientificCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Position interpolation state
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const requestRef = useRef<number>(0);

  useEffect(() => {
    // Check if fine pointer is available (desktop / mouse)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    setIsTouchDevice(!hasFinePointer);
    if (!hasFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.closest('.interactive-target'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth physics loop for outer scientific HUD ring
    const updateRing = () => {
      // Lerp ring toward mouse
      const ease = 0.22;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(updateRing);
    };

    requestRef.current = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* 1. Center Precision Quantum Laser Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-[4px] -mt-[4px] w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8,0_0_20px_#06b6d4] transition-opacity duration-150"
      />

      {/* 2. Scientific Gyroscopic HUD Reticle & Crosshairs */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center transition-all duration-300 ${
          isHovered
            ? '-ml-[28px] -mt-[28px] w-14 h-14'
            : '-ml-[18px] -mt-[18px] w-9 h-9'
        }`}
      >
        {/* Rotating Outer Dashed Telemetry Ring */}
        <div
          className={`absolute inset-0 rounded-full border border-dashed transition-all duration-300 ${
            isHovered
              ? 'border-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.6)] animate-[spin_4s_linear_infinite]'
              : 'border-cyan-500/40 animate-[spin_10s_linear_infinite]'
          } ${isClicked ? 'scale-90 border-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.8)]' : ''}`}
        />

        {/* Inner Precision Target Ring */}
        <div
          className={`absolute inset-1 rounded-full border transition-all duration-300 ${
            isHovered
              ? 'border-purple-400/60 scale-105'
              : 'border-cyan-400/20'
          }`}
        />

        {/* 4 Corner Crosshairs */}
        <div className="absolute -top-1 w-1.5 h-0.5 bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
        <div className="absolute -bottom-1 w-1.5 h-0.5 bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
        <div className="absolute -left-1 w-0.5 h-1.5 bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
        <div className="absolute -right-1 w-0.5 h-1.5 bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />

        {/* Click Shockwave Ring */}
        {isClicked && (
          <div className="absolute inset-0 rounded-full border-2 border-cyan-300 animate-ping opacity-75 pointer-events-none" />
        )}

        {/* Scientific HUD Coordinates & Status Tag on Hover */}
        {isHovered && (
          <div className="absolute left-16 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-slate-950/90 border border-cyan-500/50 text-[8px] font-mono text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.3)] whitespace-nowrap flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-white font-bold">LOCK</span>
            <span className="text-slate-500">|</span>
            <span className="text-cyan-400">{coords.x}:{coords.y}</span>
          </div>
        )}
      </div>
    </div>
  );
};
