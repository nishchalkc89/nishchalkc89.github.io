import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode, isSsrBuild }) => ({
  base: "/", // ✅ CORRECT for Netlify + custom domain

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    // the build-time page renderer should not copy the public folder a second time
    copyPublicDir: !isSsrBuild,
    rollupOptions: isSsrBuild
      ? undefined
      : {
          output: {
            // big libraries get their own files so they are cached across pages
            manualChunks(id: string) {
              if (!id.includes("node_modules")) return undefined;
              if (id.includes("framer-motion") || id.includes("motion-dom") || id.includes("motion-utils")) return "motion";
              if (/node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom|@remix-run)[\\/]/.test(id)) return "react";
              return undefined;
            },
          },
        },
  },
}));
