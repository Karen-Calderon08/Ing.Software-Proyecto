javascript
// Importar el módulo mysql
const mysql = require('mysql');

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'nombre_de_tu_base_de_datos'
});

// Conectar a la base de datos
connection.connect();

// Consulta para obtener las ventas abiertas
const consultaVentasAbiertas = 'SELECT * FROM transacciones WHERE estado = "abierta"';

// Ejecutar la consulta
connection.query(consultaVentasAbiertas, (error, results, fields) => {
  if (error) throw error;
  console.log('Ventas abiertas:', results);
});

// Cerrar la conexión a la base de datos al finalizar las consultas
connection.end();
