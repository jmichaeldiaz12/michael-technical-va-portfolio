import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { getAllProjects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  const routes = ["", "/about", "/services", "/projects", "/skills", "/contact"];
  return [
    ...routes.map((r) => ({ url: `${base}${r}` })),
    ...getAllProjects().map((p) => ({ url: `${base}/projects/${p.slug}` })),
  ];
}
