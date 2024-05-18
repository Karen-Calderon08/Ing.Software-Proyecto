import { prisma } from '../prisma.js'

export async function buscarCarrito(usuarioId) {
  return await prisma.carrito.findUnique({
    where: {
      usuarioId
    }
  })
}

export async function crearCarrito(usuarioId) {
  return await prisma.carrito.create({
    data: {
      usuarioId
    }
  })
}

export async function upsertCarrito(carritoId, cancionId, formato, cantidad) {
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
