export default {
    target: 'static',
    ssr: false, // Disable Server Side rendering

    router: {
        base: process.env.NUXT_ENV_ROUTER_BASE || '/'
    },

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'E-wallet',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
            { name: 'theme-color', content: '#8C4B1F' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: process.env.NUXT_ENV_ROUTER_BASE + 'favicon.ico' },
            { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Montserrat' },
            { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Roboto' },
            { rel: "stylesheet", type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap' }
        ]
    },
    server: {
        // nuxt.js server options ( can be overrided by environment variables )
        port: process.env.PORT,
        host: '0.0.0.0'
    },
    env: {
        API_URL: process.env.API_URL || 'http://localhost:8000',
        ENVIRONMENT: process.env.ENVIRONMENT || '',
    },

    axios: {
        proxyHeaders: false,
        // See https://github.com/nuxt-community/axios-module#options
        baseURL: process.env.API_URL
    },

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/bootstrap
        'bootstrap-vue/nuxt',
        '@nuxtjs/axios',
        '@nuxtjs/dotenv',
    ],

    auth: {
        redirect: {
            login: '/',
            logout: '/',
            home: '/dashboard'
        },
        strategies: {
            local: {
                token: {
                    property: 'token',
                    global: true,
                    type: 'Token'
                },
                user: {
                    property: 'user',
                    autoFetch: true
                },
                endpoints: {
                    login: { url: 'api/user/login', method: 'post' },
                    logout: { url: 'api/user/logout', method: 'post' },
                    user: { url: 'api/user/login-status', method: 'get' }
                },
            }
        }
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/css/main.css'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: [
            "vue-barcode-reader"
        ]
    },
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/mock-api.js', mode: 'client' },
        '~/plugins/mock-store-auth.js',
        '~/plugins/mock-auth.js',
        '~/plugins/apicall.js',
    ],
}