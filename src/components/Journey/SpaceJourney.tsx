import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JOURNEY_MILESTONES } from '../../data/journey';
import type { JourneyMilestone } from '../../types/portfolio';
import {
  Sparkles,
  Rocket,
  Compass,
  CheckCircle2,
  Calendar,
  MapPin,
  ChevronRight,
  ChevronLeft,
  GraduationCap
} from 'lucide-react';
import { universeAudio } from '../../services/audio';

export const SpaceJourney: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<JourneyMilestone>(JOURNEY_MILESTONES[0]);

  const handleSelect = (milestone: JourneyMilestone) => {
    universeAudio.playHoverChirp();
    setSelectedMilestone(milestone);
  };

  const currentIndex = JOURNEY_MILESTONES.findIndex((m) => m.id === selectedMilestone.id);

  const handleNext = () => {
    if (currentIndex < JOURNEY_MILESTONES.length - 1) {
      handleSelect(JOURNEY_MILESTONES[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      handleSelect(JOURNEY_MILESTONES[currentIndex - 1]);
    }
  };

  return (
    <section id="journey" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            SECTION 05 // FLIGHT PATH
          </div>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-white tracking-wide uppercase hologram-glow">
            SPACECRAFT TRAJECTORY
          </h2>
          <p className="mt-3 text-slate-400 font-sans max-w-xl text-sm sm:text-base">
            Orbital checkpoints, academic progression at JSSATE Bengaluru, algorithm milestones, and production deployments.
          </p>
        </div>

        {/* Spacecraft Trajectory Orbital Bar */}
        <div className="relative mb-12">
          {/* Connecting glowing trajectory line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 shadow-[0_0_15px_rgba(56,189,248,0.5)] z-0 hidden md:block" />

          {/* Checkpoints row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 relative z-10">
            {JOURNEY_MILESTONES.map((milestone, idx) => {
              const isSelected = selectedMilestone.id === milestone.id;
              return (
                <button
                  key={milestone.id}
                  onClick={() => handleSelect(milestone)}
                  className={`p-3.5 rounded-2xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer border relative overflow-hidden group ${
                    isSelected
                      ? 'bg-gradient-to-b from-cyan-950/90 to-purple-950/90 border-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.4)] scale-105'
                      : 'glass-panel border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/60'
                  }`}
                >
                  {/* Planet / Orbit Indicator Sphere */}
                  <div className="relative w-10 h-10 rounded-full flex items-center justify-center mb-2.5">
                    <div
                      className={`absolute inset-0 rounded-full ${
                        isSelected
                          ? 'bg-cyan-400 animate-ping opacity-30'
                          : 'group-hover:bg-cyan-500/20'
                      }`}
                    />
                    <div
                      className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-gradient-to-br from-cyan-400 to-purple-600 border-white text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.8)]'
                          : 'bg-slate-950 border-slate-700 text-slate-400 group-hover:border-cyan-400'
                      }`}
                    >
                      {idx === 0 ? (
                        <Rocket className="w-4 h-4" />
                      ) : idx === 4 ? (
                        <GraduationCap className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-mono font-bold">0{idx + 1}</span>
                      )}
                    </div>
                  </div>

                  <div className="text-xs font-orbitron font-bold text-white">
                    {milestone.year}
                  </div>
                  <div className="text-[10px] font-mono text-cyan-400 truncate max-w-full mt-0.5">
                    {milestone.checkpointType}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Checkpoint Holographic Console */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMilestone.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/30 text-left relative overflow-hidden"
          >
            {/* Top Telemetry row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-400/40 text-xs font-mono text-cyan-300 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  <span>{selectedMilestone.coordinates}</span>
                </div>
                <span className="text-xs font-mono text-purple-400">
                  [{selectedMilestone.checkpointType}]
                </span>
              </div>

              {/* Navigation stepper buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-30 text-slate-300 hover:text-white cursor-pointer"
                  title="Previous Checkpoint"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-slate-400">
                  {currentIndex + 1} / {JOURNEY_MILESTONES.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === JOURNEY_MILESTONES.length - 1}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-30 text-slate-300 hover:text-white cursor-pointer"
                  title="Next Checkpoint"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Milestone Body */}
            <div className="mt-6 flex flex-col gap-5">
              <div>
                <h3 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white">
                  {selectedMilestone.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedMilestone.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-purple-300">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedMilestone.location}
                  </span>
                  <span className="text-slate-500">Role: {selectedMilestone.role}</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-300 font-sans font-light leading-relaxed">
                {selectedMilestone.description}
              </p>

              {/* Key Achievements Checklist */}
              <div className="flex flex-col gap-2.5 pt-2">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                  ORBITAL ACHIEVEMENTS & DELIVERABLES:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {selectedMilestone.keyAchievements.map((ach, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-950/70 border border-cyan-500/15 flex items-start gap-2.5 text-xs text-slate-200 font-sans"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{ach}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags pill row */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                {selectedMilestone.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-md bg-purple-950/40 border border-purple-500/30 text-purple-300 text-[10px] font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
