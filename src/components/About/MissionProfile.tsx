import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROFILE_DATA } from '../../data/profile';
import { GithubIcon, LinkedinIcon, LeetCodeIcon, CodolioIcon } from '../common/Icons';
import {
  User,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Award,
  ExternalLink,
  Layers,
  Brain,
  CheckCircle2,
  Terminal,
  Download
} from 'lucide-react';
import { universeAudio } from '../../services/audio';

interface MissionProfileProps {
  onOpenResume: () => void;
}

export const MissionProfile: React.FC<MissionProfileProps> = ({ onOpenResume }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'certifications' | 'competencies'>('overview');

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            01 — ABOUT
          </div>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-white tracking-wide uppercase hologram-glow">
            ENGINEERING PROFILE
          </h2>
          <p className="mt-3 text-slate-400 font-sans max-w-xl text-sm sm:text-base">
            Background, education timeline from secondary school to university, and software engineering capabilities.
          </p>
        </div>

        {/* Main Grid: Real Profile Visual + Interactive Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Real Profile Photo & Quick Channels (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="rounded-2xl glass-panel p-3 border border-cyan-500/30 overflow-hidden group">
              {/* Photo Frame */}
              <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-square flex items-center justify-center border border-cyan-500/20">
                <img
                  src="/images/astronaut_hologram.jpg"
                  alt="Laksh Suthar - Computer Science Engineer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                />

                {/* Cyber HUD Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent pointer-events-none" />

                {/* Top Corner labels */}
                <div className="absolute top-3 left-3 text-[10px] font-mono text-cyan-400/90 bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/30 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>B.E. CSE</span>
                </div>

                <div className="absolute top-3 right-3 text-[10px] font-mono text-purple-300 bg-slate-950/80 px-2 py-0.5 rounded border border-purple-500/30">
                  BENGALURU
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 inset-x-3 p-3 rounded-lg bg-slate-950/90 backdrop-blur-md border border-cyan-500/30 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-orbitron font-bold text-white">LAKSH SUTHAR</div>
                    <div className="text-[10px] font-mono text-cyan-400">Software Developer</div>
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded border border-emerald-500/40">
                    CGPA 8.24
                  </div>
                </div>
              </div>

              {/* Bio Highlights Mini-Grid */}
              <div className="grid grid-cols-2 gap-2 mt-3 text-left">
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">COLLEGE</div>
                  <div className="text-xs font-mono font-semibold text-cyan-300 truncate">JSSATE Bengaluru</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">GRADUATION</div>
                  <div className="text-xs font-mono font-bold text-purple-300">May 2027</div>
                </div>
              </div>
            </div>

            {/* Quick Profile Links */}
            <div className="p-4 rounded-xl glass-panel border border-cyan-500/20 text-xs font-mono flex flex-col gap-2.5 text-left">
              <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                OFFICIAL PROFILES
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={PROFILE_DATA.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-cyan-400 flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>GitHub</span>
                </a>

                <a
                  href={PROFILE_DATA.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-purple-400 flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-purple-400" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={PROFILE_DATA.links.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-amber-400 flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                >
                  <LeetCodeIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>LeetCode</span>
                </a>

                <a
                  href={PROFILE_DATA.links.codolio}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-emerald-400 flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                >
                  <CodolioIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Codolio</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Content & Deep Tabs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">

            {/* Main Profile Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/25 relative overflow-hidden">

              {/* Tab Navigation */}
              <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-slate-800">
                <button
                  onClick={() => {
                    universeAudio.playHoverChirp();
                    setActiveTab('overview');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer flex items-center gap-2 ${activeTab === 'overview'
                    ? 'bg-cyan-950/90 border border-cyan-400/60 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/40'
                    }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>OVERVIEW & BIO</span>
                </button>

                <button
                  onClick={() => {
                    universeAudio.playHoverChirp();
                    setActiveTab('certifications');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer flex items-center gap-2 ${activeTab === 'certifications'
                    ? 'bg-cyan-950/90 border border-cyan-400/60 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/40'
                    }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>CERTIFICATIONS ({PROFILE_DATA.certifications.length})</span>
                </button>

                <button
                  onClick={() => {
                    universeAudio.playHoverChirp();
                    setActiveTab('competencies');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer flex items-center gap-2 ${activeTab === 'competencies'
                    ? 'bg-cyan-950/90 border border-cyan-400/60 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/40'
                    }`}
                >
                  <Brain className="w-3.5 h-3.5" />
                  <span>CORE CS FOUNDATIONS</span>
                </button>
              </div>

              {/* Tab 1: Overview & Education Timeline */}
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex flex-col gap-6"
                >
                  {/* Persona Card Header */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                      <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                        IDENTITY & ROLE
                      </div>
                      <div className="text-lg font-orbitron font-bold text-white">{PROFILE_DATA.name}</div>
                      <div className="text-xs font-mono text-purple-300 mt-0.5">{PROFILE_DATA.role}</div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/70 border border-purple-500/20">
                      <div className="text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-purple-400" />
                        PRIMARY SPECIALIZATION
                      </div>
                      <div className="text-xs font-sans font-medium text-slate-200 leading-snug">
                        {PROFILE_DATA.focus}
                      </div>
                      <div className="text-[11px] font-mono text-cyan-400 mt-1">
                        Expected Horizon: {PROFILE_DATA.graduation}
                      </div>
                    </div>
                  </div>

                  {/* Summary Paragraph */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      EXECUTIVE SUMMARY
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans font-light">
                      {PROFILE_DATA.bio}
                    </p>
                  </div>

                  {/* Education Timeline (matching user's screenshot layout) */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-cyan-400" />
                      ACADEMIC EDUCATION TIMELINE
                    </h3>

                    <div className="space-y-3">
                      {PROFILE_DATA.education.map((edu, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
                        >
                          <div className="flex flex-col">
                            <div className="text-sm font-space font-bold text-white group-hover:text-cyan-300 transition-colors">
                              {edu.institution}
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5 flex flex-wrap items-center gap-2">
                              <span>{edu.degree}</span>
                              <span className="text-slate-600">•</span>
                              <span className="text-emerald-400 font-mono font-medium">{edu.grade}</span>
                            </div>
                          </div>

                          <div className="px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold flex-shrink-0 self-start sm:self-center">
                            {edu.timeline}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={onOpenResume}
                      className="px-5 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-200 text-xs font-mono font-medium flex items-center gap-2 cursor-pointer transition-all shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      <span>INSPECT & DOWNLOAD RESUME (PDF)</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Certifications & Verified Credentials */}
              {activeTab === 'certifications' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex flex-col gap-4"
                >
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                    VERIFIED ACADEMIC & INDUSTRY CERTIFICATIONS
                  </div>

                  {PROFILE_DATA.certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/20 hover:border-cyan-400/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-purple-950/80 border border-purple-500/40 flex items-center justify-center flex-shrink-0">
                          <Award className="w-5 h-5 text-purple-300" />
                        </div>
                        <div>
                          <div className="text-sm font-space font-bold text-white">{cert.name}</div>
                          <div className="text-xs font-mono text-cyan-300 mt-0.5">{cert.issuer}</div>
                          <div className="text-xs text-slate-400 mt-1 font-sans font-light">
                            {cert.highlight}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0 self-stretch sm:self-auto">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                          YEAR: {cert.date}
                        </span>
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1 rounded bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 hover:text-cyan-200 flex items-center gap-1.5 transition-colors"
                        >
                          <span>Open Certificate</span>
                          <ExternalLink className="w-3 h-3 text-cyan-400" />
                        </a>
                      </div>
                    </div>
                  ))}

                  <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-mono text-slate-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Credentials verifiable through official GeeksforGeeks PDF registry and Coursera verification portal.</span>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Core Computer Science Foundations */}
              {activeTab === 'competencies' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex flex-col gap-4"
                >
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                    CORE COMPUTER SCIENCE & ENGINEERING COMPETENCIES
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PROFILE_DATA.coreCS.map((comp, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-500/20 hover:border-cyan-400/40 transition-all flex items-center gap-3"
                      >
                        <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-400/30 flex items-center justify-center text-xs font-mono text-cyan-400">
                          0{idx + 1}
                        </div>
                        <span className="text-xs sm:text-sm font-space font-semibold text-slate-200">
                          {comp}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-2">
                      ENGINEERING & SOFT SKILLS
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {PROFILE_DATA.softSkills.map((soft, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono"
                        >
                          ✦ {soft}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
