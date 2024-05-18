import { z } from 'zod'
import { buscarCarrito, crearCarrito, upsertCarrito } from '../modelo/carritoCompras.modelo.js'
import { validarPropiedadesObjeto } from '../utilidades/validarPropiedadesObjeto.js'

export async function agregarCancion(req, res) {
  try {
    const body = req.body
    const schema = {
      usuarioId: z.number().positive(),
      cancionId: z.number().positive(),
      cantidad: z.number().positive(),
      formato: z.union([z.literal('vinilo'), z.literal('mp3')])
    }
    const isValidSchema = validarPropiedadesObjeto(body, schema).isValid
    if (!isValidSchema) {
      res.status(400).json({
        message: 'Error al agregar la canción al carrito',
        errors: isValidSchema.message
      })
    }
    let carrito = await buscarCarrito(body.usuarioId)

    if (!carrito) {
      carrito = await crearCarrito(body.usuarioId)
    }

    await upsertCarrito(carrito.id, body.cancionId, body.formato, body.cantidad)
    res.status(200).json({ message: 'Canción agregada al carrito' })
  } catch (error) {
    res.status(500).json({
      message: 'Error al agregar la canción al carrito',
      errors: error
    })
  }
}
