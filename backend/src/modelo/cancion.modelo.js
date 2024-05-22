import { prisma } from '../prisma'

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
