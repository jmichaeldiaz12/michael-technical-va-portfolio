import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  tagline: string;
  location: string;
  availability: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string | null;
  shift: {
    timezone: string;
    startHour: number;
    endHour: number;
    label: string;
  };
  siteUrl: string;
}

export type ServiceLevel = "core" | "advanced";

export interface Service {
  slug: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  items: string[];
  level: ServiceLevel;
  outOfScope: string;
}

export type ProjectStatus = "planned" | "in-progress" | "completed";

export interface Project {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  objectives: string[];
  features: string[];
  technologies: string[];
  screenshots: { src: string; alt: string }[];
  githubUrl?: string;
  liveUrl?: string;
  status: ProjectStatus;
}

export interface SkillCategory {
  name: string;
  icon: LucideIcon;
  skills: string[];
}
