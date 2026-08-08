import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Sparkles, Check, AlertTriangle, Cpu, Play } from 'lucide-react';
import { universeAudio } from '../../services/audio';

const SAMPLE_HEADLINES = [
  {
    text: "Research consortium publishes peer-reviewed findings on renewable solar efficiency gains.",
    type: "Legitimate Research",
    veracity: 94,
    bias: "Low (12%)",
    sentiment: "Neutral / Objective",
    flags: ["Verified Source Network", "Empirical Data Cited", "No Hyperbolic Clickbait"]
  },
  {
    text: "Secret miracle pill guarantees instant 30-pound weight loss in 48 hours without exercise!",
    type: "Deceptive Misinformation",
    veracity: 18,
    bias: "Extreme (92%)",
    sentiment: "Hyperbolic / Sensational",
    flags: ["Unsubstantiated Medical Claim", "Urgency Manipulation", "Blacklisted Affiliate Pattern"]
  },
  {
    text: "Autonomous spacecraft completes orbital insertion maneuver around outer moons.",
    type: "Verified Space Telemetry",
    veracity: 98,
    bias: "Neutral (6%)",
    sentiment: "Factual / Technical",
    flags: ["Telemetry Timestamped", "Agency Consensus", "High Linguistic Integrity"]
  }
];

export const FakeNewsInteractiveSim: React.FC = () => {
  const [headline, setHeadline] = useState(SAMPLE_HEADLINES[0].text);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(SAMPLE_HEADLINES[0]);

  const handleScan = (customText?: string) => {
    const textToScan = customText || headline;
    universeAudio.playHoverChirp();
    setIsScanning(true);

    setTimeout(() => {
      // Find matching or calculate procedural veracity
      const found = SAMPLE_HEADLINES.find((s) => s.text.toLowerCase() === textToScan.toLowerCase());
      if (found) {
        setResult(found);
      } else {
        // Procedural prediction based on keywords
        const isClickbait = /miracle|secret|shocking|guarantee|free money|alien/i.test(textToScan);
        setResult({
          text: textToScan,
          type: isClickbait ? "High Misinformation Risk" : "Likely Authentic / Moderate Trust",
          veracity: isClickbait ? 22 : 86,
          bias: isClickbait ? "High (84%)" : "Low (16%)",
          sentiment: isClickbait ? "Sensationalist" : "Informative",
          flags: isClickbait
            ? ["Sensationalism Detected", "Lack of Verifiable Sources", "Emotional Urgency"]
            : ["Consistent Syntax", "Neutral Tone", "Standard Narrative Structure"]
        });
      }
      setIsScanning(false);
      universeAudio.playHolographicChime();
    }, 900);
  };

  const handleSelectSample = (sample: typeof SAMPLE_HEADLINES[0]) => {
    setHeadline(sample.text);
    handleScan(sample.text);
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-950/90 border border-cyan-500/30 text-left flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs font-orbitron font-bold text-white">
            LIVE AI VERACITY SIMULATOR
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
          REACT + TS + AI API
        </span>
      </div>

      {/* Input query field */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-mono text-slate-400 uppercase">
          Enter News Article Headline or Text Sample:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Type or paste any news article snippet..."
            className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={() => handleScan()}
            disabled={isScanning || !headline.trim()}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-orbitron font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-[0_0_15px_rgba(56,189,248,0.4)]"
          >
            {isScanning ? (
              <>
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>SCANNING...</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>RUN SCAN</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick sample headline pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] font-mono text-slate-500">Quick Samples:</span>
        {SAMPLE_HEADLINES.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectSample(s)}
            className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-500/40 text-[10px] font-mono text-slate-300 transition-colors cursor-pointer truncate max-w-[180px]"
          >
            {s.type}
          </button>
        ))}
      </div>

      {/* Real-time AI Results Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={result.text + result.veracity}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 p-4 rounded-xl bg-slate-900/70 border border-cyan-500/20 flex flex-col gap-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {result.veracity >= 70 ? (
                <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/50 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-rose-950 border border-rose-500/50 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-rose-400" />
                </div>
              )}
              <div>
                <div className="text-xs font-mono text-slate-400">AUTHENTICITY VERDICT</div>
                <div className={`text-sm font-space font-bold ${result.veracity >= 70 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {result.type}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-400">CREDIBILITY SCORE</div>
              <div className="text-2xl font-orbitron font-extrabold text-cyan-300">
                {result.veracity}%
              </div>
            </div>
          </div>

          {/* Credibility progress bar */}
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className={`h-full transition-all duration-700 ${
                result.veracity >= 70
                  ? 'bg-gradient-to-r from-cyan-400 to-emerald-400'
                  : 'bg-gradient-to-r from-amber-500 to-rose-500'
              }`}
              style={{ width: `${result.veracity}%` }}
            />
          </div>

          {/* Detailed metrics breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] font-mono mt-1">
            <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
              <span className="text-slate-500 block">BIAS COEFFICIENT:</span>
              <span className="text-slate-200 font-semibold">{result.bias}</span>
            </div>
            <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
              <span className="text-slate-500 block">LINGUISTIC TONE:</span>
              <span className="text-slate-200 font-semibold">{result.sentiment}</span>
            </div>
            <div className="p-2 rounded bg-slate-950/70 border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-slate-500 block">RESPONSE TIME:</span>
              <span className="text-cyan-300 font-semibold">320ms (Real-Time)</span>
            </div>
          </div>

          {/* AI Detection Flags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {result.flags.map((flag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300 flex items-center gap-1"
              >
                {result.veracity >= 70 ? (
                  <Check className="w-2.5 h-2.5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-2.5 h-2.5 text-rose-400" />
                )}
                {flag}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
