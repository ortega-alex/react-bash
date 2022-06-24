import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default ({ mode }) => {
    return defineConfig({
        plugins: [react()],
        base: './',
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        define: {
            __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
            'process.env': { ...loadEnv(mode, process.cwd(), '') }
        }
    });
};
