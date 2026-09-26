import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Heejae Cho" },
      {
        name: "description",
        content:
          "Selected work by Heejae Cho: quantitative systems, learning machines and mathematical studies.",
      },
      { property: "og:title", content: "Projects — Heejae Cho" },
      {
        property: "og:description",
        content:
          "A growing collection of personal work across mathematics, data science, deep learning and quantitative trading.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Projects,
});

function Projects() {
  return (
    <SiteLayout pathLabel="./home/heejae/archive/projects">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="title-block pt-8">
          <p className="label">./home/heejae/archive/selected_projects/</p>
          <h1 className="page-title mt-7">selected_projects</h1>
          <div className="title-rule mt-10" />
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            A growing collection of personal work used to explore fundamental ideas in mathematics,
            data science, deep learning, and quantitative trading.
          </p>
          <dl className="mt-8 grid gap-1 font-mono text-xs text-muted-foreground">
            <div>field: computational terrain</div>
            <div>status: work in progress</div>
            <div>range: 2025—</div>
          </dl>
        </div>

        <div className="mt-16 border-2 border-border bg-white p-6 sm:p-10">
          <p className="label">Archive / paused</p>
          <h2 className="display mt-4 text-2xl sm:text-3xl">No projects published yet.</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            The project archive is being prepared. Existing project material is stored privately for now.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
