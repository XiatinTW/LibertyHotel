const { defineConfig } = require('vite')
const { createVuePlugin } = require('vite-plugin-vue2')

module.exports = defineConfig({
  plugins: [createVuePlugin()],
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
