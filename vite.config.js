import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  // Set VITE_BASE=/repo-name/ for a project GitHub Pages site.
  base: process.env.VITE_BASE || (mode === 'production' ? './' : '/'),
  // GitHub Pages serves the committed prebuilt docs/ directory directly.
  build: { outDir: 'docs', assetsInlineLimit: 4096, sourcemap: true },
}));
