import { fileURLToPath as Silian_fileURLToPath, URL as Silian_URL } from 'node:url';
import { defineConfig as Silian_defineConfig } from 'vite';
import Silian_vue from '@vitejs/plugin-vue';
// https://vitejs.dev/config/
export default Silian_defineConfig({
    plugins: [Silian_vue()],
    resolve: {
        alias: {
            '@': Silian_fileURLToPath(new Silian_URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '/api/rank': {
                target: 'https://bd.bangbang93.com/openbmclapi/metric/rank',
                changeOrigin: true,
                rewrite: (Silian_path) => Silian_path.replace(/^\/api\/rank/, '')
            },
        }
    }
});
