import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteLayout } from "@/components/SiteLayout";

type BlogPostPageProps = {
  title: string;
  date: string;
  field: string;
  children: ReactNode;
};

export function BlogPostPage({ title, date, field, children }: BlogPostPageProps) {
  return (
    <SiteLayout pathLabel="./home/heejae/archive/blog">
      <article className="mx-auto max-w-6xl px-6 py-24">
        <Link to="/blog" className="font-mono text-xs text-muted-foreground underline underline-offset-4">
          &lt;- blog/
        </Link>

        <header className="mt-12 max-w-4xl">
          <p className="label">Blog / {field}</p>
          <h1 className="page-title mt-7">{title}</h1>
          <p className="mt-6 font-mono text-xs text-muted-foreground">{date}</p>
          <div className="title-rule mt-10" />
        </header>

        <div className="mt-12 max-w-3xl">{children}</div>
      </article>
    </SiteLayout>
  );
}