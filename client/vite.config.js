import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],

    // Path resolution for cleaner imports
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@services': path.resolve(__dirname, './src/services'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@context': path.resolve(__dirname, './src/context')
        }
    },

    // Development server configuration
    server: {
        port: 3000,
        host: true,

        // Proxy API calls to backend during development
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                secure: false
            }
        }
    },

    // Build configuration
    build: {
        outDir: 'dist',
        sourcemap: true,

        // Optimize bundle
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    router: ['react-router-dom'],
                    utils: ['axios', 'react-query']
                }
            }
        }
    },

    // Testing configuration
    test: {
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.js'],
        globals: true
    }
})