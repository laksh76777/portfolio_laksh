import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE_DATA } from '../../data/profile';
import { X, Printer } from 'lucide-react';
import { universeAudio } from '../../services/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    universeAudio.playHoverChirp();
    window.print();
  };

  const handleCopySummary = () => {
    universeAudio.playHoverChirp();
    navigator.clipboard.writeText(PROFILE_DATA.bio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-4xl bg-[#030712] border border-cyan-500/40 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Modal Header Bar */}
            <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center">
                  <span className="text-cyan-400 font-orbitron font-bold">✦</span>
                </div>
                <div>
                  <div className="text-xs font-orbitron font-bold text-white uppercase tracking-wider">
                    OFFICIAL RESUME // LAKSH SUTHAR
                  </div>
                  <div className="text-[10px] font-mono text-cyan-400">
                    B.E. Computer Science Engineering • 2023 – 2027
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Print / Save PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">PRINT / PDF</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-rose-400 text-slate-400 hover:text-rose-300 cursor-pointer transition-colors"
                  title="Close resume modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Document Body */}
            <div className="p-6 sm:p-10 overflow-y-auto font-sans text-slate-200 flex flex-col gap-6 text-left selection:bg-cyan-500/20">
              
              {/* Header Details */}
              <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-orbitron font-black text-white">
                    {PROFILE_DATA.name}
                  </h1>
                  <div className="text-sm font-mono text-cyan-400 mt-0.5">
                    {PROFILE_DATA.phone} | {PROFILE_DATA.email} | {PROFILE_DATA.location}
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs font-mono text-slate-400">
                    <a
                      href={PROFILE_DATA.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-cyan-300 underline"
                    >
                      LinkedIn
                    </a>
                    <span>•</span>
                    <a
                      href={PROFILE_DATA.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-cyan-300 underline"
                    >
                      GitHub
                    </a>
                    <span>•</span>
                    <a
                      href={PROFILE_DATA.links.leetcode}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-cyan-300 underline"
                    >
                      LeetCode
                    </a>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 text-right sm:text-center self-stretch sm:self-auto">
                  <div className="text-[10px] font-mono text-cyan-400">ACADEMIC CGPA</div>
                  <div className="text-xl font-orbitron font-extrabold text-white">
                    {PROFILE_DATA.academicCGPA}
                  </div>
                </div>
              </div>

              {/* SUMMARY */}
              <div className="flex flex-col gap-2">
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center justify-between border-b border-slate-800 pb-1">
                  <span>SUMMARY</span>
                  <button
                    onClick={handleCopySummary}
                    className="text-[10px] font-normal text-slate-400 hover:text-cyan-300 cursor-pointer"
                  >
                    {copied ? 'Copied!' : 'Copy Summary'}
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {PROFILE_DATA.bio}
                </p>
              </div>

              {/* EDUCATION */}
              <div className="flex flex-col gap-2">
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-1">
                  EDUCATION
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
                  <div>
                    <div className="text-sm font-space font-bold text-white">
                      {PROFILE_DATA.institution}
                    </div>
                    <div className="text-xs text-slate-400">
                      {PROFILE_DATA.degree}
                    </div>
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    2023 – 2027 | CGPA: {PROFILE_DATA.academicCGPA}
                  </div>
                </div>
              </div>

              {/* PROJECT EXPERIENCE */}
              <div className="flex flex-col gap-4">
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-1">
                  PROJECT EXPERIENCE
                </div>

                {/* Fake News Analysis */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="text-sm font-space font-bold text-white">
                      Fake News Analysis System (2026)
                    </div>
                    <span className="text-xs font-mono text-cyan-300">
                      React, TypeScript, Vite, AI APIs, HTML, CSS
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 font-light">
                    <li>Developed a React-based Fake News Analysis System that analyzes news articles in real time and generates authenticity scores using AI APIs.</li>
                    <li>Built an interactive frontend using React and TypeScript, providing users with real-time news credibility predictions.</li>
                    <li>Integrated external AI APIs to analyze news content and generate authenticity scores with detailed insights.</li>
                    <li>Designed a responsive and user-friendly interface using Vite, HTML, and CSS to enhance accessibility and performance.</li>
                    <li>Applied component-based architecture and API integration to deliver a scalable and maintainable web application.</li>
                  </ul>
                </div>

                {/* Inventory Management System */}
                <div className="flex flex-col gap-1.5 pt-2">
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="text-sm font-space font-bold text-white">
                      Inventory Management System (2025)
                    </div>
                    <span className="text-xs font-mono text-cyan-300">
                      React, JavaScript, Firebase, HTML, CSS
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 font-light">
                    <li>Developed an inventory management system to automate product tracking and stock management.</li>
                    <li>Implemented real-time inventory updates using Firebase, ensuring synchronized data across users.</li>
                    <li>Added low-stock alerts and inventory monitoring features to improve stock availability and operational efficiency.</li>
                    <li>Designed responsive dashboards for managing products, inventory status, and stock updates.</li>
                    <li>Utilized React and Firebase to build a scalable, user-friendly web application for efficient inventory management.</li>
                  </ul>
                </div>
              </div>

              {/* TECHNICAL SKILLS */}
              <div className="flex flex-col gap-2">
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-1">
                  TECHNICAL SKILLS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-slate-500">Programming:</span> Java, C, Python, JavaScript, TypeScript
                  </div>
                  <div>
                    <span className="text-slate-500">Frontend:</span> React.js, Next.js, TypeScript, HTML, CSS, Tailwind CSS, Vite
                  </div>
                  <div>
                    <span className="text-slate-500">Backend / DB:</span> Node.js, Express.js, Flask, REST APIs, SQL, Firebase Firestore
                  </div>
                  <div>
                    <span className="text-slate-500">Tools:</span> Git, GitHub, VS Code, Firebase, Vercel, Netlify, Figma, Canva
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500">Core CS:</span> Data Structures & Algorithms, OOP, DBMS, OS, Computer Networks, Software Engineering
                  </div>
                </div>
              </div>

              {/* CERTIFICATIONS & ACHIEVEMENTS */}
              <div className="flex flex-col gap-2">
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest border-b border-slate-800 pb-1">
                  CERTIFICATIONS & ACHIEVEMENTS
                </div>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 font-light">
                  <li>GeeksforGeeks GFG 160 Certification – Mastery of 160 Core Algorithms and Data Structures.</li>
                  <li>Machine Learning Specialization (Stanford University & DeepLearning.AI) – Supervised & Unsupervised Learning by Andrew Ng.</li>
                  <li>Solved 100+ Data Structures and Algorithms problems across LeetCode and Codolio.</li>
                  <li>Maintained a strong CGPA of 8.24/10 in Computer Science and Engineering.</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">
                LAKSH SUTHAR • VERIFIED RESUME RECORD
              </span>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-bold text-xs cursor-pointer transition-colors"
              >
                CLOSE RESUME
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
