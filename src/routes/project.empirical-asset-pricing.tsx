import { createFileRoute } from "@tanstack/react-router";
import { ProjectDetail } from "@/components/ProjectDetail";

export const Route = createFileRoute("/project/empirical-asset-pricing")({
  component: () => <ProjectDetail slug="empirical-asset-pricing" />,
});
