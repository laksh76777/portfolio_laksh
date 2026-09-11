import type { ProjectData } from '../types/portfolio';

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
    githubUrl: "https://github.com/laksh76777/fake_news_analysis",
    liveDemoUrl: "https://fake-news-analysiz.vercel.app/",
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
    githubUrl: "https://github.com/laksh76777/Ai-inventory-system",
    liveDemoUrl: "https://github.com/laksh76777/Ai-inventory-system",
    previewImage: "/images/inventory_preview.jpg",
    highlights: [
      "Automated low-stock threshold triggers & warnings",
      "Instant barcode-assisted billing calculation",
      "Real-time synchronized Firestore database state",
      "Interactive stock adjustment telemetry dashboard"
    ],
    hasInteractiveSimulator: true,
    simulatorType: "inventory-system"
  },
  {
    id: "sanjeevani-hospital-management-system",
    title: "Sanjeevani Hospital Management System",
    codename: "PROJECT CARE // HOSPITAL-OPS",
    category: "Full-Stack Healthcare & Patient Experience",
    year: "2026",
    tagline: "Full-stack hospital management platform with patient, doctor, and admin workflows built for appointment and operational efficiency.",
    description: "Developed a full-stack hospital management platform with dedicated patient, doctor, and admin workflows for doctor discovery, appointment booking, schedule management, and hospital administration.",
    detailedBullets: [
      "Built role-based patient, doctor, and admin experiences for doctor discovery, appointment scheduling, and operational management.",
      "Implemented secure authentication and access control using Firebase authentication, token verification, and backend authorization middleware.",
      "Created appointment booking logic with real-time slot availability, conflict validation, and MongoDB compound indexing to prevent duplicate bookings.",
      "Integrated a Gemini AI health assistant to provide symptom guidance, medicine information, and doctor recommendations using live hospital doctor data."
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase", "Gemini AI"],
    status: "MISSION ACTIVE // DEPLOYED",
    metrics: [
      { label: "WORKFLOWS", value: "Patient + Doctor + Admin" },
      { label: "AUTH", value: "Firebase + JWT" },
      { label: "BOOKING", value: "Real-Time Slots" },
      { label: "AI", value: "Gemini Assistant" }
    ],
    githubUrl: "https://github.com/laksh76777/hospital_managment_frontend",
    liveDemoUrl: "https://github.com/laksh76777/hospital_managment_frontend",
    previewImage: "/images/astronaut_hologram.jpg",
    highlights: [
      "Role-based hospital workflows",
      "Secure authentication and protected access",
      "Conflict-safe appointment scheduling",
      "AI-powered health assistant with live data"
    ]
  },
  {
    id: "ai-supply-chain-investigator",
    title: "AI Supply Chain Investigator",
    codename: "PROJECT TRACE // SUPPLY-INTEL",
    category: "AI Analytics & Intelligent Operations",
    year: "2026",
    tagline: "Evidence-driven investigation platform for analyzing supply chain anomalies, dependencies, and downstream business impact.",
    description: "Developed an evidence-driven supply chain investigation platform that ingests and analyzes real-world supply chain datasets to identify operational anomalies, trace dependency paths, and assess downstream business impact.",
    detailedBullets: [
      "Implemented graph-based investigations using Python, Pandas, NetworkX, and React Flow to map relationships across products, shipments, ports, logistics providers, warehouses, and customer orders.",
      "Built statistical anomaly detection and root-cause investigation workflows to distinguish observed data, calculated findings, hypotheses, and simulated outcomes with evidence traceability.",
      "Integrated Gemini AI to generate evidence-grounded investigation summaries, alternative hypotheses, risk explanations, and mitigation strategies without fabricating supply-chain facts.",
      "Delivered what-if disruption simulations, analytical dashboards, secure dataset handling, and Dockerized deployment with automated testing and background job processing."
    ],
    techStack: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "Python", "Pandas", "AWS S3", "Docker"],
    status: "MISSION ACTIVE // DEPLOYED",
    metrics: [
      { label: "INTELLIGENCE", value: "Graph + AI" },
      { label: "ANALYSIS", value: "Anomaly Detection" },
      { label: "EVIDENCE", value: "Traceable Findings" },
      { label: "DEPLOYMENT", value: "Dockerized" }
    ],
    githubUrl: "https://github.com/laksh76777/supply_chain_investigator",
    liveDemoUrl: "https://github.com/laksh76777/supply_chain_investigator",
    previewImage: "/images/astronaut_hologram.jpg",
    highlights: [
      "Graph-based supply chain investigation",
      "Evidence-led analytical workflows",
      "Gemini AI risk and mitigation recommendations",
      "What-if disruption simulation and impact analysis"
    ]
  }
];
