/// <reference types="vitest" />
import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { cloudflareWebAnalyticsSnippet, CLOUDFLARE_WEB_ANALYTICS_BEACON_SRC } from './script/cloudflare-web-analytics.js'

function cloudflareWebAnalytics() {
  return {
    name: 'cloudflare-web-analytics',
    apply: 'build' as const,
    transformIndexHtml(html: string) {
      if (html.includes(CLOUDFLARE_WEB_ANALYTICS_BEACON_SRC)) {
        return html
      }

      const indented = cloudflareWebAnalyticsSnippet()
        .split('\n')
        .map((line) => (line ? `    ${line}` : line))
        .join('\n')

      return html.replace(/\s*<\/body>/i, `\n${indented}\n  </body>`)
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    cloudflareWebAnalytics(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
