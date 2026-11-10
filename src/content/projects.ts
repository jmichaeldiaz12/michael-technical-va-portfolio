// HOW TO EDIT: each entry is one demo project shown on /projects and /projects/[slug].
// `status`: "planned" | "in-progress" | "completed". Only mark "completed" once it is really built.
// Add real `screenshots` ({ src: "/projects/<slug>/<file>.png", alt } — files go in public/projects/<slug>/), `githubUrl`, and `liveUrl` when published.
import type { Project } from "@/types";

// TODO: add githubUrl / liveUrl / screenshots when published
export const projects: Project[] = [
  {
    slug: "windows-troubleshooting-guide",
    title: "Windows Troubleshooting Guide",
    category: "IT Support Documentation",
    summary:
      "A practical IT support documentation project demonstrating Windows troubleshooting procedures.",
    description:
      "A planned set of step-by-step troubleshooting guides for common Windows problems, written so that a non-technical user can follow them and a support technician can reuse them.",
    objectives: [
      "Document repeatable step-by-step procedures for common Windows issues",
      "Write instructions a non-technical user can follow",
      "Show a structured diagnose, fix, and verify approach",
    ],
    features: [
      "Guides for startup and boot problems",
      "Guides for slow performance",
      "Guides for network connectivity issues",
      "Guides for software installation errors",
      "Guides for driver issues",
      "Troubleshooting checklists",
      "Command reference",
    ],
    technologies: [
      "Windows 10/11",
      "Event Viewer",
      "Device Manager",
      "Command Prompt",
      "PowerShell",
      "Markdown",
    ],
    screenshots: [],
    status: "planned",
  },
  {
    slug: "small-office-network-setup",
    title: "Small Office Network Setup",
    category: "Networking",
    summary:
      "A sample network configuration and troubleshooting demonstration covering LAN, IP addressing, DNS, and DHCP.",
    description:
      "A planned demonstration of how a small office network can be laid out, configured, and troubleshot, with documentation explaining each decision.",
    objectives: [
      "Plan IP addressing and subnetting for a small office",
      "Configure DHCP and DNS and explain how they work together",
      "Practice diagnosing common connectivity problems",
    ],
    features: [
      "IP addressing plan with subnet table",
      "DHCP scope configuration",
      "DNS configuration",
      "Network diagram",
      "Troubleshooting scenarios using ipconfig, ping, tracert, and nslookup",
    ],
    technologies: [
      "LAN",
      "TCP/IP",
      "IP addressing & subnetting",
      "DNS",
      "DHCP",
      "Windows networking tools",
    ],
    screenshots: [],
    status: "planned",
  },
  {
    slug: "business-website",
    title: "Business Website",
    category: "Web Development",
    summary: "A responsive business website built using HTML, CSS, JavaScript, or Next.js.",
    description:
      "A planned sample website for a small business, intended to show clean, responsive front-end work and basic site maintenance practices.",
    objectives: [
      "Build a clean, responsive small-business website",
      "Use accessible, semantic markup",
      "Keep pages light and fast to load",
    ],
    features: [
      "Responsive layout",
      "Contact section",
      "Accessible markup",
      "Performance-minded assets",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Next.js"],
    screenshots: [],
    status: "planned",
  },
  {
    slug: "business-workflow-automation",
    title: "Business Workflow Automation",
    category: "Automation",
    summary:
      "A no-code automation demo that connects a web form, a spreadsheet, and email to remove repetitive manual work.",
    description:
      "A planned sample small-business workflow where a form submission is automatically logged to a spreadsheet, the team gets an email or notification, and the customer gets a confirmation. It will be built with no-code automation tools and documented step by step.",
    objectives: [
      "Show how repetitive admin tasks can be automated without custom code",
      "Design a reliable workflow with clear triggers and actions",
      "Handle errors and test each step",
      "Document the workflow so a client can maintain it",
    ],
    features: [
      "Form-to-spreadsheet logging",
      "Automatic email notification to the team",
      "Customer confirmation email",
      "Error handling and test runs",
      "Step-by-step workflow documentation with diagrams",
    ],
    // TODO: add the automation platform used (e.g., Zapier, Make, or n8n)
    technologies: ["No-code automation", "Google Forms", "Google Sheets", "Gmail"],
    screenshots: [],
    status: "planned",
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
