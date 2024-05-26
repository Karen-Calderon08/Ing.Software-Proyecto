window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const format = urlParams.get('format')
  const q = urlParams.get('q')
  const tituloBusqueda = document.querySelector('#titulo-busqueda')
  tituloBusqueda.innerHTML = `Busqueda :  ${q}, formato : ${format}`
  const contenedorProductos = document.querySelector('#contenedor-productos')
  const params = new URLSearchParams()

  if (q !== null) {
    params.append('q', q)
  }

  if (format !== null) {
    params.append('format', format)
  }

  const url = new URL(`${import.meta.env.VITE_LOCAL_URL}/api/cancion`)
  url.search = urlParams.toString()

  const response = await fetch(url)
  console.log(response)

  const productos = await response.json()
  if (productos.songs.length === 0) {
    contenedorProductos.innerHTML = '<h1>No se encontraron resultados</h1>'
  }
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
