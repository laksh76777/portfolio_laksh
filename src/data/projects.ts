import { ProjectData } from '../types/portfolio';

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: "fake-news-analysis-system",
    title: "Fake News Analysis System",
    codename: "PROJECT VERACITY // AI-SCANNER",
    category: "Artificial Intelligence & Web Engineering",
    year: "2026",
    tagline: "Real-time AI-powered news credibility prediction & linguistic authenticity scoring platform.",
    description: "Developed a React and TypeScript-based Fake News Analysis System that parses news articles and user submissions in real time, querying AI APIs to generate authenticity confidence scores, bias alerts, and linguistic veracity breakdowns.",
    detailedBullets: [
      "Built a high-performance interactive frontend using React and TypeScript, delivering real-time news credibility predictions with sub-second feedback.",
      "Integrated external AI APIs to deeply inspect news articles, linguistic syntax, source reputation, and sentiment divergence to produce explainable authenticity scores.",
      "Engineered an intuitive visual dashboard with Vite, HTML5, and CSS3 to maximize accessibility, responsiveness, and clear signal interpretation.",
      "Implemented a modular component-based architecture with robust error boundaries, request throttling, and resilient API fallback mechanisms."
    ],
    techStack: ["React.js", "TypeScript", "Vite", "AI APIs", "REST Integration", "HTML5", "CSS3 / Tailwind"],
    status: "MISSION ACTIVE // DEPLOYED",
    metrics: [
      { label: "CREDIBILITY ENGINE", value: "Real-Time AI" },
      { label: "SUBMISSION LATENCY", value: "< 450ms" },
      { label: "EXPLAINABILITY", value: "Multi-Vector Analysis" },
      { label: "ARCHITECTURE", value: "Component-Driven" }
    ],
    githubUrl: "https://github.com/LakshSuthar/Fake-News-Analysis-System",
    liveDemoUrl: "https://fake-news-analysis-laksh.vercel.app",
    previewImage: "/images/fake_news_preview.jpg",
    highlights: [
      "Real-time news credibility calculation",
      "Explainable AI bias & sentiment indicators",
      "Interactive holographic veracity scan matrix",
      "Full TypeScript type-safety across API contracts"
    ],
    hasInteractiveSimulator: true,
    simulatorType: "fake-news"
  },
  {
    id: "inventory-management-system",
    title: "AI-Based Inventory Management System",
    codename: "PROJECT NEXUS // STOCK-SYNC",
    category: "Full-Stack Web & Real-Time Cloud Systems",
    year: "2025",
    tagline: "Automated inventory tracking system with Firebase real-time synchronization, barcode billing, and smart low-stock alerts.",
    description: "Engineered a full-stack inventory management web application to automate warehouse product tracking, stock replenishment, and barcode-based customer checkout, backed by synchronized Firebase Firestore real-time cloud data.",
    detailedBullets: [
      "Developed an automated product tracking and stock management suite to streamline warehouse operations and catalog organization.",
      "Implemented real-time data synchronization using Firebase Firestore listeners, ensuring zero-latency inventory updates across concurrent multi-user terminals.",
      "Constructed proactive low-stock alert systems and threshold monitoring to eliminate stockouts and elevate operational fulfillment speed.",
      "Designed responsive, high-density telemetry dashboards with React, JavaScript, and CSS for lightning-fast product lookup, barcode billing, and stock analytics."
    ],
    techStack: ["React.js", "JavaScript", "Firebase Firestore", "Barcode Scanning", "REST APIs", "HTML5", "CSS3"],
    status: "MISSION ACTIVE // PRODUCTION",
    metrics: [
      { label: "CLOUD SYNC", value: "Firebase Real-Time" },
      { label: "DATA CONCURRENCY", value: "Multi-User Ready" },
      { label: "STOCK AUTOMATION", value: "Low-Stock Alerts" },
      { label: "CHECKOUT SPEED", value: "Barcode Billing" }
    ],
    githubUrl: "https://github.com/LakshSuthar/Inventory-Management-System",
    liveDemoUrl: "https://inventory-management-laksh.vercel.app",
    previewImage: "/images/inventory_preview.jpg",
    highlights: [
      "Automated low-stock threshold triggers & warnings",
      "Instant barcode-assisted billing calculation",
      "Real-time synchronized Firestore database state",
      "Interactive stock adjustment telemetry dashboard"
    ],
    hasInteractiveSimulator: true,
    simulatorType: "inventory-system"
  }
];
