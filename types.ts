export interface SocialLink {
  platform: string;
  username: string;
  url: string;
  iconName: string; // Helper to map to Lucide icons
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  description: string;
  skills: string[];
  logo: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string; // Optional link to repo or demo
  imageUrl?: string;
}

export interface Achievement {
  title: string;
  organization: string;
  year: string;
  description: string;
}

export interface Article {
  title: string;
  platform: string;
  date: string;
  description: string;
  link: string;
}
