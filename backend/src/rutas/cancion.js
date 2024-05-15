import { Router } from 'express'
import { prisma } from '../prisma.js'
import { validarFormatoCancion } from '../funciones/validarFormatoCancion.js'
const router = Router()

router.get('/', async (req, res) => {
  const querys = req.query

  if (querys.formato && !validarFormatoCancion(querys.formato)) {
    res.send('Formato no válido')
  }
  const songs = await prisma.cancion.findMany({})

  console.log(songs)
  res.json({
    songs
  })
})

// router.post('/', async (req, res) => {
//   const =
//   const querys = req.query
//   const acceptedFormats = ['vinilo', 'MP3']
//   if (querys.formato && !acceptedFormats.includes(querys.formato)) {
//     res.send('Formato no válido')
//   }
//   const songs = await prisma.cancion.findMany({})

//   console.log(songs)
//   res.json({
//     songs
//   })
// })

export default router
