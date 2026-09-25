import { createFileRoute } from "@tanstack/react-router";
import { ProjectDetail } from "@/components/ProjectDetail";

export const Route = createFileRoute("/project/mathematical-studies")({
  component: () => <ProjectDetail slug="mathematical-studies" />,
});
