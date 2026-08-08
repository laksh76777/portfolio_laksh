import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, ShieldAlert, Cpu } from 'lucide-react';
import { universeAudio } from '../../services/audio';

interface LoadingScreenProps {
  onComplete: () => void;
}

const TELEMETRY_LOGS = [
  'INITIALIZING QUANTUM TELEMETRY...',
  'CALIBRATING 3D STELLAR FIELD & PLANETARY ORBITS...',
  'LOADING NEURAL VERACITY ENGINE...',
  'CONNECTING FIREBASE REAL-TIME CLOUD LISTENERS...',
  'SYNCHRONIZING ORBITAL TRAJECTORY...',
  'DIGITAL UNIVERSE ONLINE'
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [stage, setStage] = useState<'progress' | 'reveal' | 'finished'>('progress');

  useEffect(() => {
    // Smooth progress counter 0 -> 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStage('reveal');
          return 100;
        }
        const jump = Math.floor(Math.random() * 8) + 4;
        const next = Math.min(100, prev + jump);
        setLogIndex(Math.min(TELEMETRY_LOGS.length - 1, Math.floor((next / 100) * TELEMETRY_LOGS.length)));
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (stage === 'reveal') {
      universeAudio.playHolographicChime();
      const timer = setTimeout(() => {
        setStage('finished');
        setTimeout(onComplete, 600);
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [stage, onComplete]);

  const handleSkip = () => {
    setProgress(100);
    setStage('finished');
    universeAudio.playHolographicChime();
    setTimeout(onComplete, 200);
  };

  return (
    <AnimatePresence>
      {stage !== 'finished' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#02040a] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
        >
          {/* Cyber scanline background grid */}
          <div className="absolute inset-0 cyber-grid-dense opacity-20 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-gradient from-cyan-900/10 via-transparent to-[#02040a]" />

          {/* Central Holographic Container */}
          <div className="relative z-10 w-full max-w-xl flex flex-col items-center text-center">
            
            {/* Spinning holographic HUD rings */}
            <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-dashed border-cyan-500/40 rounded-full animate-orbit-spin" />
              <div className="absolute inset-2 border border-purple-500/40 rounded-full animate-radar-sweep" />
              <div className="absolute inset-4 border border-cyan-400/20 rounded-full" />
              <div className="w-12 h-12 rounded-full bg-cyan-950/80 border border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.5)]">
                <Cpu className="w-6 h-6 text-cyan-300 animate-pulse" />
              </div>
            </div>

            {stage === 'progress' ? (
              <motion.div
                key="progress-mode"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full flex flex-col items-center"
              >
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  INITIALIZING DIGITAL UNIVERSE
                </div>

                <div className="text-4xl sm:text-5xl font-orbitron font-extrabold text-white tracking-widest mb-4 hologram-glow">
                  {progress}%
                </div>

                {/* Progress bar container */}
                <div className="w-full h-2 bg-slate-900/80 rounded-full border border-cyan-500/20 p-0.5 overflow-hidden mb-5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.8)]"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>

                {/* Telemetry live status log */}
                <div className="h-6 flex items-center gap-2 text-xs font-mono text-cyan-300/80">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>{TELEMETRY_LOGS[logIndex]}</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="reveal-mode"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col items-center"
              >
                <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase mb-2 px-3 py-1 rounded border border-cyan-500/30 bg-cyan-950/40">
                  ✦ WARP PROTOCOL ENGAGED ✦
                </div>
                <h1 className="text-4xl sm:text-6xl font-orbitron font-black text-white tracking-wider uppercase mb-2 hologram-glow">
                  LAKSH SUTHAR
                </h1>
                <p className="text-lg sm:text-xl font-space font-semibold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 uppercase">
                  SOFTWARE DEVELOPER
                </p>
                <p className="text-xs font-mono text-slate-400 mt-2">
                  COMPUTER SCIENCE ENGINEER // ENTERING 3D UNIVERSE...
                </p>
              </motion.div>
            )}

            {/* Quick Skip button */}
            <button
              onClick={handleSkip}
              className="mt-8 px-4 py-1.5 rounded-full border border-slate-700 hover:border-cyan-400/50 bg-slate-900/60 text-slate-400 hover:text-cyan-300 text-xs font-mono transition-all duration-200 cursor-pointer flex items-center gap-1.5"
            >
              <ShieldAlert className="w-3 h-3 text-cyan-400" />
              SKIP WARP [ENTER DIRECTLY]
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
