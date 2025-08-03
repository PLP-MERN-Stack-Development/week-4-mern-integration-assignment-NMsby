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
            '@context': path.resolve(__dirname, './src/context'),
            '@lib': path.resolve(__dirname, './src/lib'),
            '@ui': path.resolve(__dirname, './src/components/ui'),
        }
    },

    // Development server configuration
    server: {
        port: 3000,
        host: '0.0.0.0',
        open: true,
        strictPort: false,

        // Proxy API calls to backend during development
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                secure: false,
                configure: (proxy, options) => {
                    proxy.on('error', (err, req, res) => {
                        console.log('Proxy error: ', err);
                    });
                    proxy.on('proxyReq', (proxyReq, req, res) => {
                        console.log('Sending Request to the Target:', req.method, req.url);
                    });
                    proxy.on('proxyRes', (proxyRes, req, res) => {
                        console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
                    });
                },
            }
        }
    },

    // Build configuration
    build: {
        outDir: 'dist',
        sourcemap: true,
        emptyOutDir: true,

        // Optimize bundle
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    router: ['react-router-dom'],
                    utils: ['axios', '@tanstack/react-query'],
                    ui: ['@radix-ui/react-dropdown-menu', '@radix-ui/react-dialog', 'lucide-react'],
                }
            }
        }
    },

    // CSS configuration for better Tailwind processing
    css: {
        postcss: './postcss.config.js',
        devSourcemap: true,
    },

    // Testing configuration
    test: {
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.js'],
        globals: true
    },

    // Additional debugging options
    logLevel: 'info',
    clearScreen: false,
})