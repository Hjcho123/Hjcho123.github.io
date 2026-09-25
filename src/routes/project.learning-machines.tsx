import { createFileRoute } from "@tanstack/react-router";
import { ProjectDetail } from "@/components/ProjectDetail";

export const Route = createFileRoute("/project/learning-machines")({
  component: () => <ProjectDetail slug="learning-machines" />,
});
