import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectData } from '../../types/portfolio';
import { GithubIcon } from '../common/Icons';
import { X, ExternalLink, CheckCircle2, Cpu, Sparkles } from 'lucide-react';
import { universeAudio } from '../../services/audio';

interface ProjectDetailModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-3xl bg-[#030712] border border-cyan-500/40 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <div className="text-xs font-orbitron font-bold text-white uppercase tracking-wider">
                  MISSION ARCHITECTURE SPECIFICATION
                </div>
                <div className="text-[10px] font-mono text-cyan-400">
                  {project.codename} // {project.year}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                universeAudio.playHoverChirp();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-rose-400 text-slate-400 hover:text-rose-300 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 overflow-y-auto text-left flex flex-col gap-6 font-sans">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
                {project.category}
              </div>
              <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-white">
                {project.title}
              </h2>
              <p className="text-sm font-space text-purple-300 mt-1 font-medium">
                {project.tagline}
              </p>
            </div>

            {/* Preview image */}
            <div className="rounded-xl overflow-hidden border border-cyan-500/20 bg-slate-950 aspect-video">
              <img
                src={project.previewImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Detailed description */}
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {project.description}
            </p>

            {/* Architectural Highlights */}
            <div className="flex flex-col gap-2.5">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                KEY ARCHITECTURAL HIGHLIGHTS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-950 border border-cyan-500/15 text-xs text-slate-200 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {project.metrics.map((m, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-[9px] font-mono text-slate-400 uppercase">{m.label}</div>
                  <div className="text-xs font-mono font-bold text-cyan-300 mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LIVE DEMO</span>
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GITHUB</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="text-xs font-mono text-slate-400 hover:text-white cursor-pointer"
            >
              Close Spec
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
