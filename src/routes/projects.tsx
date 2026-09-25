import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { FieldFilterMenu, useFieldFilter } from "@/components/FieldFilter";
import { projects } from "@/lib/projects";

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
  const fieldFilter = useFieldFilter(projects);

  return (
    <SiteLayout pathLabel="./home/heejae/archive/projects">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="title-block pt-8">
          <p className="label">./home/heejae/archive/selected_projects/</p>
          <h1 className="page-title mt-7">selected projects</h1>
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

        <div className="mt-16 flex items-baseline justify-between border-b-2 border-border pb-4">
          <p className="label">Archive / 2025</p>
          <FieldFilterMenu {...fieldFilter} allLabel="All projects" />
        </div>

        <div className="mt-8 border-2 border-border bg-white px-6 py-1 sm:px-10">
          {fieldFilter.filteredItems.map((p) => (
            <a
              href={`/project/${p.slug}`}
              key={p.no}
              className="grid gap-3 border-b-2 border-border py-7 last:border-b-0 sm:grid-cols-[3rem_minmax(0,1fr)_8rem] sm:items-baseline sm:gap-8"
            >
              <span className="font-mono text-xs text-accent">{p.no}</span>
              <div className="flex-1">
                <h2 className="display text-3xl">{p.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.detail}</p>
              </div>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                {p.field}
              </span>
            </a>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
