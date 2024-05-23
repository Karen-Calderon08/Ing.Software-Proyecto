import { z } from 'zod'

export const clienteSchema = {
  nombre: z
    .string()
    .min(1, 'El nombre es requerido.')
    .max(50, 'El nombre es demasiado largo.'),
  apellido: z
    .string()
    .min(1, 'El apellido es requerido.')
    .max(50, 'El apellido es demasiado largo.'),
  correo: z.string().email('El correo no es válido.'),
  contrasena: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres.'),
  direccion: z.optional(
    z
      .string()
      .min(8, 'La dirección debe tener al menos 8 digitos.')
      .max(50, 'La dirección es demasiado larga.')
  )
}

export const authSchema = {
  correo: z.string().email('El correo no es válido.'),
  contrasena: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres.')
}
