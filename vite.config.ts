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
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  base,
});
