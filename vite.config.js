import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        // Add this server configuration
        proxy: {
            '/api': {
                // Any request to /api will be proxied
                target: 'http://localhost:3001', // Your json-server address
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix before sending to json-server
            },
        },
    },
})
