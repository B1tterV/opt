import { fileURLToPath } from 'url'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'ru'
      },
      meta: [{
        name: 'content-security-policy',
        content: 'This is my page description.'
      }]
    }
  },
  typescript: {
    typeCheck: true
  },
  pages: true,
  devtools: { enabled: false },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/eslint-module',
    'nuxt-swiper',
    'nuxt3-notifications'
  ],
  css: ['@/assets/css/style.scss'],
  plugins: [],
  alias: {
    '@svg': fileURLToPath(new URL('./assets/svg', import.meta.url)),
    '@css': fileURLToPath(new URL('./assets/css', import.meta.url)),
    '@img': fileURLToPath(new URL('./assets/img', import.meta.url))
  },
  vite: {
    plugins: [svgLoader()],
    css: {
      preprocessorOptions: {
        scss: {
          sourceMap: true,
          additionalData: `
            @use "@/assets/css/functions.scss" as *;
          `
        }
      }
    }
  },
  components: [
    { global: true, path: '~/components', pathPrefix: false }
  ]
})
