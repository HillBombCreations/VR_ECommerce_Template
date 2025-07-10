import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.xml'],
  plugins: [
    svgr(),
    react()
  ],
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
})