/* =========================================================
   AFSNIT 01 – Imports
   ========================================================= */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

/* =========================================================
   AFSNIT 02 – Vite config (GitHub Pages + PWA sikker)
   - base: "./" gør at appen virker i undermapper (GitHub Pages)
   - PWA start_url + scope + icon paths gøres relative
   ========================================================= */

export default defineConfig(({ mode }) => ({
  // ✅ VIGTIGT for GitHub Pages / undermappe deploy
  base: "./",

  server: {
    host: "::",
    port: 8080
  },

  plugins: [
    react(),

    // Kun i dev (som før)
    mode === "development" && componentTagger(),

    // ✅ PWA (installérbar)
    VitePWA({
      registerType: "autoUpdate",

      // Disse filer skal ligge i /public (ellers fjern dem)
      includeAssets: ["brain-icon.svg", "apple-touch-icon.png"],

      manifest: {
        name: "MindForge 15",
        short_name: "MindForge",
        description: "15 minutes a day to sharpen your mind",
        theme_color: "#0a0f1a",
        background_color: "#0a0f1a",
        display: "standalone",
        orientation: "portrait-primary",

        // ✅ Relative paths (vigtigt på GitHub Pages)
        start_url: "./",
        scope: "./",

        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          }
        ]
      }
    })
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
}));
