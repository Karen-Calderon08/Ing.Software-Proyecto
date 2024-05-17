import { Router } from 'express'
import { prisma } from '../prisma.js'
import z from 'zod'
import { validarPropiedadesObjeto } from '../utilidades/validarPropiedadesObjeto.js'
const router = Router()

router.post('/agregar', async (req, res) => {
  const body = req.body

  const schema = {
    usuarioId: z.number().positive(),
    cancionId: z.number().positive(),
    cantidad: z.number().positive(),
    formato: z.union([z.literal('vinilo'), z.literal('mp3')])
  }

  try {
    const isValidSchema = validarPropiedadesObjeto(body, schema).isValid
    if (!isValidSchema) {
      res.status(400).json({
        message: 'Error al agregar la canción al carrito',
        errors: isValidSchema.message
      })
    }
    const carrito = await prisma.carrito.findUnique({
      where: {
        usuarioId: 7
      }
    })

    if (!carrito) {
      await prisma.carrito.create({
        data: {
          usuarioId: body.usuarioId
        }
      })
    }
    await prisma.carritoDetalle.upsert({
      where: {
        carritoId_cancionId_formato: {
          carritoId: carrito.id,
          cancionId: body.cancionId,
          formato: body.formato
        }
      },
      update: {
        cantidad: body.cantidad
      },
      create: {
        carritoId: carrito.id,
        cancionId: body.cancionId,
        cantidad: body.cantidad,
        formato: body.formato
      }
    })
    res.status(200).json({ message: 'Canción agregada al carrito' })
  } catch (error) {
    res.status(500).json({
      message: 'Error al agregar la canción al carrito',
      errors: error
    })
  }
})

export default router
