import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { posts } from "@/content/blog";

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
            An online diary and study log.
          </p>
        </div>

        <div className="mt-16 divide-y-2 divide-border border-y-2 border-border">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group grid gap-5 py-7 transition-colors hover:bg-[#0712a6] hover:text-white sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:items-start sm:px-4"
            >
              <span className="label pt-1 group-hover:text-white">{String(index + 1).padStart(2, "0")}</span>
              <span>
                <span className="display block text-xl sm:text-2xl">{post.title}</span>
                <span className="mt-3 block max-w-2xl text-sm leading-relaxed text-muted-foreground group-hover:text-white">
                  {post.excerpt}
                </span>
                <span className="mt-4 block font-mono text-xs text-muted-foreground group-hover:text-white">
                  {post.date} / {post.field}
                </span>
              </span>
              <span className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-white sm:pt-1" aria-hidden="true">
                read -&gt;
              </span>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
