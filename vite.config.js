import { defineConfig } from 'vite';

function manualChunks(id) {
  const path = id.replaceAll('\\', '/');
  if (path.endsWith('/three/build/three.core.js')) return 'three-core';
  if (path.endsWith('/three/build/three.module.js')) return 'three-renderer';
  if (path.includes('/three/examples/jsm/controls/')) return 'three-controls';
}

export default defineConfig(({ mode }) => ({
  // Set VITE_BASE=/repo-name/ for a project GitHub Pages site.
  base: process.env.VITE_BASE || (mode === 'production' ? './' : '/'),
  // GitHub Pages serves the committed prebuilt docs/ directory directly.
  build: {
    outDir: 'docs',
    assetsInlineLimit: 4096,
    sourcemap: true,
    rollupOptions: { output: { manualChunks } },
  },
}));
