import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import tsConfigPath from "vite-tsconfig-paths";

const srcPath = path.resolve(__dirname, "./src");

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    host: true, // docker外からこちらにアクセスできるために設定
  },
  plugins: [react(), tsConfigPath(), svgrPlugin()],
  resolve: {
    alias: {
      "~": srcPath,
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true,
        entryFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
  test: {
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    environment: "jsdom",
    include: ["src/**/*.test.{js,ts,jsx,tsx}"],
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
