/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  build: {
    outDir: 'dist', // Changed output folder, like in CRA
  },
  plugins: [react(), viteTsconfigPaths(), svgr()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
