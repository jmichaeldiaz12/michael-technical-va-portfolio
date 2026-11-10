// HOW TO EDIT: each category is one card on /skills. Skills are listed without ratings on purpose.
import { Monitor, Network, Headset, Server, Code, Workflow } from "lucide-react";
import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    name: "Operating Systems",
    icon: Monitor,
    skills: ["Windows", "Software installation", "Troubleshooting"],
  },
  { name: "Networking", icon: Network, skills: ["LAN", "IP addressing", "DNS", "DHCP"] },
  {
    name: "IT Support",
    icon: Headset,
    skills: ["Hardware diagnostics", "Remote desktop support", "Technical troubleshooting"],
  },
  {
    name: "System Administration",
    icon: Server,
    skills: ["Server administration", "System maintenance"],
  },
  { name: "Web Development", icon: Code, skills: ["HTML", "CSS", "JavaScript", "Next.js"] },
  {
    name: "Automation",
    icon: Workflow,
    skills: ["Workflow automation", "No-code automation tools", "Google Workspace"],
  },
];
