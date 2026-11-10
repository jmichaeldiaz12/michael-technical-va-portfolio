import type { ProjectStatus } from "@/types";

export const statusLabels: Record<ProjectStatus, string> = {
  planned: "Planned",
  "in-progress": "In progress",
  completed: "Completed",
};
