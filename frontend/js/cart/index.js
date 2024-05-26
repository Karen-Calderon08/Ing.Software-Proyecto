import { obtenerCarritoCompras } from '../carritoCompras'
import { obtenerUsuarioActivo } from '../obtenerUsuarioActivo'

const contenedorTabla = document.querySelector('#cotenedor-table')
const total = document.querySelector('#total')
const pagar = document.querySelector('#boton-pagar')
let items = []
const user = obtenerUsuarioActivo()
if (user === null) {
  window.location.href = '/signin.html'
}
window.onload = async () => {
  const carrito = await obtenerCarritoCompras()
  console.log(carrito)
  items = [...carrito.carrito]
  for (const producto of carrito.carrito) {
    contenedorTabla.innerHTML += `
      <tr>
      <td class="align-middle">
        <img src="img/product-1.jpg" alt="" style="width: 50px" />
        ${producto.nombre}
      </td>
      <td class="align-middle">${producto.precio}</td>
      <td class="align-middle">
        ${producto.cantidad}
      </td>
      <td class="align-middle">${producto.formato}</td>
      <td class="align-middle">${producto.cantidad * producto.precio}</td>
      <td class="align-middle">
        <button class="btn btn-sm btn-danger delete-item">
          <i class="fa fa-times"></i>
        </button>
      </td>
    </tr>
    `
  }

  const botonesEliminar = document.querySelectorAll('.delete-item')
  botonesEliminar.forEach((boton, index) => {
    boton.addEventListener('click', async () => {
      console.log({
        carritoId: items[index].carritoid,
        itemId: items[index].id,
        formato: items[index].formato
      })

      try {
        const response = await fetch(
          `${import.meta.env.VITE_LOCAL_URL}/api/carrito-compras/id`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              carritoId: items[index].carritoid,
              itemId: items[index].id,
              formato: items[index].formato
            })
          }
        )
        if (response.status === 400) {
          throw new Error()
        }
        alert('Item eliminado')
        window.location.reload()
      } catch (error) {
        alert('Error al eliminar el item')
      }
    })
  })
  const totalFinal = carrito.carrito.reduce(
    (acc, el) => acc + el.precio * el.cantidad,
    0
  )
  total.innerHTML = `$${totalFinal}`
}

pagar.addEventListener('click', async () => {
  const user = obtenerUsuarioActivo()
  console.log(items[0].carritoid)

  try {
    const itemsAComprar = items.map((item) => ({
      cancionId: item.id,
      cantidad: item.cantidad,
      formato: item.formato,
      precio: item.precio
    }))
    console.log(itemsAComprar)

    const response = await fetch(
      `${import.meta.env.VITE_LOCAL_URL}/api/pedidos/registrar`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuarioId: user.id,
          carritoId: items[0].carritoid,
          items: itemsAComprar
        })
      }
    )
    if (response.status === 400) {
      throw new Error()
    }

    alert('Compra realizada con éxito')
    window.location.href = '/index.html'
  } catch (error) {
    alert('Error al realizar la compra')
  }
})
