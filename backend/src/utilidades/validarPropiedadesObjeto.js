import { z } from 'zod'

export const validarPropiedadesObjeto = (data, schema) => {
  const objectSchema = z.object(schema)

  try {
    const validatedData = objectSchema.parse(data)
    console.log('validatedData', validatedData)
    return validatedData
  } catch (error) {
    const messages = error.errors.map((error) => {
      return {
        value: error.path[0],
        message: error.message
      }
    })
    const err = new Error()
    err.data = messages
    throw err
  }
}
