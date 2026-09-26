import { createFileRoute } from "@tanstack/react-router";
import { BlogPostPage } from "@/components/BlogPostPage";
import {
  deepLearningPost,
  DeepLearningPostContent,
} from "@/content/blog/deep-learning-by-ian-goodfellow";

export const Route = createFileRoute("/blog_/deep-learning-by-ian-goodfellow")({
  head: () => ({
    meta: [
      { title: `${deepLearningPost.title} — Heejae Cho` },
      { name: "description", content: deepLearningPost.excerpt },
      { property: "og:title", content: deepLearningPost.title },
      { property: "og:description", content: deepLearningPost.excerpt },
      { property: "og:type", content: "article" },
    ],
  }),
  component: DeepLearningByIanGoodfellow,
});

function DeepLearningByIanGoodfellow() {
  return (
    <BlogPostPage
      title={deepLearningPost.title}
      date={deepLearningPost.date}
      field={deepLearningPost.field}
    >
      <DeepLearningPostContent />
    </BlogPostPage>
  );
}
