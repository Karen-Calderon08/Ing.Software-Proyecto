import z from 'zod'
import { validarPropiedadesObjeto } from '../utilidades/validarPropiedadesObjeto.js'
import { formatoCancion } from '../constantes/const.js'
import { PedidoModelo } from '../modelo/pedido.modelo.js'

export class PedidoControlador {
  static async registrarPedido(req, res) {
    const body = req.body

    const schema = {
      usuarioId: z.number().positive(),
      items: z.array(
        z.object({
          cancionId: z.number().positive(),
          precio: z.number().positive(),
          cantidad: z.number().positive(),
          formato: formatoCancion
        })
      )
    }

    try {
      if (!validarPropiedadesObjeto(body, schema).isValid) {
        return res.status(400).json({
          message: 'Datos incorrectos',
          errors: validarPropiedadesObjeto(body, schema).message
        })
      }

      const total = body.items.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
      )

      const pedido = await PedidoModelo.registrarPedido({
        total,
        usuarioId: body.usuarioId
      })

      for (const item of body.items) {
        await PedidoModelo.registrarPedidoDetalle({
          cancionId: item.cancionId,
          pedido: pedido.id,
          precio: item.precio,
          cantidad: item.cantidad,
          formato: item.formato
        })
      }

      res.status(200).json({ message: 'Canción agregada al carrito' })
    } catch (error) {
      console.error(error)
      res.status(400).json({
        message: 'Error al agregar la canción al carrito',
        errors: error.data ?? error
      })
    }
  }

  static async obtenerPedidos(req, res) {
    const { usuarioId } = req.params

    try {
      const pedidos = await PedidoModelo.obtenerPedidos(usuarioId)

      res.status(200).json(pedidos)
    } catch (error) {
      console.error(error)
      res.status(400).json({
        message: 'Error al obtener los pedidos',
        errors: error.data ?? error
      })
    }
  }

  static async obtenerPedidoPorId(req, res) {
    const { id } = req.params
    try {
      const pedido = await PedidoModelo.obtenerPedidoPorId(id)

      res.status(200).json(pedido)
    } catch (error) {
      console.error(error)
      res.status(400).json({
        message: 'Error al obtener el pedido',
        errors: error.data ?? error
      })
    }
  }
}
