import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_DATA } from '../../data/projects';
import type { ProjectData } from '../../types/portfolio';
import { FakeNewsInteractiveSim } from './FakeNewsInteractiveSim';
import { InventoryInteractiveSim } from './InventoryInteractiveSim';
import { GithubIcon } from '../common/Icons';
import {
  Sparkles,
  ExternalLink,
  Play,
  Maximize2,
  CheckCircle2,
  Code2,
  Cpu,
  Activity
} from 'lucide-react';
import { universeAudio } from '../../services/audio';

interface ProjectMissionsProps {
  onOpenProjectDetail: (project: ProjectData) => void;
}

export const ProjectMissions: React.FC<ProjectMissionsProps> = ({ onOpenProjectDetail }) => {
  const [activeSimulator, setActiveSimulator] = useState<string | null>(null);

  const handleToggleSimulator = (projectId: string) => {
    universeAudio.playHoverChirp();
    setActiveSimulator((prev) => (prev === projectId ? null : projectId));
  };

  return (
    <section id="missions" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            SECTION 03 // DEPLOYMENTS
          </div>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-white tracking-wide uppercase hologram-glow">
            MISSION ARCHIVES
          </h2>
          <p className="mt-3 text-slate-400 font-sans max-w-2xl text-sm sm:text-base">
            Engineered software systems, real-time AI architectures, and cloud applications deployed for operational impact.
          </p>
        </div>

        {/* Project Missions List */}
        <div className="flex flex-col gap-12">
          {PROJECTS_DATA.map((project, index) => {
            const isSimOpen = activeSimulator === project.id;
            return (
              <div
                key={project.id}
                className="glass-panel rounded-3xl border border-cyan-500/25 p-6 sm:p-8 lg:p-10 relative overflow-hidden transition-all duration-300 hover:border-cyan-400/50 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
              >
                {/* Top Telemetry Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                      <span>MISSION 0{index + 1}</span>
                    </div>
                    <span className="text-xs font-mono text-purple-400">
                      {project.codename}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-semibold flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{project.status}</span>
                    </span>
                    <span className="text-xs font-mono text-slate-500">[{project.year}]</span>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
                  
                  {/* Left Column: Holographic Screen Preview or Live Sandbox (6 cols) */}
                  <div className="lg:col-span-6 flex flex-col gap-4">
                    <AnimatePresence mode="wait">
                      {isSimOpen ? (
                        <motion.div
                          key="sim-view"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="w-full"
                        >
                          {project.simulatorType === 'fake-news' ? (
                            <FakeNewsInteractiveSim />
                          ) : (
                            <InventoryInteractiveSim />
                          )}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="image-view"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-950 group shadow-[0_0_30px_rgba(0,0,0,0.8)] aspect-video flex items-center justify-center"
                        >
                          <img
                            src={project.previewImage}
                            alt={`${project.title} Interface Preview`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                            loading="lazy"
                          />

                          {/* Holographic overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-cyan-950/20 pointer-events-none" />
                          <div className="absolute inset-0 cyber-grid-dense opacity-20 pointer-events-none" />

                          {/* Center holographic play button trigger */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleToggleSimulator(project.id)}
                              className="px-4 py-2.5 rounded-xl bg-slate-950/90 hover:bg-cyan-950 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold flex items-center gap-2 backdrop-blur-md shadow-[0_0_25px_rgba(56,189,248,0.5)] cursor-pointer transform group-hover:scale-105 transition-all"
                            >
                              <Play className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                              <span>LAUNCH LIVE INTERACTIVE SIMULATOR</span>
                            </button>
                          </div>

                          {/* Top-right quick expand button */}
                          <button
                            onClick={() => onOpenProjectDetail(project)}
                            className="absolute top-3 right-3 p-2 rounded-lg bg-slate-950/80 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
                            title="Inspect Architecture"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Simulator Mode Toggle Button */}
                    <div className="flex items-center justify-between px-2 text-xs font-mono">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-cyan-400" />
                        {isSimOpen ? 'Live simulation active' : 'Holographic preview mode'}
                      </span>
                      <button
                        onClick={() => handleToggleSimulator(project.id)}
                        className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 cursor-pointer font-medium"
                      >
                        {isSimOpen ? '← Return to Preview Screen' : '⚡ Open Interactive Playground →'}
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Project Details & Action Buttons (6 cols) */}
                  <div className="lg:col-span-6 flex flex-col gap-5 text-left">
                    <div>
                      <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
                        {project.category}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-space text-purple-300 mt-1 font-medium">
                        {project.tagline}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans font-light">
                      {project.description}
                    </p>

                    {/* Detailed bullet points */}
                    <div className="flex flex-col gap-2">
                      {project.detailedBullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{bullet}</span>
                        </div>
                      ))}
                    </div>

                    {/* Key Metrics Mini-Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                      {project.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center flex flex-col justify-center"
                        >
                          <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                            {m.label}
                          </div>
                          <div className="text-xs font-mono font-bold text-cyan-300 mt-0.5 truncate">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-cyan-500/20 text-cyan-300 text-[11px] font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links: Live Demo + GitHub + Inspect Modal */}
                    <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800">
                      {/* Live Demo */}
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-orbitron font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>LIVE DEPLOYMENT</span>
                      </a>

                      {/* GitHub Repository */}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>SOURCE REPO</span>
                      </a>

                      {/* Inspect Specs */}
                      <button
                        onClick={() => onOpenProjectDetail(project)}
                        className="px-3.5 py-2.5 rounded-xl border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>SPECS</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
