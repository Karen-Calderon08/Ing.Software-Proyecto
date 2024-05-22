import { validarContraseña } from '../funciones/validarContraseña.js'
import { ClienteModelo } from '../modelo/cliente.modelo.js'
import { authSchema } from '../schemas.js'
import { validarPropiedadesObjeto } from '../utilidades/validarPropiedadesObjeto.js'
import jwt from 'jsonwebtoken'

export class AuthControlador {
  static async validarUsuario(req, res) {
    const body = req.body
    try {
      const isValidSchema = validarPropiedadesObjeto(body, authSchema)

      if (!isValidSchema.isValid) {
        return res.status(400).json({ mensaje: isValidSchema })
      }

      const cliente = await ClienteModelo.obtenerCliente(body.correo)
      const { contrasena } = body
      console.log(contrasena, cliente.contrasena)
      const isValidPassword = await validarContraseña(
        contrasena,
        cliente.contrasena
      )

      if (!isValidPassword) {
        throw new Error()
      }

      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
          cliente
        },
        process.env.JWT_KEY
      )

      res.status(200).json({ token })
    } catch (error) {
      res.status(400).send('Correo o contraseña incorrectos')
    }
  }
}
