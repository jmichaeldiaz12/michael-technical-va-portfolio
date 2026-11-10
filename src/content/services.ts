// HOW TO EDIT: each entry is one service shown on the home page highlights and /services.
// `slug` is the anchor id (/services#slug) - keep it stable. `items` render as a checklist.
// `level` controls the badge: "core" => "Core support", "advanced" => "Advanced".
import { Monitor, Headset, Network, Globe, Workflow, Server } from "lucide-react";
import type { Service } from "@/types";

// TODO: set level: "advanced" on services John confirms as advanced
export const services: Service[] = [
  {
    slug: "windows-it-support",
    title: "Windows IT Support",
    icon: Monitor,
    summary:
      "Remote help with setting up, installing, and troubleshooting Windows computers and everyday software.",
    items: [
      "Windows installation",
      "Software installation",
      "Basic Windows troubleshooting",
      "System diagnostics",
    ],
    level: "core",
    outOfScope: "Physical on-site repairs are not available — support is remote.",
  },
  {
    slug: "remote-technical-support",
    title: "Remote Technical Support",
    icon: Headset,
    summary:
      "Step-by-step remote assistance for technical issues, with clear written notes of what was done.",
    items: [
      "Remote troubleshooting",
      "Basic user assistance",
      "Software-related support",
      "Technical documentation",
    ],
    level: "core",
    outOfScope: "Support happens during scheduled evening hours (PHT), not 24/7.",
  },
  {
    slug: "network-troubleshooting",
    title: "Network Troubleshooting",
    icon: Network,
    summary:
      "Help diagnosing connectivity problems on small local networks, from IP settings to name resolution.",
    items: ["LAN troubleshooting", "IP configuration", "DNS troubleshooting", "DHCP fundamentals"],
    level: "core",
    outOfScope:
      "Enterprise network design and firewall security audits are outside this service — I'll flag issues that need a specialist.",
  },
  {
    slug: "website-support",
    title: "Website Support",
    icon: Globe,
    summary:
      "Small updates and fixes for existing websites, plus routine upkeep so content stays current.",
    items: [
      "HTML and CSS updates",
      "JavaScript troubleshooting",
      "Website content updates",
      "Basic maintenance",
    ],
    level: "core",
    outOfScope: "Full custom web application development is outside this service.",
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation",
    icon: Workflow,
    summary:
      "Setting up simple no-code automations so repetitive tasks between your apps run on their own.",
    items: [
      "Automating repetitive tasks between apps",
      "Form-to-spreadsheet workflows",
      "Email and notification automations",
      "Workflow documentation",
    ],
    level: "core",
    outOfScope:
      "Complex custom integrations that require backend development are outside this service.",
  },
  {
    slug: "server-administration-assistance",
    title: "Server Administration Assistance",
    icon: Server,
    summary:
      "Supporting assistance with routine server upkeep, monitoring, and troubleshooting tasks.",
    items: [
      "Basic server maintenance",
      "System monitoring assistance",
      "Troubleshooting",
      "Technical documentation",
    ],
    level: "core",
    outOfScope:
      "Ongoing 24/7 on-call server administration is outside this service; support is provided during my evening shift.",
  },
];
