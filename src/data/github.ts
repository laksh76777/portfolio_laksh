import type { GitHubStats } from '../types/portfolio';

export const GITHUB_STATS_FALLBACK: GitHubStats = {
  username: "LakshSuthar",
  profileUrl: "https://github.com/LakshSuthar",
  publicRepos: 12,
  totalCommitsYear: 384,
  followers: 24,
  following: 18,
  streakDays: 42,
  topLanguages: [
    { name: "TypeScript", percentage: 38, color: "#3178c6" },
    { name: "JavaScript", percentage: 28, color: "#f7df1e" },
    { name: "Java", percentage: 18, color: "#f89820" },
    { name: "Python", percentage: 11, color: "#3776ab" },
    { name: "HTML/CSS", percentage: 5, color: "#38bdf8" }
  ],
  featuredRepos: [
    {
      name: "Fake-News-Analysis-System",
      description: "Real-time AI-powered news credibility prediction and authenticity scoring web application built with React, TypeScript, and AI APIs.",
      language: "TypeScript",
      languageColor: "#3178c6",
      stars: 14,
      forks: 5,
      updatedAt: "Updated 2 days ago",
      htmlUrl: "https://github.com/LakshSuthar/Fake-News-Analysis-System",
      cloneUrl: "git clone https://github.com/LakshSuthar/Fake-News-Analysis-System.git",
      topics: ["react", "typescript", "ai-api", "fake-news-detector", "vite"]
    },
    {
      name: "Inventory-Management-System",
      description: "Automated warehouse inventory management platform with Firebase Firestore real-time synchronization, barcode billing, and low-stock telemetry.",
      language: "JavaScript",
      languageColor: "#f7df1e",
      stars: 18,
      forks: 7,
      updatedAt: "Updated 1 week ago",
      htmlUrl: "https://github.com/LakshSuthar/Inventory-Management-System",
      cloneUrl: "git clone https://github.com/LakshSuthar/Inventory-Management-System.git",
      topics: ["firebase", "firestore", "inventory-management", "react", "barcode-scanner"]
    },
    {
      name: "DSA-LeetCode-Solutions",
      description: "Clean, verified Java and C++ solutions for 100+ LeetCode, Codolio, and GeeksforGeeks algorithmic challenges.",
      language: "Java",
      languageColor: "#f89820",
      stars: 22,
      forks: 9,
      updatedAt: "Updated this week",
      htmlUrl: "https://github.com/LakshSuthar/DSA-LeetCode-Solutions",
      cloneUrl: "git clone https://github.com/LakshSuthar/DSA-LeetCode-Solutions.git",
      topics: ["data-structures", "algorithms", "leetcode", "java", "gfg-160"]
    },
    {
      name: "Stanford-ML-Specialization-Labs",
      description: "Supervised and unsupervised machine learning algorithms, neural network implementations, and model evaluation notebooks.",
      language: "Python",
      languageColor: "#3776ab",
      stars: 12,
      forks: 4,
      updatedAt: "Updated recently",
      htmlUrl: "https://github.com/LakshSuthar/Stanford-ML-Specialization-Labs",
      cloneUrl: "git clone https://github.com/LakshSuthar/Stanford-ML-Specialization-Labs.git",
      topics: ["machine-learning", "deeplearning-ai", "stanford", "python", "neural-networks"]
    }
  ]
};
