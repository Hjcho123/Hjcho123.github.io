import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Heejae Cho" },
      {
        name: "description",
        content: "A short introduction to Heejae Cho, written in a deliberately minimal terminal-inspired format.",
      },
      { property: "og:title", content: "About — Heejae Cho" },
      {
        property: "og:description",
        content: "A short profile page with a minimal visual system and a plain, quiet tone.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});



const notes = [
  {
    label: "a favorite quote?",
    value: "There Will Come Soft Rains",
    attribution: "from the poem by Sara Teasdale; also featured in Ray Bradbury's short story of the same name",
  },
  {
    label: "a favorite food?",
    value: "probably omurice?",
    attribution: "mom makes it better than anyone else",
  },
  {
    label: "a fun fact?",
    value: "When I was in the army, I was the squad leader of a 5-person artillery firing crew.",
    attribution: "specifically, the K9 Thunder self-propelled howitzer, 155mm",
  },
];

function About() {
  return (
    <SiteLayout pathLabel="./home/heejae/profile/about_me">
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="title-block pt-8">
            <p className="label">./home/heejae/profile/about_me</p>
            <h1 className="page-title mt-7">about me</h1>
            <div className="title-rule mt-10" />
            <div className="mt-6 max-w-xl space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>Name: Heejae Cho</p>
              <p>
                Hello. I study a BSc in Mathematics with an extension in Artificial Intelligence at The Hong Kong
                University of Science and Technology.
              </p>
              <p>
                I have a lot of different interests, but speaking to my academic and
                professional pursuits, I'm particularly drawn to mathematics,
                machine learning, and quantitative trading. You can find examples of my work in these areas in the <Link to="/projects" className="underline underline-offset-4">selected projects</Link> section of this website.
              </p>
              <p>
                Outside of that, I like to spend my time reading, running, weight lifting, hiking, playing chess and sketching. I also probably type way faster than you.
              </p>
              <p>
                I am currently based in Hong Kong and Seoul. I was born and raised in Manila, The
                Philippines.
              </p>
            </div>
          </div>

          
        </div>

        <div className="mt-16">
          <h2 className="font-mono text-base font-semibold uppercase tracking-[0.18em]">Q&amp;A</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {notes.map((note) => (
              <article key={note.label} className="about-note flex flex-col border border-border bg-white p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {note.label}
                </p>
                {note.attribution ? (
                  <blockquote className="flex h-full flex-col">
                    <p className="mt-4 text-sm leading-relaxed text-foreground">“{note.value}”</p>
                    <cite className="mt-auto pt-6 text-right font-mono text-[10px] not-italic leading-relaxed text-muted-foreground">
                      {note.attribution}
                    </cite>
                  </blockquote>
                ) : (
                  <p className="mt-4 text-sm leading-relaxed text-foreground">{note.value}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
