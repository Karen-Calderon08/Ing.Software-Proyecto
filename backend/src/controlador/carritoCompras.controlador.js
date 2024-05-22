import { z } from 'zod'
import {
  CarritoComprasModelo
} from '../modelo/carritoCompras.modelo.js'
import { validarPropiedadesObjeto } from '../utilidades/validarPropiedadesObjeto.js'
import { formatoCancion } from '../constantes/const.js'

export class CarrtitoComprasControlador {
  static async agregarCancion(req, res) {
    try {
      const body = req.body
      const schema = {
        usuarioId: z.number().positive(),
        cancionId: z.number().positive(),
        cantidad: z.number().positive(),
        formato: formatoCancion
      }
      const isValidSchema = validarPropiedadesObjeto(body, schema).isValid
      if (!isValidSchema) {
        res.status(400).json({
          message: 'Error al agregar la canción al carrito',
          errors: isValidSchema.message
        })
      }
      let carrito = await CarritoComprasModelo.buscarCarrito(body.usuarioId)

      if (!carrito) {
        carrito = await CarritoComprasModelo.crearCarrito(body.usuarioId)
      }

      await CarritoComprasModelo.upsertCarrito(
        carrito.id,
        body.cancionId,
        body.formato,
        body.cantidad
      )
      res.status(200).json({ message: 'Canción agregada al carrito' })
    } catch (error) {
      res.status(500).json({
        message: 'Error al agregar la canción al carrito',
        errors: error
      })
    }
  }
}
