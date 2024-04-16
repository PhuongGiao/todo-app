import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    /**
     * whether to use the global API
     * enable use of describe it, etc. without importing
     * @see https://vitest.dev/config/#globals
     */
    globals: true,
  },
  resolve: {
    alias: {
      '@/': `${__dirname}/`,
    },
  },
});
