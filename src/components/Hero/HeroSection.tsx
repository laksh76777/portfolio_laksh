import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE_DATA } from '../../data/profile';
import type { SectionId } from '../../types/portfolio';
import { FolderGit2, Send, Download, MapPin } from 'lucide-react';
import { universeAudio } from '../../services/audio';

interface HeroSectionProps {
  onNavigate: (section: SectionId) => void;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenResume }) => {
  const handleCta = (section: SectionId) => {
    universeAudio.playClickBeep();
    onNavigate(section);
  };

  const handleResumeClick = () => {
    universeAudio.playModalOpen();
    onOpenResume();
  };

  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center">

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.2)] mb-6"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono tracking-wider text-cyan-300">
            Available for Opportunities
          </span>
          <span className="text-xs font-mono text-slate-500">•</span>
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-cyan-400" />
            {PROFILE_DATA.location}
          </span>
        </motion.div>

        {/* Real Profile Image Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-6 group"
        >
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_35px_rgba(56,189,248,0.4)] group-hover:shadow-[0_0_45px_rgba(56,189,248,0.7)] transition-all duration-500">
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 border-2 border-[#030712]">
              <img
                src="/images/laksh_profile.png"
                alt="Laksh Suthar Profile"
                className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-[0_0_8px_#34d399]" />
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-4"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-orbitron font-black text-white tracking-tight uppercase hologram-glow leading-none">
            {PROFILE_DATA.name}
          </h1>

          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-cyan-400" />
            <h2 className="text-sm sm:text-lg md:text-xl font-space font-bold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-purple-400">
              {PROFILE_DATA.title}
            </h2>
            <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-purple-400" />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl text-sm sm:text-base text-slate-300 font-sans font-light leading-relaxed mb-8"
        >
          {PROFILE_DATA.tagline}
        </motion.p>

        {/* Primary Action Buttons Hub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 w-full max-w-lg"
        >
          {/* Explore Projects */}
          <button
            onClick={() => handleCta('projects')}
            onMouseEnter={() => universeAudio.playHoverChirp()}
            className="flex-1 min-w-[160px] px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-orbitron font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>VIEW PROJECTS</span>
          </button>

          {/* View Resume */}
          <button
            onClick={handleResumeClick}
            onMouseEnter={() => universeAudio.playHoverChirp()}
            className="flex-1 min-w-[160px] px-6 py-3.5 rounded-xl bg-slate-950/90 hover:bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 font-orbitron font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>VIEW RESUME</span>
          </button>

          {/* Contact Signal */}
          <button
            onClick={() => handleCta('contact')}
            onMouseEnter={() => universeAudio.playHoverChirp()}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-800 hover:border-purple-500/50 bg-slate-950/60 hover:bg-slate-900 text-slate-300 hover:text-purple-300 text-xs font-mono flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Send className="w-3.5 h-3.5 text-purple-400" />
            <span>Get in Touch</span>
          </button>
        </motion.div>

        {/* Clean Simple Stats Bar (matching user's screenshot) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-2xl grid grid-cols-3 gap-6 pt-4 border-t border-slate-800/80"
        >
          <div className="flex flex-col items-center text-center">
            <div className="text-3xl sm:text-4xl font-orbitron font-black text-white">
              8.24
            </div>
            <div className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider mt-1">
              B.E. CGPA
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="text-3xl sm:text-4xl font-orbitron font-black text-cyan-300">
              100+
            </div>
            <div className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider mt-1">
              DSA SOLVED
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="text-3xl sm:text-4xl font-orbitron font-black text-purple-300">
              2
            </div>
            <div className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider mt-1">
              CORE PROJECTS
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
