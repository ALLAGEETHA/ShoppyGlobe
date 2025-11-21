// Vite configuration with React SWC plugin for fast builds
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()]
  base: '/SHOPPYGLOBE/',   // 👈 match the URL you see in GitHub Pages
});
