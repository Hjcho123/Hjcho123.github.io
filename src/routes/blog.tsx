import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

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

function Blog() {
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

        <div className="mt-16 border-2 border-border bg-white p-6 sm:p-10">
          <p className="label">Notebook / paused</p>
          <h2 className="display mt-4 text-2xl sm:text-3xl">No posts published yet.</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            The notebook is being prepared. Existing writing is stored privately for now.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
