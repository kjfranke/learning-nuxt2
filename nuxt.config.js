import path from 'path'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'learning-nuxt2',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    ['~/xsarus-svg-sprite-loader/dist/index', {
      symbolId: 'symbol-[name]',
      extract: true,
      esModule: false,
      spriteFilename: 'sprite-[hash:6].svg',
      runtimeGenerator: path.join(__dirname, '/xsarus-svg-sprite-loader/lib/runtime-generator.js')
      // spriteModule: path.join(__dirname, '/xsarus-svg-sprite-loader/runtime/browser-sprite.build.js')
    }]
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, ctx) {
      // Excludes /assets/svg from url-loader
      // const urlLoader = config.module.rules.find(rule => rule.loader === 'url-loader')
      // urlLoader.exclude = /(assets\/svg)/

      // // Includes /assets/svg for svg-sprite-loader
      // config.module.rules.push({
      //   test: /\.svg$/,
      //   include: [
      //     path.resolve(__dirname, 'assets/svg')
      //   ],
      //   use: 'svg-sprite-loader'
      // })

      // Uncomment line below to view webpack rules
      // console.dir(config.module.rules)
    }
  },

  // https://nuxtjs.org/docs/2.x/concepts/server-side-rendering#extend-and-control-the-server
  serverMiddleware: [],

  stylelint: {
    fix: true
  }
}
