import { Router } from 'express'
import { agregarCancion } from '../controlador/carritoCompras.controlador.js'

const router = Router()

router.post('/agregar', agregarCancion)

export default router
