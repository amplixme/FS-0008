import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import Icons from "unplugin-icons/vite";
// https://vite.dev/config/

export default defineConfig({
  plugins: [react(), tailwindcss(), Icons({ compiler: "jsx" })],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Agrupar todas las dependencias de node_modules en un unico vendor chunk
          if (id.includes("node_modules")) {
            return "vendor";
          }
          // Agrupar utilidades y servicios en un chunk comun
          if (id.includes("/src/utils/") || id.includes("/src/services/")) {
            return "core-services";
          }
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
  },
});
