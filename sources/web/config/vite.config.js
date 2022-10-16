import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
// https://vitejs.dev/config/
export default ({ mode }) => {
    return defineConfig({
        plugins: [react()],
        base: './',
        server: {
            port: 3000
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        define: {
            __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
            'process.env': { ...loadEnv(mode, process.cwd(), '') }
        },
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: {
                        'primary-color': '#204387',
                        'table-header-color': '#001d59',
                        'table-header-bg': '#ffffff',
                        // 'border-color-base': '#000000',
                        'border-radius-base': '10px',
                        'error-color': '#dc3545',
                        'font-size-base': '16px',
                        'menu-dark-color': '#f8f9fa',
                        'menu-dark-bg': '#204387',
                        'btn-border-style': 'none',
                        'btn-default-color': '#204387',
                        'btn-shadow': '0px 4px 4px rgba(0, 0, 0, 0.25)'
                    },
                    javascriptEnabled: true
                }
            }
        }
    });
};