import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE_DATA } from '../../data/profile';
import {
  Sparkles,
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Copy,
  Check,
  Radio,
  FileText,
  Github,
  Linkedin,
  Code
} from 'lucide-react';
import { universeAudio } from '../../services/audio';

interface ContactSectionProps {
  onOpenResume: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Full-Stack / Software Engineering Collaboration',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'transmitting' | 'sent' | 'error'>('idle');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [transmissionReceipt, setTransmissionReceipt] = useState<{
    id: string;
    timestamp: string;
    hash: string;
  } | null>(null);

  const handleCopy = (field: string, text: string) => {
    universeAudio.playHoverChirp();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    universeAudio.playHoverChirp();
    setStatus('transmitting');

    // Simulate real network submission with receipt generation
    setTimeout(() => {
      const receipt = {
        id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toUTCString(),
        hash: `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
      };
      setTransmissionReceipt(receipt);
      setStatus('sent');
      universeAudio.playTransmissionSuccess();
    }, 1400);
  };

  const handleResetForm = () => {
    universeAudio.playHoverChirp();
    setFormData({
      name: '',
      email: '',
      subject: 'Full-Stack / Software Engineering Collaboration',
      message: ''
    });
    setStatus('idle');
    setTransmissionReceipt(null);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            SECTION 06 // TRANSMISSION
          </div>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-white tracking-wide uppercase hologram-glow">
            ESTABLISH CONNECTION
          </h2>
          <p className="mt-3 text-slate-400 font-sans max-w-xl text-sm sm:text-base">
            Transmit a direct quantum signal for software engineering opportunities, technical collaborations, or system architecture discussions.
          </p>
        </div>

        {/* Contact Grid: Transmission Deck (Left 7 cols) & Orbital Coordinates (Right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Holographic Transmission Form Deck (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/25 relative overflow-hidden text-left">
            <AnimatePresence mode="wait">
              {status === 'sent' && transmissionReceipt ? (
                <motion.div
                  key="receipt"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                        SIGNAL TRANSMISSION SUCCESSFUL
                      </div>
                      <h3 className="text-xl font-orbitron font-bold text-white">
                        Packet Delivered to Laksh Suthar
                      </h3>
                    </div>
                  </div>

                  {/* Holographic transmission receipt card */}
                  <div className="p-5 rounded-2xl bg-slate-950/90 border border-cyan-500/30 font-mono text-xs flex flex-col gap-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">TRANSMISSION ID:</span>
                      <span className="text-cyan-300 font-bold">{transmissionReceipt.id}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">SENDER NAME:</span>
                      <span className="text-white">{formData.name}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">RETURN FREQUENCY:</span>
                      <span className="text-cyan-300">{formData.email}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">UTC TIMESTAMP:</span>
                      <span className="text-slate-300">{transmissionReceipt.timestamp}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">QUANTUM HASH:</span>
                      <span className="text-purple-300 font-mono text-[10px]">{transmissionReceipt.hash}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-sans font-light leading-relaxed">
                    Thank you for reaching out! Your transmission has been queued into Laksh's priority inbox (<span className="text-cyan-300">{PROFILE_DATA.email}</span>). A prompt response will follow shortly.
                  </p>

                  <button
                    onClick={handleResetForm}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 text-xs font-mono transition-colors cursor-pointer self-start flex items-center gap-2"
                  >
                    <span>Transmit Another Message</span>
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
                      <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                      <span>QUANTUM TRANSMISSION CONSOLE</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      SECURE 256-BIT CHANNEL
                    </span>
                  </div>

                  {/* Name and Email fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider">
                        Your Identification / Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Mercer"
                        className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider">
                        Your Return Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject Priority Selector */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider">
                      Transmission Objective
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-400 transition-colors"
                    >
                      <option value="Full-Stack / Software Engineering Collaboration">
                        Full-Stack / Software Engineering Opportunity
                      </option>
                      <option value="AI & Web Development Project Inquiry">
                        AI & Web Development Project Inquiry
                      </option>
                      <option value="Technical Interview / Recruitment">
                        Technical Interview / Recruitment
                      </option>
                      <option value="General Engineering Discussion">
                        General Engineering Discussion
                      </option>
                    </select>
                  </div>

                  {/* Message textarea */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-mono text-slate-300 uppercase tracking-wider">
                      Transmission Payload / Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Type your message, role specifications, project details, or questions here..."
                      className="px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={status === 'transmitting'}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 disabled:opacity-50 text-white font-orbitron font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {status === 'transmitting' ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-spin" />
                        <span>TRANSMITTING SIGNAL ACROSS UNIVERSE...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>TRANSMIT SIGNAL</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Direct Orbital Coordinates & Contacts (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5 text-left">
            
            {/* Direct Email Card */}
            <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">DIRECT EMAIL</div>
                    <a
                      href={PROFILE_DATA.links.emailMailto}
                      className="text-xs sm:text-sm font-mono font-bold text-white hover:text-cyan-300 transition-colors"
                    >
                      {PROFILE_DATA.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy('email', PROFILE_DATA.email)}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 cursor-pointer"
                  title="Copy email address"
                >
                  {copiedField === 'email' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Direct Phone Card */}
            <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-500/40 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">PHONE / MOBILE</div>
                    <a
                      href={PROFILE_DATA.links.tel}
                      className="text-xs sm:text-sm font-mono font-bold text-white hover:text-purple-300 transition-colors"
                    >
                      {PROFILE_DATA.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy('phone', PROFILE_DATA.phone)}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-purple-300 cursor-pointer"
                  title="Copy phone number"
                >
                  {copiedField === 'phone' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Location Coordinates Card */}
            <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">LOCATION BASE</div>
                <div className="text-xs sm:text-sm font-space font-semibold text-white">
                  {PROFILE_DATA.location}
                </div>
                <div className="text-[10px] font-mono text-cyan-400">
                  {PROFILE_DATA.coordinates}
                </div>
              </div>
            </div>

            {/* Social Grid Links */}
            <div className="grid grid-cols-3 gap-2">
              <a
                href={PROFILE_DATA.links.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl glass-panel border border-slate-800 hover:border-cyan-400 text-center flex flex-col items-center gap-1.5 transition-all text-xs font-mono text-slate-300 hover:text-white"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub</span>
              </a>

              <a
                href={PROFILE_DATA.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl glass-panel border border-slate-800 hover:border-purple-400 text-center flex flex-col items-center gap-1.5 transition-all text-xs font-mono text-slate-300 hover:text-white"
              >
                <Linkedin className="w-4 h-4 text-purple-400" />
                <span>LinkedIn</span>
              </a>

              <a
                href={PROFILE_DATA.links.leetcode}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl glass-panel border border-slate-800 hover:border-amber-400 text-center flex flex-col items-center gap-1.5 transition-all text-xs font-mono text-slate-300 hover:text-white"
              >
                <Code className="w-4 h-4 text-amber-400" />
                <span>LeetCode</span>
              </a>
            </div>

            {/* Resume Trigger Banner */}
            <button
              onClick={onOpenResume}
              className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/80 to-purple-950/80 border border-cyan-400/40 hover:border-cyan-300 flex items-center justify-between cursor-pointer transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)]"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-xs font-orbitron font-bold text-white">VIEW OFFICIAL RESUME</div>
                  <div className="text-[10px] font-mono text-slate-400">PDF • B.E. Computer Science 2027</div>
                </div>
              </div>
              <span className="text-xs font-mono text-cyan-300 font-bold">OPEN →</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
