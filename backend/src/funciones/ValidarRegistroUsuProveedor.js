import { z } from "zod";

// Función para validar los datos del proveedor
function ValidarRegistroProveedor(data) {
    return providerSchema.parse(data);
  }

// Definir el esquema del proveedor utilizando Zod
const providerSchema = z.object({
  nombre: z.string(),
  descripcion: z.string(),
  contacto: z.string().email(),
});

module.exports = ValidarRegistroProveedor;