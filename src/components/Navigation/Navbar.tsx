import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { SectionId } from '../../types/portfolio';
import { universeAudio } from '../../services/audio';
import { Volume2, VolumeX, Menu, X, FileText } from 'lucide-react';

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  onOpenResume: () => void;
}

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'achievements', label: 'ACHIEVEMENTS' },
  { id: 'contact', label: 'CONTACT' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenResume,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<SectionId | null>(null);
  const [isMuted, setIsMuted] = useState(universeAudio.getMuted());

  const handleNavClick = (id: SectionId) => {
    universeAudio.playClickBeep();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleToggleAudio = () => {
    const nextState = universeAudio.toggleMute();
    setIsMuted(nextState);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 px-3 sm:px-6 py-3 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo with Real Profile Image Avatar */}
          <button
            onClick={() => handleNavClick('hero')}
            onMouseEnter={() => universeAudio.playHoverChirp()}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
            aria-label="Laksh Suthar Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full p-0.5 bg-gradient-to-br from-cyan-400 to-purple-600 shadow-[0_0_15px_rgba(56,189,248,0.4)] group-hover:shadow-[0_0_20px_rgba(56,189,248,0.7)] transition-all duration-300">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-950">
                <img
                  src="/images/laksh_profile.jpg"
                  alt="Laksh Suthar Avatar"
                  className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-orbitron font-extrabold text-white text-base tracking-widest group-hover:text-cyan-300 transition-colors">
                LAKSH
              </span>
              <span className="font-mono text-[9px] text-cyan-400/80 tracking-widest uppercase">
                CSE • 2027
              </span>
            </div>
          </button>

          {/* Liquid Smooth Glass Floating Navigation Bar */}
          <nav
            onMouseLeave={() => setHoveredTab(null)}
            className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-slate-950/75 backdrop-blur-2xl border border-cyan-500/25 shadow-[0_10px_35px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] relative overflow-hidden"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const isHover = hoveredTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => {
                    setHoveredTab(item.id);
                    universeAudio.playHoverChirp();
                  }}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-colors duration-200 cursor-pointer select-none z-10 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-cyan-200 font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {/* Smooth Flowing Active Glass Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="flowingActiveNavPill"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 32,
                        mass: 0.8,
                      }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-950/95 via-sky-900/90 to-purple-950/95 border border-cyan-400/60 shadow-[0_0_22px_rgba(56,189,248,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)] -z-10"
                    />
                  )}

                  {/* Gentle Hover Gliding Pill (when not active) */}
                  {isHover && !isActive && (
                    <motion.div
                      layoutId="hoverNavPill"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                      className="absolute inset-0 rounded-full bg-slate-800/50 border border-slate-700/50 -z-10"
                    />
                  )}

                  <span>{item.label}</span>

                  {/* Pulsing Active Coordinate Beacon */}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Hub: Sound Synth + Resume Modal */}
          <div className="flex items-center gap-2.5">
            {/* Ambient Audio Toggle */}
            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-1 text-xs font-mono ${
                !isMuted
                  ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                  : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
              title={isMuted ? 'Turn on sound effects' : 'Mute sound effects'}
              aria-label="Toggle Universe Ambient Audio"
            >
              {!isMuted ? (
                <>
                  <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="hidden xl:inline text-[10px] text-cyan-300">AUDIO ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden xl:inline text-[10px]">MUTED</span>
                </>
              )}
            </button>

            {/* View Resume Button */}
            <button
              onClick={() => {
                universeAudio.playModalOpen();
                onOpenResume();
              }}
              onMouseEnter={() => universeAudio.playHoverChirp()}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-600/20 hover:from-cyan-500/30 hover:to-purple-600/30 border border-cyan-400/40 hover:border-cyan-400/70 text-cyan-200 text-xs font-mono font-medium transition-all duration-200 shadow-[0_0_15px_rgba(56,189,248,0.2)] cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>RESUME</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                universeAudio.playClickBeep();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-xl border border-cyan-500/30 bg-slate-950/80 text-cyan-400 hover:bg-slate-900 cursor-pointer"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[60px] z-40 bg-[#030712]/95 backdrop-blur-2xl border-b border-cyan-500/20 p-5 md:hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono tracking-wider text-left transition-all duration-200 flex items-center justify-between ${
                    isActive
                      ? 'bg-cyan-950 border border-cyan-400/50 text-cyan-300 font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                </button>
              );
            })}

            <button
              onClick={() => {
                universeAudio.playModalOpen();
                onOpenResume();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-orbitron font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.4)]"
            >
              <FileText className="w-4 h-4" />
              <span>OFFICIAL RESUME</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
