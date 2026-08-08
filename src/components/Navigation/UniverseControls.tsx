import React from 'react';
import { Rocket, Eye, Radio, Sparkles } from 'lucide-react';
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
    <div className="fixed bottom-6 right-6 z-30 hidden lg:flex flex-col gap-2">
      <div className="p-2 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-cyan-500/20 shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex flex-col gap-1.5">
        <div className="px-2 py-1 text-[9px] font-mono text-cyan-400/70 uppercase tracking-wider flex items-center justify-between border-b border-slate-800">
          <span className="flex items-center gap-1">
            <Radio className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
            UNIVERSE HUD
          </span>
          <span className="text-[8px] text-slate-500">60 FPS</span>
        </div>

        {/* Warp Drive Toggle */}
        <button
          onClick={() => {
            universeAudio.playWarpSpeed();
            onToggleWarp();
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center justify-between gap-3 transition-all cursor-pointer ${
            warpSpeed
              ? 'bg-gradient-to-r from-purple-900/80 to-cyan-900/80 text-cyan-200 border border-cyan-400/50 shadow-[0_0_15px_rgba(56,189,248,0.4)] animate-pulse'
              : 'bg-slate-900/50 hover:bg-slate-800/80 text-slate-300 border border-transparent'
          }`}
          title="Accelerate 3D Starfield & Space Velocity"
        >
          <span className="flex items-center gap-2">
            <Rocket className={`w-3.5 h-3.5 ${warpSpeed ? 'text-cyan-300 rotate-45' : 'text-slate-400'}`} />
            <span>WARP SPEED</span>
          </span>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300">
            {warpSpeed ? '2.5X' : '1.0X'}
          </span>
        </button>

        {/* Wireframe Matrix Scanner Toggle */}
        <button
          onClick={() => {
            universeAudio.playHoverChirp();
            onToggleWireframe();
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center justify-between gap-3 transition-all cursor-pointer ${
            wireframeMode
              ? 'bg-cyan-950/80 text-cyan-200 border border-cyan-400/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
              : 'bg-slate-900/50 hover:bg-slate-800/80 text-slate-300 border border-transparent'
          }`}
          title="Toggle Holographic Wireframe Matrix View"
        >
          <span className="flex items-center gap-2">
            <Eye className={`w-3.5 h-3.5 ${wireframeMode ? 'text-cyan-400' : 'text-slate-400'}`} />
            <span>WIREFRAME</span>
          </span>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-950 text-slate-400">
            {wireframeMode ? 'ON' : 'OFF'}
          </span>
        </button>
      </div>

      <div className="px-3 py-1 rounded-full bg-slate-950/60 backdrop-blur-md border border-cyan-500/15 text-[9px] font-mono text-cyan-400/80 flex items-center justify-center gap-1.5">
        <Sparkles className="w-2.5 h-2.5" />
        <span>SCROLL TO TRAVERSE ORBITS</span>
      </div>
    </div>
  );
};
