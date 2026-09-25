import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { featuredRecommendation } from "@/lib/music";

export const Route = createFileRoute("/monthly-music-recommendation")({
  head: () => ({
    meta: [
      { title: "Monthly Music Recommendation — Heejae Cho" },
      {
        name: "description",
        content: "A monthly archive of music recommendations by Heejae Cho.",
      },
      { property: "og:title", content: "Monthly Music Recommendation — Heejae Cho" },
      {
        property: "og:description",
        content: "A monthly archive of music recommendations by Heejae Cho.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MonthlyMusicRecommendation,
});

function MonthlyMusicRecommendation() {
  const featured = featuredRecommendation;

  return (
    <SiteLayout pathLabel="./home/heejae/archive/monthly_music_recommendation">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="title-block pt-8">
          <p className="label">./home/heejae/archive/monthly_music_recommendation</p>
          <h1 className="page-title mt-7">monthly music recommendation</h1>
          <div className="title-rule mt-10" />
        </div>

        <section className="mx-auto mt-16 max-w-xl" aria-labelledby="featured-recommendation">
          <article className="flex aspect-square flex-col border-2 border-border bg-white">
            <div className="flex min-h-0 flex-1 items-center justify-center p-8 sm:p-12">
              <img
                src={featured.coverPath}
                alt="Like in the Movies album cover by Lee So-ra"
                className="aspect-square w-full max-w-[20rem] object-cover"
              />
            </div>
            <div className="border-t-2 border-border p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p id="featured-recommendation" className="label">
                  {featured.monthLabel}
                </p>
                <p className="font-mono text-xs text-muted-foreground">{featured.artist}</p>
              </div>
              <h2 className="display mt-3 text-3xl">{featured.album}</h2>
              <h3 className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Album Overview.
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                {featured.note}
              </p>
            </div>
          </article>
        </section>
      </section>
    </SiteLayout>
  );
}
