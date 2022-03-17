import path from 'path'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import vitePluginTransformCssModules from 'vite-plugin-transform-css-modules'

export default defineConfig({
    build: {
        outDir: 'build',
    },
    resolve: {
        alias: {
            '@': path.resolve('src'),
        },
    },
    plugins: [tsConfigPaths(), react({ exclude: /\.stories\.(t|j)sx?$/ })],
    define: {
        global: {},
    },
    server: {
        proxy: {
            '/ws': {
                target: process.env.PROXY || 'ws://127.0.0.1:7777',
                ws: true,
            },
            ...['/api', '/oauth', '/callback', '/logout', '/swagger', '/openapi.json'].map((v, index) => ({
                [v]: {
                    target: process.env.PROXY || 'http://127.0.0.1:7777',
                },
            })),
        },
    },
})
