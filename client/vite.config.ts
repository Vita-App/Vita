import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  build: {
    outDir: 'build', // Changed output folder, like in CRA
  },
  plugins: [react(), viteTsconfigPaths(), svgr()],
});
