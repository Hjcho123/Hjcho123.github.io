import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

const base = "/";

export default defineConfig({
  plugins: [
    tanstackStart({
      router: { basepath: base },
      client: { base },
      server: { build: { inlineCss: true } },
      spa: { enabled: true },
      pages: [
        { path: "/about", prerender: { enabled: true } },
        { path: "/blog", prerender: { enabled: true } },
        { path: "/cv", prerender: { enabled: true } },
        { path: "/monthly-music-recommendation", prerender: { enabled: true } },
        { path: "/plant-a-tree", prerender: { enabled: true } },
        { path: "/projects", prerender: { enabled: true } },
        { path: "/project/empirical-asset-pricing", prerender: { enabled: true } },
        { path: "/project/learning-machines", prerender: { enabled: true } },
        { path: "/project/mathematical-studies", prerender: { enabled: true } },
      ],
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  base,
});
