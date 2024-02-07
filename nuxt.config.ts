// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {}, autoprefixer: {},
        },
    },
    modules: ['@ant-design-vue/nuxt', '@nuxtjs/i18n'],
    i18n: {
        locales: [
            { code: 'en', file: 'en.js' },
            { code: 'ar', file: 'ar.js' },
        ],
        defaultLocale: 'ar',
        lazy: true,
        langDir: 'locales/'
    }
})
