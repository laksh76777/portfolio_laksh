import React from 'react';
import { PROFILE_DATA } from '../../data/profile';
import { GITHUB_STATS_FALLBACK } from '../../data/github';
import { GithubIcon, LeetCodeIcon, CodolioIcon } from '../common/Icons';
import {
  Award,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Code2,
  GraduationCap,
  Flame,
  FileCheck
} from 'lucide-react';
import { universeAudio } from '../../services/audio';

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            04 — ACHIEVEMENTS & CERTIFICATIONS
          </div>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-white tracking-wide uppercase hologram-glow">
            ACCOLADES & CREDENTIALS
          </h2>
          <p className="mt-3 text-slate-400 font-sans max-w-2xl text-sm sm:text-base">
            Verified algorithmic problem-solving milestones, university academic standing, and industry certifications.
          </p>
        </div>

        {/* 3 Core Highlight Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: 100+ DSA Problem Solving */}
          <div
            onMouseEnter={() => universeAudio.playHoverChirp()}
            className="glass-panel p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center mb-4 text-cyan-300">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                ALGORITHMIC MASTERY
              </div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-2">
                100+ DSA Solved
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans font-light leading-relaxed mb-4">
                Consistent problem-solving in Arrays, Trees, Graphs, Dynamic Programming, Heaps, and Sorting across LeetCode and Codolio.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center gap-3">
              <a
                href={PROFILE_DATA.links.leetcode}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400 text-xs font-mono text-slate-300 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
              >
                <LeetCodeIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>LeetCode Profile</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>

              <a
                href={PROFILE_DATA.links.codolio}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-400 text-xs font-mono text-slate-300 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
              >
                <CodolioIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>Codolio</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Academic Standing */}
          <div
            onMouseEnter={() => universeAudio.playHoverChirp()}
            className="glass-panel p-6 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-400/40 flex items-center justify-center mb-4 text-purple-300">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-1">
                ACADEMIC EXCELLENCE
              </div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-2">
                CGPA: 8.24 / 10
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans font-light leading-relaxed mb-4">
                Bachelor of Engineering in Computer Science and Engineering at <span className="text-white font-medium">JSS Academy of Technical Education, Bengaluru</span> (2023 – 2027).
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Core CS: OOP, DBMS, OS, Networks</span>
            </div>
          </div>

          {/* Card 3: Production Deployed Systems */}
          <div
            onMouseEnter={() => universeAudio.playHoverChirp()}
            className="glass-panel p-6 rounded-2xl border border-emerald-500/20 hover:border-emerald-400/50 transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-400/40 flex items-center justify-center mb-4 text-emerald-300">
                <Flame className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                REAL-WORLD SYSTEMS
              </div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-2">
                02 Deployed Apps
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans font-light leading-relaxed mb-4">
                Engineered the <span className="text-white font-medium">Fake News Analysis System</span> with real-time AI APIs and the <span className="text-white font-medium">AI Inventory Management System</span> with Firebase synchronization.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <a
                href={PROFILE_DATA.links.fakeNewsLive}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-mono text-cyan-300 hover:text-cyan-200 flex items-center gap-1 transition-colors"
              >
                <span>Fake News Live</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>

              <a
                href={PROFILE_DATA.links.inventoryGithub}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-purple-400 text-xs font-mono text-purple-300 hover:text-purple-200 flex items-center gap-1 transition-colors"
              >
                <span>Inventory GitHub</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Verified Certifications Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Certificate 1: GFG 160 */}
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 text-left">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-400/40 flex items-center justify-center flex-shrink-0 text-emerald-300">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                  GEEKSFORGEEKS
                </div>
                <h4 className="text-base sm:text-lg font-orbitron font-bold text-white mt-0.5">
                  GFG 160 Certification
                </h4>
                <p className="text-xs text-slate-300 mt-1 font-sans font-light">
                  Mastery of 160 core Data Structures & Algorithms challenge problems and advanced algorithmic paradigms.
                </p>
              </div>
            </div>

            <a
              href={PROFILE_DATA.links.gfgCertificate}
              target="_blank"
              rel="noreferrer"
              onClick={() => universeAudio.playClickBeep()}
              className="px-4 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400/50 text-cyan-300 font-mono text-xs flex items-center gap-2 flex-shrink-0 transition-colors shadow-sm"
            >
              <span>View Certificate PDF</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          </div>

          {/* Certificate 2: Stanford ML */}
          <div className="glass-panel p-6 rounded-2xl border border-purple-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 text-left">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-400/40 flex items-center justify-center flex-shrink-0 text-purple-300">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                  STANFORD UNIVERSITY & DEEPLEARNING.AI
                </div>
                <h4 className="text-base sm:text-lg font-orbitron font-bold text-white mt-0.5">
                  Machine Learning Specialization
                </h4>
                <p className="text-xs text-slate-300 mt-1 font-sans font-light">
                  Supervised Learning, Neural Networks, Decision Trees, Unsupervised Learning & Recommender Systems by Andrew Ng.
                </p>
              </div>
            </div>

            <a
              href={PROFILE_DATA.links.mlCertificate}
              target="_blank"
              rel="noreferrer"
              onClick={() => universeAudio.playClickBeep()}
              className="px-4 py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-400/50 text-purple-300 font-mono text-xs flex items-center gap-2 flex-shrink-0 transition-colors shadow-sm"
            >
              <span>View Credential</span>
              <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
            </a>
          </div>
        </div>

        {/* GitHub Source Repositories Showcase Bar */}
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <GithubIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase">GITHUB CODEBASES</div>
              <div className="text-sm font-space font-bold text-white">
                github.com/laksh76777 • Verified Public Repositories
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              {GITHUB_STATS_FALLBACK.publicRepos} Public Repos | {GITHUB_STATS_FALLBACK.totalCommitsYear}+ Commits
            </span>
            <a
              href={PROFILE_DATA.links.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => universeAudio.playClickBeep()}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-xs font-mono text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Explore GitHub</span>
              <ExternalLink className="w-3 h-3 text-cyan-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
