import { prisma } from '../prisma.js'

export class CarritoComprasModelo {
  static async buscarCarrito(usuarioId) {
    return await prisma.carrito.findUnique({
      where: {
        usuarioId
      }
    })
  }

  static async crearCarrito(usuarioId) {
    return await prisma.carrito.create({
      data: {
        usuarioId
      }
    })
  }

  static async upsertCarrito(carritoId, cancionId, formato, cantidad) {
    return await prisma.carritoDetalle.upsert({
      where: {
        carritoId_cancionId_formato: {
          carritoId,
          cancionId,
          formato
        }
      },
      update: {
        cantidad
      },
      create: {
        carritoId,
        cancionId,
        cantidad,
        formato
      }
    })
  }
}
