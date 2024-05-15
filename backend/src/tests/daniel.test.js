const request = require('supertest');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const registrarProveedor = require('../rutas/Proveedor');

jest.mock('@prisma/client'); // Mockear el cliente de Prisma

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(registrarProveedor);

describe('POST /proveedores', () => {
  beforeAll(() => {
    prisma.proveedor.create.mockResolvedValue({
      id: 1,
      nombre: 'VinylRecordsCo',
      descripcion: 'Proveedor especializado en discos de vinilo.',
      contacto: 'info@vinylrecordsco.com',
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Debe registrar un nuevo proveedor', async () => {
    const nuevoProveedor = {
      nombre: 'VinylRecordsCo',
      descripcion: 'Proveedor especializado en discos de vinilo.',
      contacto: 'info@vinylrecordsco.com',
    };

    const response = await request(app)
      .post('/proveedores')
      .send(nuevoProveedor);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(nuevoProveedor);
  });

  it('Arroja un error si los datos del proveedor no son válidos', async () => {
    const proveedorInvalido = {
      nombre: 'VinylRecordsCo',
      descripcion: 'Proveedor especializado en discos de vinilo.',
      contacto: 'correo_invalido', // Dirección de correo electrónico inválida
    };

    const response = await request(app)
      .post('/proveedores')
      .send(proveedorInvalido);

    expect(response.status).toBe(400);
  });
});
