import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        browse: 'browse.html',
        favorites: 'favorites.html',
      }
    }
  }
});
