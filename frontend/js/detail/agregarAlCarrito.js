import { obtenerUsuarioActivo } from '../obtenerUsuarioActivo'

export function agregarAlCarrito({ cancionId, formato, precio }) {
  const botonAgregar = document.querySelector('#agregar-al-carrito')
  const user = obtenerUsuarioActivo()
  botonAgregar.addEventListener('click', async () => {
    if (!user) {
      alert('Necesitas iniciar sesión para agregar productos al carrito')
      window.location.href = '/signin.html'
    }
    if (!formato) {
      alert('Debes seleccionar un formato')
      return
    }
    const cantidad = Number(document.querySelector('#valor-cantidad').innerHTML)

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
