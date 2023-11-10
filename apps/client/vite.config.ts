import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { comlink } from 'vite-plugin-comlink'
import jotaiDebugLabel from "jotai/babel/plugin-debug-label";
import jotaiReactRefresh from "jotai/babel/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // @ts-ignore
      babel: {
        plugins: [jotaiDebugLabel, jotaiReactRefresh],
      },
    }),
    comlink(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  worker: {
    plugins: [comlink()],
  },
});
