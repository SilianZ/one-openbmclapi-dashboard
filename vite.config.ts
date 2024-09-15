import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '/api/rank': {
                target: 'https://bd.bangbang93.com/openbmclapi/metric/rank',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/rank/, '')
            },
        }
    }
})
