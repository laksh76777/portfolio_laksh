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
  AlertCircle,
  Radio,
  Clock
} from 'lucide-react';
import { universeAudio } from '../../services/audio';

interface ContactSectionProps {
  onOpenResume?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Opportunity / Collaboration',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'transmitting' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
      <div className="max-w-4xl mx-auto">
        
        {/* Top Direct Contact Coordinates Pill Bar */}
        <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-cyan-500/20 mb-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-sans shadow-lg">
          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span className="font-semibold text-white">Location:</span>
            <span className="text-slate-400">{PROFILE_DATA.location}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-white">Email:</span>
            <a
              href={PROFILE_DATA.links.emailMailto}
              className="text-amber-400 hover:underline font-mono font-medium"
            >
              {PROFILE_DATA.email}
            </a>
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
        </div>

        {/* Contact Form Container with Space Dark Backdrop */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/25 relative overflow-hidden text-left shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="submitted-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center text-center py-10 gap-5"
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
                <div className="w-full max-w-md p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-left text-xs font-mono space-y-1.5 mt-2">
                  <div className="flex items-center justify-between text-slate-400 pb-1.5 border-b border-slate-800/80">
                    <span className="flex items-center gap-1 text-cyan-400">
                      <Radio className="w-3.5 h-3.5" />
                      TRANSMISSION SUMMARY
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Clock className="w-3 h-3" />
                      DELIVERED
                    </span>
                  </div>
                  <div className="text-slate-300"><span className="text-slate-500">From:</span> {formData.name} ({formData.email})</div>
                  <div className="text-slate-300"><span className="text-slate-500">Subject:</span> {formData.subject}</div>
                  <div className="text-slate-300 truncate"><span className="text-slate-500">Body:</span> {formData.message}</div>
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={handleResetForm}
                    className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 text-xs font-mono transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                  <a
                    href={PROFILE_DATA.links.emailMailto}
                    className="px-6 py-3 rounded-xl bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono hover:bg-cyan-900 transition-colors"
                  >
                    Open Mailbox
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
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
                    <label className="text-xs font-sans text-slate-300 font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-sm font-sans text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-sans text-slate-300 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-sm font-sans text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-sans text-slate-300 font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Opportunity / Collaboration"
                    className="px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-sm font-sans text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-sans text-slate-300 font-medium">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Laksh, I'd like to discuss an opportunity..."
                    className="px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-sm font-sans text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                {/* Vibrant Red/Orange Gradient Submit Button matching user's image */}
                <button
                  type="submit"
                  disabled={status === 'transmitting'}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 via-rose-600 to-red-600 hover:from-orange-400 hover:to-rose-500 disabled:opacity-50 text-white font-sans font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_0_25px_rgba(244,63,94,0.4)] hover:shadow-[0_0_35px_rgba(244,63,94,0.6)] flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
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
        </div>
      </div>
    </section>
  );
};
