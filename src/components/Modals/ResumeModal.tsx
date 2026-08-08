import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE_DATA } from '../../data/profile';
import { GithubIcon, LinkedinIcon, LeetCodeIcon, CodolioIcon } from '../common/Icons';
import {
  X,
  Printer,
  Download,
  ExternalLink,
  Copy,
  Check,
  FileText,
  Mail,
  Phone,
  MapPin,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { universeAudio } from '../../services/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeView, setActiveView] = useState<'paper' | 'embed'>('paper');

  const handlePrint = () => {
    universeAudio.playClickBeep();
    window.print();
  };

  const handleDownload = () => {
    universeAudio.playSuccessChime();
  };

  const handleCopyText = () => {
    universeAudio.playCopySound();
    const resumeText = `LAKSH SUTHAR
Phone: ${PROFILE_DATA.phone} | Email: ${PROFILE_DATA.email} | Location: ${PROFILE_DATA.location}
LinkedIn: ${PROFILE_DATA.links.linkedin} | GitHub: ${PROFILE_DATA.links.github} | LeetCode: ${PROFILE_DATA.links.leetcode} | Codolio: ${PROFILE_DATA.links.codolio}

SUMMARY:
${PROFILE_DATA.bio}

EDUCATION:
JSS Academy of Technical Education, Bengaluru (2023 - 2027)
Bachelor of Engineering in Computer Science and Engineering | CGPA: ${PROFILE_DATA.academicCGPA}

PROJECT EXPERIENCE:
1. Fake News Analysis System (2026)
React, TypeScript, Vite, AI APIs, HTML, CSS
GitHub: ${PROFILE_DATA.links.fakeNewsGithub} | Live: ${PROFILE_DATA.links.fakeNewsLive}

2. AI-Based Inventory Management System (2025)
React, JavaScript, Firebase Firestore, HTML, CSS
GitHub: ${PROFILE_DATA.links.inventoryGithub}

TECHNICAL SKILLS:
Programming: Java, C, Python, JavaScript, TypeScript
Frontend: HTML, CSS, Tailwind CSS, React.js, Next.js, Vite
Backend: Node.js, Express.js, Flask, REST APIs, API Integration
Databases: SQL, Firebase Firestore
Tools: Git, GitHub, VS Code, Firebase, Vercel, Netlify, Canva, Figma
Core CS: Data Structures & Algorithms, OOP, DBMS, OS, Computer Networks, Software Engineering
Soft Skills: Problem Solving, Team Collaboration, Communication, Agile Methodology

CERTIFICATIONS:
- GeeksforGeeks GFG 160 Certification (${PROFILE_DATA.links.gfgCertificate})
- Machine Learning Specialization Stanford University & DeepLearning.AI (${PROFILE_DATA.links.mlCertificate})

ACHIEVEMENTS:
- Solved 100+ Data Structures & Algorithms problems across LeetCode and Codolio.
- Developed and deployed real-world applications (Fake News Analysis & Inventory Management System).
- Maintained CGPA of 8.24/10 in Computer Science and Engineering.`;

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-5xl bg-[#030712] border border-cyan-500/40 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[92vh]"
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
              <div className="flex items-center gap-2 flex-wrap">
                {/* Toggle Paper / PDF Embed View */}
                <div className="hidden sm:flex rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-xs font-mono">
                  <button
                    onClick={() => {
                      universeAudio.playHoverChirp();
                      setActiveView('paper');
                    }}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      activeView === 'paper'
                        ? 'bg-cyan-950 text-cyan-300 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Format View
                  </button>
                  <button
                    onClick={() => {
                      universeAudio.playHoverChirp();
                      setActiveView('embed');
                    }}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                      activeView === 'embed'
                        ? 'bg-cyan-950 text-cyan-300 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span>Raw PDF</span>
                  </button>
                </div>

                {/* Direct Download Button */}
                <a
                  href="/Laksh_Suthar_Resume.pdf"
                  download="Laksh_Suthar_Resume.pdf"
                  onClick={handleDownload}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all cursor-pointer"
                  title="Download Official PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>DOWNLOAD PDF</span>
                </a>

                {/* Open in new tab */}
                <a
                  href="/Laksh_Suthar_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => universeAudio.playClickBeep()}
                  className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 text-xs font-mono transition-colors"
                  title="Open PDF file in new browser tab"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span>NEW TAB</span>
                </a>

                {/* Print button */}
                <button
                  onClick={handlePrint}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Print / Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">PRINT</span>
                </button>

                {/* Copy Text */}
                <button
                  onClick={handleCopyText}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors"
                  title="Copy full resume text"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">COPY</span>
                    </>
                  )}
                </button>

                {/* Close modal */}
                <button
                  onClick={() => {
                    universeAudio.playModalClose();
                    onClose();
                  }}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-rose-400 text-slate-400 hover:text-rose-300 cursor-pointer transition-colors"
                  title="Close resume modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-3 sm:p-6 md:p-8 flex justify-center bg-slate-950/70">
              {activeView === 'embed' ? (
                <div className="w-full h-[75vh] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
                  <iframe
                    src="/Laksh_Suthar_Resume.pdf#toolbar=1"
                    title="Laksh Suthar Official Resume PDF Viewer"
                    className="w-full h-full"
                  />
                </div>
              ) : (
                /* Pixel-Perfect Clean White/Dark Paper Resume */
                <div
                  id="printable-resume"
                  className="w-full max-w-4xl bg-white text-slate-900 p-6 sm:p-10 md:p-12 rounded-2xl shadow-2xl font-serif leading-relaxed text-left selection:bg-cyan-500/30"
                >
                  {/* Top Header */}
                  <div className="text-center pb-4 border-b border-slate-300">
                    <h1 className="text-3xl sm:text-4xl font-sans font-bold text-slate-950 tracking-tight">
                      {PROFILE_DATA.name}
                    </h1>

                    {/* Contact details line */}
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-sans text-slate-700 mt-2">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-cyan-700" />
                        <a href={PROFILE_DATA.links.tel} className="hover:text-cyan-700 hover:underline">
                          {PROFILE_DATA.phone}
                        </a>
                      </span>
                      <span>|</span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-cyan-700" />
                        <a href={PROFILE_DATA.links.emailMailto} className="hover:text-cyan-700 hover:underline">
                          {PROFILE_DATA.email}
                        </a>
                      </span>
                      <span>|</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-cyan-700" />
                        <span>{PROFILE_DATA.location}</span>
                      </span>
                    </div>

                    {/* Social links line */}
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs font-sans text-cyan-800 font-medium mt-1.5">
                      <a
                        href={PROFILE_DATA.links.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 hover:underline text-cyan-800"
                      >
                        <LinkedinIcon className="w-3.5 h-3.5" />
                        <span>LinkedIn</span>
                      </a>
                      <span>|</span>
                      <a
                        href={PROFILE_DATA.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 hover:underline text-cyan-800"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                      <span>|</span>
                      <a
                        href={PROFILE_DATA.links.leetcode}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 hover:underline text-amber-700"
                      >
                        <LeetCodeIcon className="w-3.5 h-3.5" />
                        <span>LeetCode</span>
                      </a>
                      <span>|</span>
                      <a
                        href={PROFILE_DATA.links.codolio}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 hover:underline text-emerald-800"
                      >
                        <CodolioIcon className="w-3.5 h-3.5" />
                        <span>Codolio</span>
                      </a>
                    </div>
                  </div>

                  {/* SUMMARY */}
                  <div className="mt-5">
                    <h2 className="text-sm font-sans font-bold text-slate-950 uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-1.5">
                      SUMMARY
                    </h2>
                    <p className="text-xs sm:text-[13px] font-sans text-slate-800 leading-relaxed">
                      {PROFILE_DATA.bio}
                    </p>
                  </div>

                  {/* EDUCATION */}
                  <div className="mt-5">
                    <h2 className="text-sm font-sans font-bold text-slate-950 uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-2">
                      EDUCATION
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                      <div className="font-sans font-bold text-xs sm:text-sm text-slate-900">
                        {PROFILE_DATA.institution}
                      </div>
                      <div className="font-sans italic text-xs text-slate-600">
                        {PROFILE_DATA.timeline}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-[13px] font-sans text-slate-800 mt-0.5">
                      <div>{PROFILE_DATA.degree}</div>
                      <div className="font-bold text-slate-950">
                        CGPA: {PROFILE_DATA.academicCGPA}
                      </div>
                    </div>
                  </div>

                  {/* PROJECT EXPERIENCE */}
                  <div className="mt-5">
                    <h2 className="text-sm font-sans font-bold text-slate-950 uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-3">
                      PROJECT EXPERIENCE
                    </h2>

                    {/* Fake News Analysis System */}
                    <div className="mb-4">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                        <div className="font-sans font-bold text-xs sm:text-sm text-slate-950">
                          Fake News Analysis System
                        </div>
                        <div className="font-sans italic text-xs text-slate-600">2026</div>
                      </div>

                      <div className="font-sans italic text-xs text-slate-700 mt-0.5">
                        React, TypeScript, Vite, AI APIs, HTML, CSS
                      </div>

                      <div className="flex items-center gap-3 text-xs font-sans text-cyan-800 font-medium mt-0.5">
                        <a
                          href={PROFILE_DATA.links.fakeNewsGithub}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline flex items-center gap-1"
                        >
                          <GithubIcon className="w-3 h-3" />
                          <span>GitHub Repository</span>
                        </a>
                        <span>—</span>
                        <a
                          href={PROFILE_DATA.links.fakeNewsLive}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Live Demo</span>
                        </a>
                      </div>

                      <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-xs sm:text-[12.5px] font-sans text-slate-800 leading-normal">
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

                    {/* Inventory Management System */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                        <div className="font-sans font-bold text-xs sm:text-sm text-slate-950">
                          Inventory Management System
                        </div>
                        <div className="font-sans italic text-xs text-slate-600">2025</div>
                      </div>

                      <div className="font-sans italic text-xs text-slate-700 mt-0.5">
                        React, JavaScript, Firebase, HTML, CSS
                      </div>

                      <div className="flex items-center gap-3 text-xs font-sans text-cyan-800 font-medium mt-0.5">
                        <a
                          href={PROFILE_DATA.links.inventoryGithub}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline flex items-center gap-1"
                        >
                          <GithubIcon className="w-3 h-3" />
                          <span>GitHub Repository</span>
                        </a>
                      </div>

                      <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-xs sm:text-[12.5px] font-sans text-slate-800 leading-normal">
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

                  {/* TECHNICAL SKILLS */}
                  <div className="mt-5">
                    <h2 className="text-sm font-sans font-bold text-slate-950 uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-2">
                      TECHNICAL SKILLS
                    </h2>

                    <div className="space-y-1 text-xs sm:text-[12.5px] font-sans text-slate-800">
                      <div>
                        <span className="font-bold text-slate-950">Programming Languages:</span> Java, C, Python, JavaScript, TypeScript
                      </div>
                      <div>
                        <span className="font-bold text-slate-950">Frontend:</span> HTML, CSS, Tailwind CSS, React.js, Next.js, Vite
                      </div>
                      <div>
                        <span className="font-bold text-slate-950">Backend:</span> Node.js, Express.js, Flask, REST APIs, API Integration
                      </div>
                      <div>
                        <span className="font-bold text-slate-950">Databases:</span> SQL, Firebase Firestore
                      </div>
                      <div>
                        <span className="font-bold text-slate-950">Tools & Platforms:</span> Git, GitHub, VS Code, Firebase, Vercel, Netlify, Canva, Figma
                      </div>
                      <div>
                        <span className="font-bold text-slate-950">Core CS:</span> Data Structures and Algorithm, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, Software Engineering
                      </div>
                      <div>
                        <span className="font-bold text-slate-950">Soft Skills:</span> Problem Solving, Team Collaboration, Communication, Agile Methodology
                      </div>
                    </div>
                  </div>

                  {/* CERTIFICATIONS */}
                  <div className="mt-5">
                    <h2 className="text-sm font-sans font-bold text-slate-950 uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-2">
                      CERTIFICATIONS
                    </h2>

                    <ul className="list-disc list-outside ml-4 space-y-1 text-xs sm:text-[12.5px] font-sans text-slate-800">
                      <li>
                        GeeksforGeeks GFG 160 Certification –{' '}
                        <a
                          href={PROFILE_DATA.links.gfgCertificate}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-800 font-medium hover:underline inline-flex items-center gap-0.5"
                        >
                          <span>Certificate</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </li>
                      <li>
                        Machine Learning Specialization (Stanford University & DeepLearning.AI) –{' '}
                        <a
                          href={PROFILE_DATA.links.mlCertificate}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-800 font-medium hover:underline inline-flex items-center gap-0.5"
                        >
                          <span>Certificate</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* ACHIEVEMENTS */}
                  <div className="mt-5">
                    <h2 className="text-sm font-sans font-bold text-slate-950 uppercase tracking-wider border-b border-slate-400 pb-0.5 mb-2">
                      ACHIEVEMENTS
                    </h2>

                    <ul className="list-disc list-outside ml-4 space-y-1 text-xs sm:text-[12.5px] font-sans text-slate-800">
                      <li>
                        Solved <span className="font-bold text-slate-950">100+ Data Structures and Algorithms problems</span> across{' '}
                        <a
                          href={PROFILE_DATA.links.leetcode}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-800 font-medium hover:underline"
                        >
                          LeetCode
                        </a>{' '}
                        and{' '}
                        <a
                          href={PROFILE_DATA.links.codolio}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-800 font-medium hover:underline"
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
                <span>Verified PDF & Official Academic Record: Laksh Suthar (B.E. CSE)</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/Laksh_Suthar_Resume.pdf"
                  download="Laksh_Suthar_Resume.pdf"
                  onClick={handleDownload}
                  className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-bold text-xs cursor-pointer transition-colors"
                >
                  DOWNLOAD PDF
                </a>
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
