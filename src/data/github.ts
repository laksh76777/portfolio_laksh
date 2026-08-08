import type { GitHubStats } from '../types/portfolio';

export const GITHUB_STATS_FALLBACK: GitHubStats = {
  username: "laksh76777",
  profileUrl: "https://github.com/laksh76777",
  publicRepos: 8,
  totalCommitsYear: 240,
  followers: 12,
  following: 15,
  streakDays: 32,
  topLanguages: [
    { name: "TypeScript", percentage: 40, color: "#3178c6" },
    { name: "JavaScript", percentage: 30, color: "#f7df1e" },
    { name: "Java", percentage: 18, color: "#f89820" },
    { name: "Python", percentage: 8, color: "#3776ab" },
    { name: "HTML/CSS", percentage: 4, color: "#38bdf8" }
  ],
  featuredRepos: [
    {
      name: "fake_news_analysis",
      description: "Real-time AI-powered news credibility prediction and linguistic authenticity scoring web application built with React, TypeScript, Vite, and AI APIs.",
      language: "TypeScript",
      languageColor: "#3178c6",
      stars: 12,
      forks: 4,
      updatedAt: "Live on Vercel",
      htmlUrl: "https://github.com/laksh76777/fake_news_analysis",
      cloneUrl: "git clone https://github.com/laksh76777/fake_news_analysis.git",
      topics: ["react", "typescript", "ai-api", "fake-news-detector", "vite", "tailwind"]
    },
    {
      name: "Ai-inventory-system",
      description: "Automated warehouse inventory tracking platform with Firebase Firestore real-time synchronization, barcode billing, and smart low-stock alert monitoring.",
      language: "JavaScript",
      languageColor: "#f7df1e",
      stars: 10,
      forks: 3,
      updatedAt: "Production Ready",
      htmlUrl: "https://github.com/laksh76777/Ai-inventory-system",
      cloneUrl: "git clone https://github.com/laksh76777/Ai-inventory-system.git",
      topics: ["firebase", "firestore", "inventory-management", "react", "barcode-scanner"]
    }
  ]
};
