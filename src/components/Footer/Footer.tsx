import React, { useState, useEffect } from 'react';
import { PROFILE_DATA } from '../../data/profile';
import { Sparkles, ArrowUp } from 'lucide-react';
import { universeAudio } from '../../services/audio';

interface FooterProps {
  onOpenResume?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const [istTime, setIstTime] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const istFormatter = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      const formattedTime = istFormatter.format(now);
      setIstTime(`${formattedTime} IST`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    universeAudio.playClickBeep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-cyan-500/20 bg-[#02040a]/95 backdrop-blur-2xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Top telemetry bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_10px_rgba(56,189,248,0.3)]">
              <span className="text-cyan-400 font-orbitron font-bold">✦</span>
            </div>
            <div>
              <div className="text-sm font-orbitron font-bold text-white tracking-widest">
                LAKSH SUTHAR
              </div>
              <div className="text-[10px] font-mono text-cyan-400">
                {PROFILE_DATA.role} • {PROFILE_DATA.institution}
              </div>
            </div>
          </div>

          {/* IST Clock & System status */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>STATUS: OPEN FOR OPPORTUNITIES</span>
            </div>

            <div className="text-slate-400 text-[11px]">
              {istTime || 'SYNCHRONIZING IST TELEMETRY...'}
            </div>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              onMouseEnter={() => universeAudio.playHoverChirp()}
              className="px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-cyan-400 text-xs font-mono text-slate-300 hover:text-cyan-300 flex items-center gap-2 transition-all duration-300"
              title="Return to top of page"
            >
              <span>RETURN TO APEX</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} {PROFILE_DATA.name} • {PROFILE_DATA.phone} • {PROFILE_DATA.location}
          </div>
          <div className="flex items-center gap-1">
            <span>Built with React, TypeScript, Three.js & Tailwind CSS</span>
            <Sparkles className="w-3 h-3 text-cyan-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};
