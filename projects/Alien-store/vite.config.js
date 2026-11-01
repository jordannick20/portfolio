import { defineConfig } from 'vite';

export default defineConfig({
    // the base path of the web app when published
    base: '/',
    // enable source maps so errors show actual source code line numbers in production mode (auto enabled in dev mode)
    build: {
        sourcemap: true 
    },
    // dev server config (Port 3000)
    server: {
        port: 3000
    }
});