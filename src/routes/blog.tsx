import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { FieldFilterMenu, useFieldFilter } from "@/components/FieldFilter";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Notes — Heejae Cho" },
      {
        name: "description",
        content:
          "Notes by Heejae Cho on deep learning, machine learning, mathematics, programming, art, and life.",
      },
      { property: "og:title", content: "Notes — Heejae Cho" },
      {
        property: "og:description",
        content: "An online diary of thoughts across my academic and professional interests, as well as my personal life.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Blog,
});

const posts = [
  {
    date: "Jan 3, 2026",
    field: "learnings",
    title: "Alpha Research",
    body: "I finished building the basic framework of this website today. I'm hoping to keep shaping it into something great.",
  },
  {
    date: "Sep 22, 2026",
    field: "life",
    title: "Tribute to CoCo",
    body: "A tribute to my best friend of the last 18 years",
  },
];

function Blog() {
  const fieldFilter = useFieldFilter(posts);

  return (
    <SiteLayout pathLabel="./home/heejae/archive/notes">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="title-block pt-8">
          <p className="label">./home/heejae/archive/blog</p>
          <h1 className="page-title mt-7">blog</h1>
          <div className="title-rule mt-10" />
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            An online diary of thoughts across my academic and professional interests, as well as my personal life.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap items-baseline justify-between gap-5 border-b-2 border-border pb-4">
          <div>
            <p className="label">Latest signal</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">from the notebook</p>
          </div>
          <FieldFilterMenu {...fieldFilter} allLabel="All posts" />
        </div>

        <div className="border-t-2 border-border">
          {fieldFilter.filteredItems.length > 0 ? (
            fieldFilter.filteredItems.map((post) => (
              <article key={post.title} className="border-b-2 border-border py-7">
                <div className="flex flex-wrap items-center gap-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                  <span className="text-accent">{post.date}</span>
                  <span>{post.field}</span>
                </div>
                <h2 className="display mt-4 text-3xl">{post.title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {post.body}
                </p>
              </article>
            ))
          ) : (
            <p className="border-b-2 border-border py-7 text-sm text-muted-foreground">No posts in this category yet.</p>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
