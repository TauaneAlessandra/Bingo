import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isBuild = command === 'build';

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        // Stub prop-types in production build only to reduce bundle size
        ...(isBuild ? { 'prop-types': resolve(__dirname, './src/utils/propTypesStub.js') } : {}),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.js'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html', 'lcov'],
        include: ['src/**/*.{js,jsx}'],
        exclude: [
          'src/test/**',
          'src/utils/propTypesStub.js',
          'src/main.jsx',
        ],
        thresholds: {
          statements: 70,
          branches: 70,
          functions: 70,
          lines: 70,
        },
      },
    },
  };
})
