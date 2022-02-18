import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    exclude: ['@hrt/components'],
  },
  alias: {
    '@hrt/components': join(__dirname, '../components/src'),
  },
});
