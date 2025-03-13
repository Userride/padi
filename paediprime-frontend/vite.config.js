// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     sourcemap: false, // Disable source maps for faster builds
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           vendor: ['react', 'react-dom'], // Separate vendor chunk for React
//         },
//       },
//     },
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       target: 'esnext', // Ensure esbuild uses modern syntax for faster builds
//     },
//   },
//   server: {
//     open: true, // Automatically open the browser on server start
//     hmr: {
//       overlay: false, // Disable HMR overlay to reduce console noise
//     },
//   },
//   cacheDir: 'node_modules/.vite', // Ensure caching is enabled
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // Disable source maps for faster builds
    minify: 'terser', // Use Terser for minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Separate vendor chunk for React
        },
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext', // Ensure esbuild uses modern syntax for faster builds
    },
  },
  server: {
    open: true, // Automatically open the browser on server start
    hmr: {
      overlay: false, // Disable HMR overlay to reduce console noise
    },
    host: '0.0.0.0', // Bind to all IPs (not just localhost)
    port: process.env.PORT || 5173, // Use PORT from Render or default to 5173
    proxy: {
      '/api': {
        target: 'https://amit19-1.onrender.com', // Backend API URL
        changeOrigin: true,
        secure: false, // Only if your backend uses self-signed certificates
      },
    },
  },
  cacheDir: 'node_modules/.vite', // Ensure caching is enabled for faster builds
})
