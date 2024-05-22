import { prisma } from '../prisma.js'

export class CancionModelo {
  static async buscarCanciones(query) {
    await prisma.cancion.findMany({
      where: {
        OR: [
          {
            nombre: {
              contains: query,
              mode: 'insensitive' // Indiferente ante mayúsculas y minúsculas
            }
          }
        ]
      }
    })
  }
}
