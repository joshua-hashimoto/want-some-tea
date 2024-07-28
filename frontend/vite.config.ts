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
    host: true, // docker外からこちらにアクセスできるようにするために設定
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
    tsConfigPath(),
    svgrPlugin(),
  ],
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
    env: {
      VITE_API_URL: "http://localhost:6006",
    },
  },
});
