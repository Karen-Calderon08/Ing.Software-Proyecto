import { obtenerUsuarioActivo } from './obtenerUsuarioActivo'

const carritoComprasBoton = document.querySelector('#carrito-compras-boton')
const carritoComprasContenedor = document.querySelector(
  '.carrito-compras-container'
)

carritoComprasBoton.addEventListener('click', () => {
  carritoComprasContenedor.classList.toggle('open')
})

export const obtenerCarritoCompras = async () => {
  const user = obtenerUsuarioActivo()
  console.log(user)

  const response = await fetch(
    `${import.meta.env.VITE_LOCAL_URL}/api/carrito-compras?usuarioId=${user.id}`
  )
  const carrito = await response.json()
  return carrito
}
