import { escogerFormato } from './escogerFormato'
import { agregarAlCarrito } from './agregarAlCarrito'
// import { obtenerCarritoCompras } from './carritoCompras'

async function buscarProductoPorId(id) {
  const response = await fetch(`${import.meta.env.VITE_LOCAL_URL}/api/cancion/id/${id}`)
  const producto = await response.json()
  return producto
}

window.onload = async () => {
  const contenedorDetalle = document.querySelector('#contenedor-detalle')
  const urlParams = new URLSearchParams(window.location.search)

  const producto = await buscarProductoPorId(urlParams.get('cancion'))
  contenedorDetalle.innerHTML = `
     <div class="row px-xl-5 detail-container">
     <div class=" mb-30">
         <div id="product-carousel" class="carousel slide" data-ride="carousel">
             <img class="w-100 h-100" src="${
               producto.songs.caratula
             }" alt="Image">
         </div>
     </div
     <div class="col-lg-7 h-auto mb-30">
         <div class="h-100 bg-light p-30 ">
             <h3>${producto.songs.nombre}</h3>
             <h4>${producto.songs.artista}</h4>
             <h5 class="font-weight-semi-bold mb-4">$150.00</h5>
             <div class="d-flex mb-3">
                 <strong class="text-dark mr-3">Formato:</strong>
                 <form id="radio-formato">
                    ${
                      producto?.songs?.Vinilo.length !== 0
                        ? `
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" id="vinilo" name="format" checked="true">
                            <label class="custom-control-label" for="vinilo">Vinilo</label>
                        </div>
                        `
                        : ''
                    }

                    ${
                      producto?.songs?.MP3.length !== 0
                        ? `
                        <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" class="custom-control-input" id="mp3" name="format">
                        <label class="custom-control-label" for="mp3">MP3</label>
                    </div>
                        `
                        : ''
                    }
                 </form>
             </div>
             <div class="d-flex align-items-center mb-4 pt-2">
                 <div class="input-group quantity mr-3" style="width: 130px;" id="contador-productos">
                     <div class="input-group-btn">
                         <button class="btn btn-primary btn-minus " id="disminuir">
                             <i class="fa fa-minus"></i>
                         </button>
                     </div>
                     <div id="valor-cantidad" type="text" class="form-control bg-secondary border-0 text-center" >
                     1
                     </div>
                     <div class="input-group-btn">
                         <button class="btn btn-primary btn-plus " id="aumentar">
                             <i class="fa fa-plus"></i>
                         </button>
                     </div>
                 </div>
                 <button class="btn btn-primary px-3" id="agregar-al-carrito"><i class="fa fa-shopping-cart mr-1"></i> Add To
                     Cart</button>
             </div>
         </div>
     </div>
   </div>
     `
  escogerFormato()
  const aumentarBoton = document.querySelector('#aumentar')
  const disminuirBoton = document.querySelector('#disminuir')
  const cantidad = document.querySelector('#valor-cantidad')
  const radioFormato = document.querySelector('#radio-formato')

  aumentarBoton?.addEventListener('click', () => {
    let cantidadNumero = parseInt(cantidad.innerHTML)
    if (cantidadNumero === producto?.songs?.Vinilo[0]?.stock) return
    cantidadNumero += 1
    cantidad.innerHTML = cantidadNumero
  })

  disminuirBoton?.addEventListener('click', () => {
    let cantidadNumero = parseInt(cantidad.innerHTML)
    if (cantidadNumero < 2) {
      cantidad.value = 0
      return
    }
    cantidadNumero -= 1
    cantidad.innerHTML = cantidadNumero
  })

  const formato = radioFormato.querySelector('input[name="format"]:checked')?.id
  const precio =
    formato === 'vinilo'
      ? producto.songs.Vinilo[0].precio
      : producto.songs.MP3[0].precio
  agregarAlCarrito({
    cancionId: producto?.songs?.id,
    formato,
    precio
  })
}
