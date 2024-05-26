import { obtenerUsuarioActivo } from '../obtenerUsuarioActivo'

export function agregarAlCarrito({ cancionId, formato, precio }) {
  const botonAgregar = document.querySelector('#agregar-al-carrito')
  const user = obtenerUsuarioActivo()
  botonAgregar.addEventListener('click', async () => {
    const cantidad = Number(document.querySelector('#valor-cantidad').innerHTML)
    if (user === null) {
      alert('Necesitas iniciar sesión para agregar productos al carrito')
      return
    }
    console.log(cantidad)

    const response = await fetch(
      `${import.meta.env.VITE_LOCAL_URL}/api/carrito-compras/agregar`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuarioId: user.id,
          cancionId,
          cantidad,
          formato,
          precio
        })
      }
    )
    // showToast('Article Submitted Successfully', 'danger', 5000)
    console.log(response)
    if (response.ok) {
      alert('Producto agregado al carrito')
      return
    }

    const data = await response.json()
    console.log(data)
  })
}
