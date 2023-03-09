// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    ssr: false,
    app: {
        head: {
          charset: 'utf-8',
          viewport: 'width=device-width, initial-scale=1',
          link: [
            {
                rel: 'stylesheet',
                href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'
            },
            {
                rel: 'preconnect',
                href: 'https://fonts.googleapis.com'
            },
            {
                rel: 'preconnect',
                href: 'https://fonts.gstatic.com'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
            },
          ],
          title: 'BlancMeteore',
          meta: [
            { name: 'description', content: '' }
          ],
        },
        pageTransition: { name: 'page', mode: 'out-in' },
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@vueuse/nuxt',
    ],
    components: [
        'vue3-autocounter',
    ],
})
