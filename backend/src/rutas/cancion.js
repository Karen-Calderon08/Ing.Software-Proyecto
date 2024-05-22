import { Router } from 'express'
import { CancionControlador } from '../controlador/cancion.controlador.js'
const router = Router()

router.get('/', CancionControlador.buscarCanciones)
// HACEN FALTA MAS ENDPOINTS PARA GESTIONAR LA CREACION DE CANCIONES
export default router
