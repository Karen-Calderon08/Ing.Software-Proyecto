import { validarFormatoCancion } from '../utilidades/validarFormatoCancion.js'
import { CancionModelo } from '../modelo/cancion.modelo.js'

export class CancionControlador {
  static async buscarCanciones(req, res) {
    const querys = req.query

    querys.q = querys.q || ''

    if (querys.formato && !validarFormatoCancion(querys.formato)) {
      res.send('Formato no válido')
    }
    try {
      const songs = await CancionModelo.buscarCanciones(querys.q)

      res.json({
        songs
      })
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .send(`Error al obtener las canciones : message : ${error?.message}`)
    }
  }
}
