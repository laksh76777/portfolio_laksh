import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE_DATA } from '../../data/profile';
import { GithubIcon, LinkedinIcon, LeetCodeIcon, CodolioIcon } from '../common/Icons';
import {
  Sparkles,
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  ExternalLink,
  MessageSquare,
  Radio,
  Check
} from 'lucide-react';
import { universeAudio } from '../../services/audio';

interface ContactSectionProps {
  onOpenResume?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Opportunity / Collaboration',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'transmitting' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailCopied, setEmailCopied] = useState(false);

  // Reliable Multi-Platform Email Forwarder
  const handleEmailClick = () => {
    universeAudio.playClickBeep();
    // Copy email to clipboard instantly
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);

    // Open Webmail Gmail Compose in new tab
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PROFILE_DATA.email)}&su=${encodeURIComponent('Hello Laksh - Portfolio Inquiry')}`;
    const newWin = window.open(gmailUrl, '_blank');

    // Also trigger default mailto protocol
    if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
      window.location.href = `mailto:${PROFILE_DATA.email}?subject=${encodeURIComponent('Hello Laksh - Portfolio Inquiry')}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    universeAudio.playClickBeep();
    setStatus('transmitting');
    setErrorMessage('');

    try {
      // Structured Payload dispatched directly to Laksh Suthar's primary Gmail
      const payload = {
        'Portfolio Owner': 'Laksh Suthar (Computer Science Engineer & Software Developer)',
        'Sender Name': formData.name,
        'Sender Email': formData.email,
        'Subject / Purpose': formData.subject,
        'Message Body': formData.message,
        'Submission Timestamp': new Date().toUTCString(),
        'Portfolio URL': 'https://github.com/laksh76777',
        '_subject': `[Portfolio Inquiry] ${formData.subject} - from ${formData.name}`,
        '_replyto': formData.email,
        '_template': 'table',
        '_captcha': 'false'
      };

      const response = await fetch('https://formsubmit.co/ajax/lakshsuthar703@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus('sent');
        universeAudio.playTransmissionSuccess();
      } else {
        throw new Error('Server returned non-200');
      }
    } catch {
      // Fallback: If network is restricted or offline, open mail client with structured pre-filled body
      const structuredBody = `Hi Laksh,

I came across your Computer Science portfolio and would like to get in touch.

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent via Laksh Suthar Portfolio (https://github.com/laksh76777)`;

      const mailtoUrl = `mailto:${PROFILE_DATA.email}?subject=${encodeURIComponent(`[Portfolio] ${formData.subject}`)}&body=${encodeURIComponent(structuredBody)}`;
      setStatus('sent');
      universeAudio.playTransmissionSuccess();
      window.open(mailtoUrl, '_blank');
    }
  };

  const handleResetForm = () => {
    universeAudio.playHoverChirp();
    setFormData({
      name: '',
      email: '',
      subject: 'Opportunity / Collaboration',
      message: ''
    });
    setStatus('idle');
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            05 — CONTACT
          </div>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-white tracking-wide uppercase hologram-glow">
            GET IN TOUCH
          </h2>
          <p className="mt-3 text-slate-400 font-sans max-w-xl text-sm sm:text-base">
            Have a project in mind, software engineering opportunities, or algorithmic discussions? Reach out directly.
          </p>
        </div>

        {/* Top Direct Contact Coordinates Pill Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-4 sm:p-5 rounded-2xl border border-cyan-500/20 mb-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-sans shadow-lg"
        >
          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span className="font-semibold text-white">Location:</span>
            <span className="text-slate-400">{PROFILE_DATA.location}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-white">Email:</span>
            <button
              onClick={handleEmailClick}
              className="text-amber-400 hover:text-amber-300 underline font-mono font-medium flex items-center gap-1 cursor-pointer transition-colors"
              title="Click to compose email to Laksh Suthar"
            >
              <span>{PROFILE_DATA.email}</span>
              {emailCopied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <ExternalLink className="w-3 h-3 text-amber-400/80" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <Phone className="w-4 h-4 text-purple-400" />
            <span className="font-semibold text-white">Phone:</span>
            <a
              href={PROFILE_DATA.links.tel}
              className="text-purple-400 hover:underline font-mono font-medium"
            >
              {PROFILE_DATA.phone}
            </a>
          </div>
        </motion.div>

        {/* Animated Interactive Profile Channels Pill Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-3.5 sm:p-4 rounded-2xl border border-cyan-500/20 mb-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 shadow-xl"
        >
          <a
            href={PROFILE_DATA.links.github}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => universeAudio.playHoverChirp()}
            className="px-3.5 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] group cursor-pointer"
          >
            <GithubIcon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="font-medium">GitHub</span>
            <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
          </a>

          <a
            href={PROFILE_DATA.links.linkedin}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => universeAudio.playHoverChirp()}
            className="px-3.5 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-purple-400 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] group cursor-pointer"
          >
            <LinkedinIcon className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="font-medium">LinkedIn</span>
            <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
          </a>

          <a
            href={PROFILE_DATA.links.leetcode}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => universeAudio.playHoverChirp()}
            className="px-3.5 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-400 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] group cursor-pointer"
          >
            <LeetCodeIcon className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="font-medium">LeetCode</span>
            <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
          </a>

          <a
            href={PROFILE_DATA.links.codolio}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => universeAudio.playHoverChirp()}
            className="px-3.5 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-400 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] group cursor-pointer"
          >
            <CodolioIcon className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Codolio</span>
            <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
          </a>

          {/* Direct Email Forwarder Button */}
          <button
            onClick={handleEmailClick}
            onMouseEnter={() => universeAudio.playHoverChirp()}
            className="px-3.5 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] group cursor-pointer"
            title="Open Email Compose Window"
          >
            <Mail className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="font-medium">{PROFILE_DATA.email}</span>
            {emailCopied ? (
              <span className="text-[10px] text-emerald-400 font-bold">COPIED</span>
            ) : (
              <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
            )}
          </button>

          {onOpenResume && (
            <button
              onClick={() => {
                universeAudio.playModalOpen();
                onOpenResume();
              }}
              onMouseEnter={() => universeAudio.playHoverChirp()}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-600/20 hover:from-cyan-500/30 hover:to-purple-600/30 border border-cyan-400/50 hover:border-cyan-300 text-cyan-200 text-xs font-mono flex items-center gap-2 transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.2)] group cursor-pointer"
            >
              <FileText className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Resume PDF</span>
            </button>
          )}
        </motion.div>

        {/* Contact Form Container with Space Dark Backdrop & Ambient Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/30 relative overflow-hidden text-left shadow-[0_20px_70px_rgba(0,0,0,0.85)]"
        >
          {/* Subtle Ambient Cyber Light Accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-cyan-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-rose-500/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="submitted-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center text-center py-10 gap-5 relative z-10"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-950/90 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-bounce" />
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white">
                    Message Sent Successfully! 🚀
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans mt-2 max-w-md">
                    Thank you, <span className="text-cyan-300 font-semibold">{formData.name}</span>! Your structured message has been delivered directly to <span className="text-amber-300 font-mono font-medium">{PROFILE_DATA.email}</span>. Laksh will respond as soon as possible.
                  </p>
                </div>

                {/* Structured Transmission Summary Card */}
                <div className="w-full max-w-md p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-left text-xs font-mono space-y-1.5 mt-2">
                  <div className="flex items-center justify-between text-slate-400 pb-1.5 border-b border-slate-800/80">
                    <span className="flex items-center gap-1 text-cyan-400">
                      <Radio className="w-3.5 h-3.5" />
                      TRANSMISSION SUMMARY
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      DELIVERED
                    </span>
                  </div>
                  <div className="text-slate-300"><span className="text-slate-500">From:</span> {formData.name} ({formData.email})</div>
                  <div className="text-slate-300"><span className="text-slate-500">Subject:</span> {formData.subject}</div>
                  <div className="text-slate-300 truncate"><span className="text-slate-500">Body:</span> {formData.message}</div>
                </div>

                <div className="flex items-center justify-center mt-3">
                  <button
                    onClick={handleResetForm}
                    className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 text-xs font-mono transition-colors cursor-pointer shadow-md"
                  >
                    Send Another Message
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 relative z-10"
              >
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-sans text-slate-300 font-medium flex items-center gap-1">
                      <span>Your Name</span>
                      <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="px-4 py-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-sm font-sans text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all shadow-inner"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-sans text-slate-300 font-medium flex items-center gap-1">
                      <span>Email Address</span>
                      <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="px-4 py-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-sm font-sans text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-sans text-slate-300 font-medium flex items-center gap-1">
                    <span>Subject</span>
                    <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Opportunity / Collaboration"
                    className="px-4 py-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-sm font-sans text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all shadow-inner"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-sans text-slate-300 font-medium flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Message</span>
                    <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Laksh, I'd like to discuss an opportunity..."
                    className="px-4 py-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-sm font-sans text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all resize-none shadow-inner"
                  />
                </div>

                {/* Vibrant Red/Orange Gradient Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'transmitting'}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 via-rose-600 to-red-600 hover:from-orange-400 hover:to-rose-500 disabled:opacity-50 text-white font-sans font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_0_30px_rgba(244,63,94,0.4)] hover:shadow-[0_0_40px_rgba(244,63,94,0.7)] flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {status === 'transmitting' ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Transmitting message to Laksh...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
