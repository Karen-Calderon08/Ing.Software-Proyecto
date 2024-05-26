window.onload = async () => {
  const contenedorProductos = document.querySelector('#contenedor-productos')
  const response = await fetch(`${import.meta.env.VITE_LOCAL_URL}/api/cancion`)
  const productos = await response.json()
  for (const producto of productos.songs) {
    contenedorProductos.innerHTML += `
    <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
    <div class="product-item bg-light mb-4">
        <div class="product-img position-relative overflow-hidden">
            <img class="img-fluid w-100" src="${producto.caratula}" alt="">
            <div class="product-action">
                <a class="btn btn-outline-dark" href="/detail.html?cancion=${producto.id}"><i class="fa">Ver producto</i></a>
            </div>
        </div>
        <div class="text-center py-4">
            <a class="h6 text-decoration-none text-truncate" href="">${producto.nombre}</a>
            <div class="d-flex align-items-center justify-content-center mt-2">
                <h5>${producto.artista}</h5>
            </div>
        </div>
    </div>
</div>`
  }
}
