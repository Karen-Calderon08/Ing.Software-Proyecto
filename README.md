# Backend

El servidor backend de nuestro proyecto. Utiliza Express.js como framework y Prisma como ORM para interactuar con la base de datos.

## Cómo hacerlo funcionar


1. Instala las dependencias necesarias con npm.

```sh
npm install
```

2. Navega a la carpeta `backend` en tu terminal.

```sh
cd backend
```

<!-- 3.() Copia el archivo `.env.example` a un nuevo archivo llamado `.env` y rellena las variables de entorno necesarias.

`cp .env.example .env` -->

4. Inicia el servidor en modo de desarrollo con el siguiente comando:

```sh
npm run dev
```

## Qué hace

El servidor backend proporciona una API REST para interactuar con la base de datos. Actualmente, tiene una ruta definida para obtener canciones desde la base de datos.

## Cómo funciona

El servidor utiliza Express.js para manejar las solicitudes HTTP. Prisma se utiliza para interactuar con la base de datos. Por ahora solo hay una ruta que esta definida en el archivo `src/rutas/cancion.js`, la idea es que cada uno cree los endpoints que necesite para la creacion de sus funcionalidades.

## Scripts del package.json

- `dev`: Inicia el servidor en modo de desarrollo utilizando nodemon, lo que permite la recarga en caliente del servidor cuando se realizan cambios en los archivos.
- `start`: Inicia el servidor en modo de producción.
- `test`: Ejecuta las pruebas unitarias del proyecto utilizando Jest.

```sh
"scripts": {
  "dev": "nodemon ./src/index.js",
  "start": "node ./src/index.js",
  "test": "node --experimental-vm-modules ../node_modules/jest/bin/jest.js"
  }
```
