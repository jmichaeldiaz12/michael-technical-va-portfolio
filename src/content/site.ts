import type { SiteConfig } from "@/types";

function resolveSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";
  return url.replace(/\/+$/, "");
}

export const siteConfig: SiteConfig = {
  name: "John Michael Diaz",
  title: "Technical Virtual Assistant | IT Support Specialist",
  tagline:
    "Reliable Technical Support. Practical IT Solutions. Dependable Remote Assistance.",
  location: "Philippines",
  availability: "Part-time, evenings Philippine time",
  email: "jmichaeldiaz12@gmail.com",
  githubUrl: "https://github.com/jmichaeldiaz12",
  // TODO: add LinkedIn profile URL — link is hidden while null
  linkedinUrl: null,
  shift: {
    timezone: "Asia/Manila",
    startHour: 18,
    endHour: 24,
    label: "6:00 PM – 12:00 AM PHT",
  },
  siteUrl: resolveSiteUrl(),
};
