import { obtenerUsuarioActivo } from '../obtenerUsuarioActivo'

const tituloPerfil = document.querySelector('#titulo-perfil')
const usuario = obtenerUsuarioActivo()
if (usuario === null) {
  window.location.href = '/signin.html'
}
tituloPerfil.innerHTML += `${usuario.nombre} ${usuario.apellido}`

window.onload = async () => {
  const contenedorPedidos = document.querySelector('#contenedor-pedidos')
  const response = await fetch(
    `${import.meta.env.VITE_LOCAL_URL}/api/pedidos?usuarioId=${usuario.id}`
  )
  const pedidos = await response.json()
  console.log(pedidos)
  for (const pedido of pedidos) {
    const items = pedido.PedidoDetalle.map((item) => {
      return {
        nombre: item.cancion.nombre,
        cantidad: item.cantidad,
        formato: item.formato
      }
    })

    contenedorPedidos.innerHTML += `
    <div class="col-lg-12 col-md-4 col-sm-6 pb-1">
    <div class="text-decoration-none">
        <div class="cat-item d-flex align-items-center mb-4">
            <div class="overflow-hidden" style="width: 100px; height: 100px;">
                <img class="img-fluid" src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Disco_de_Vinilo.jpg" alt="">
            </div>
            <div class="flex-fill pl-3">
                <h6>Pedido #${pedido.id}</h6>
                <ul>
                    ${items
                      .map(
                        (item) =>
                          `<li>${item.nombre} x${item.cantidad}, formato: ${item.formato}</li>`
                      )
                      .join('')}
                </ul>
                <small class="text-body">Estado : ${pedido.estado}</small>
            </div>
            <div class="col-lg-2" style="color:black;">
              <p>
              ${new Date(pedido.fechaCreacion).toLocaleDateString('es-co', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
              </p>
              <small>
              Total : 
              $ ${pedido.total}
              </small>
            </div>
        </div>
    </d>
</div>
  `
  }
}
