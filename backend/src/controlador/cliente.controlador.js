import { ClienteModelo } from '../modelo/cliente.modelo.js'
import { validarPropiedadesObjeto } from '../utilidades/validarPropiedadesObjeto.js'
import { clienteSchema } from '../schemas.js'
import bcrypt from 'bcrypt'

export class ClienteControlador {
  static async crearCliente(req, res) {
    const body = req.body

    try {
      const isValidSchema = validarPropiedadesObjeto(body, clienteSchema)

      if (!isValidSchema.isValid) {
        return res.status(400).json({
          message: 'Error al crear el cliente',
          errors: isValidSchema.message
        })
      }

      const contrasenaEncriptada = await bcrypt.hash(body.contrasena, 8)

      const cliente = await ClienteModelo.crearCliente({
        nombre: body.nombre,
        apellido: body.apellido,
        correo: body.correo,
        contrasena: contrasenaEncriptada,
        direccion: body.direccion
      })

      res.json({
        cliente
      })
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .send(`Error al crear el cliente : message : ${error?.message}`)
    }
  }
}
