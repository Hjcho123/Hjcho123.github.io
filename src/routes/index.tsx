import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Heejae Cho" },
      {
        name: "description",
        content:
          "Heejae Cho — mathematics, machine learning, and the work of a very small studio with a very precise point of view.",
      },
      { property: "og:title", content: "Heejae Cho" },
      {
        property: "og:description",
        content:
          "Personal site of Heejae Cho: projects, notes and CV across mathematics, machine learning and quantitative trading.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type DirectoryEntry = {
  label: string;
  to?: string;
  external?: boolean;
  children?: DirectoryEntry[];
  open?: boolean;
};

function DirectoryLinks({ entries }: { entries: DirectoryEntry[] }) {
  return (
    <div className="directory-links">
      {entries.map((entry, index) => {
        const content = (
          <>
            <span className="node-index">{String(index + 1).padStart(2, "0")}</span>
            <span>{entry.label}</span>
          </>
        );

        if (entry.children) {
          return (
            <details key={entry.label} className="directory-folder" open={entry.open}>
              <summary className="directory-entry directory-node">{content}</summary>
              <DirectoryLinks entries={entry.children} />
            </details>
          );
        }

        return entry.external ? (
          <a
            key={entry.to}
            href={entry.to}
            target="_blank"
            rel="noreferrer"
            className="directory-entry directory-node"
          >
            {content}
          </a>
        ) : (
          <Link key={entry.to} to={entry.to ?? "#"} className="directory-entry directory-node">
            {content}
          </Link>
        );
      })}
    </div>
  );
}

function DirectorySection({ title, entries }: { title: string; entries: DirectoryEntry[] }) {
  return (
    <details className="directory-folder">
      <summary className="directory-entry flex items-center gap-2 text-foreground">
        <span>{title}</span>
      </summary>
      <DirectoryLinks entries={entries} />
    </details>
  );
}

function Index() {
  return (
    <SiteLayout showHomeButton={false}>
      <section className="flex min-h-[calc(100vh-8rem)] -translate-y-8 items-center justify-center px-6 py-16">
        <div className="flex w-full max-w-3xl flex-col items-center justify-center text-center">
          <h1 className="terminal-name mb-3 text-foreground">heejae_cho</h1>
          
          <p className="mb-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            {[
              "mathematics",
              "artificial intelligence",
              "quantitative trading",
            ].map((interest, index) => (
              <span key={interest} className="inline-flex items-center gap-3">
                {index > 0 && <span aria-hidden="true">·</span>}
                <span>{interest}</span>
              </span>
            ))}
          </p>

          <div className="terminal-directory mt-4 text-left">
            <div className="directory-panel">
              <div className="directory-label px-2 py-1">/home/heejae/</div>

              <div className="mt-1 space-y-1 px-2 pb-2">
                <DirectorySection
                  title="profile/"
                  entries={[
                    { label: "about_me", to: "/about" },
                    { label: "cv", to: "/cv" },
                  ]}
                />
                <DirectorySection
                  title="archive/"
                  entries={[
                    { label: "selected_projects/", to: "/projects" },
                    { label: "blog/", to: "/blog" },
                    
                  ]}
                />
                <DirectorySection
                  title="network/"
                  entries={[
                    {
                      label: "professional_contacts/",
                      children: [
                        { label: "github", to: "https://github.com/Hjcho123", external: true },
                        {
                          label: "linkedin",
                          to: "https://www.linkedin.com/in/heejae-cho/",
                          external: true,
                        },
                        { label: "email", to: "mailto:hjchoaa@connect.ust.hk", external: true },
                      ],
                    },
                    {
                      label: "social_media/",
                      children: [
                        { label: "instagram", to: "https://www.instagram.com/", external: true },
                      ],
                    },
                  ]}
                />
                <DirectorySection
                  title="miscellaneous/"
                  entries={[
                    {
                      label: "plant_a_tree",
                      to: "/plant-a-tree",
                    },
                    { label: "monthly_music_recommendation", to: "/monthly-music-recommendation" },
                  ]}
                />

                <div className="directory-divider" aria-hidden="true">
                  {"·".repeat(128)}
                </div>

                <Link
                  to="/cv"
                  className="directory-entry directory-root-link directory-symlink"
                  aria-label="Open resume"
                >
                  <span>resume</span>{" "}
                  <span className="directory-symlink-arrow" aria-hidden="true">
                    -&gt;
                  </span>{" "}
                  <span>./profile/cv</span>
                </Link>
                <Link
                  to="/projects"
                  className="directory-entry directory-root-link directory-symlink"
                  aria-label="Open portfolio"
                >
                  <span>portfolio</span>{" "}
                  <span className="directory-symlink-arrow" aria-hidden="true">
                    -&gt;
                  </span>{" "}
                  <span>./archive/selected_projects</span>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
