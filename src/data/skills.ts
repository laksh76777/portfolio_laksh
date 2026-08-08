import type { SkillCategory, SkillItem } from '../types/portfolio';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    description: "Responsive, component-driven, high-performance interfaces with state management.",
    color: "#38bdf8",
    orbitRadius: 180,
    skills: [
      {
        name: "React.js",
        level: 90,
        iconName: "Atom",
        category: "Frontend",
        color: "#61dafb",
        experienceYears: "2+ yrs",
        description: "Component architecture, hooks, state synchronization, custom hooks, and interactive UI.",
        relatedProjects: ["Fake News Analysis", "Inventory Management System"]
      },
      {
        name: "TypeScript",
        level: 85,
        iconName: "FileCode2",
        category: "Frontend",
        color: "#3178c6",
        experienceYears: "2+ yrs",
        description: "Strict static typing, interfaces, generics, API contract safety, and refactoring confidence.",
        relatedProjects: ["Fake News Analysis"]
      },
      {
        name: "JavaScript",
        level: 90,
        iconName: "Flame",
        category: "Frontend",
        color: "#f7df1e",
        experienceYears: "3+ yrs",
        description: "ES6+, async/await, DOM APIs, event loop, functional patterns, and modular design.",
        relatedProjects: ["Inventory Management System", "Fake News Analysis"]
      },
      {
        name: "Tailwind CSS",
        level: 88,
        iconName: "Palette",
        category: "Frontend",
        color: "#38bdf8",
        experienceYears: "2+ yrs",
        description: "Utility-first design systems, dark mode palettes, responsive layouts, glassmorphism UI."
      },
      {
        name: "HTML5 & CSS3",
        level: 95,
        iconName: "Code",
        category: "Frontend",
        color: "#e34f26",
        experienceYears: "3+ yrs",
        description: "Semantic HTML structure, modern flexbox/grid layouts, animations, and accessible web standards."
      },
      {
        name: "Vite",
        level: 88,
        iconName: "Zap",
        category: "Frontend",
        color: "#646cff",
        experienceYears: "2+ yrs",
        description: "Ultra-fast bundling, hot module replacement, optimized production chunk splitting.",
        relatedProjects: ["Fake News Analysis"]
      },
      {
        name: "Next.js",
        level: 78,
        iconName: "Layers",
        category: "Frontend",
        color: "#ffffff",
        experienceYears: "1+ yr",
        description: "Server-side rendering, routing architecture, metadata, and modern React full-stack patterns."
      }
    ]
  },
  {
    title: "Programming Languages",
    description: "Core algorithmic thinking, systems programming, and high-performance computation.",
    color: "#a855f7",
    orbitRadius: 260,
    skills: [
      {
        name: "Java",
        level: 90,
        iconName: "Coffee",
        category: "Programming",
        color: "#f89820",
        experienceYears: "3+ yrs",
        description: "Object-Oriented Programming (OOP), Data Structures & Algorithms, Collections Framework, Multithreading.",
        relatedProjects: ["100+ LeetCode DSA Solutions"]
      },
      {
        name: "Python",
        level: 85,
        iconName: "Terminal",
        category: "Programming",
        color: "#3776ab",
        experienceYears: "2+ yrs",
        description: "Machine Learning scripts, AI API scripting, data manipulation, algorithm prototyping.",
        relatedProjects: ["Stanford ML Specialization"]
      },
      {
        name: "C Programming",
        level: 80,
        iconName: "Cpu",
        category: "Programming",
        color: "#a8b9cc",
        experienceYears: "2+ yrs",
        description: "Memory management, pointers, low-level data structures, system calls, algorithm fundamentals."
      },
      {
        name: "TypeScript / JS",
        level: 88,
        iconName: "Braces",
        category: "Programming",
        color: "#3178c6",
        experienceYears: "2+ yrs",
        description: "Full-stack scripting, async event-driven architecture, and modern JavaScript engines."
      }
    ]
  },
  {
    title: "Backend & Database",
    description: "Real-time synchronization, database modeling, RESTful API architecture, and cloud data.",
    color: "#10b981",
    orbitRadius: 340,
    skills: [
      {
        name: "Firebase Firestore",
        level: 88,
        iconName: "Database",
        category: "Backend / Database",
        color: "#ffca28",
        experienceYears: "2+ yrs",
        description: "Real-time document databases, security rules, low-stock listeners, cloud data sync across devices.",
        relatedProjects: ["Inventory Management System"]
      },
      {
        name: "SQL / MySQL",
        level: 82,
        iconName: "Server",
        category: "Backend / Database",
        color: "#00758f",
        experienceYears: "2+ yrs",
        description: "Relational database modeling, complex JOIN queries, normalization (1NF-BCNF), schema design."
      },
      {
        name: "REST APIs & Integration",
        level: 88,
        iconName: "Webhook",
        category: "Backend / Database",
        color: "#38bdf8",
        experienceYears: "2+ yrs",
        description: "HTTP verbs, authentication, JSON payload streaming, third-party AI API orchestration.",
        relatedProjects: ["Fake News Analysis", "Inventory Management System"]
      },
      {
        name: "Node.js & Express.js",
        level: 80,
        iconName: "Box",
        category: "Backend / Database",
        color: "#68a063",
        experienceYears: "1+ yr",
        description: "Microservice endpoints, routing middleware, authentication, and backend server logic."
      },
      {
        name: "Flask",
        level: 75,
        iconName: "Activity",
        category: "Backend / Database",
        color: "#000000",
        experienceYears: "1+ yr",
        description: "Python micro-framework for serving AI predictions and machine learning endpoints."
      }
    ]
  },
  {
    title: "Tools & Platforms",
    description: "Version control, CI/CD deployment pipelines, modern IDEs, and UI design prototyping.",
    color: "#f59e0b",
    orbitRadius: 420,
    skills: [
      {
        name: "Git",
        level: 90,
        iconName: "GitBranch",
        category: "Tools & Platforms",
        color: "#f05032",
        experienceYears: "3+ yrs",
        description: "Branching strategies, interactive rebasing, merge conflict resolution, commit hygiene."
      },
      {
        name: "GitHub",
        level: 90,
        iconName: "Github",
        category: "Tools & Platforms",
        color: "#ffffff",
        experienceYears: "3+ yrs",
        description: "Repository management, Pull Requests, code reviews, open-source workflows."
      },
      {
        name: "Vercel & Netlify",
        level: 88,
        iconName: "Cloud",
        category: "Tools & Platforms",
        color: "#000000",
        experienceYears: "2+ yrs",
        description: "Automated continuous deployment, preview environments, custom domains, edge routing."
      },
      {
        name: "VS Code",
        level: 95,
        iconName: "AppWindow",
        category: "Tools & Platforms",
        color: "#007acc",
        experienceYears: "3+ yrs",
        description: "Integrated debugging, TypeScript LSP, snippet acceleration, keybinding mastery."
      },
      {
        name: "Figma & Canva",
        level: 80,
        iconName: "PenTool",
        category: "Tools & Platforms",
        color: "#f24e1e",
        experienceYears: "2+ yrs",
        description: "Wireframing, UI layout prototyping, user journey mapping, and visual asset composition."
      }
    ]
  },
  {
    title: "Core Computer Science",
    description: "Academic bedrock and foundational engineering discipline.",
    color: "#ec4899",
    orbitRadius: 500,
    skills: [
      {
        name: "Data Structures & Algorithms",
        level: 92,
        iconName: "Binary",
        category: "Core CS",
        color: "#ec4899",
        description: "Trees, Graphs, DP, Sorting, Searching, Hashing, Heaps, Graph traversals."
      },
      {
        name: "Object-Oriented Programming (OOP)",
        level: 90,
        iconName: "Boxes",
        category: "Core CS",
        color: "#8b5cf6",
        description: "Polymorphism, Inheritance, Encapsulation, Abstraction, SOLID Principles."
      },
      {
        name: "Database Management Systems (DBMS)",
        level: 88,
        iconName: "HardDrive",
        category: "Core CS",
        color: "#06b6d4",
        description: "ACID properties, indexing, transactions, relational algebra, SQL optimization."
      },
      {
        name: "Operating Systems",
        level: 85,
        iconName: "Cpu",
        category: "Core CS",
        color: "#10b981",
        description: "Process synchronization, deadlock prevention, virtual memory, threads, CPU scheduling."
      },
      {
        name: "Computer Networks",
        level: 84,
        iconName: "Network",
        category: "Core CS",
        color: "#3b82f6",
        description: "OSI / TCP/IP model, routing protocols, DNS, TLS/SSL, HTTP/2, socket communication."
      },
      {
        name: "Software Engineering",
        level: 88,
        iconName: "Workflow",
        category: "Core CS",
        color: "#f59e0b",
        description: "SDLC, Agile/Scrum, testing paradigms, code quality, architectural patterns."
      }
    ]
  }
];

export const ALL_SKILLS: SkillItem[] = SKILL_CATEGORIES.flatMap(c => c.skills);
