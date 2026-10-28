import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // 相對路徑，部署在 GitHub Pages 子路徑（/2026_meetup_takeaway/）也能正確載入資源
  base: './',
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.js']
  }
})
