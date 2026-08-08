import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../../data/skills';
import { Sparkles, CheckCircle2, Terminal, Code, Cpu, Database, Wrench, Layers } from 'lucide-react';
import { universeAudio } from '../../services/audio';

export const SkillsGalaxy: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categoryIcons: Record<string, React.ReactNode> = {
    'Frontend Engineering': <Code className="w-4 h-4 text-cyan-400" />,
    'Programming Languages': <Terminal className="w-4 h-4 text-purple-400" />,
    'Backend & Database': <Database className="w-4 h-4 text-emerald-400" />,
    'Tools & Platforms': <Wrench className="w-4 h-4 text-amber-400" />,
    'Core Computer Science': <Cpu className="w-4 h-4 text-rose-400" />
  };

  const categories = ['All', ...SKILL_CATEGORIES.map(c => c.title)];

  const displayedCategories = selectedCategory === 'All'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter(c => c.title === selectedCategory);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            02 — SKILLS & TECHNOLOGIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-white tracking-wide uppercase hologram-glow">
            TECHNICAL REPERTOIRE
          </h2>
          <p className="mt-3 text-slate-400 font-sans max-w-xl text-sm sm:text-base">
            Proficiencies across full-stack engineering, programming languages, cloud databases, and core computer science fundamentals.
          </p>
        </div>

        {/* Clean Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                universeAudio.playHoverChirp();
                setSelectedCategory(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${selectedCategory === cat
                  ? 'bg-cyan-950/90 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.3)] font-semibold'
                  : 'bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Clean Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {displayedCategories.map((category) => (
            <div
              key={category.title}
              onMouseEnter={() => universeAudio.playHoverChirp()}
              className="glass-panel p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all flex flex-col justify-between text-left group"
            >
              <div>
                {/* Card Title Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center">
                      {categoryIcons[category.title] || <Layers className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-orbitron font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {category.title}
                      </h3>
                      <div className="text-[10px] font-mono text-slate-500">
                        {category.skills.length} Competencies
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 font-sans font-light mb-5">
                  {category.description}
                </p>

                {/* Skills List with Progress */}
                <div className="space-y-3.5">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-200 font-medium flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: skill.color }}
                          />
                          {skill.name}
                        </span>
                        <span className="text-slate-500 text-[11px]">
                          {/* {skill.experienceYears || `${skill.level}%`} */}
                        </span>
                      </div>

                      {/* Clean Progress Bar */}
                      <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800/80">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${skill.level}%`,
                            backgroundColor: skill.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom tag indicator */}
              <div className="mt-6 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Verified in Projects
                </span>
                <span className="text-cyan-400/80">Active Stack</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
