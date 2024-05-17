import { Router } from 'express'
import { prisma } from '../prisma.js'
import z from 'zod'
import { validarPropiedadesObjeto } from '../utilidades/validarPropiedadesObjeto.js'
const router = Router()

router.post('/registrar', async (req, res) => {
  const body = req.body

  const schema = {
    usuarioId: z.number().positive(),
    cancionId: z.number().positive(),
    cantidad: z.number().positive(),
    formato: z.union([z.literal('vinilo'), z.literal('mp3')])
  }

  try {
    validarPropiedadesObjeto(body, schema)
    await prisma.carrito.create({
      data: {
        usuarioId: body.usuarioId,
        cancionId: body.cancionId,
        cantidad: body.cantidad,
        formato: body.formato
      }
    })
    res.status(200).json({ message: 'Canción agregada al carrito' })
  } catch (error) {
    res.status(400).json({
      message: 'Error al agregar la canción al carrito',
      errors: error.data ?? error
    })
  }
})

export default router
