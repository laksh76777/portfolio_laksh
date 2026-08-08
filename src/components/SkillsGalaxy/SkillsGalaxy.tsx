import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILL_CATEGORIES, ALL_SKILLS } from '../../data/skills';
import { SkillItem } from '../../types/portfolio';
import { Sparkles, Layers, Cpu, Database, Wrench, Binary, Orbit, Activity } from 'lucide-react';
import { universeAudio } from '../../services/audio';

export const SkillsGalaxy: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<SkillItem>(ALL_SKILLS[0]);

  const categories = ['All', ...SKILL_CATEGORIES.map((c) => c.title)];

  const filteredSkills = selectedCategory === 'All'
    ? ALL_SKILLS
    : ALL_SKILLS.filter((s) => {
        const cat = SKILL_CATEGORIES.find((c) => c.title === selectedCategory);
        if (!cat) return true;
        return cat.skills.some((item) => item.name === s.name);
      });

  const handleSelectSkill = (skill: SkillItem) => {
    universeAudio.playHoverChirp();
    setActiveSkill(skill);
  };

  const getCategoryIcon = (title: string) => {
    switch (title) {
      case 'Frontend Engineering':
        return <Layers className="w-4 h-4 text-cyan-400" />;
      case 'Programming Languages':
        return <Cpu className="w-4 h-4 text-purple-400" />;
      case 'Backend & Database':
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 'Tools & Platforms':
        return <Wrench className="w-4 h-4 text-amber-400" />;
      case 'Core Computer Science':
        return <Binary className="w-4 h-4 text-pink-400" />;
      default:
        return <Orbit className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            SECTION 02 // CONSTELLATIONS
          </div>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-white tracking-wide uppercase hologram-glow">
            TECHNOLOGY GALAXY
          </h2>
          <p className="mt-3 text-slate-400 font-sans max-w-xl text-sm sm:text-base">
            Orbital technology clusters, programming languages, full-stack frameworks, and core engineering foundations.
          </p>
        </div>

        {/* Category Pills Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  universeAudio.playHoverChirp();
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500/30 to-purple-600/30 border border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                    : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {getCategoryIcon(cat)}
                <span>{cat.toUpperCase()}</span>
              </button>
            );
          })}
        </div>

        {/* Galaxy Layout: Left (Interactive Central Core / Radar) & Right (Active Skill Telemetry & Nodes Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Glowing Galaxy Core Visual HUD (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30 relative overflow-hidden flex flex-col items-center justify-center min-h-[380px]">
              
              {/* Central Glowing Core HUD */}
              <div className="relative w-64 h-64 flex items-center justify-center my-4">
                {/* Orbit ring 1 */}
                <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-orbit-spin" />
                {/* Orbit ring 2 */}
                <div className="absolute inset-8 border border-dashed border-purple-500/30 rounded-full animate-radar-sweep" />
                {/* Orbit ring 3 */}
                <div className="absolute inset-16 border border-cyan-400/40 rounded-full" />
                
                {/* Core Plasma Center */}
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-600 via-indigo-600 to-purple-600 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(56,189,248,0.8)] border border-white/40">
                  <div className="text-xs font-orbitron font-bold text-white tracking-widest">
                    CORE
                  </div>
                  <div className="text-[8px] font-mono text-cyan-200">
                    GALAXY
                  </div>
                </div>

                {/* Orbiting Satellite Tech Badges */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-[9px] font-mono text-cyan-300">
                  REACT • TS
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/40 text-[9px] font-mono text-purple-300">
                  JAVA • DSA
                </div>
                <div className="absolute left-2 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[9px] font-mono text-emerald-300">
                  FIREBASE
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-[9px] font-mono text-amber-300">
                  ML / AI
                </div>
              </div>

              {/* Active Skill Telemetry Display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSkill.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="w-full mt-2 p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                        {activeSkill.category}
                      </div>
                      <div className="text-lg font-orbitron font-bold text-white">
                        {activeSkill.name}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono text-slate-400">PROFICIENCY</div>
                      <div className="text-base font-orbitron font-extrabold text-cyan-300">
                        {activeSkill.level}%
                      </div>
                    </div>
                  </div>

                  {/* Level progress bar */}
                  <div className="w-full h-1.5 bg-slate-900 rounded-full mt-2.5 overflow-hidden border border-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${activeSkill.level}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                    />
                  </div>

                  <p className="mt-3 text-xs text-slate-300 leading-relaxed font-sans font-light">
                    {activeSkill.description}
                  </p>

                  {activeSkill.relatedProjects && (
                    <div className="mt-3 pt-2 border-t border-slate-800 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-mono text-purple-400">Applied in:</span>
                      {activeSkill.relatedProjects.map((p, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-[10px] font-mono text-purple-200"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Grid of Technology Nodes (7 cols) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredSkills.map((skill) => {
                const isActive = activeSkill.name === skill.name;
                return (
                  <motion.button
                    key={skill.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectSkill(skill)}
                    className={`p-4 rounded-xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between border relative overflow-hidden group ${
                      isActive
                        ? 'bg-gradient-to-br from-cyan-950/90 to-purple-950/90 border-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                        : 'glass-panel border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-950 border border-cyan-500/30 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                        <Activity className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 group-hover:text-cyan-300">
                        {skill.level}%
                      </span>
                    </div>

                    <div>
                      <div className="text-sm font-space font-bold text-white group-hover:text-cyan-200 transition-colors">
                        {skill.name}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5 truncate">
                        {skill.category}
                      </div>
                    </div>

                    {/* Bottom subtle glow line for active state */}
                    {isActive && (
                      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
