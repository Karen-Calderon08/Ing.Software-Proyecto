import { Router } from 'express'
import { CarrtitoComprasControlador } from '../controlador/carritoCompras.controlador.js'

const router = Router()

router.post('/agregar', CarrtitoComprasControlador.agregarCancion)

export default router
