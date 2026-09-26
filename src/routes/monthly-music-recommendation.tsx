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
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-24">
        <div className="title-block pt-8">
          <p className="label break-words">./home/heejae/archive/monthly_music_recommendation</p>
          <h1 className="page-title mt-6 max-w-full break-words sm:mt-7">monthly_music_recommendation</h1>
          <div className="title-rule mt-8 sm:mt-10" />
        </div>

        <section className="mx-auto mt-10 max-w-4xl sm:mt-16" aria-labelledby="featured-recommendation">
          <article className="min-w-0 border-2 border-border bg-white">
            <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-border px-4 py-2 font-mono text-[11px] text-muted-foreground sm:px-6">
              <span className="break-all">heejae@archive:~$ open featured_record</span>
              <span>music / 01</span>
            </div>
            <div className="grid min-w-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="flex min-w-0 items-center justify-center p-4 sm:p-8 lg:p-10">
              <img
                src={featured.coverPath}
                alt="Like in the Movies album cover by Lee So-ra"
                className="aspect-square w-full max-w-[min(100%,20rem)] object-cover"
              />
            </div>
            <div className="min-w-0 border-t-2 border-border p-5 sm:p-8 lg:border-l-2 lg:border-t-0">
              <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <p id="featured-recommendation" className="label max-w-full break-words">
                  {featured.monthLabel}
                </p>
                <p className="max-w-full break-words font-mono text-xs text-muted-foreground">
                  {featured.artist}
                </p>
              </div>
              <h2 className="display mt-3 max-w-full break-words text-2xl sm:text-3xl">{featured.album}</h2>
              <h3 className="mt-5 font-mono text-xs text-muted-foreground"># album_overview</h3>
              <p className="mt-3 max-w-lg break-words text-sm leading-relaxed text-muted-foreground">
                {featured.note}
              </p>
            </div>
            </div>
          </article>
        </section>
      </section>
    </SiteLayout>
  );
}
