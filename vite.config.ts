import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  // 构建优化配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // 使用 esbuild 压缩（Vite 默认，无需额外依赖）
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // 代码分割优化
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['lucide-react'],
        },
      },
    },
    // 构建大小警告阈值
    chunkSizeWarningLimit: 1000,
  },
  // 预览服务器配置
  preview: {
    port: 4173,
    strictPort: true,
  },
  // 确保 public 目录被复制到 dist
  publicDir: 'public',
})
