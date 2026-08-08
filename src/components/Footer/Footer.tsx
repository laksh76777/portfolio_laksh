import React, { useState, useEffect } from 'react';
import { PROFILE_DATA } from '../../data/profile';
import { Sparkles, Heart, ArrowUp, Github, Linkedin, Code, Mail } from 'lucide-react';
import { universeAudio } from '../../services/audio';

export const Footer: React.FC = () => {
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    universeAudio.playHoverChirp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-cyan-500/20 bg-[#02040a]/90 backdrop-blur-2xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Top telemetry bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center">
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

          {/* UTC Clock & System status */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEM STATUS: 100% OPERATIONAL</span>
            </div>

            <div className="text-slate-400 text-[11px]">
              {utcTime || 'SYNCHRONIZING UTC TELEMETRY...'}
            </div>
          </div>
        </div>

        {/* Middle row: links & back to top */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <a
              href={PROFILE_DATA.links.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span>GitHub</span>
            </a>

            <a
              href={PROFILE_DATA.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-purple-300 flex items-center gap-1.5 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-purple-400" />
              <span>LinkedIn</span>
            </a>

            <a
              href={PROFILE_DATA.links.leetcode}
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 flex items-center gap-1.5 transition-colors"
            >
              <Code className="w-3.5 h-3.5 text-amber-400" />
              <span>LeetCode</span>
            </a>

            <a
              href={PROFILE_DATA.links.emailMailto}
              className="hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Email</span>
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-cyan-400 text-xs font-mono text-slate-300 hover:text-cyan-300 flex items-center gap-2 cursor-pointer transition-all"
            title="Return to Space Orbit Launch"
          >
            <span>RETURN TO APEX</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom copyright notice */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-slate-900 text-[10px] font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} Laksh Suthar. All rights reserved across digital space.
          </div>
          <div className="flex items-center gap-1">
            <span>Engineered with React, TypeScript, Three.js & Tailwind CSS</span>
            <Sparkles className="w-3 h-3 text-cyan-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};
