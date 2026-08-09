import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
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
  Code,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { universeAudio } from '../../services/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeView, setActiveView] = useState<'paper' | 'raw' | 'embed'>('paper');

  const handlePrint = () => {
    universeAudio.playClickBeep();
    window.print();
  };

  const handleDownload = () => {
    universeAudio.playSuccessChime();
    
    // Multi-fallback download strategy to guarantee instantaneous PDF file download
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

  const latexResumeCode = `\\documentclass[11pt,a4paper]{article}
\\usepackage{fontawesome5}
\\usepackage[left=1.25cm,right=1.25cm,top=0.8cm,bottom=0.8cm]{geometry}
\\usepackage{enumitem}
\\usepackage{xcolor}
\\usepackage[hidelinks]{hyperref}
\\usepackage{titlesec}

\\definecolor{linkblue}{RGB}{0,102,204}

\\hypersetup{
    colorlinks=true,
    urlcolor=linkblue
}

\\setlength{\\parindent}{0pt}
\\pagenumbering{gobble}

\\titleformat{\\section}{\\large\\bfseries\\uppercase}{}{0em}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{6pt}{3pt}

\\setlist[itemize]{
leftmargin=*,
itemsep=1pt,
topsep=1pt,
parsep=0pt,
partopsep=0pt
}

\\begin{document}

%==================== HEADER ====================%
\\begin{center}
{\\LARGE \\textbf{Laksh Suthar}}\\\\[6pt]

\\small
\\href{tel:+919024005934}{\\textcolor{linkblue}{\\faPhone\\ +91-9024005934}}
\\hspace{0.8em}$|$\\hspace{0.8em}
\\href{mailto:lakshsuthar703@gmail.com}{\\textcolor{linkblue}{\\faEnvelope\\ lakshsuthar703@gmail.com}}
\\hspace{0.8em}$|$\\hspace{0.8em}
\\textcolor{linkblue}{\\faMapMarker*}\\ Bengaluru, Karnataka

\\\\[2pt]

\\href{https://linkedin.com/in/laksh-suthar}{\\textcolor{linkblue}{\\faLinkedin\\ LinkedIn}}
\\hspace{1em}$|$\\hspace{1em}
\\href{https://github.com/laksh76777}{\\textcolor{linkblue}{\\faGithub\\ GitHub}}
\\hspace{1em}$|$\\hspace{1em}
\\href{https://lakshsutharportfolio.vercel.app/}{\\textcolor{linkblue}{\\faGlobe\\ Portfolio}}

\\end{center}

\\vspace{-3mm}

%==================== SUMMARY ====================%
\\section*{Summary}

Final-year Computer Science Engineering student (Expected Graduation: May 2027) with hands-on experience building scalable full-stack applications using Java, Python, React.js, TypeScript, and Firebase. Strong foundation in Data Structures \\& Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, and Software Engineering.

%==================== EDUCATION ====================%
\\section*{Education}

\\textbf{JSS Academy of Technical Education, Bengaluru} \\hfill \\textit{2023 -- 2027}\\\\
Bachelor of Engineering in Computer Science and Engineering \\hfill \\textbf{CGPA: 8.24/10}

%==================== PROJECT EXPERIENCE ====================%
\\section*{Project Experience}

\\textbf{Fake News Analysis System} \\hfill \\textit{2026}\\\\
\\textit{React, TypeScript, Vite, AI APIs, HTML, CSS}\\\\
\\href{https://github.com/laksh76777/fake_news_analysis}{GitHub Repository}
\\quad|\\quad
\\href{https://fake-news-analysiz.vercel.app/}{Live Demo}

\\begin{itemize}
\\item Developed a React-based Fake News Analysis System that analyzes news articles in real time and generates authenticity scores using AI APIs.
\\item Built an interactive frontend using React and TypeScript, providing users with real-time news credibility predictions.
\\item Integrated external AI APIs to analyze news content and generate authenticity scores with detailed insights.
\\item Designed a responsive and user-friendly interface using Vite, HTML, and CSS to enhance accessibility and performance.
\\item Applied component-based architecture and API integration to deliver a scalable and maintainable web application.
\\end{itemize}

\\vspace{1mm}

\\textbf{Inventory Management System} \\hfill \\textit{2025}\\\\
\\textit{React, JavaScript, Firebase, HTML, CSS}\\\\
\\href{https://github.com/laksh76777/Ai-inventory-system}{GitHub Repository}

\\begin{itemize}
\\item Developed an inventory management system to automate product tracking and stock management.
\\item Implemented real-time inventory updates using Firebase, ensuring synchronized data across users.
\\item Added low-stock alerts and inventory monitoring features to improve stock availability and operational efficiency.
\\item Designed responsive dashboards for managing products, inventory status, and stock updates.
\\item Utilized React and Firebase to build a scalable, user-friendly web application for efficient inventory management.
\\end{itemize}

%==================== TECHNICAL SKILLS ====================%
\\section*{Technical Skills}

\\begin{tabular}{@{}ll}
\\textbf{Programming Languages:} & Java, C, Python, JavaScript, TypeScript \\\\[2pt]

\\textbf{Frontend:} & HTML, CSS, Tailwind CSS, React.js, Next.js, Vite \\\\[2pt]

\\textbf{Backend:} & REST , API Integration \\\\[2pt]

\\textbf{Databases:} & SQL, Firebase Firestore \\\\[2pt]

\\textbf{Tools \\& Platforms:} & Git, GitHub, VS Code, Firebase, Vercel, Netlify, Canva, Figma \\\\[2pt]

% \\textbf{Core CS:} & DSA, OOPS,DBMS,Operating Systems,Software Engineering, Computer Networks \\\\
\\textbf{Core CS:} & Data Structures and Algorithm, Object-Oriented Programming, \\\\
& Database Management Systems, Operating Systems, Computer Networks, \\\\
& Software Engineering\\\\[2pt]

\\textbf{Soft Skills:} & Problem Solving, Team Collaboration, Communication, Agile Methodology
\\end{tabular}
%==================== CERTIFICATIONS ====================%
\\section*{Certifications}

\\begin{itemize}
    \\item{GeeksforGeeks GFG 160 Certification} --
    \\href{https://media.geeksforgeeks.org/courses/certificates/3238cc41b5a93fbb7dd0be5d7b792502.pdf}{Certificate}

    \\item {Machine Learning Specialization (Stanford University \\& DeepLearning.AI)} --
    \\href{https://coursera.org/share/85633875685312d69aa9b9fb3455df8e}{Certificate}
\\end{itemize}

%==================== ACHIEVEMENTS ====================%
\\section*{Achievements}

\\begin{itemize}
    \\item Solved \\textbf{100+ Data Structures and Algorithms problems} across
    \\href{https://leetcode.com/u/laksh076/}{LeetCode} and
    \\href{https://codolio.com/profile/Laksh14}{Codolio}.

    \\item Developed and deployed real-world projects including a \\textbf{Fake News Analysis System} and an \\textbf{Inventory Management System} using React, TypeScript, Firebase, and AI APIs.
    \\item Maintained a CGPA of \\textbf{8.24/10} in Computer Science and Engineering.
\\end{itemize}
\\end{document}`;

  const handleCopyCode = () => {
    universeAudio.playClickBeep();
    navigator.clipboard.writeText(latexResumeCode);
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
                {/* 3 View Mode Selectors */}
                <div className="flex rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-xs font-mono">
                  <button
                    onClick={() => {
                      universeAudio.playHoverChirp();
                      setActiveView('paper');
                    }}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                      activeView === 'paper'
                        ? 'bg-cyan-950 text-cyan-300 font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span>Visual Paper</span>
                  </button>

                  <button
                    onClick={() => {
                      universeAudio.playHoverChirp();
                      setActiveView('raw');
                    }}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                      activeView === 'raw'
                        ? 'bg-cyan-950 text-cyan-300 font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Code className="w-3 h-3" />
                    <span>Raw LaTeX</span>
                  </button>

                  <button
                    onClick={() => {
                      universeAudio.playHoverChirp();
                      setActiveView('embed');
                    }}
                    className={`hidden sm:flex items-center gap-1 px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      activeView === 'embed'
                        ? 'bg-cyan-950 text-cyan-300 font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3 h-3" />
                    <span>PDF Stream</span>
                  </button>
                </div>

                {/* Instant Download Button */}
                <button
                  onClick={handleDownload}
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-orbitron font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all cursor-pointer transform hover:-translate-y-0.5"
                  title="Download Official PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>DOWNLOAD PDF</span>
                </button>

                {/* Print button */}
                <button
                  onClick={handlePrint}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Print / Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">PRINT</span>
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
            <div className="overflow-y-auto p-3 sm:p-6 md:p-8 flex justify-center bg-slate-950/75">
              {activeView === 'embed' ? (
                <div className="w-full h-[75vh] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-inner">
                  <iframe
                    src="/Laksh_Suthar_Resume.pdf#toolbar=1"
                    title="Laksh Suthar Official Resume PDF Viewer"
                    className="w-full h-full"
                  />
                </div>
              ) : activeView === 'raw' ? (
                /* Raw LaTeX / Monospace View with line numbers & syntax box */
                <div className="w-full max-w-4xl flex flex-col gap-3 text-left">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                    <span className="flex items-center gap-2 text-cyan-400">
                      <Code className="w-4 h-4" />
                      <span>Laksh_Suthar_Resume.tex (Official Document Source)</span>
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="px-3 py-1 rounded-md bg-cyan-950 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900 flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">COPIED TO CLIPBOARD</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>COPY RAW CODE</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="p-5 rounded-2xl bg-[#010409] border border-slate-800 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed selection:bg-cyan-500/30 selection:text-white shadow-2xl">
                    <code>{latexResumeCode}</code>
                  </pre>
                </div>
              ) : (
                /* Pixel-Perfect Clean White Paper Resume matching user LaTeX Template */
                <div
                  id="printable-resume"
                  className="w-full max-w-4xl bg-white text-slate-900 p-6 sm:p-10 md:p-12 rounded-2xl shadow-2xl font-serif leading-relaxed text-left selection:bg-blue-100"
                >
                  {/* Top Header */}
                  <div className="text-center pb-3">
                    <h1 className="text-3xl sm:text-4xl font-sans font-bold text-slate-950 tracking-tight">
                      Laksh Suthar
                    </h1>

                    {/* Contact details line 1 */}
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-[13px] font-sans text-slate-700 mt-2">
                      <a
                        href="tel:+919024005934"
                        className="text-[#0066cc] hover:underline flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#0066cc]" />
                        <span>+91-9024005934</span>
                      </a>
                      <span className="text-slate-400">|</span>
                      <a
                        href="mailto:lakshsuthar703@gmail.com"
                        className="text-[#0066cc] hover:underline flex items-center gap-1"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#0066cc]" />
                        <span>lakshsuthar703@gmail.com</span>
                      </a>
                      <span className="text-slate-400">|</span>
                      <span className="flex items-center gap-1 text-[#0066cc]">
                        <MapPin className="w-3.5 h-3.5 text-[#0066cc]" />
                        <span className="text-slate-800">Bengaluru, Karnataka</span>
                      </span>
                    </div>

                    {/* Contact details line 2 (Social links) */}
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

                  {/* SUMMARY */}
                  <div className="mt-4">
                    <h2 className="text-base font-sans font-bold text-slate-950 uppercase tracking-wide border-b border-slate-950 pb-0.5 mb-1.5">
                      SUMMARY
                    </h2>
                    <p className="text-xs sm:text-[12.5px] font-sans text-slate-800 leading-relaxed text-justify">
                      Final-year Computer Science Engineering student (Expected Graduation: May 2027) with hands-on experience building scalable full-stack applications using Java, Python, React.js, TypeScript, and Firebase. Strong foundation in Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, and Software Engineering.
                    </p>
                  </div>

                  {/* EDUCATION */}
                  <div className="mt-4">
                    <h2 className="text-base font-sans font-bold text-slate-950 uppercase tracking-wide border-b border-slate-950 pb-0.5 mb-1.5">
                      EDUCATION
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

                  {/* PROJECT EXPERIENCE */}
                  <div className="mt-4">
                    <h2 className="text-base font-sans font-bold text-slate-950 uppercase tracking-wide border-b border-slate-950 pb-0.5 mb-2">
                      PROJECT EXPERIENCE
                    </h2>

                    {/* Fake News Analysis System */}
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

                    {/* Inventory Management System */}
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

                  {/* TECHNICAL SKILLS */}
                  <div className="mt-4">
                    <h2 className="text-base font-sans font-bold text-slate-950 uppercase tracking-wide border-b border-slate-950 pb-0.5 mb-1.5">
                      TECHNICAL SKILLS
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

                  {/* CERTIFICATIONS */}
                  <div className="mt-4">
                    <h2 className="text-base font-sans font-bold text-slate-950 uppercase tracking-wide border-b border-slate-950 pb-0.5 mb-1.5">
                      CERTIFICATIONS
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

                  {/* ACHIEVEMENTS */}
                  <div className="mt-4">
                    <h2 className="text-base font-sans font-bold text-slate-950 uppercase tracking-wide border-b border-slate-950 pb-0.5 mb-1.5">
                      ACHIEVEMENTS
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
