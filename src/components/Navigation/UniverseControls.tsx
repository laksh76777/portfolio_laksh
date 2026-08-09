import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Eye, Radio, Sparkles, GripHorizontal, Move } from 'lucide-react';
import { universeAudio } from '../../services/audio';

interface UniverseControlsProps {
  warpSpeed: boolean;
  onToggleWarp: () => void;
  wireframeMode: boolean;
  onToggleWireframe: () => void;
  cameraMode: 'cinematic' | 'orbit' | 'topdown';
  onChangeCameraMode: (mode: 'cinematic' | 'orbit' | 'topdown') => void;
}

export const UniverseControls: React.FC<UniverseControlsProps> = ({
  warpSpeed,
  onToggleWarp,
  wireframeMode,
  onToggleWireframe,
}) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
      className="fixed bottom-6 right-6 z-40 flex flex-col gap-2 cursor-grab select-none touch-none"
    >
      <div className="p-2.5 rounded-2xl bg-slate-950/85 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.85)] flex flex-col gap-2 min-w-[210px] group transition-all duration-300 hover:border-cyan-400/60">
        
        {/* Draggable Grip Header */}
        <div className="px-2 py-1 text-[9px] font-mono text-cyan-400/90 uppercase tracking-wider flex items-center justify-between border-b border-slate-800 pb-1.5 cursor-grab">
          <span className="flex items-center gap-1.5">
            <Radio className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
            <span>UNIVERSE HUD</span>
          </span>
          <span className="flex items-center gap-1 text-[8px] text-slate-400 font-sans">
            <GripHorizontal className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            <span>DRAG ME</span>
          </span>
        </div>

        {/* Warp Drive Toggle */}
        <button
          onClick={() => {
            universeAudio.playClickBeep();
            onToggleWarp();
          }}
          className={`px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between gap-3 transition-all cursor-pointer ${
            warpSpeed
              ? 'bg-gradient-to-r from-purple-900/90 to-cyan-900/90 text-cyan-200 border border-cyan-400/60 shadow-[0_0_18px_rgba(56,189,248,0.5)] animate-pulse'
              : 'bg-slate-900/70 hover:bg-slate-800/90 text-slate-300 border border-slate-800/80 hover:border-cyan-500/30'
          }`}
          title="Accelerate 3D Starfield & Space Velocity"
        >
          <span className="flex items-center gap-2">
            <Rocket className={`w-3.5 h-3.5 ${warpSpeed ? 'text-cyan-300 rotate-45' : 'text-slate-400'}`} />
            <span className="font-semibold">WARP SPEED</span>
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-950/90 border border-cyan-500/30 text-cyan-300">
            {warpSpeed ? '2.5X' : '1.0X'}
          </span>
        </button>

        {/* Wireframe Matrix Scanner Toggle */}
        <button
          onClick={() => {
            universeAudio.playHoverChirp();
            onToggleWireframe();
          }}
          className={`px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between gap-3 transition-all cursor-pointer ${
            wireframeMode
              ? 'bg-cyan-950/90 text-cyan-200 border border-cyan-400/60 shadow-[0_0_18px_rgba(56,189,248,0.4)]'
              : 'bg-slate-900/70 hover:bg-slate-800/90 text-slate-300 border border-slate-800/80 hover:border-cyan-500/30'
          }`}
          title="Toggle Holographic Wireframe Matrix View"
        >
          <span className="flex items-center gap-2">
            <Eye className={`w-3.5 h-3.5 ${wireframeMode ? 'text-cyan-400' : 'text-slate-400'}`} />
            <span className="font-semibold">WIREFRAME</span>
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
            {wireframeMode ? 'ON' : 'OFF'}
          </span>
        </button>
      </div>

      {/* Floating Bottom pill with move instruction */}
      <div className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/20 text-[9px] font-mono text-cyan-400/90 flex items-center justify-between shadow-lg">
        <span className="flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
          <span>DRAGGABLE ANYWHERE</span>
        </span>
        <Move className="w-2.5 h-2.5 text-slate-500" />
      </div>
    </motion.div>
  );
};
