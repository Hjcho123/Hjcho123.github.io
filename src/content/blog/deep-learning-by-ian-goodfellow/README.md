# Blog post content

This post lives in its own folder so its writing and media stay together. Edit `index.tsx` to change the post or add any React content, including headings, lists, links, and figures.

To add a photo, place it in this folder (or an `assets/` subfolder), import it in `index.tsx`, and render it in `DeepLearningPostContent`:

```tsx
import diagram from "./assets/diagram.webp";

<figure>
  <img src={diagram} alt="Describe the image" />
  <figcaption>Caption</figcaption>
</figure>
```

For equations, use browser-native MathML elements such as `<math>`, `<mfrac>`, and `<mi>` as shown in the post. Each future post can use this same folder-per-post structure under `src/content/blog/`.