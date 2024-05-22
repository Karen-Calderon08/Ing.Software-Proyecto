import { prisma } from '../prisma.js'

export class ClienteModelo {
  static async crearCliente({
    nombre,
    apellido,
    correo,
    contrasena,
    direccion = null
  }) {
    return await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        correo,
        contrasena,
        direccion,
        tipoUsuario: 'cliente'
      }
    })
  }
}
