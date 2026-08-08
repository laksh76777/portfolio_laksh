import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE_DATA } from '../../data/profile';
import type { SectionId } from '../../types/portfolio';
import { Compass, Sparkles, FolderGit2, Send, Download, Award, GraduationCap } from 'lucide-react';
import { universeAudio } from '../../services/audio';

interface HeroSectionProps {
  onNavigate: (section: SectionId) => void;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenResume }) => {
  const handleCta = (section: SectionId) => {
    universeAudio.playHolographicChime();
    onNavigate(section);
  };

  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        
        {/* Holographic Telemetry Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-950/80 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.2)] mb-6 group"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase">
            ORBITAL STATUS: ONLINE // {PROFILE_DATA.location}
          </span>
          <span className="hidden sm:inline text-xs font-mono text-slate-500">•</span>
          <span className="hidden sm:inline text-xs font-mono text-purple-300">
            CGPA: {PROFILE_DATA.academicCGPA}
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-4"
        >
          <div className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-cyan-400 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>WELCOME TO THE DIGITAL UNIVERSE OF</span>
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-orbitron font-black text-white tracking-tight uppercase hologram-glow leading-none">
            {PROFILE_DATA.name}
          </h1>

          <div className="mt-3 flex items-center justify-center gap-3">
            <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-cyan-400" />
            <h2 className="text-lg sm:text-2xl md:text-3xl font-space font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-purple-400">
              {PROFILE_DATA.title}
            </h2>
            <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-purple-400" />
          </div>
        </motion.div>

        {/* Core Tagline Quote */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-base sm:text-xl text-slate-300 font-sans font-light leading-relaxed mb-8"
        >
          "{PROFILE_DATA.tagline}"
        </motion.p>

        {/* Action Buttons Hub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12 w-full max-md"
        >
          {/* Explore My Universe */}
          <button
            onClick={() => handleCta('about')}
            className="flex-1 min-w-[200px] px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-orbitron font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Compass className="w-4 h-4 animate-spin" />
            <span>EXPLORE MY UNIVERSE</span>
          </button>

          {/* View Projects */}
          <button
            onClick={() => handleCta('missions')}
            className="flex-1 min-w-[180px] px-6 py-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 font-orbitron font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <FolderGit2 className="w-4 h-4 text-cyan-400" />
            <span>VIEW PROJECTS</span>
          </button>

          {/* Secondary Quick Action: Transmit / Resume */}
          <div className="flex items-center gap-3 w-full justify-center mt-2">
            <button
              onClick={onOpenResume}
              className="text-xs font-mono text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-950/40 cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full Resume / CV</span>
            </button>
            <button
              onClick={() => handleCta('contact')}
              className="text-xs font-mono text-slate-400 hover:text-purple-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-950/40 cursor-pointer transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-purple-400" />
              <span>Transmit Signal</span>
            </button>
          </div>
        </motion.div>

        {/* Live Space Telemetry Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3.5"
        >
          {PROFILE_DATA.keyStats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel p-4 rounded-xl flex flex-col items-center text-center border border-cyan-500/15 hover:border-cyan-400/40 transition-all duration-300 group"
            >
              <div className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs font-mono font-medium text-cyan-400/90 uppercase tracking-wider mt-0.5">
                {stat.label}
              </div>
              <div className="text-[10px] font-sans text-slate-400 mt-1">
                {stat.detail}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Quick Highlights Pill Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-slate-400"
        >
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            JSS Academy of Technical Education
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            Stanford ML & GFG 160 Certified
          </span>
        </motion.div>
      </div>
    </section>
  );
};
