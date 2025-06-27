import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Skip known safe warning
        if (
          warning.message &&
          warning.message.includes('externalized for browser compatibility')
        ) return;
        warn(warning);
      },
    },
  },
});

