import {defineConfig} from 'vite';

export default defineConfig({
  base: '/',
  server: {host: '127.0.0.1', port: 4175, strictPort: true, proxy: {'/api': {target: 'http://127.0.0.1:4174', changeOrigin: true}}},
  build: {outDir: 'dist', emptyOutDir: true, target: 'es2022'}
});
