import { Router } from 'express';
import { prisma } from '../prisma';
const ValidarProveedor = require('../funciones/ValidarRegistroUsuProveedor');
const router = Router()

// Ruta para registrar un nuevo proveedor
router.post('/proveedores', async (req, res) => {
  try {
    const { nombre, descripcion, contacto } = ValidarProveedor(req.body);

    // Guardar el proveedor en la base de datos utilizando Prisma
    const nuevoProveedor = await prisma.proveedor.create({
      data: {
        nombre,
        descripcion,
        contacto,
      },
    });

    res.status(201).json(nuevoProveedor);
  } catch (error) {
    console.error('Error al registrar el proveedor:', error);
    res.status(400).json({ error: 'Datos de proveedor no válidos.' });
  }
});

module.exports = router;
