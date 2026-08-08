import React from 'react';
import { PROJECTS_DATA } from '../../data/projects';
import type { ProjectData } from '../../types/portfolio';
import { GithubIcon } from '../common/Icons';
import {
  Sparkles,
  ExternalLink,
  Code2,
  CheckCircle2
} from 'lucide-react';
import { universeAudio } from '../../services/audio';

interface ProjectMissionsProps {
  onOpenProjectDetail: (project: ProjectData) => void;
}

export const ProjectMissions: React.FC<ProjectMissionsProps> = ({ onOpenProjectDetail }) => {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            03 — PROJECTS
          </div>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-white tracking-wide uppercase hologram-glow">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Projects</span>
          </h2>
          <p className="mt-3 text-slate-400 font-sans max-w-2xl text-sm sm:text-base">
            Hover a card to view architectural details, technologies, and verified source repositories.
          </p>
        </div>

        {/* 2 Featured Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {PROJECTS_DATA.map((project, index) => {
            const hasLiveDemo = project.id === 'fake-news-analysis-system' && Boolean(project.liveDemoUrl);

            return (
              <div
                key={project.id}
                onMouseEnter={() => universeAudio.playHoverChirp()}
                className="glass-panel rounded-3xl border border-cyan-500/25 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-cyan-400/50 shadow-[0_10px_40px_rgba(0,0,0,0.6)] text-left group"
              >
                <div>
                  {/* Top pill bar */}
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-800 text-xs font-mono">
                    <span className="text-amber-400 font-bold tracking-widest">
                      0{index + 1} / 02 • {project.year}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px]">
                      {project.status}
                    </span>
                  </div>

                  {/* Preview Image Frame */}
                  <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-950 aspect-video my-5 flex items-center justify-center shadow-lg">
                    <img
                      src={project.previewImage}
                      alt={`${project.title} Preview`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Project Title and Tagline */}
                  <h3 className="text-2xl font-orbitron font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-space text-purple-300 mt-1 mb-3">
                    {project.tagline}
                  </p>

                  <p className="text-xs text-slate-300 font-sans font-light leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Key points */}
                  <div className="flex flex-col gap-1.5 mb-5">
                    {project.detailedBullets.slice(0, 3).map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 text-[11px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Links */}
                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
                  {/* GitHub Button */}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => universeAudio.playClickBeep()}
                    className="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub Repository</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>

                  {/* Live Demo only if Fake News */}
                  {hasLiveDemo && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => universeAudio.playClickBeep()}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-orbitron font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}

                  {/* Inspect Architecture */}
                  <button
                    onClick={() => {
                      universeAudio.playClickBeep();
                      onOpenProjectDetail(project);
                    }}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
                    title="View architectural details"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Specs</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
