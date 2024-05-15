// import sum from '../funciones/sum'
import { test, expect } from '@jest/globals'
import { validarFormatoCancion } from '../funciones/validarFormatoCancion.js'
import { validarDatosUsuario } from '../funciones/validarDatosUsuario.js'

test('Valida que el formato solicitado sea vinilo o mp3', () => {
  expect(validarFormatoCancion('vinilo')).toBe(true)
  expect(validarFormatoCancion('VINILO')).toBe(true)
  expect(validarFormatoCancion('mp3')).toBe(true)
  expect(validarFormatoCancion('MP3')).toBe(true)
  expect(validarFormatoCancion(undefined)).toBe(false)
  expect(validarFormatoCancion()).toBe(false)
  expect(validarFormatoCancion('cualquiercosa')).toBe(false)
  expect(validarFormatoCancion(null)).toBe(false)
  expect(validarFormatoCancion(1234)).toBe(false)
  expect(validarFormatoCancion(new Date())).toBe(false)
})

test('Valida que los datos del usuario sean correctos', () => {
  const usuarioValido = {
    nombre: 'Andres',
    apellido: 'Laguilavo',
    correo: 'andres@example.com',
    direccion: 'Calle 123, Ciudad, País',
    contraseña: 'password123'
  }
  expect(() => validarDatosUsuario(usuarioValido)).not.toThrow()
})

test('Valida que los datos del usuario sean incorrectos', () => {
  const usuarioInvalido = {
    nombre: 1,
    apellido: '',
    correo: 'andres',
    direccion: 'Calle 123',
    contraseña: 'pass'
  }
  expect(() => validarDatosUsuario(usuarioInvalido)).toThrow()
})
