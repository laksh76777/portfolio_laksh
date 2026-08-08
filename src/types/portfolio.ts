export type SectionId = 'hero' | 'about' | 'skills' | 'missions' | 'github' | 'journey' | 'contact';

export interface ProjectData {
  id: string;
  title: string;
  codename: string;
  category: string;
  year: string;
  tagline: string;
  description: string;
  detailedBullets: string[];
  techStack: string[];
  status: 'MISSION ACTIVE // PRODUCTION' | 'MISSION ACTIVE // DEPLOYED' | 'OPERATIONAL // VERIFIED';
  metrics: {
    label: string;
    value: string;
  }[];
  githubUrl: string;
  liveDemoUrl: string;
  previewImage: string;
  highlights: string[];
  hasInteractiveSimulator: boolean;
  simulatorType?: 'fake-news' | 'inventory-system';
}

export interface SkillItem {
  name: string;
  level: number; // 0-100
  iconName: string;
  category: 'Frontend' | 'Programming' | 'Backend / Database' | 'Tools & Platforms' | 'Core CS';
  color: string;
  experienceYears?: string;
  description: string;
  relatedProjects?: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
  color: string;
  orbitRadius: number;
}

export interface JourneyMilestone {
  id: string;
  year: string;
  date: string;
  title: string;
  location: string;
  role: string;
  description: string;
  checkpointType: 'LAUNCH' | 'ACCELERATION' | 'DEEP_SPACE' | 'EVENT_HORIZON';
  coordinates: string;
  keyAchievements: string[];
  tags: string[];
}

export interface GithubRepo {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  updatedAt: string;
  htmlUrl: string;
  cloneUrl: string;
  topics: string[];
}

export interface GitHubStats {
  username: string;
  profileUrl: string;
  publicRepos: number;
  totalCommitsYear: number;
  followers: number;
  following: number;
  streakDays: number;
  topLanguages: {
    name: string;
    percentage: number;
    color: string;
  }[];
  featuredRepos: GithubRepo[];
}

export interface UniverseCameraState {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}
