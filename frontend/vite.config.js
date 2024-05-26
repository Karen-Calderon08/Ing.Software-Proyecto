import { defineConfig } from 'vite'

export default defineConfig({
  envDir: '../',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: [
        './cart.html',
        './detail.html',
        './index.html',
        './perfil.html',
        './shop.html',
        './signin.html',
        './signup.html',
        './subir.html',

        './js/cart/index.js',
        './js/detail/index.js',
        './js/index/index.js',
        './js/perfil/index.js',
        './js/shop/index.js',
        './js/signup/index.js',
        './js/signup/index.js',
        './js/subir/index.js',
        './js/main.js',
        './js/carritoCompras.js',
        './js/obtenerProductos.js',
        './js/obtenerUsuarioActivo.js',
        './js/obtenerProductos.js',
        './js/detail/agregarAlCarrito.js',
        './js/detail/escogerFormato.js'
      ]
    }
  }
})
