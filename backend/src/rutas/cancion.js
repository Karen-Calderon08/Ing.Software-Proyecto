import { Router } from 'express'
import { prisma } from '../prisma.js'
import { validarFormatoCancion } from '../utilidades/validarFormatoCancion.js'
const router = Router()

router.get('/', async (req, res) => {
  const querys = req.query

  querys.q = querys.q || ''
  console.log(querys.q)

  if (querys.formato && !validarFormatoCancion(querys.formato)) {
    res.send('Formato no válido')
  }
  try {
    const songs = await prisma.cancion.findMany({
      where: {
        OR: [
          {
            nombre: {
              contains: querys.q,
              mode: 'insensitive' // Indiferente ante mayúsculas y minúsculas
            }
          }
        ]
      }
    })
    res.json({
      songs
    })
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error al obtener las canciones : message : ${error?.message}`)
  }
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
