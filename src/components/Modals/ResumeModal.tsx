import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  Mail,
  Phone,
  MapPin,
  Eye,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { universeAudio } from '../../services/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [activeView, setActiveView] = useState<'paper' | 'embed'>('paper');

  const handleDownload = () => {
    universeAudio.playSuccessChime();
    
    // Direct multi-fallback download mechanism
    try {
      const link = document.createElement('a');
      link.href = '/Laksh_Suthar_Resume.pdf';
      link.download = 'Laksh_Suthar_Resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      window.open('/Laksh_Suthar_Resume.pdf', '_blank');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/90 backdrop-blur-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-5xl bg-[#030712] border border-cyan-500/40 rounded-3xl shadow-[0_25px_90px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[94vh]"
          >
            {/* Modal Top Control Bar */}
            <div className="p-3 sm:p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_12px_rgba(56,189,248,0.3)]">
                  <FileText className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span>LAKSH SUTHAR — OFFICIAL RESUME</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 hidden sm:inline">
                      VERIFIED 2026-2027
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-cyan-400">
                    B.E. Computer Science and Engineering • CGPA: 8.24/10
                  </div>
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="flex items-center gap-2.5">
                {/* View Switcher (Visual Paper vs PDF Embed) */}
                <div className="flex rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-xs font-mono">
                  <button
                    onClick={() => {
                      universeAudio.playHoverChirp();
                      setActiveView('paper');
                    }}
                    className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                      activeView === 'paper'
                        ? 'bg-cyan-950 text-cyan-300 font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Visual Paper</span>
                  </button>

                  <button
                    onClick={() => {
                      universeAudio.playHoverChirp();
                      setActiveView('embed');
                    }}
                    className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                      activeView === 'embed'
                        ? 'bg-cyan-950 text-cyan-300 font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>PDF Viewer</span>
                  </button>
                </div>

                {/* Instant Download Button */}
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-orbitron font-bold text-xs flex items-center gap-1.5 shadow-[0_0_18px_rgba(56,189,248,0.45)] transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                  title="Download Official PDF"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD PDF</span>
                </button>

                {/* Close Button */}
                <button
                  onClick={() => {
                    universeAudio.playModalClose();
                    onClose();
                  }}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-rose-400 text-slate-400 hover:text-rose-300 cursor-pointer transition-colors"
                  title="Close resume modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body with Smooth Scrolling & Full Page Height */}
            <div className="overflow-y-auto p-3 sm:p-6 md:p-8 flex justify-center bg-slate-950/80">
              {activeView === 'embed' ? (
                <div className="w-full h-[78vh] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-inner">
                  <iframe
                    src="/Laksh_Suthar_Resume.pdf#toolbar=1"
                    title="Laksh Suthar Official Resume PDF Viewer"
                    className="w-full h-full"
                  />
                </div>
              ) : (
                /* Pixel-Perfect Clean Full White Paper Resume matching LaTeX Specification */
                <div
                  id="printable-resume"
                  className="w-full max-w-4xl bg-white text-slate-900 p-6 sm:p-10 md:p-12 rounded-2xl shadow-2xl font-serif leading-relaxed text-left selection:bg-blue-100 flex flex-col gap-4 pb-12"
                >
                  {/* Top Header */}
                  <div className="text-center pb-2">
                    <h1 className="text-3xl sm:text-4xl font-sans font-bold text-slate-950 tracking-tight">
                      Laksh Suthar
                    </h1>

                    {/* Contact Details Line 1 */}
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-[13px] font-sans text-slate-700 mt-2">
                      <a
                        href="tel:+919024005934"
                        className="text-[#0066cc] hover:underline flex items-center gap-1 font-medium"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#0066cc]" />
                        <span>+91-9024005934</span>
                      </a>
                      <span className="text-slate-400">|</span>
                      <a
                        href="mailto:lakshsuthar703@gmail.com"
                        className="text-[#0066cc] hover:underline flex items-center gap-1 font-medium"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#0066cc]" />
                        <span>lakshsuthar703@gmail.com</span>
                      </a>
                      <span className="text-slate-400">|</span>
                      <span className="flex items-center gap-1 text-[#0066cc] font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#0066cc]" />
                        <span className="text-slate-800 font-normal">Bengaluru, Karnataka</span>
                      </span>
                    </div>

                    {/* Contact Details Line 2 (Social links) */}
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-[13px] font-sans text-[#0066cc] font-medium mt-1">
                      <a
                        href="https://linkedin.com/in/laksh-suthar"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 hover:underline text-[#0066cc]"
                      >
                        <LinkedinIcon className="w-3.5 h-3.5" />
                        <span>LinkedIn</span>
                      </a>
                      <span className="text-slate-400">|</span>
                      <a
                        href="https://github.com/laksh76777"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 hover:underline text-[#0066cc]"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                      <span className="text-slate-400">|</span>
                      <a
                        href="https://lakshsutharportfolio.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 hover:underline text-[#0066cc]"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Portfolio</span>
                      </a>
                    </div>
                  </div>

                  {/* SUMMARY SECTION */}
                  <div>
                    <h2 className="text-sm sm:text-base font-sans font-bold text-slate-950 uppercase tracking-wide border-b border-slate-900 pb-0.5 mb-1.5">
                      Summary
                    </h2>
                    <p className="text-xs sm:text-[12.5px] font-sans text-slate-800 leading-relaxed text-justify">
                      Final-year Computer Science Engineering student (Expected Graduation: May 2027) with hands-on experience building scalable full-stack applications using Java, Python, React.js, TypeScript, and Firebase. Strong foundation in Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, and Software Engineering.
                    </p>
                  </div>

                  {/* EDUCATION SECTION */}
                  <div>
                    <h2 className="text-sm sm:text-base font-sans font-bold text-slate-950 uppercase tracking-wide border-b border-slate-900 pb-0.5 mb-1.5">
                      Education
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                      <div className="font-sans font-bold text-xs sm:text-sm text-slate-950">
                        JSS Academy of Technical Education, Bengaluru
                      </div>
                      <div className="font-sans italic text-xs text-slate-700">
                        2023 – 2027
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[12.5px] font-sans text-slate-800 mt-0.5">
                      <div>Bachelor of Engineering in Computer Science and Engineering</div>
                      <div className="font-bold text-slate-950">
                        CGPA: 8.24/10
                      </div>
                    </div>
                  </div>

                  {/* PROJECT EXPERIENCE SECTION */}
                  <div>
                    <h2 className="text-sm sm:text-base font-sans font-bold text-slate-950 uppercase tracking-wide border-b border-slate-900 pb-0.5 mb-2">
                      Project Experience
                    </h2>

                    {/* 1. Fake News Analysis System */}
                    <div className="mb-3">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                        <div className="font-sans font-bold text-xs sm:text-sm text-slate-950">
                          Fake News Analysis System
                        </div>
                        <div className="font-sans italic text-xs text-slate-700">2026</div>
                      </div>

                      <div className="font-sans italic text-xs text-slate-700 mt-0.5">
                        React, TypeScript, Vite, AI APIs, HTML, CSS
                      </div>

                      <div className="flex items-center gap-2 text-xs font-sans text-[#0066cc] font-medium mt-0.5">
                        <a
                          href="https://github.com/laksh76777/fake_news_analysis"
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline flex items-center gap-1"
                        >
                          <GithubIcon className="w-3 h-3" />
                          <span>GitHub Repository</span>
                        </a>
                        <span className="text-slate-400">|</span>
                        <a
                          href="https://fake-news-analysiz.vercel.app/"
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Live Demo</span>
                        </a>
                      </div>

                      <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs sm:text-[12px] font-sans text-slate-800 leading-normal">
                        <li>
                          Developed a React-based Fake News Analysis System that analyzes news articles in real time and generates authenticity scores using AI APIs.
                        </li>
                        <li>
                          Built an interactive frontend using React and TypeScript, providing users with real-time news credibility predictions.
                        </li>
                        <li>
                          Integrated external AI APIs to analyze news content and generate authenticity scores with detailed insights.
                        </li>
                        <li>
                          Designed a responsive and user-friendly interface using Vite, HTML, and CSS to enhance accessibility and performance.
                        </li>
                        <li>
                          Applied component-based architecture and API integration to deliver a scalable and maintainable web application.
                        </li>
                      </ul>
                    </div>

                    {/* 2. Inventory Management System */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                        <div className="font-sans font-bold text-xs sm:text-sm text-slate-950">
                          Inventory Management System
                        </div>
                        <div className="font-sans italic text-xs text-slate-700">2025</div>
                      </div>

                      <div className="font-sans italic text-xs text-slate-700 mt-0.5">
                        React, JavaScript, Firebase, HTML, CSS
                      </div>

                      <div className="flex items-center gap-2 text-xs font-sans text-[#0066cc] font-medium mt-0.5">
                        <a
                          href="https://github.com/laksh76777/Ai-inventory-system"
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline flex items-center gap-1"
                        >
                          <GithubIcon className="w-3 h-3" />
                          <span>GitHub Repository</span>
                        </a>
                      </div>

                      <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs sm:text-[12px] font-sans text-slate-800 leading-normal">
                        <li>
                          Developed an inventory management system to automate product tracking and stock management.
                        </li>
                        <li>
                          Implemented real-time inventory updates using Firebase, ensuring synchronized data across users.
                        </li>
                        <li>
                          Added low-stock alerts and inventory monitoring features to improve stock availability and operational efficiency.
                        </li>
                        <li>
                          Designed responsive dashboards for managing products, inventory status, and stock updates.
                        </li>
                        <li>
                          Utilized React and Firebase to build a scalable, user-friendly web application for efficient inventory management.
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* TECHNICAL SKILLS SECTION */}
                  <div>
                    <h2 className="text-sm sm:text-base font-sans font-bold text-slate-950 uppercase tracking-wide border-b border-slate-900 pb-0.5 mb-1.5">
                      Technical Skills
                    </h2>

                    <div className="grid grid-cols-1 gap-1 text-xs sm:text-[12px] font-sans text-slate-800">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                        <span className="font-bold text-slate-950 min-w-[170px]">Programming Languages:</span>
                        <span>Java, C, Python, JavaScript, TypeScript</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                        <span className="font-bold text-slate-950 min-w-[170px]">Frontend:</span>
                        <span>HTML, CSS, Tailwind CSS, React.js, Next.js, Vite</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                        <span className="font-bold text-slate-950 min-w-[170px]">Backend:</span>
                        <span>REST , API Integration</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                        <span className="font-bold text-slate-950 min-w-[170px]">Databases:</span>
                        <span>SQL, Firebase Firestore</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                        <span className="font-bold text-slate-950 min-w-[170px]">Tools & Platforms:</span>
                        <span>Git, GitHub, VS Code, Firebase, Vercel, Netlify, Canva, Figma</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                        <span className="font-bold text-slate-950 min-w-[170px]">Core CS:</span>
                        <span>Data Structures and Algorithm, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, Software Engineering</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                        <span className="font-bold text-slate-950 min-w-[170px]">Soft Skills:</span>
                        <span>Problem Solving, Team Collaboration, Communication, Agile Methodology</span>
                      </div>
                    </div>
                  </div>

                  {/* CERTIFICATIONS SECTION */}
                  <div>
                    <h2 className="text-sm sm:text-base font-sans font-bold text-slate-950 uppercase tracking-wide border-b border-slate-900 pb-0.5 mb-1.5">
                      Certifications
                    </h2>

                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs sm:text-[12px] font-sans text-slate-800">
                      <li>
                        GeeksforGeeks GFG 160 Certification –{' '}
                        <a
                          href="https://media.geeksforgeeks.org/courses/certificates/3238cc41b5a93fbb7dd0be5d7b792502.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#0066cc] font-medium hover:underline inline-flex items-center gap-0.5"
                        >
                          <span>Certificate</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </li>
                      <li>
                        Machine Learning Specialization (Stanford University & DeepLearning.AI) –{' '}
                        <a
                          href="https://coursera.org/share/85633875685312d69aa9b9fb3455df8e"
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#0066cc] font-medium hover:underline inline-flex items-center gap-0.5"
                        >
                          <span>Certificate</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* ACHIEVEMENTS SECTION */}
                  <div>
                    <h2 className="text-sm sm:text-base font-sans font-bold text-slate-950 uppercase tracking-wide border-b border-slate-900 pb-0.5 mb-1.5">
                      Achievements
                    </h2>

                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs sm:text-[12px] font-sans text-slate-800">
                      <li>
                        Solved <span className="font-bold text-slate-950">100+ Data Structures and Algorithms problems</span> across{' '}
                        <a
                          href="https://leetcode.com/u/laksh076/"
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#0066cc] font-medium hover:underline"
                        >
                          LeetCode
                        </a>{' '}
                        and{' '}
                        <a
                          href="https://codolio.com/profile/Laksh14"
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#0066cc] font-medium hover:underline"
                        >
                          Codolio
                        </a>.
                      </li>
                      <li>
                        Developed and deployed real-world projects including a <span className="font-bold text-slate-950">Fake News Analysis System</span> and an <span className="font-bold text-slate-950">Inventory Management System</span> using React, TypeScript, Firebase, and AI APIs.
                      </li>
                      <li>
                        Maintained a CGPA of <span className="font-bold text-slate-950">8.24/10</span> in Computer Science and Engineering.
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Status Bar */}
            <div className="p-3.5 sm:p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Official Resume • Laksh Suthar (B.E. CSE, 8.24 CGPA)</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownload}
                  className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-bold text-xs cursor-pointer transition-colors"
                >
                  DOWNLOAD PDF
                </button>
                <button
                  onClick={() => {
                    universeAudio.playModalClose();
                    onClose();
                  }}
                  className="px-4 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 text-xs cursor-pointer transition-colors"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
