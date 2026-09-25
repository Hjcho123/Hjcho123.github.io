import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { projects } from "@/lib/projects";

export function ProjectDetail({ slug }: { slug: string }) {
  const project = projects.find((item) => item.slug === slug);
  const [photos, setPhotos] = useState<File[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  useEffect(() => {
    const urls = photos.map((photo) => URL.createObjectURL(photo));
    setPhotoUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [photos]);

  if (!project) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-6xl px-6 py-24">
          <p className="label">404 / Missing project</p>
          <h1 className="page-title mt-7">Not found</h1>
          <Link to="/projects" className="mt-8 inline-block font-mono text-sm underline underline-offset-4">
            ← return to ./projects
          </Link>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Link to="/projects" className="font-mono text-xs text-muted-foreground underline underline-offset-4">
          ← selected_projects/
        </Link>

        <div className="mt-12 max-w-4xl">
          <p className="label">Project / {project.no}</p>
          <h1 className="page-title mt-7">{project.title}</h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">{project.detail}</p>
          <dl className="mt-8 grid gap-1 font-mono text-xs text-muted-foreground">
            <div>status: active</div>
            <div>range: {project.year}</div>
            <div>slug: {project.slug}</div>
          </dl>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <div className="border-t-2 border-border">
              <div className="flex items-baseline justify-between border-b-2 border-border py-4">
                <p className="label">Photos</p>
                <span className="font-mono text-xs text-muted-foreground">{photos.length} staged</span>
              </div>

              <label
                htmlFor="project-photos"
                className="mt-6 flex min-h-48 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-border bg-white p-8 text-center transition-colors hover:bg-card"
              >
                <span className="font-mono text-sm">drop images here or choose files</span>
                <span className="mt-2 text-xs text-muted-foreground">JPG, PNG, WEBP</span>
                <input
                  id="project-photos"
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={(event) => setPhotos(Array.from(event.target.files ?? []))}
                />
              </label>

              {photoUrls.length > 0 && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {photoUrls.map((url, index) => (
                    <figure key={url} className="border-2 border-border bg-white p-2">
                      <img src={url} alt={photos[index]?.name ?? "Project upload"} className="aspect-video w-full object-cover" />
                      <figcaption className="truncate px-1 py-2 font-mono text-xs text-muted-foreground">
                        {photos[index]?.name}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-16 border-t-2 border-border">
              <div className="flex items-baseline justify-between border-b-2 border-border py-4">
                <p className="label">Documentation</p>
                <span className="font-mono text-xs text-muted-foreground">{documents.length} staged</span>
              </div>
              <label
                htmlFor="project-documents"
                className="mt-6 flex cursor-pointer items-center justify-between border-2 border-border bg-white px-5 py-4 font-mono text-sm hover:bg-card"
              >
                <span>choose documents</span>
                <span aria-hidden>+</span>
                <input
                  id="project-documents"
                  type="file"
                  accept=".pdf,.md,.txt,.doc,.docx,.ppt,.pptx"
                  multiple
                  className="sr-only"
                  onChange={(event) => setDocuments(Array.from(event.target.files ?? []))}
                />
              </label>
              {documents.length > 0 && (
                <ul className="mt-4 border-t-2 border-border font-mono text-xs">
                  {documents.map((document) => (
                    <li key={document.name} className="border-b-2 border-border py-3">
                      {document.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <aside className="border-l-2 border-accent pl-5 lg:mt-14">
            <p className="label">Storage note</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Files are staged in this browser session only. Connect a storage service later to make uploads persistent.
            </p>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
