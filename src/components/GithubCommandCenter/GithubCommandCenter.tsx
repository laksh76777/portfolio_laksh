import React, { useState } from 'react';
import { GITHUB_STATS_FALLBACK } from '../../data/github';
import { PROFILE_DATA } from '../../data/profile';
import {
  Sparkles,
  Terminal,
  Github,
  GitCommit,
  GitBranch,
  Star,
  Copy,
  Check,
  ExternalLink,
  Code,
  Flame
} from 'lucide-react';
import { universeAudio } from '../../services/audio';

export const GithubCommandCenter: React.FC = () => {
  const [stats] = useState(GITHUB_STATS_FALLBACK);
  const [copiedRepo, setCopiedRepo] = useState<string | null>(null);

  // Interactive CLI State
  const [cliInput, setCliInput] = useState('');
  const [cliHistory, setCliHistory] = useState<{ command: string; output: string }[]>([
    { command: 'init --telemetry', output: 'ORBITAL GITHUB TELEMETRY READY. Type "help" for available commands.' }
  ]);

  const handleCopyClone = (name: string, cloneUrl: string) => {
    universeAudio.playHoverChirp();
    navigator.clipboard.writeText(cloneUrl);
    setCopiedRepo(name);
    setTimeout(() => setCopiedRepo(null), 2000);
  };

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliInput.trim()) return;

    universeAudio.playHoverChirp();
    const cmd = cliInput.trim().toLowerCase();
    let out = '';

    switch (cmd) {
      case 'help':
        out = 'Available commands: summary, skills, projects, certs, stats, contact, clear, date';
        break;
      case 'summary':
      case 'bio':
        out = `${PROFILE_DATA.name} - ${PROFILE_DATA.role} (${PROFILE_DATA.institution}, CGPA ${PROFILE_DATA.academicCGPA}). ${PROFILE_DATA.tagline}`;
        break;
      case 'skills':
        out = 'Skills: React, TypeScript, Java (DSA), Python (ML), Firebase Firestore, Node.js, SQL, Tailwind CSS.';
        break;
      case 'projects':
        out = '1. Fake News Analysis System (React + TypeScript + AI APIs)\n2. AI Inventory Management System (React + Firebase Firestore + Barcode)';
        break;
      case 'certs':
        out = '1. GeeksforGeeks GFG 160 Certification\n2. Stanford University & DeepLearning.AI Machine Learning Specialization';
        break;
      case 'stats':
        out = `CGPA: 8.24/10 | DSA Solved: 100+ | Public Repos: ${stats.publicRepos} | Commits: ${stats.totalCommitsYear}`;
        break;
      case 'contact':
        out = `Email: ${PROFILE_DATA.email} | Phone: ${PROFILE_DATA.phone} | Location: ${PROFILE_DATA.location}`;
        break;
      case 'date':
        out = `UTC TIMESTAMP: ${new Date().toISOString()} // ORBIT PHASE 2026-2027`;
        break;
      case 'clear':
        setCliHistory([]);
        setCliInput('');
        return;
      default:
        out = `Command not recognized: "${cmd}". Type "help" for a list of commands.`;
        break;
    }

    setCliHistory((prev) => [...prev, { command: cliInput, output: out }]);
    setCliInput('');
  };

  return (
    <section id="github" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            SECTION 04 // REPOSITORIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-white tracking-wide uppercase hologram-glow">
            GITHUB COMMAND CENTER
          </h2>
          <p className="mt-3 text-slate-400 font-sans max-w-xl text-sm sm:text-base">
            Open-source repositories, commit telemetry, technology distribution, and interactive terminal interface.
          </p>
        </div>

        {/* GitHub Stats Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="glass-panel p-4 rounded-xl border border-cyan-500/20 text-center">
            <div className="flex items-center justify-center gap-1.5 text-cyan-400 text-xs font-mono mb-1">
              <Github className="w-3.5 h-3.5" />
              <span>PUBLIC REPOS</span>
            </div>
            <div className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white">
              {stats.publicRepos}
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-purple-500/20 text-center">
            <div className="flex items-center justify-center gap-1.5 text-purple-400 text-xs font-mono mb-1">
              <GitCommit className="w-3.5 h-3.5" />
              <span>YEAR COMMITS</span>
            </div>
            <div className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white">
              {stats.totalCommitsYear}+
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-emerald-500/20 text-center">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-mono mb-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>STREAK DAYS</span>
            </div>
            <div className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white">
              {stats.streakDays}
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-cyan-500/20 text-center">
            <div className="flex items-center justify-center gap-1.5 text-cyan-400 text-xs font-mono mb-1">
              <GitBranch className="w-3.5 h-3.5" />
              <span>CONTRIBUTIONS</span>
            </div>
            <div className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white">
              Active // 2026
            </div>
          </div>
        </div>

        {/* Main Grid: Featured Repos (Left 7 cols) & Interactive CLI / Languages (Right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Featured Repositories List (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center justify-between">
              <span>FEATURED SOFTWARE REPOSITORIES</span>
              <a
                href={stats.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>github.com/LakshSuthar</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {stats.featuredRepos.map((repo) => {
              const isCopied = copiedRepo === repo.name;
              return (
                <div
                  key={repo.name}
                  className="glass-panel p-5 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all text-left flex flex-col gap-3 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center">
                        <Code className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <a
                        href={repo.htmlUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm sm:text-base font-space font-bold text-white hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                      >
                        <span>{repo.name}</span>
                        <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-cyan-400" />
                      </a>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        {repo.stars}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                        <GitBranch className="w-3 h-3 text-slate-400" />
                        {repo.forks}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-sans font-light leading-relaxed">
                    {repo.description}
                  </p>

                  {/* Topics tag list */}
                  <div className="flex flex-wrap gap-1.5">
                    {repo.topics.map((topic, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>

                  {/* Clone command copy bar */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[10px] font-mono">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: repo.languageColor }}
                      />
                      <span className="text-slate-300 font-semibold">{repo.language}</span>
                    </div>

                    <button
                      onClick={() => handleCopyClone(repo.name, repo.cloneUrl)}
                      className="px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer transition-colors"
                      title="Copy clone URL"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-400" />
                          <span>CLONE</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Language Telemetry & Interactive Terminal Console (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Top Languages Distribution */}
            <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 flex flex-col gap-4 text-left">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center justify-between">
                <span>LANGUAGE DISTRIBUTION</span>
                <span className="text-[10px] text-slate-500">ACCUMULATIVE</span>
              </div>

              {/* Progress split bar */}
              <div className="w-full h-2.5 rounded-full bg-slate-950 flex overflow-hidden border border-slate-800">
                {stats.topLanguages.map((lang) => (
                  <div
                    key={lang.name}
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: lang.color
                    }}
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>

              {/* Languages Legend */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {stats.topLanguages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-slate-300">{lang.name}</span>
                    <span className="text-slate-500 text-[10px]">{lang.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Terminal CLI Console */}
            <div className="terminal-window rounded-2xl p-5 flex flex-col gap-3 text-left font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2 text-xs text-cyan-400">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>laksh-telemetry-cli v2.7</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
              </div>

              {/* Terminal Logs View */}
              <div className="h-44 overflow-y-auto text-[11px] flex flex-col gap-2 pr-1 scrollbar-thin">
                {cliHistory.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-0.5">
                    <div className="text-cyan-300 flex items-center gap-1.5">
                      <span className="text-slate-500">guest@universe:~$</span>
                      <span>{item.command}</span>
                    </div>
                    <div className="text-slate-300 whitespace-pre-wrap pl-4 border-l border-slate-800">
                      {item.output}
                    </div>
                  </div>
                ))}
              </div>

              {/* Command Input Form */}
              <form onSubmit={handleCliSubmit} className="pt-2 border-t border-slate-800 flex items-center gap-2">
                <span className="text-cyan-400 text-xs">$</span>
                <input
                  type="text"
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  placeholder="Type 'help', 'skills', 'projects', 'summary'..."
                  className="flex-1 bg-transparent text-xs text-slate-100 placeholder-slate-600 focus:outline-none font-mono"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-500/40 text-[10px] text-cyan-300 hover:bg-cyan-900 cursor-pointer"
                >
                  EXEC
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
