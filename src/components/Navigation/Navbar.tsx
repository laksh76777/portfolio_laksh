import React, { useState, useEffect } from 'react';
import type { SectionId } from '../../types/portfolio';
import { Volume2, VolumeX, Menu, X, FileText, Sparkles } from 'lucide-react';
import { universeAudio } from '../../services/audio';

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

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onOpenResume }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMuted(universeAudio.getMuted());
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAudio = () => {
    const muted = universeAudio.toggleMute();
    setIsMuted(muted);
  };

  const handleNavClick = (id: SectionId) => {
    universeAudio.playClickBeep();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
            ? 'py-3 bg-[#030712]/90 backdrop-blur-xl border-b border-cyan-500/15 shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
            : 'py-4 sm:py-5 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

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
                  src="public/images/laksh_profile.png"
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

          {/* Clean Desktop Navigation Links (Clean Names Only) */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-slate-950/80 border border-cyan-500/20 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => universeAudio.playHoverChirp()}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer relative ${isActive
                      ? 'text-cyan-300 font-semibold bg-cyan-950/90 border border-cyan-400/50 shadow-[0_0_15px_rgba(56,189,248,0.35)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                    }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="inline-block ml-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
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
              className={`p-2 rounded-lg border transition-all duration-200 cursor-pointer flex items-center gap-1 text-xs font-mono ${!isMuted
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
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-600/20 hover:from-cyan-500/30 hover:to-purple-600/30 border border-cyan-400/40 hover:border-cyan-400/70 text-cyan-200 text-xs font-mono font-medium transition-all duration-200 shadow-[0_0_15px_rgba(56,189,248,0.2)] cursor-pointer"
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
              className="md:hidden p-2 rounded-lg border border-cyan-500/30 bg-slate-950/80 text-cyan-400 hover:bg-slate-900 cursor-pointer"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Clean Names Only) */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[60px] z-40 bg-[#030712]/95 backdrop-blur-2xl border-b border-cyan-500/20 p-5 md:hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-2">
            <div className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest px-2 pb-1 border-b border-slate-800 flex items-center justify-between">
              <span>NAVIGATION</span>
              <Sparkles className="w-3 h-3 text-cyan-400" />
            </div>

            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full py-2.5 px-4 rounded-lg text-left text-sm font-mono flex items-center justify-between transition-all ${isActive
                      ? 'bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.3)] font-semibold'
                      : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
                    }`}
                >
                  <span className="tracking-wider">{item.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
                  )}
                </button>
              );
            })}

            <div className="pt-2 border-t border-slate-800 flex gap-2">
              <button
                onClick={() => {
                  universeAudio.playModalOpen();
                  onOpenResume();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-mono flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                VIEW OFFICIAL RESUME
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
