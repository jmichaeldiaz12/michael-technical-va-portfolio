// HOW TO EDIT: `supportProcess` feeds the "support request" steps; `strengths` feeds "Why work with me".
// Strengths are phrased as working commitments, not results - keep them that way.
import {
  Puzzle,
  Search,
  RefreshCw,
  BookOpen,
  MessageSquare,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

export interface ProcessStep {
  title: string;
  description: string;
}

export const supportProcess: ProcessStep[] = [
  { title: "Intake", description: "You describe the issue; I confirm details and scope." },
  { title: "Diagnose", description: "I reproduce and isolate the root cause." },
  { title: "Resolve", description: "I apply and verify the fix." },
  {
    title: "Document",
    description: "You get a short written summary of what was done and how to prevent it.",
  },
];

export interface Strength {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const strengths: Strength[] = [
  {
    title: "Problem-solving",
    icon: Puzzle,
    description: "I work through issues methodically, isolating the cause before changing anything.",
  },
  {
    title: "Attention to detail",
    icon: Search,
    description: "I double-check settings and results so small mistakes don't become bigger problems.",
  },
  {
    title: "Technical adaptability",
    icon: RefreshCw,
    description:
      "I'm comfortable working across Windows, networks, websites, and automations as needs change.",
  },
  {
    title: "Willingness to learn",
    icon: BookOpen,
    description: "If something is new to me, I research it properly and tell you what I find.",
  },
  {
    title: "Reliable communication",
    icon: MessageSquare,
    description: "I keep you updated in plain language and say so early if something is out of scope.",
  },
  {
    title: "Professionalism",
    icon: Briefcase,
    description: "I respect your time, your data, and the schedule we agree on.",
  },
];
