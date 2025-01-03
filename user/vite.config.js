import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/react-projects/projects", // Set the base path for GitHub Pages
  build: {
    outDir: "dist/projects", // Set the output directory to dist/projects
  },
  plugins: [react()],
});
